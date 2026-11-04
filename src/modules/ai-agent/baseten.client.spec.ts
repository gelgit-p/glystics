import { ConfigService } from '@nestjs/config';
import { BasetenClient } from './baseten.client';

const cfg = (vals: Record<string, string | undefined>) =>
  ({ get: (k: string) => vals[k] } as unknown as ConfigService);

describe('BasetenClient', () => {
  it('demo mode without API key, deterministic extraction', async () => {
    const c = new BasetenClient(cfg({}));
    expect(c.mode).toBe('demo');
    expect(c.provider).toBe('baseten');
    const r = await c.extract({ message: 'Please deliver a laptop to Ada 08012345678, 2kg', history: [], currentFields: {} });
    expect(r.aiMode).toBe('demo');
    expect(r.intent).toBe('DELIVERY_REQUEST');
  });

  it('live mode with key and AI_DEMO_MODE=false', () => {
    expect(new BasetenClient(cfg({ BASETEN_API_KEY: 'k', AI_DEMO_MODE: 'false' })).mode).toBe('live');
    expect(new BasetenClient(cfg({ BASETEN_API_KEY: 'k' })).mode).toBe('live');
    expect(new BasetenClient(cfg({ BASETEN_API_KEY: 'k', AI_DEMO_MODE: 'true' })).mode).toBe('demo');
    expect(new BasetenClient(cfg({ BASETEN_API_KEY: 'k', BASETEN_ENABLED: 'false' })).mode).toBe('demo');
  });

  it('health check in demo does not call network', async () => {
    const h = await new BasetenClient(cfg({})).healthCheck();
    expect(h).toMatchObject({ ok: false, mode: 'demo', provider: 'baseten' });
  });
});
