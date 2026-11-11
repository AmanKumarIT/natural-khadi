import { PRICING } from '../config/site';
import { PROMO_CODES } from '../config/promos';
import { round2 } from './format';

export const PREPAID_METHODS = ['upi', 'card', 'netbanking'];

/** Items: [{ product, qty }] */
export function promoDiscount(promo, items) {
  if (!promo) return 0;
  if (promo.type === 'percent') {
    const eligible = items.filter(({ product }) => product.categories.some((c) => promo.categories.includes(c)));
    const base = eligible.reduce((s, { product, qty }) => s + product.price * qty, 0);
    return round2((base * promo.value) / 100);
  }
  if (promo.type === 'bogo') {
    const units = [];
    items.forEach(({ product, qty }) => { for (let i = 0; i < qty; i += 1) units.push(product.price); });
    units.sort((a, b) => b - a);
    return round2(units.filter((_, i) => i % 2 === 1).reduce((s, p) => s + p, 0));
  }
  return 0;
}

export function validatePromo(rawCode, items) {
  const code = (rawCode || '').trim().toUpperCase();
  if (!code) return { ok: false, error: 'Please enter a promo code.' };
  const promo = PROMO_CODES[code];
  if (!promo) return { ok: false, error: 'This promo code is invalid or has expired.' };
  if (promoDiscount(promo, items) <= 0) {
    return { ok: false, error: promo.type === 'bogo' ? 'Add at least 2 items to use this code.' : 'This code applies to hair care products only.' };
  }
  return { ok: true, promo };
}

export function computePricing({ items, promo, paymentMethod }) {
  const subtotal = round2(items.reduce((s, { product, qty }) => s + product.price * qty, 0));
  const promoAmt = Math.min(promoDiscount(promo, items), subtotal);
  const afterPromo = round2(subtotal - promoAmt);
  const prepaid = PREPAID_METHODS.includes(paymentMethod) ? round2(afterPromo * PRICING.prepaidDiscountRate) : 0;
  const payable = round2(afterPromo - prepaid);
  const shipping = items.length === 0 || payable >= PRICING.freeShippingThreshold ? 0 : PRICING.shippingFee;
  const total = round2(payable + shipping);
  const gstIncluded = round2((total * PRICING.gstRate) / (1 + PRICING.gstRate));
  return { subtotal, promoAmt, prepaid, shipping, total, gstIncluded };
}
