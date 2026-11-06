jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
import {
  buildClarificationQuestion,
  computeMissingFields,
  validateExtraction,
} from './extraction';
import { MetaModelClient } from './meta-model.client';

describe('extraction validation (AI output is never trusted raw)', () => {
  it('drops unknown fields and normalises phones', () => {
    const r = validateExtraction({
      intent: 'DELIVERY_REQUEST',
      confidence: 0.9,
      fields: {
        receiverName: 'Ada',
        receiverPhone: '+234 801-234',
        hacker: 'x',
        packageQuantity: '2',
      },
    });
    expect(r?.fields.receiverPhone).toBe('+234801234');
    expect((r?.fields as any).hacker).toBeUndefined();
    expect(r?.fields.packageQuantity).toBe(2);
  });
  it('rejects non-objects and clamps intent', () => {
    expect(validateExtraction(null)).toBeNull();
    expect(
      validateExtraction({ intent: 'DROP_TABLE', fields: {} })?.intent,
    ).toBe('OTHER');
  });
  it('computes missing fields and builds one clarification question', () => {
    const missing = computeMissingFields({ receiverName: 'Ada' });
    expect(missing).toContain('receiverAddress');
    expect(buildClarificationQuestion(missing)).toMatch(/still need/);
  });
});

describe('MetaModelClient demo mode (labelled simulated)', () => {
  it('extracts deterministically without credentials and labels aiMode=demo', async () => {
    const client = new MetaModelClient({ get: () => undefined } as any);
    const r = await client.extract({
      message:
        'Please deliver a laptop to Ada 08012345678, 2kg, worth 50000, pickup 2026-10-30',
      history: [],
      currentFields: {},
    });
    expect(r.aiMode).toBe('demo');
    expect(r.intent).toBe('DELIVERY_REQUEST');
    expect(r.fields.packageWeight).toBe('2');
    expect(r.fields.pickupDate).toBe('2026-10-30');
  });
});
