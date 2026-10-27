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
  if (fields.receiverAddress) {
    fields.receiverAddress =
      cleanReceiverAddress(
        fields.receiverAddress,
        fields.receiverName,
        fields.receiverPhone,
      ) ?? fields.receiverAddress;
  }
  const confidence =
    typeof r.confidence === 'number' && r.confidence >= 0 && r.confidence <= 1
      ? r.confidence
      : 0.5;
  return { intent, fields, confidence, aiMode: 'live' };
}

const ADDRESS_HINT =
  /(?:street|road|avenue|ave\.?|close|drive|way|lane|crescent|place|island|lagos|abuja|ikeja|lekki|yaba|ikoyi|surulere|nigeria)/i;

/** Extract a receiver address from free text. Exported for demo extraction and tests. */
export function extractReceiverAddress(text: string): string | undefined {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const patterns = [
    /(?:receiver\s+address|delivery\s+address|deliver\s+to\s+address|address)\s*[:\-]\s*([^.;\n]+)/i,
    /\bat\s+((?:no\.?\s*)?\d+\s+[^,.;]+)/i,
    /\bto\s+[^,.;]+?\s+at\s+((?:no\.?\s*)?\d+\s+[^,.;]+)/i,
    /(?:deliver|send|ship)[^,.;]*?,\s*((?:no\.?\s*)?\d+\s+[^,.;]+)/i,
  ];
  for (const pattern of patterns) {
    const candidate = normalized.match(pattern)?.[1]?.trim();
    if (!candidate || !ADDRESS_HINT.test(candidate)) continue;
    return trimAddressTail(candidate);
  }
  const commaSegments = normalized.split(/,\s*/);
  for (const segment of commaSegments) {
    if (/^(?:no\.?\s*)?\d+\s+/i.test(segment) && ADDRESS_HINT.test(segment)) {
      return trimAddressTail(segment);
    }
  }
  return undefined;
}

function trimAddressTail(address: string): string {
  return address
    .replace(
      /\s+(?:receiver\s+phone|phone|tel|pickup|pick-up|worth|valued?|weight|package\s+weight).*$/i,
      '',
    )
    .replace(/\s+\d+(?:\.\d+)?\s*kg.*$/i, '')
    .replace(/\s+worth\b.*$/i, '')
    .replace(/[\s,.;]+$/, '')
    .trim();
}

/** Strip "<receiverName> <phone> at " debris old draft parses left in receiverAddress. */
export function cleanReceiverAddress(
  address: string | null | undefined,
  receiverName?: string | null,
  receiverPhone?: string | null,
  rawMessage?: string | null,
): string | undefined {
  if (!address) return undefined;
  let a = address.trim();
  const extracted = rawMessage ? extractReceiverAddress(rawMessage) : undefined;
  if (
    extracted &&
    (a.toLowerCase() !== extracted.toLowerCase() ||
      /080|\+234/.test(a) ||
      (receiverName && a.toLowerCase().includes(receiverName.toLowerCase())))
  ) {
    return extracted;
  }
  a = a.replace(/^.*?\bat\s+((?:no\.?\s*)?\d+\s+)/i, '$1');
  if (receiverName && a.toLowerCase().startsWith(receiverName.toLowerCase())) {
    a = a.slice(receiverName.length).trim();
  }
  if (receiverPhone) {
    const phone = receiverPhone.replace(/[\s-]/g, '');
    a = a.replaceAll(phone, '').replaceAll(receiverPhone, '').trim();
  }
  a = trimAddressTail(a.replace(/^[\s,.-]+/, ''));
  return a.length >= 5 ? a : undefined;
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

/** Shipbubble expects numeric strings: "0.5kg" -> "0.5", "99.99" -> "99.99", "50,000" -> "50000". */
export function numericString(value: string | undefined, field: string): string {
  const cleaned = String(value ?? '').replace(/[^0-9.]/g, '');
  const n = Number(cleaned);
  if (!cleaned || !Number.isFinite(n) || n <= 0) throw new Error(`${field} must be a positive number, got "${value ?? ''}"`);
  return String(n);
}

export function buildClarificationQuestion(missing: string[]): string {
  const labels = missing.map((m) => FIELD_LABELS[m] ?? m);
  return `Thanks! To prepare your delivery quote, I still need: ${labels.join(', ')}. Please reply with ${labels.length === 1 ? 'that detail' : 'those details'}.`;
}
