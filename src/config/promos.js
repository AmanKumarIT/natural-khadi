// Promo codes (front-end only for now – move validation to the backend later).
// Codes come from the storefront copy: hero banner (HAIR25) and Diwali offer (DWB1G1).
export const PROMO_CODES = {
  HAIR25: {
    code: 'HAIR25',
    type: 'percent',
    value: 25,
    categories: ['hair-care', 'powered-botanics'],
    label: '25% off on Hair Care',
    description: '25% off on hair care products is active.',
  },
  DWB1G1: {
    code: 'DWB1G1',
    type: 'bogo',
    label: 'Buy 1 Get 1 Free',
    description: 'Buy 1 Get 1 Free is active – the lower-priced item in every pair is free.',
  },
};
