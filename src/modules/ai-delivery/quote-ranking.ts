export interface NormalizedQuote {
  courierId: string;
  courierName: string;
  serviceCode: string;
  amount: number;
  currency: string;
  deliveryEta?: string;
  pickupEta?: string;
  score: number;
  scoreReasons: string[];
  raw: Record<string, unknown>;
}

function etaDays(eta?: string): number {
  if (!eta) return 7;
  const m = eta.match(/(\d+)\s*(hour|hr|day)/i);
  if (m)
    return m[2].toLowerCase().startsWith('h')
      ? Math.max(1, Math.ceil(Number(m[1]) / 24))
      : Number(m[1]);
  const n = Number(eta);
  return Number.isFinite(n) && n > 0 ? n : 7;
}

/** Normalizes Shipbubble fetch_rates response ({status,data:{request_token,couriers:[...]}}). */
export function normalizeShipbubbleRates(response: unknown): {
  requestToken: string;
  quotes: NormalizedQuote[];
} {
  const root = (response ?? {}) as Record<string, any>;
  const data = (root.data ?? root) as Record<string, any>;
  const requestToken =
    typeof data.request_token === 'string' ? data.request_token : '';
  const couriers = Array.isArray(data.couriers) ? data.couriers : [];
  const quotes: NormalizedQuote[] = couriers
    .filter(
      (c: any) =>
        c &&
        (c.total !== undefined || c.rate_card_amount !== undefined) &&
        c.service_code,
    )
    .map((c: any) => ({
      courierId: String(c.courier_id ?? ''),
      courierName: String(c.courier_name ?? c.courier_id ?? 'Courier'),
      serviceCode: String(c.service_code),
      amount: Number(c.total ?? c.rate_card_amount),
      currency: String(c.currency ?? c.rate_card_currency ?? 'NGN'),
      deliveryEta:
        typeof c.delivery_eta === 'string' ? c.delivery_eta : undefined,
      pickupEta: typeof c.pickup_eta === 'string' ? c.pickup_eta : undefined,
      score: 0,
      scoreReasons: [],
      raw: c as Record<string, unknown>,
    }))
    .filter(
      (q: NormalizedQuote) =>
        Number.isFinite(q.amount) && q.amount > 0 && q.courierId,
    );
  return { requestToken, quotes: rankQuotes(quotes) };
}

/** Lower score is better: 60% price, 40% delivery time (both min-max normalised). */
export function rankQuotes(quotes: NormalizedQuote[]): NormalizedQuote[] {
  if (!quotes.length) return quotes;
  const prices = quotes.map((q) => q.amount);
  const times = quotes.map((q) => etaDays(q.deliveryEta));
  const [minP, maxP, minT, maxT] = [
    Math.min(...prices),
    Math.max(...prices),
    Math.min(...times),
    Math.max(...times),
  ];
  const norm = (v: number, min: number, max: number) =>
    max === min ? 0 : (v - min) / (max - min);
  const cheapest = quotes.reduce((a, b) => (a.amount <= b.amount ? a : b));
  const fastest = quotes.reduce((a, b) =>
    etaDays(a.deliveryEta) <= etaDays(b.deliveryEta) ? a : b,
  );
  for (const q of quotes) {
    q.score =
      Math.round(
        (0.6 * norm(q.amount, minP, maxP) +
          0.4 * norm(etaDays(q.deliveryEta), minT, maxT)) *
          1000,
      ) / 1000;
    q.scoreReasons = [];
    if (q === cheapest) q.scoreReasons.push('Cheapest');
    if (q === fastest) q.scoreReasons.push('Fastest delivery');
    if (q.scoreReasons.length === 0)
      q.scoreReasons.push('Balanced price and speed');
  }
  return [...quotes].sort((a, b) => a.score - b.score);
}
