import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import {
  AiExtractionResult,
  extractReceiverAddress,
  validateExtraction,
} from './extraction';

export interface AiConversationTurn {
  role: 'user' | 'assistant';
  content: string;
}

const DEFAULT_BASE_URL = 'https://inference.baseten.co/v1';
const DEFAULT_MODEL = 'meta-models/muse-spark-open-1026';
// 'deepseek-ai/DeepSeek-V4-Flash-0731';

/**
 * Baseten inference (OpenAI-compatible) powering Dispatchly AI delivery features.
 * Set BASETEN_MODEL_ID to a Meta Muse deployment id for Muse; defaults to DeepSeek.
 * Env: BASETEN_API_KEY, BASETEN_BASE_URL, BASETEN_MODEL_ID, BASETEN_TIMEOUT_MS,
 * BASETEN_MAX_RETRIES, BASETEN_ENABLED, BASETEN_REASONING_EFFORT,
 * AI_DEMO_MODE (legacy kill-switch: forced demo when not "false" without key).
 * Falls back to the deterministic demo extractor on any live failure — never
 * crashes inbound message processing.
 */
@Injectable()
export class BasetenClient {
  private readonly logger = new Logger(BasetenClient.name);
  private client: OpenAI | null = null;

  constructor(private readonly config: ConfigService) {}

  get provider(): 'baseten' {
    return 'baseten';
  }

  get modelId(): string {
    return this.config.get<string>('BASETEN_MODEL_ID') ?? DEFAULT_MODEL;
  }

  get enabled(): boolean {
    return this.config.get<string>('BASETEN_ENABLED') !== 'false';
  }

  get mode(): 'live' | 'demo' {
    const demo = this.config.get<string>('AI_DEMO_MODE');
    const hasKey = !!this.config.get<string>('BASETEN_API_KEY')?.trim();
    if (this.enabled && demo === 'false' && hasKey) return 'live';
    // Live as soon as a key is present and demo isn't forced on.
    if (this.enabled && hasKey && demo !== 'true') return 'live';
    return 'demo';
  }

  private getClient(): OpenAI {
    if (!this.client) {
      this.client = new OpenAI({
        baseURL: (this.config.get<string>('BASETEN_BASE_URL') ?? DEFAULT_BASE_URL).replace(/\/$/, ''),
        apiKey: this.config.get<string>('BASETEN_API_KEY')!,
        timeout: Number(this.config.get<string>('BASETEN_TIMEOUT_MS') ?? 30000),
        maxRetries: Number(this.config.get<string>('BASETEN_MAX_RETRIES') ?? 3),
      });
    }
    return this.client;
  }

  async healthCheck(): Promise<{ ok: boolean; mode: 'live' | 'demo'; provider: string; model: string; latencyMs?: number; error?: string }> {
    const started = Date.now();
    if (this.mode === 'demo') return { ok: false, mode: 'demo', provider: this.provider, model: this.modelId };
    try {
      const res = await this.getClient().chat.completions.create({
        model: this.modelId,
        messages: [{ role: 'user', content: 'Reply with OK' }],
        max_tokens: 8,
      });
      return { ok: !!res.choices?.length, mode: 'live', provider: this.provider, model: this.modelId, latencyMs: Date.now() - started };
    } catch (e) {
      return { ok: false, mode: 'live', provider: this.provider, model: this.modelId, latencyMs: Date.now() - started, error: e instanceof Error ? e.message.slice(0, 300) : 'health check failed' };
    }
  }

  async extract(input: {
    message: string;
    history: AiConversationTurn[];
    currentFields: Record<string, unknown>;
  }): Promise<AiExtractionResult> {
    if (this.mode === 'demo') return this.demoExtract(input);
    const started = Date.now();
    try {
      const reasoningEffort = this.config.get<string>('BASETEN_REASONING_EFFORT');
      const response = await this.getClient().chat.completions.create({
        model: this.modelId,
        response_format: { type: 'json_object' },
        ...(reasoningEffort ? { reasoning_effort: reasoningEffort } : {}),
        messages: [
          {
            role: 'system',
            content:
              'You extract delivery details from WhatsApp messages. Return ONLY JSON: {"intent":"DELIVERY_REQUEST|DELIVERY_UPDATE|TRACKING_QUERY|OTHER","fields":{"senderName?":string,"senderPhone?":string,"senderAddress?":string,"receiverName?":string,"receiverPhone?":string,"receiverAddress?":string,"packageName?":string,"packageWeight?":string,"packageValue?":string,"pickupDate?":string,"deliveryType?":string},"confidence":0-1}. Omit unknown fields.',
          },
          ...input.history.slice(-8),
          {
            role: 'user',
            content: `Known fields: ${JSON.stringify(input.currentFields)}\nNew message: ${input.message}`,
          },
        ],
      } as OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming);
      const content = response.choices?.[0]?.message?.content;
      const parsed = typeof content === 'string' ? JSON.parse(content) : content;
      const validated = validateExtraction(parsed);
      if (!validated) throw new Error('Model returned invalid structured output');
      this.logger.log(`Baseten extraction ok model=${this.modelId} latencyMs=${Date.now() - started}`);
      return validated;
    } catch (e) {
      this.logger.warn(
        `Baseten live model failed, falling back to demo extractor: ${e instanceof Error ? e.message : e}`,
      );
      return { ...this.demoExtract(input), aiMode: 'demo' };
    }
  }

  // Clearly labelled deterministic demo extractor — NOT live model output.
  private demoExtract(input: {
    message: string;
    currentFields: Record<string, unknown>;
  }): AiExtractionResult {
    const text = input.message;
    const lower = text.toLowerCase();
    const intent = /track|where is|status of/.test(lower)
      ? 'TRACKING_QUERY'
      : /deliver|send|ship|package|pickup|dispatch/.test(lower)
        ? 'DELIVERY_REQUEST'
        : 'OTHER';
    const fields: Record<string, unknown> = {};
    const phone = text.match(/(\+?\d[\d\s-]{7,}\d)/);
    if (phone) fields.receiverPhone = phone[1];
    const weight = text.match(/(\d+(?:\.\d+)?)\s*kg/i);
    if (weight) fields.packageWeight = weight[1];
    const to = text.match(/\bto\s+([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)?)/);
    if (to) fields.receiverName = to[1];
    const deliver = text.match(
      /deliver(?:y|ing)?\s+(?:a\s+|an\s+|the\s+)?([a-zA-Z][a-zA-Z ]{2,30}?)(?:\s+to\s+|\s+from\s+|,|\.|$)/i,
    );
    if (deliver) fields.packageName = deliver[1].trim();
    const from = text.match(/from\s+([^,.]+)/i);
    if (from) fields.senderAddress = from[1].trim();
    const extractedAddress = extractReceiverAddress(text);
    if (extractedAddress) fields.receiverAddress = extractedAddress;
    const date = text.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
    if (date) fields.pickupDate = date[1];
    const value = text.match(
      /(?:worth(?:\s+of)?|valued?\s+(?:at|of)?|₦|NGN\s?)\s*([\d,]+(?:\.\d+)?)/i,
    );
    if (value) fields.packageValue = value[1].replace(/,/g, '');
    return {
      intent,
      fields: fields,
      confidence: Object.keys(fields).length ? 0.6 : 0.3,
      aiMode: 'demo',
    };
  }
}
