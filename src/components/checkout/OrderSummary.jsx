import { CONTACT } from '../../config/site';
import { formatINR } from '../../utils/format';

const PLEDGES = [
  { icon: 'eco', title: '100% Ayurvedic Formulations', text: 'Made with pure herbal and botanical extracts, free from harsh chemicals.' },
  { icon: 'cruelty_free', title: 'PETA Animal Test-Free', text: 'Every Khadi Natural product is crafted without testing on animals.' },
  { icon: 'verified', title: 'Certified Khadi Quality', text: 'Authentic Khadi Natural quality, made under traditional standards.' },
];

export default function OrderSummary({
  pricing, promo, promoInput, setPromoInput, promoError, onApplyPromo, onRemovePromo,
  ctaLabel, ctaIcon = 'lock', onCta, ctaBusy, showExpress, onExpress, showPrepaid,
}) {
  const row = 'flex items-center justify-between font-nav-link text-[13px]';
  return (
    <aside className="flex flex-col gap-5 lg:sticky lg:top-6 self-start">
      <div className="bg-surface-container-lowest border border-card-border rounded-lg p-5">
        <h2 className="font-headline-xl text-[19px] tracking-normal normal-case text-near-black">Order Summary</h2>
        <p className="font-nav-link text-[11px] text-heading-gray mt-0.5">Inclusive of all taxes</p>

        {/* promo */}
        <div className="mt-4">
          <p className="font-announcement-text text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-gold-cta mb-1.5">Promo Code</p>
          <div className="flex gap-2">
            <div className={`flex-1 min-w-0 flex items-center gap-2 border rounded-[8px] px-3 h-10 bg-white ${promo ? 'border-forest-badge/60' : promoError ? 'border-error' : 'border-card-border'}`}>
              <span className="material-symbols-outlined text-[17px] text-olive-gold-cta">sell</span>
              <input
                value={promo ? promo.code : promoInput}
                readOnly={!!promo}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && !promo && onApplyPromo()}
                placeholder="Enter code"
                aria-label="Promo code"
                className="flex-1 min-w-0 bg-transparent outline-none font-nav-link text-[13px] tracking-wider text-near-black placeholder:text-[#6B6B6B] placeholder:tracking-normal"
              />
              {promo && <span className="material-symbols-outlined text-[17px] text-forest-badge">check_circle</span>}
            </div>
            <button
              type="button"
              onClick={promo ? onRemovePromo : onApplyPromo}
              className="h-10 px-4 rounded-[8px] border border-card-border font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-near-black hover:border-near-black transition-colors"
            >
              {promo ? 'Remove' : 'Apply'}
            </button>
          </div>
          {promo && <p className="mt-1.5 flex items-center gap-1 font-nav-link text-[11px] text-forest-badge"><span className="material-symbols-outlined text-[14px]">check</span>{promo.description}</p>}
          {!promo && promoError && <p className="mt-1.5 font-nav-link text-[11px] text-error">{promoError}</p>}
        </div>

        {/* totals */}
        <div className="mt-5 pt-4 border-t border-card-border flex flex-col gap-2.5">
          <div className={row}><span className="text-heading-gray">Subtotal</span><span className="text-near-black">{formatINR(pricing.subtotal)}</span></div>
          {promo && pricing.promoAmt > 0 && (
            <div className={row}><span className="text-heading-gray">Promo ({promo.code})</span><span className="text-forest-badge font-medium">-{formatINR(pricing.promoAmt)}</span></div>
          )}
          {showPrepaid && pricing.prepaid > 0 && (
            <div className={row}><span className="text-heading-gray">Prepaid discount (5%)</span><span className="text-forest-badge font-medium">-{formatINR(pricing.prepaid)}</span></div>
          )}
          <div className={row}>
            <span className="text-heading-gray flex items-center gap-1">Shipping<span className="material-symbols-outlined text-[14px]" title="Free shipping on orders above ₹249">info</span></span>
            {pricing.shipping === 0
              ? <span className="font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-olive-gold-cta">Complimentary</span>
              : <span className="text-near-black">{formatINR(pricing.shipping)}</span>}
          </div>
          <div className={row}><span className="text-heading-gray">GST (included)</span><span className="text-heading-gray">{formatINR(pricing.gstIncluded)}</span></div>
        </div>
        <div className="mt-4 pt-4 border-t border-card-border flex items-end justify-between">
          <span className="font-headline-xl text-[19px] tracking-normal normal-case text-near-black">Total</span>
          <div className="text-right">
            <p className="font-headline-xl text-[28px] tracking-normal text-near-black font-semibold leading-none">{formatINR(pricing.total)}</p>
            <p className="font-nav-link text-[10px] text-heading-gray mt-1">INR Currency</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCta}
          disabled={ctaBusy}
          className="mt-5 w-full h-[50px] rounded-[6px] bg-near-black hover:bg-neutral-800 disabled:opacity-70 text-on-primary font-announcement-text text-[12px] font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[17px]">{ctaIcon}</span>
          {ctaBusy ? 'Please wait…' : ctaLabel}
        </button>

        {showExpress && (
          <>
            <div className="flex items-center gap-3 my-4">
              <span className="flex-1 h-px bg-card-border" />
              <span className="font-announcement-text text-[9px] font-semibold uppercase tracking-[0.16em] text-heading-gray">Or fast checkout with</span>
              <span className="flex-1 h-px bg-card-border" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['GPay', 'PhonePe', 'Paytm'].map((n) => (
                <button key={n} type="button" onClick={onExpress} className="h-10 rounded-[6px] border border-card-border font-nav-link text-[13px] font-semibold text-near-black hover:border-near-black transition-colors">{n}</button>
              ))}
            </div>
          </>
        )}

        <p className="mt-4 text-center font-announcement-text text-[9px] font-semibold uppercase tracking-[0.14em] text-heading-gray flex items-center justify-center gap-1 flex-wrap">
          <span className="material-symbols-outlined text-[14px]">support_agent</span>
          Need help?
          <a href={`mailto:${CONTACT.email}`} className="text-crimson-promo underline underline-offset-2">Contact customer care</a>
        </p>
      </div>

      <div className="bg-[#F7F3EC] border border-[#E9E0CF] rounded-lg p-5">
        <p className="font-announcement-text text-[10px] font-bold uppercase tracking-[0.16em] text-olive-gold-cta">The Khadi Natural Pledge</p>
        <ul className="mt-4 flex flex-col gap-4">
          {PLEDGES.map((p) => (
            <li key={p.title} className="flex gap-3">
              <span className="material-symbols-outlined text-[20px] text-olive-gold-cta mt-0.5">{p.icon}</span>
              <div>
                <p className="font-nav-link text-[13px] font-semibold text-near-black">{p.title}</p>
                <p className="font-nav-link text-[11px] text-heading-gray leading-snug mt-0.5">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
