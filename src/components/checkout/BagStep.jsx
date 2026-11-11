import { useState } from 'react';
import { Link } from 'react-router-dom';
import { samples } from '../../data/samples';
import { navMenu } from '../../data/navMenu';
import { PRICING } from '../../config/site';
import { formatINR } from '../../utils/format';

const labelFor = (product) => navMenu.find((m) => m.slug === product.categories[0])?.label || 'KHADI NATURAL';

function BagItemCard({ item, onQty, onRemove }) {
  const { product, qty } = item;
  return (
    <div className="bg-surface-container-lowest border border-card-border rounded-lg p-4 flex gap-4">
      <Link to={`/product/${product.id}`} className="w-[84px] h-[100px] md:w-[96px] md:h-[112px] flex-shrink-0 rounded-[4px] bg-surface-container-low border border-card-border overflow-hidden">
        <img src={product.image} alt={product.imageAlt} className="w-full h-full object-contain p-1" />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-announcement-text text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-gold-cta">{labelFor(product)}</p>
            <Link to={`/product/${product.id}`} className="block font-nav-link text-[15px] font-semibold text-near-black leading-snug mt-0.5 hover:text-primary transition-colors">{product.name}</Link>
            <p className="font-nav-link text-xs text-heading-gray mt-1">
              {product.size ? `Size: ${product.size}` : 'Standard pack'} • {formatINR(product.price)} each
            </p>
          </div>
          <span className="font-nav-link text-[15px] font-bold text-near-black whitespace-nowrap">{formatINR(product.price * qty)}</span>
        </div>
        {product.tagline && (
          <span className="mt-2 self-start inline-flex items-center gap-1 rounded-[9999px] border border-[#E6DCC8] bg-[#F7F1E6] px-2.5 py-1 font-nav-link text-[11px] text-heading-gray">
            <span className="material-symbols-outlined text-[13px] text-forest-badge">eco</span>
            <span className="line-clamp-1">{product.tagline}</span>
          </span>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="inline-flex items-center border border-card-border rounded-[6px] h-8">
            <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => onQty(product.id, qty - 1)} className="w-8 h-full flex items-center justify-center hover:bg-surface-container disabled:opacity-40"><span className="material-symbols-outlined text-base">remove</span></button>
            <span className="w-8 text-center font-nav-link text-sm">{qty}</span>
            <button type="button" aria-label="Increase quantity" disabled={qty >= 10} onClick={() => onQty(product.id, qty + 1)} className="w-8 h-full flex items-center justify-center hover:bg-surface-container disabled:opacity-40"><span className="material-symbols-outlined text-base">add</span></button>
          </div>
          <button type="button" onClick={() => onRemove(product.id)} className="flex items-center gap-1 font-announcement-text text-[10px] font-semibold uppercase tracking-[0.14em] text-heading-gray hover:text-crimson-promo transition-colors">
            <span className="material-symbols-outlined text-[15px]">delete</span> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function SamplePicker({ selected, onToggle }) {
  const max = PRICING.samplesToChoose;
  return (
    <section className="bg-[#F7F3EC] border border-[#E9E0CF] rounded-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 font-announcement-text text-[10px] font-semibold uppercase tracking-[0.16em] text-olive-gold-cta">
            <span className="material-symbols-outlined text-[14px]">redeem</span> Khadi Natural Gifting
          </p>
          <h3 className="font-headline-xl text-[19px] md:text-[21px] text-near-black mt-1 tracking-normal normal-case leading-snug">Choose {max} Complimentary Mini Samples</h3>
        </div>
        <span className="font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-crimson-promo border border-crimson-promo/40 bg-white rounded-[9999px] px-2.5 py-1 whitespace-nowrap">
          {selected.length} OF {max} SELECTED
        </span>
      </div>
      <p className="font-nav-link text-xs text-heading-gray mt-2 leading-relaxed">
        Each mini carries the goodness of Ayurvedic botanicals, handpicked to complement your ritual. Pick any {max} to try with your order.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {samples.map((s) => {
          const on = selected.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onToggle(s.id)}
              aria-pressed={on}
              className={`relative text-left rounded-lg p-3.5 pt-8 transition-all bg-surface-container-lowest border ${on ? 'border-crimson-promo shadow-[0_0_0_1px_#C32A4B]' : 'border-card-border hover:border-olive-gold-cta'}`}
            >
              {on && (
                <span className="absolute top-2.5 left-2.5 w-[18px] h-[18px] rounded-[9999px] bg-crimson-promo text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[13px]">check</span>
                </span>
              )}
              <span className={`absolute top-2.5 right-2.5 font-announcement-text text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[3px] ${on ? 'bg-crimson-promo/10 text-crimson-promo' : 'bg-surface-container text-heading-gray'}`}>
                {on ? 'SELECTED' : 'AVAILABLE'}
              </span>
              <p className="font-nav-link text-[13px] font-semibold text-near-black leading-snug">{s.name}</p>
              <p className="font-nav-link text-[11px] text-heading-gray mt-0.5">{s.size}</p>
              <p className="font-nav-link text-[11px] text-heading-gray mt-2 leading-snug min-h-[48px]">{s.desc}</p>
              <p className="mt-2 flex items-center gap-1 font-announcement-text text-[9px] font-bold uppercase tracking-[0.1em] text-olive-gold-cta">
                <span className="material-symbols-outlined text-[13px]">{s.icon}</span> {s.tag}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function GiftWrapBox({ gift, setGift }) {
  const [open, setOpen] = useState(gift.on);
  return (
    <section className="bg-surface-container-lowest border border-card-border rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="w-8 h-8 rounded-[9999px] bg-[#F7F1E6] text-olive-gold-cta flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-[18px]">featured_seasonal_and_gifts</span></span>
        <div className="flex-1">
          <h4 className="font-nav-link text-[14px] font-semibold text-near-black">Complimentary Eco Gift Wrapping &amp; Message</h4>
          <p className="font-nav-link text-xs text-heading-gray mt-1 leading-relaxed">Every order arrives neatly wrapped in recyclable packaging, and can carry a handwritten-style note for someone special.</p>
          <button
            type="button"
            onClick={() => { const next = !open; setOpen(next); setGift({ on: next, message: next ? gift.message : '' }); }}
            className="mt-2 font-announcement-text text-[10px] font-bold uppercase tracking-[0.14em] text-olive-gold-cta hover:text-near-black transition-colors"
          >
            {open ? '− Remove gift message' : '+ Add gift message'}
          </button>
          {open && (
            <div className="mt-3">
              <textarea
                value={gift.message}
                maxLength={150}
                rows={3}
                onChange={(e) => setGift({ on: true, message: e.target.value })}
                placeholder="Write your message (max 150 characters)"
                className="w-full border border-card-border rounded-[8px] p-3 font-nav-link text-sm outline-none focus:ring-2 focus:ring-olive-gold-cta resize-none"
              />
              <p className="text-right font-nav-link text-[11px] text-heading-gray">{gift.message.length}/150</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function BagStep({ items, onQty, onRemove, samplesSelected, onToggleSample, gift, setGift }) {
  const count = items.reduce((s, i) => s + i.qty, 0);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <h2 className="font-headline-xl text-[18px] tracking-normal normal-case text-near-black">Items ({count})</h2>
        <span className="font-announcement-text text-[10px] font-semibold uppercase tracking-[0.14em] text-olive-gold-cta">100% Ayurvedic • Chemical Free</span>
      </div>
      {items.map((item) => <BagItemCard key={item.product.id} item={item} onQty={onQty} onRemove={onRemove} />)}
      <SamplePicker selected={samplesSelected} onToggle={onToggleSample} />
      <GiftWrapBox gift={gift} setGift={setGift} />
    </div>
  );
}
