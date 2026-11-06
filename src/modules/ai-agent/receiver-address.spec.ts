jest.mock('@nestjs/config', () => ({ ConfigService: class {} }));

import {
  cleanReceiverAddress,
  extractReceiverAddress,
} from './extraction';
import { MetaModelClient } from './meta-model.client';

const cases: Array<[string, string]> = [
  [
    'Please deliver a laptop to Ada Lovelace 08012345678 at 12 Allen Avenue Ikeja Lagos, 2kg, worth 50000, pickup 2026-10-30',
    '12 Allen Avenue Ikeja Lagos',
  ],
  [
    'Deliver a laptop to Ada Lovelace at No 5 Adeola Odeku Street Victoria Island Lagos',
    'No 5 Adeola Odeku Street Victoria Island Lagos',
  ],
  [
    'Send shoes to John Smith 08012345678, 44 Marina Road Lagos Island',
    '44 Marina Road Lagos Island',
  ],
  [
    'Deliver documents to Mary at 8 Herbert Macaulay Way Yaba Lagos, receiver phone 08012345678',
    '8 Herbert Macaulay Way Yaba Lagos',
  ],
  [
    'Deliver a phone to Chidi Okafor, address: 21 Awolowo Road Ikoyi Lagos',
    '21 Awolowo Road Ikoyi Lagos',
  ],
];

describe('receiverAddress extraction from Customer WhatsApp message', () => {
  it.each(cases)('extracts %s', (message, expected) => {
    expect(extractReceiverAddress(message)).toBe(expected);
  });

  it('demo extractor returns only the address, excluding name and phone debris', async () => {
    const client = new MetaModelClient({ get: () => undefined } as any);
    const result = await client.extract({
      message: cases[0][0],
      history: [],
      currentFields: {},
    });
    expect(result.fields.receiverAddress).toBe('12 Allen Avenue Ikeja Lagos');
    expect(result.fields.receiverAddress).not.toContain('Ada Lovelace');
    expect(result.fields.receiverAddress).not.toContain('08012345678');
  });

  it('repairs a previous wrong stored receiverAddress using raw message context', () => {
    expect(
      cleanReceiverAddress(
        'Ada Lovelace 08012345678 at 99 Wrong Street',
        'Ada Lovelace',
        '08012345678',
        cases[0][0],
      ),
    ).toBe('12 Allen Avenue Ikeja Lagos');
  });
});
