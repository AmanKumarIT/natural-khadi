import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatRS } from '../utils/format';

const starStyle = { fontVariationSettings: '"FILL" 1' };

export function Stars({ emptyStars = 0 }) {
  return (
    <div className="flex text-star-gold">
      {[0, 1, 2, 3, 4].map((i) =>
        i >= 5 - emptyStars ? (
          <span key={i} className="material-symbols-outlined text-sm text-outline-variant">star</span>
        ) : (
          <span key={i} className="material-symbols-outlined text-sm" style={starStyle}>star</span>
        )
      )}
    </div>
  );
}

/** Add-to-cart button with the original "Added!" micro-interaction. */
export function useAddedFeedback() {
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const flash = () => {
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };
  return [added, flash];
}

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const [added, flash] = useAddedFeedback();
  const to = `/product/${product.id}`;

  const handleAdd = () => {
    addToCart(product.id, 1);
    flash();
  };

  return (
    <div className="group flex flex-col rounded-t-lg bg-surface-container-lowest border border-card-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
      <Link
        to={to}
        aria-label={`View ${product.name}`}
        className="relative w-full aspect-square bg-surface-container-lowest flex items-center justify-center overflow-hidden p-4 cursor-pointer"
      >
        {product.badge && (
          <span className="absolute top-0 left-0 bg-forest-badge text-on-primary font-badge-label text-[11px] font-bold px-3 py-1 uppercase tracking-wider z-10">
            {product.badge}
          </span>
        )}
        <img
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          alt={product.imageAlt}
          src={product.image}
        />
      </Link>
      <div className="p-4 flex flex-col text-center flex-grow">
        <h3 className="font-card-title text-card-title font-medium text-near-black line-clamp-2 h-[48px] leading-snug">
          <Link to={to} className="hover:text-primary transition-colors">{product.name}</Link>
        </h3>
        <p className="font-card-tagline text-card-tagline text-forest-badge line-clamp-2 h-[40px] mt-1">{product.tagline}</p>
        <div className="font-card-price text-card-price text-price-red font-bold mt-2">{formatRS(product.price)}</div>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs">
          <Stars emptyStars={product.emptyStars} />
          <span className="font-bold text-near-black">{product.ratingLabel}</span>
          <span className="text-heading-gray">({product.reviews})</span>
          <span className="material-symbols-outlined text-verified-blue text-sm" style={starStyle}>verified</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className={`w-full h-[50px] ${added ? 'bg-forest-badge' : 'bg-olive-gold-cta hover:bg-[#85692B]'} text-on-primary font-btn-primary text-sm md:text-base font-semibold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors`}
      >
        {added ? (<><span className="material-symbols-outlined text-base">check</span> Added!</>) : 'ADD TO CART'}
      </button>
    </div>
  );
}
