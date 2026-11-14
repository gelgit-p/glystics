// Shipbubble wraps payloads as { status, message, data }. Normalize to the public
// shapes the landing page consumes — nothing else (no keys, no account data) leaves the API.
const obj = (v: unknown): Record<string, unknown> => (typeof v === 'object' && v !== null ? (v as Record<string, unknown>) : {});
export const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const bool = (v: unknown): boolean => v === true;
const unwrap = (raw: unknown): unknown => {
  const r = obj(raw);
  return 'data' in r ? r.data : raw;
};

export interface Courier {
  name: string;
  serviceCode: string;
  pinImage: string | null;
  originCountry: string;
  international: boolean;
  domestic: boolean;
  express: boolean;
  operational: boolean;
  packageCategories: string[];
}
export interface CourierCoverageArea {
  country: string;
  countryCode: string;
  pickupStates: string[];
  deliveryStates: string[];
  routes: string[];
}

export function normalizeCouriers(raw: unknown): Courier[] {
  const list = unwrap(raw);
  if (!Array.isArray(list)) return [];
  return list.map((item) => {
    const c = obj(item);
    const cats = Array.isArray(c.package_categories) ? c.package_categories : [];
    return {
      name: str(c.name),
      serviceCode: str(c.service_code),
      pinImage: str(c.pin_image) || null,
      originCountry: str(c.origin_country),
      international: bool(c.international),
      domestic: bool(c.domestic),
      express: bool(c.express),
      operational: str(c.status) === 'operational',
      packageCategories: [...new Set(cats.map((x) => str(obj(x).category)).filter(Boolean))],
    };
  }).filter((c) => c.serviceCode);
}

export function normalizeCoverage(raw: unknown): CourierCoverageArea[] {
  const envelope = obj(raw);
  // Upstream answers some requests with HTTP 200 + { status: 'failed', data: undefined }.
  // Treat that as "no coverage" only via thrown errors in the controller; here a failed
  // envelope must not silently become an empty list that FE shows as success.
  if (typeof envelope.status === 'string' && envelope.status !== 'success') return [];
  const list = unwrap(raw);
  if (!Array.isArray(list)) return [];
  return list.map((item) => {
    const a = obj(item);
    const strs = (v: unknown) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
    return { country: str(a.country), countryCode: str(a.country_code), pickupStates: strs(a.pickup_states), deliveryStates: strs(a.delivery_states), routes: strs(a.routes) };
  }).filter((a) => a.country || a.countryCode);
}

export function isFailedEnvelope(raw: unknown): boolean {
  const e = obj(raw);
  return typeof e.status === 'string' && e.status !== 'success';
}
