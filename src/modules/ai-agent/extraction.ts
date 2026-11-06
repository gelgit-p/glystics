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

function looksLikeAddressStart(segment: string): boolean {
  return /^(?:no\.?\s*)?\d+\s+\S+/i.test(segment.trim());
}

function isPackageClause(segment: string): boolean {
  return /^(?:\d+(?:\.\d+)?\s*(?:kg|g|lb|lbs)\b|worth\b|valued?\b|pickup\b|pick-up\b|receiver\s+phone\b|phone\b|tel\b)/i.test(
    segment.trim(),
  );
}

/** Join comma segments after an address start until package/pickup clauses begin. */
function joinCommaAddress(segments: string[], startIndex: number, first: string): string {
  // `first` may already contain commas (labelled capture) — then it is the whole head.
  if (first.includes(',')) return trimAddressTail(first.trim());
  const parts = [first.trim()];
  for (let i = startIndex + 1; i < segments.length; i++) {
    const segment = segments[i].trim();
    if (!segment || isPackageClause(segment)) break;
    // A segment that is itself a new address start ends the current address.
    if (parts.length > 1 && looksLikeAddressStart(segment) && ADDRESS_HINT.test(segment)) break;
    parts.push(segment);
    // Nigeria addresses usually end at the country; stop there to avoid swallowing clauses.
    if (/nigeria/i.test(segment)) break;
  }
  return parts.join(', ');
}

/** Extract a receiver address from free text. Exported for demo extraction and tests. */
export function extractReceiverAddress(text: string): string | undefined {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const segments = normalized.split(/,\s*/);

  // 1) Explicit label: "address: 55, Herbert Macaulay Way, Yaba, Lagos"
  const labelled = normalized.match(
    /(?:receiver\s+address|delivery\s+address|deliver\s+to\s+address|address)\s*[:\-]\s*(.+)$/i,
  );
  if (labelled?.[1] && ADDRESS_HINT.test(labelled[1])) {
    const start = segments.findIndex((s) => labelled[1].startsWith(s) || s.includes(labelled[1].split(',')[0]));
    return trimAddressTail(joinCommaAddress(segments, Math.max(start, 0), labelled[1]));
  }

  // 2) "at 55, Herbert Macaulay Way, Yaba, Lagos, Nigeria, 2kg worth ..."
  //    House number is its own comma segment; the hint words live in later segments.
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i].trim();
    const atMatch = segment.match(/\bat\s+((?:no\.?\s*)?\d+)\s*$/i);
    const bareStart = segment.match(/^((?:no\.?\s*)?\d+)\s*$/i);
    // "at 55" alone, or a segment ending in "at 55"
    if (atMatch) {
      const joined = joinCommaAddress(segments, i, atMatch[1]);
      if (ADDRESS_HINT.test(joined)) return trimAddressTail(joined);
    }
    if (bareStart && i > 0 && /\b(?:to|at)\b/i.test(segments.slice(0, i).join(', '))) {
      const joined = joinCommaAddress(segments, i, bareStart[1]);
      if (ADDRESS_HINT.test(joined)) return trimAddressTail(joined);
    }
    // "at 55 Herbert Macaulay Way" (no comma after house number) or "at 12 Allen Avenue ..."
    const inline = segment.match(/\bat\s+((?:no\.?\s*)?\d+\s+.+)$/i);
    if (inline && ADDRESS_HINT.test(inline[1])) {
      return trimAddressTail(joinCommaAddress(segments, i, inline[1]));
    }
    // Segment itself starts an address: "55 Herbert Macaulay Way"
    if (looksLikeAddressStart(segment) && ADDRESS_HINT.test(segment) && !/^please\b/i.test(segment)) {
      // Avoid treating the leading instruction clause as an address.
      if (!/\b(?:deliver|send|ship)\b/i.test(segment) || /^\d/.test(segment)) {
        return trimAddressTail(joinCommaAddress(segments, i, segment));
      }
    }
  }

  // 3) Fallback: previous single-segment patterns (no-comma addresses).
  const patterns = [
    /\bat\s+((?:no\.?\s*)?\d+\s+[^.;]+)/i,
    /\bto\s+[^.;]+?\s+at\s+((?:no\.?\s*)?\d+\s+[^.;]+)/i,
  ];
  for (const pattern of patterns) {
    const candidate = normalized.match(pattern)?.[1]?.trim();
    if (!candidate || !ADDRESS_HINT.test(candidate)) continue;
    return trimAddressTail(candidate);
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
