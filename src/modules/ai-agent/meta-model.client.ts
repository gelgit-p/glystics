import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiExtractionResult, validateExtraction } from './extraction';

export interface AiConversationTurn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Meta Muse Spark via Meta Model API.
 * BLOCKER (documented): Meta has not published a stable public Model API contract
 * (endpoint/auth/structured-output schema) that can be verified without partner
 * credentials. This adapter therefore isolates the integration behind env config:
 *   META_MODEL_BASE_URL (default https://api.meta.ai/v1 — PLACEHOLDER, verify)
 *   META_MODEL_API_KEY, META_MODEL_ID (default muse-spark — verify)
 *   META_MODEL_API_STYLE=openai-chat (Authorization: Bearer, /chat/completions,
 *     response_format json_object) — replace adaptRequest/adaptResponse when the
 *     verified contract is available. Until then AI_DEMO_MODE defaults on.
 */
@Injectable()
export class MetaModelClient {
  private readonly logger = new Logger(MetaModelClient.name);
  constructor(private readonly config: ConfigService) {}

  get mode(): 'live' | 'demo' {
    const demo = this.config.get<string>('AI_DEMO_MODE');
    const hasKey = !!this.config.get<string>('META_MODEL_API_KEY');
    if (demo === 'false' && hasKey) return 'live';
    return 'demo';
  }

  async extract(input: {
    message: string;
    history: AiConversationTurn[];
    currentFields: Record<string, unknown>;
  }): Promise<AiExtractionResult> {
    if (this.mode === 'demo') return this.demoExtract(input);
    try {
      const base = (
        this.config.get<string>('META_MODEL_BASE_URL') ??
        'https://api.meta.ai/v1'
      ).replace(/\/$/, '');
      const model = this.config.get<string>('META_MODEL_ID') ?? 'muse-spark';
      const key = this.config.get<string>('META_MODEL_API_KEY')!;
      const res = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          response_format: { type: 'json_object' },
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
        }),
        signal: AbortSignal.timeout(
          Number(this.config.get<string>('META_MODEL_TIMEOUT_MS') ?? 20000),
        ),
      });
      if (!res.ok) throw new Error(`Meta Model API ${res.status}`);
      const json: any = await res.json();
      const content = json?.choices?.[0]?.message?.content;
      const parsed =
        typeof content === 'string' ? JSON.parse(content) : content;
      const validated = validateExtraction(parsed);
      if (!validated)
        throw new Error('Model returned invalid structured output');
      return validated;
    } catch (e) {
      this.logger.warn(
        `Live model failed, falling back to demo extractor: ${e instanceof Error ? e.message : e}`,
      );
      return { ...this.demoExtract(input), aiMode: 'demo' };
    }
  }

  // Clearly labelled deterministic demo extractor — NOT Meta Muse Spark output.
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
    const addr = text.match(
      /(?:to|at)\s+([^,.]+(?:street|road|avenue|close|drive|lagos|abuja|ikeja|lekki|yaba)[^,.]*)/i,
    );
    if (addr && !fields.receiverAddress)
      fields.receiverAddress = addr[1].trim();
    const date = text.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
    if (date) fields.pickupDate = date[1];
    const value = text.match(/(?:worth|value[d]? at|₦|NGN\s?)([\d,]+)/i);
    if (value) fields.packageValue = value[1].replace(/,/g, '');
    return {
      intent,
      fields: fields,
      confidence: Object.keys(fields).length ? 0.6 : 0.3,
      aiMode: 'demo',
    };
  }
}
