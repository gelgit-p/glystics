import { Injectable, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiExtractionResult } from './extraction';
import { AiConversationTurn, BasetenClient } from './baseten.client';

export type { AiConversationTurn } from './baseten.client';

/**
 * Back-compat alias: historically Meta Muse via placeholder Meta Model API.
 * Live inference now goes through BasetenClient (Baseten, OpenAI-compatible).
 * Set BASETEN_MODEL_ID to your Muse deployment for Meta Muse, or DeepSeek default.
 */
@Injectable()
export class MetaModelClient {
  constructor(
    @Optional() private readonly baseten?: BasetenClient,
    @Optional() private readonly config?: ConfigService,
  ) {}

  private fallback?: BasetenClient;

  private get client(): BasetenClient {
    if (this.baseten?.extract) return this.baseten;
    if (!this.fallback) {
      const cfg = this.config ?? ({ get: () => undefined } as unknown as ConfigService);
      this.fallback = new BasetenClient(cfg);
    }
    return this.fallback;
  }

  get mode(): 'live' | 'demo' {
    return this.client.mode;
  }

  get provider(): string {
    return this.client.provider;
  }

  get modelId(): string {
    return this.client.modelId;
  }

  healthCheck() {
    return this.client.healthCheck();
  }

  async extract(input: {
    message: string;
    history: AiConversationTurn[];
    currentFields: Record<string, unknown>;
  }): Promise<AiExtractionResult> {
    return this.client.extract(input);
  }
}
