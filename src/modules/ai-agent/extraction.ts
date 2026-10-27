export type AiIntent =
  'DELIVERY_REQUEST' | 'DELIVERY_UPDATE' | 'TRACKING_QUERY' | 'OTHER';

export interface ExtractedDeliveryFields {
  senderName?: string;
  senderPhone?: string;
  senderAddress?: string;
  senderEmail?: string;
  receiverName?: string;
  receiverPhone?: string;
  receiverAddress?: string;
  receiverEmail?: string;
  packageName?: string;
  packageDescription?: string;
  packageCategory?: string;
  packageWeight?: string;
  packageValue?: string;
  packageQuantity?: number;
  length?: number;
  width?: number;
  height?: number;
  pickupDate?: string;
  deliveryType?: string;
  deliveryInstructions?: string;
}

export interface AiExtractionResult {
  intent: AiIntent;
  fields: ExtractedDeliveryFields;
  confidence: number;
  aiMode: 'live' | 'demo';
}

export const DRAFT_FIELDS: (keyof ExtractedDeliveryFields)[] = [
  'senderName',
  'senderPhone',
  'senderAddress',
  'senderEmail',
  'receiverName',
  'receiverPhone',
  'receiverAddress',
  'receiverEmail',
  'packageName',
  'packageDescription',
  'packageCategory',
  'packageWeight',
  'packageValue',
  'packageQuantity',
  'length',
  'width',
  'height',
  'pickupDate',
  'deliveryType',
  'deliveryInstructions',
];

// Fields required before quotes. Mirrors DeliveryService.create() minus sender identity
// (sender defaults to the business owner) and category/dimensions (defaults applied at quote time).
export const REQUIRED_FOR_QUOTE: (keyof ExtractedDeliveryFields)[] = [
  'senderAddress',
  'receiverName',
  'receiverPhone',
  'receiverAddress',
  'packageName',
  'packageWeight',
  'packageValue',
  'pickupDate',
];

export const FIELD_LABELS: Record<string, string> = {
  senderName: "sender's name",
  senderPhone: "sender's phone",
  senderAddress: 'pickup/sender address',
  receiverName: "receiver's name",
  receiverPhone: "receiver's phone number",
  receiverAddress: "receiver's delivery address",
  packageName: 'what is being sent (package name)',
  packageWeight: 'package weight in kg',
  packageValue: 'package value',
  pickupDate: 'pickup date (e.g. 2026-10-30)',
};

export function validateExtraction(raw: unknown): AiExtractionResult | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  const intents: AiIntent[] = [
    'DELIVERY_REQUEST',
    'DELIVERY_UPDATE',
    'TRACKING_QUERY',
    'OTHER',
  ];
  const intent = intents.includes(r.intent as AiIntent)
    ? (r.intent as AiIntent)
    : 'OTHER';
  const src = (
    r.fields && typeof r.fields === 'object' && !Array.isArray(r.fields)
      ? r.fields
      : {}
  ) as Record<string, unknown>;
  const fields: ExtractedDeliveryFields = {};
  for (const key of DRAFT_FIELDS) {
    const v = src[key];
    if (['packageQuantity', 'length', 'width', 'height'].includes(key)) {
      const n =
        typeof v === 'number' ? v : typeof v === 'string' ? Number(v) : NaN;
      if (Number.isFinite(n) && n > 0)
        (fields as Record<string, unknown>)[key] = n;
    } else if (typeof v === 'string' && v.trim()) {
      (fields as Record<string, unknown>)[key] = v.trim().slice(0, 500);
    }
  }
  // Deterministic server-side normalisation — AI output is never trusted raw.
  if (fields.receiverPhone)
    fields.receiverPhone = fields.receiverPhone.replace(/[\s-]/g, '');
  if (fields.senderPhone)
    fields.senderPhone = fields.senderPhone.replace(/[\s-]/g, '');
  const confidence =
    typeof r.confidence === 'number' && r.confidence >= 0 && r.confidence <= 1
      ? r.confidence
      : 0.5;
  return { intent, fields, confidence, aiMode: 'live' };
}

export function computeMissingFields(
  fields: ExtractedDeliveryFields,
): string[] {
  return REQUIRED_FOR_QUOTE.filter((f) => {
    const v = fields[f];
    return (
      v === undefined || v === null || (typeof v === 'string' && !v.trim())
    );
  });
}

export function buildClarificationQuestion(missing: string[]): string {
  const labels = missing.map((m) => FIELD_LABELS[m] ?? m);
  return `Thanks! To prepare your delivery quote, I still need: ${labels.join(', ')}. Please reply with ${labels.length === 1 ? 'that detail' : 'those details'}.`;
}
