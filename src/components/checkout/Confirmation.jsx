import { Link } from 'react-router-dom';
import { formatINR } from '../../utils/format';

export default function Confirmation({ order }) {
  const a = order.address;
  return (
    <div className="max-w-[760px] mx-auto">
      <div className="bg-surface-container-lowest border border-card-border rounded-lg p-8 text-center">
        <span className="mx-auto w-14 h-14 rounded-[9999px] bg-forest-badge text-on-primary flex items-center justify-center"><span className="material-symbols-outlined text-3xl">check</span></span>
        <h2 className="font-headline-xl text-[26px] tracking-normal normal-case text-near-black mt-4">Thank you, {a.name.split(' ')[0]}!</h2>
        <p className="font-nav-link text-sm text-heading-gray mt-2">Your order <span className="font-semibold text-near-black">{order.id}</span> has been placed successfully.</p>
        <p className="font-nav-link text-xs text-heading-gray mt-1">A confirmation will be sent to {a.email}.</p>

        <div className="mt-8 text-left grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-olive-gold-cta mb-2">Items</p>
            <ul className="divide-y divide-card-border">
              {order.items.map((i) => (
                <li key={i.id} className="py-2.5 flex items-center gap-3">
                  <img src={i.image} alt="" className="w-12 h-12 object-contain border border-card-border rounded bg-white" />
                  <span className="flex-1 font-nav-link text-[13px] text-near-black leading-snug">{i.name} <span className="text-heading-gray">× {i.qty}</span></span>
                  <span className="font-nav-link text-[13px] font-semibold">{formatINR(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            {order.samples.length > 0 && <p className="mt-3 font-nav-link text-xs text-heading-gray"><span className="font-semibold text-near-black">Complimentary minis:</span> {order.samples.join(', ')}</p>}
            {order.gift.on && order.gift.message && <p className="mt-1 font-nav-link text-xs text-heading-gray"><span className="font-semibold text-near-black">Gift message:</span> {order.gift.message}</p>}
          </div>
          <div className="font-nav-link text-[13px] text-heading-gray leading-relaxed">
            <p className="font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-olive-gold-cta mb-2">Delivering to</p>
            <p className="text-near-black font-semibold">{a.name}</p>
            <p>{a.line1}{a.landmark ? `, ${a.landmark}` : ''}</p>
            <p>{a.city}, {a.state} – {a.pincode}</p>
            <p>+91 {a.phone}</p>
            <p className="font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-olive-gold-cta mt-4 mb-1">Payment</p>
            <p className="text-near-black">{order.payment.label}</p>
            <div className="mt-4 pt-3 border-t border-card-border flex items-center justify-between">
              <span className="font-semibold text-near-black">Total paid</span>
              <span className="text-lg font-bold text-near-black">{formatINR(order.pricing.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="h-[48px] px-8 rounded-[6px] bg-near-black text-on-primary font-announcement-text text-[12px] font-bold uppercase tracking-[0.16em] flex items-center hover:bg-neutral-800 transition-colors">Continue shopping</Link>
          <Link to="/info/track-order" className="h-[48px] px-8 rounded-[6px] border border-near-black text-near-black font-announcement-text text-[12px] font-bold uppercase tracking-[0.16em] flex items-center hover:bg-near-black hover:text-on-primary transition-colors">Track order</Link>
        </div>
      </div>
    </div>
  );
}
