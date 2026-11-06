jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));
import { extractReceiverAddress } from './extraction';
import { MetaModelClient } from './meta-model.client';

const USER_MESSAGE = 'Please deliver a laptop to ADA Lovelace 08028520094 at 55, Herbert Macaulay Way, Yaba, Lagos, NIgeria, 2kg worth 500000, pickup 2026-10-30';

describe('comma-separated receiver address (user regression)', () => {
  it('extracts full address and stops before package clauses', () => {
    expect(extractReceiverAddress(USER_MESSAGE)).toBe('55, Herbert Macaulay Way, Yaba, Lagos, NIgeria');
  });
  it('demo extractor populates receiverAddress so no clarification is requested for it', async () => {
    const client = new MetaModelClient({ get: () => undefined } as any);
    const r = await client.extract({ message: USER_MESSAGE, history: [], currentFields: {} });
    expect(r.fields.receiverAddress).toBe('55, Herbert Macaulay Way, Yaba, Lagos, NIgeria');
    expect(r.fields).toMatchObject({ receiverName: 'ADA Lovelace', packageName: 'laptop', packageWeight: '2', packageValue: '500000', pickupDate: '2026-10-30' });
  });
  it('still handles previous formats', () => {
    expect(extractReceiverAddress('Please deliver a laptop to Ada Lovelace 08012345678 at 12 Allen Avenue Ikeja Lagos, 2kg, worth 50000, pickup 2026-10-30')).toBe('12 Allen Avenue Ikeja Lagos');
    expect(extractReceiverAddress('Deliver a phone to Chidi Okafor, address: 21 Awolowo Road, Ikoyi, Lagos')).toBe('21 Awolowo Road, Ikoyi, Lagos');
  });
});

describe('end-to-end missing fields for the exact user message', () => {
  it('does not ask for receiverAddress again', async () => {
    const { computeMissingFields } = await import('./extraction');
    const client = new MetaModelClient({ get: () => undefined } as any);
    const r = await client.extract({ message: USER_MESSAGE, history: [], currentFields: { senderAddress: '1 Sender Street, Lagos' } });
    const missing = computeMissingFields({ senderAddress: '1 Sender Street, Lagos', ...r.fields });
    expect(missing).not.toContain('receiverAddress');
    expect(missing).toEqual([]);
  });
});
