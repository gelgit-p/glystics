export interface QuoteMessageDraft {
  packageName?: string | null;
  receiverName?: string | null;
  receiverAddress?: string | null;
  senderAddress?: string | null;
  pickupDate?: string | null;
}

export interface QuoteMessageOption {
  id: string;
  courierName: string;
  serviceCode: string;
  amount: number;
  currency: string;
  deliveryEta?: string | null;
  pickupEta?: string | null;
  scoreReasons?: string[];
}

const money = (amount: number, currency: string) =>
  `${currency} ${Number(amount).toLocaleString('en-NG', { maximumFractionDigits: 2 })}`;

/** This is the user-facing WhatsApp quote message. Customers select by replying with the option number only. */
export function buildWhatsAppQuoteMessage(draft: QuoteMessageDraft, quotes: QuoteMessageOption[]): string {
  const lines = [
    '🚚 *Delivery quote options*',
    '',
    `Package: ${draft.packageName ?? 'your package'}`,
    ...(draft.receiverName ? [`Receiver: ${draft.receiverName}`] : []),
    ...(draft.receiverAddress ? [`Delivery address: ${draft.receiverAddress}`] : []),
    ...(draft.pickupDate ? [`Pickup date: ${draft.pickupDate}`] : []),
    '',
    ...quotes.map((q, i) => {
      const eta = q.deliveryEta ? ` · ETA ${q.deliveryEta}` : '';
      const pickup = q.pickupEta ? ` · Pickup ${q.pickupEta}` : '';
      const note = q.scoreReasons?.length ? ` (${q.scoreReasons.join(', ')})` : '';
      return `${i + 1}. *${q.courierName}* — ${money(q.amount, q.currency)}${eta}${pickup}${note}`;
    }),
    '',
    'Reply with the *number* of the option you want (for example: 1).',
    'We will confirm your selected option before creating the delivery/payment link.',
  ];
  return lines.join('\n');
}

/** Accepts only a bare selection number: "1", "option 2", "I choose 3", "#2". */
export function parseQuoteSelection(text: string, quoteCount: number): number | null {
  const normalized = text.trim().toLowerCase();
  const bare = normalized.match(/^#?\s*(\d{1,2})\s*[.)]?$/);
  const labelled = normalized.match(/^(?:option|choice|select|choose|i choose|i select)\s+#?\s*(\d{1,2})\s*[.)]?$/);
  const value = bare?.[1] ?? labelled?.[1];
  if (!value) return null;
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= quoteCount ? n : null;
}
