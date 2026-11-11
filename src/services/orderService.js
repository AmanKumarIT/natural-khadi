// FRONT-END ONLY MOCK – replace with the real order API later.
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/** TODO(backend): POST /orders { items, address, paymentMethod, promoCode, samples, gift } -> order */
export async function placeOrder(payload) {
  await delay(900);
  const d = new Date();
  const id = `KN${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}${Math.floor(1000 + Math.random() * 9000)}`;
  return { id, placedAt: d.toISOString(), ...payload };
}
