import { normalizeCouriers, normalizeCoverage } from './couriers.util';

const sampleCouriers = {
  status: 'success',
  message: 'Retrieved successfully',
  data: [
    { name: 'Kwik', service_code: 'kwik', pin_image: 'https://img/k.jpg', origin_country: 'NG', international: false, domestic: true, express: false, status: 'not-operational', package_categories: [{ id: '1', category: 'accessories' }, { id: '2', category: 'accessories' }, { id: '3', category: 'documents' }] },
    { name: 'Redstar', service_code: 'red_star_courier', origin_country: 'NG', international: true, domestic: false, express: true, status: 'operational', package_categories: [] },
    { name: 'Broken' },
  ],
};

describe('courier normalization (Shipbubble docs sample)', () => {
  it('maps couriers and drops entries without a service code', () => {
    const out = normalizeCouriers(sampleCouriers);
    expect(out).toHaveLength(2);
    expect(out[0]).toEqual({ name: 'Kwik', serviceCode: 'kwik', pinImage: 'https://img/k.jpg', originCountry: 'NG', international: false, domestic: true, express: false, operational: false, packageCategories: ['accessories', 'documents'] });
    expect(out[1]).toMatchObject({ name: 'Redstar', serviceCode: 'red_star_courier', international: true, domestic: false, express: true, operational: true, packageCategories: [] });
  });

  it('maps coverage areas', () => {
    const out = normalizeCoverage({ status: 'success', data: [
      { country: 'Nigeria', country_code: 'NG', pickup_states: ['Abuja', 'Lagos'], delivery_states: ['Abuja', 'Lagos', 'Ogun', 'Oyo'] },
      { country: 'Ghana', country_code: 'GH', pickup_states: [], delivery_states: ['Greater Accra Region'] },
    ] });
    expect(out).toHaveLength(2);
    expect(out[0]).toEqual({ country: 'Nigeria', countryCode: 'NG', pickupStates: ['Abuja', 'Lagos'], deliveryStates: ['Abuja', 'Lagos', 'Ogun', 'Oyo'] });
    expect(out[1].pickupStates).toEqual([]);
  });

  it('tolerates malformed payloads', () => {
    expect(normalizeCouriers(null)).toEqual([]);
    expect(normalizeCouriers({ data: 'nope' })).toEqual([]);
    expect(normalizeCoverage(undefined)).toEqual([]);
  });
});
