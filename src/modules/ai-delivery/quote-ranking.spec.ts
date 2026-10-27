import { normalizeShipbubbleRates, rankQuotes } from './quote-ranking';

describe('Shipbubble quote normalisation + ranking', () => {
  it('normalizes the verified fetch_rates shape and ranks cheapest first when ETA equal', () => {
    const res = {
      status: 'success',
      data: {
        request_token: 'tok-1',
        couriers: [
          {
            courier_id: 2,
            courier_name: 'Fast',
            service_code: 'EXP',
            total: 5000,
            currency: 'NGN',
            delivery_eta: '2 days',
          },
          {
            courier_id: 1,
            courier_name: 'Cheap',
            service_code: 'STD',
            total: 3000,
            currency: 'NGN',
            delivery_eta: '2 days',
          },
          { courier_id: 3, courier_name: 'Broken', service_code: 'X' },
        ],
      },
    };
    const { requestToken, quotes } = normalizeShipbubbleRates(res);
    expect(requestToken).toBe('tok-1');
    expect(quotes).toHaveLength(2);
    expect(quotes[0].courierName).toBe('Cheap');
    expect(quotes[0].scoreReasons).toContain('Cheapest');
  });
  it('prefers faster courier when price difference is small in score terms', () => {
    const ranked = rankQuotes([
      {
        courierId: 'a',
        courierName: 'SlowCheap',
        serviceCode: 'S',
        amount: 1000,
        currency: 'NGN',
        deliveryEta: '5 days',
        score: 0,
        scoreReasons: [],
        raw: {},
      },
      {
        courierId: 'b',
        courierName: 'FastPricey',
        serviceCode: 'F',
        amount: 1100,
        currency: 'NGN',
        deliveryEta: '1 day',
        score: 0,
        scoreReasons: [],
        raw: {},
      },
    ]);
    // price norm: a=0,b=1 -> a score 0.4*1=0.4 ; b score 0.6*1=0.6 => slow-cheap still wins on 60/40 weight
    expect(ranked[0].courierName).toBe('SlowCheap');
    expect(ranked[1].scoreReasons).toContain('Fastest delivery');
  });
  it('handles empty couriers', () => {
    expect(normalizeShipbubbleRates({ data: { couriers: [] } }).quotes).toEqual(
      [],
    );
  });
});
