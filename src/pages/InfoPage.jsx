import { Link, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CONTACT } from '../config/site';
import { formatINR } from '../utils/format';

const TITLES = {
  'store-locator': 'Store Locator',
  'track-order': 'Track Your Order',
  'shipping-policy': 'Shipping & Delivery Policy',
  'return-policy': 'Returns & Refund Policy',
  faq: 'Ayurvedic Consultations & FAQ',
  terms: 'Terms of Service & Privacy',
};

export default function InfoPage() {
  const { slug } = useParams();
  const { orders, user, openLogin } = useStore();
  const title = TITLES[slug] || 'Information';

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 md:px-margin pt-[50px] pb-[90px]">
      <h1 className="text-center font-headline-xl text-2xl md:text-headline-xl uppercase tracking-[0.15em] text-heading-gray">{title}</h1>

      {slug === 'track-order' ? (
        <div className="mt-10">
          {!user ? (
            <div className="text-center">
              <p className="font-nav-link text-[15px] text-heading-gray">Login to see your orders.</p>
              <button type="button" onClick={() => openLogin('Login to view your orders')} className="mt-5 h-[48px] px-8 rounded-[8px] bg-near-black text-on-primary text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800">Login</button>
            </div>
          ) : orders.length === 0 ? (
            <p className="text-center font-nav-link text-[15px] text-heading-gray">You have not placed any orders yet.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="border border-card-border rounded-lg p-5 bg-surface-container-lowest font-nav-link">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-near-black">Order {o.id}</span>
                    <span className="text-sm font-bold text-near-black">{formatINR(o.pricing.total)}</span>
                  </div>
                  <p className="text-xs text-heading-gray mt-1">{new Date(o.placedAt).toLocaleString('en-IN')} · {o.items.reduce((s, i) => s + i.qty, 0)} item(s) · {o.payment.label}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="mt-10 text-center font-nav-link text-[15px] leading-relaxed text-heading-gray">
          <p>The full content for this page will be published soon.</p>
          <p className="mt-2">For any help, reach us at {CONTACT.phone} or {CONTACT.email} ({CONTACT.hours}).</p>
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/" className="underline underline-offset-4 font-nav-link text-sm text-near-black hover:text-primary">Back to home</Link>
      </div>
    </div>
  );
}
