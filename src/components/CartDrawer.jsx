import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import useBodyScrollLock from '../hooks/useBodyScrollLock';
import { formatINR } from '../utils/format';

function EmptyCartIllustration() {
  return (
    <svg width="230" height="190" viewBox="0 0 230 190" fill="none" aria-hidden="true">
      <ellipse cx="118" cy="176" rx="64" ry="5" fill="#EFEFF4" />
      <path d="M22 60c0-14 10-24 24-24h30c8-12 24-16 38-8 10 6 14 4 24 0 22-8 50 6 56 30 6 22-6 44-30 52-8 14-30 20-46 12-10 6-24 6-34-2-24 4-46-8-52-26-8-6-10-18-10-34z" fill="#F0F0F4" />
      <path d="M52 52h24l14 64h82" stroke="#D9D9E0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 70h96l-10 38H92z" stroke="#4B4FE0" strokeWidth="2.6" strokeLinejoin="round" fill="#fff" />
      <circle cx="116" cy="88" r="1.8" fill="#4B4FE0" />
      <circle cx="140" cy="88" r="1.8" fill="#4B4FE0" />
      <path d="M118 100c4-5 18-5 22 0" stroke="#4B4FE0" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="104" cy="132" r="8" stroke="#4B4FE0" strokeWidth="2.6" fill="#fff" />
      <circle cx="160" cy="132" r="8" stroke="#4B4FE0" strokeWidth="2.6" fill="#fff" />
      <path d="M72 38v8M68 42h8" stroke="#4B4FE0" strokeWidth="2" strokeLinecap="round" />
      <path d="M192 112v8M188 116h8" stroke="#4B4FE0" strokeWidth="2" strokeLinecap="round" />
      <path d="M176 38h8" stroke="#4B4FE0" strokeWidth="2" strokeLinecap="round" />
      <circle cx="198" cy="64" r="2.6" stroke="#4B4FE0" strokeWidth="1.6" />
      <circle cx="146" cy="150" r="1.8" stroke="#4B4FE0" strokeWidth="1.4" />
      <circle cx="94" cy="46" r="1.8" stroke="#4B4FE0" strokeWidth="1.4" />
    </svg>
  );
}

function QtyStepper({ qty, onChange }) {
  return (
    <div className="inline-flex items-center border border-card-border rounded-[8px] h-9">
      <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => onChange(qty - 1)} className="w-9 h-full flex items-center justify-center text-near-black hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed rounded-l-[8px]">
        <span className="material-symbols-outlined text-lg">remove</span>
      </button>
      <span className="w-9 text-center font-nav-link text-sm font-medium text-near-black">{qty}</span>
      <button type="button" aria-label="Increase quantity" disabled={qty >= 10} onClick={() => onChange(qty + 1)} className="w-9 h-full flex items-center justify-center text-near-black hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed rounded-r-[8px]">
        <span className="material-symbols-outlined text-lg">add</span>
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const { cartOpen, closeCart, cartItems, cartCount, cartSubtotal, setQty, removeFromCart, requireLogin } = useStore();
  const navigate = useNavigate();
  useBodyScrollLock(cartOpen);

  useEffect(() => {
    if (!cartOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  const proceed = () =>
    requireLogin(() => { closeCart(); navigate('/checkout'); }, 'Login to proceed to checkout');

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-scrim-dark kn-fade-in" onClick={closeCart} />
      <aside className="absolute top-0 right-0 h-full w-[598px] max-w-full bg-surface-container-lowest flex flex-col shadow-2xl animate-[kn-slide-in_0.28s_ease-out]">
        {/* header */}
        <div className="h-[46px] flex-shrink-0 bg-olive-gold-cta flex items-center px-4">
          <button type="button" onClick={closeCart} className="flex items-center gap-1 font-nav-link text-[17px] font-semibold text-near-black" aria-label="Close cart">
            <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            Your Shipping Cart ({cartCount})
          </button>
        </div>
        <div className="h-8 flex-shrink-0 bg-crimson-promo text-on-primary font-nav-link text-[16px] font-semibold flex items-center justify-center">
          Redeem Cashback on Every Order
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-12 text-center">
            <EmptyCartIllustration />
            <h3 className="font-nav-link text-[26px] font-semibold text-near-black mt-4">Oops! Your cart is empty!</h3>
            <p className="font-nav-link text-[18px] text-heading-gray/80 mt-3 leading-snug max-w-[340px]">There is nothing in your cart lets add some items.</p>
            <button
              type="button"
              onClick={() => { closeCart(); navigate('/'); }}
              className="mt-8 w-full max-w-[375px] h-[66px] rounded-[15px] bg-cta-indigo hover:brightness-110 text-on-primary font-nav-link text-[18px] font-medium transition"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-card-border px-5">
              {cartItems.map(({ product, qty }) => (
                <li key={product.id} className="py-5 flex gap-4">
                  <Link to={`/product/${product.id}`} onClick={closeCart} className="w-[92px] h-[92px] flex-shrink-0 border border-card-border rounded-[8px] overflow-hidden bg-white">
                    <img src={product.image} alt={product.imageAlt} className="w-full h-full object-contain p-1" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <Link to={`/product/${product.id}`} onClick={closeCart} className="font-nav-link text-[15px] font-medium text-near-black leading-snug line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </Link>
                    <span className="font-nav-link text-sm font-bold text-price-red mt-1">{formatINR(product.price)}</span>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper qty={qty} onChange={(q) => setQty(product.id, q)} />
                      <div className="flex items-center gap-3">
                        <span className="font-nav-link text-[15px] font-semibold text-near-black">{formatINR(product.price * qty)}</span>
                        <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(product.id)} className="text-heading-gray hover:text-crimson-promo transition-colors">
                          <span className="material-symbols-outlined text-[22px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex-shrink-0 border-t border-card-border px-5 py-5 bg-surface-container-lowest">
              <div className="flex items-center justify-between font-nav-link">
                <span className="text-[17px] font-semibold text-near-black">Subtotal</span>
                <span className="text-[19px] font-bold text-near-black">{formatINR(cartSubtotal)}</span>
              </div>
              <p className="font-nav-link text-xs text-heading-gray mt-1">Inclusive of all taxes. Shipping &amp; promo codes applied at checkout.</p>
              <button type="button" onClick={proceed} className="mt-4 w-full h-[58px] rounded-[15px] bg-cta-indigo hover:brightness-110 text-on-primary font-nav-link text-[17px] font-semibold transition">
                Proceed to Checkout
              </button>
              <button type="button" onClick={closeCart} className="mt-3 w-full text-center font-nav-link text-sm text-heading-gray underline underline-offset-4 hover:text-near-black">
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
