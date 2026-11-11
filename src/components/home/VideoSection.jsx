import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { useAddedFeedback } from '../ProductCard';
import { productById, videoTestimonials } from '../../data/products';
import { formatINR } from '../../utils/format';

function VideoCard({ video }) {
  const { addToCart } = useStore();
  const [added, flash] = useAddedFeedback();
  const product = productById[video.productId];
  const to = `/product/${product.id}`;

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.12)] bg-surface-container-lowest">
      <div className="relative aspect-[3/5] w-full overflow-hidden bg-charcoal-surface">
        <Link
          to={to}
          aria-label={`View ${product.name}`}
          className="block w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
          style={{ backgroundImage: `url("${video.thumb}")` }}
        />
        <div className="pointer-events-none absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[11px] font-medium text-on-primary">
          <span className="material-symbols-outlined text-xs">visibility</span>
          <span>{video.views}</span>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 text-on-primary text-xs font-semibold drop-shadow-md">
          {video.caption}
        </div>
      </div>
      <div className="p-3 bg-surface-container-lowest flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <Link to={to} className="w-[52px] h-[52px] rounded border border-card-border overflow-hidden flex-shrink-0 bg-surface">
            <img className="w-full h-full object-cover" alt={product.imageAlt} src={product.image} />
          </Link>
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="font-nav-link text-xs font-medium text-near-black line-clamp-2 leading-tight">
              <Link to={to} className="hover:text-primary transition-colors">{product.name}</Link>
            </h4>
            <span className="font-nav-link text-xs font-bold text-price-red mt-0.5">{formatINR(product.price)}</span>
          </div>
        </div>
        {product.inStock ? (
          <button
            type="button"
            onClick={() => { addToCart(product.id, 1); flash(); }}
            className={`w-full h-[44px] rounded-[8px] ${added ? 'bg-forest-badge' : 'bg-near-black hover:bg-neutral-800'} text-on-primary text-xs font-semibold transition-colors uppercase tracking-wider flex items-center justify-center gap-1`}
          >
            <span className="material-symbols-outlined text-base">{added ? 'check' : 'shopping_bag'}</span> {added ? 'Added!' : 'Add to Cart'}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="w-full h-[44px] rounded-[8px] bg-card-border text-heading-gray text-xs font-semibold uppercase tracking-wider flex items-center justify-center cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}

export default function VideoSection() {
  const [offset, setOffset] = useState(0);
  const n = videoTestimonials.length;
  const ordered = videoTestimonials.map((_, i) => videoTestimonials[(i + offset) % n]);
  const step = (d) => setOffset((o) => (o + d + n) % n);

  return (
    <section className="w-full max-w-[1920px] mx-auto px-4 md:px-margin py-[60px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-headline-xl text-2xl md:text-3xl uppercase tracking-[0.15em] text-near-black">REAL RESULTS, REAL VOICES</h2>
          <p className="font-nav-link text-sm text-heading-gray mt-1">Watch how our botanical formulations transform daily skin and hair rituals</p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button aria-label="Previous videos" onClick={() => step(-1)} className="w-10 h-10 rounded-full border border-card-border bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container transition-colors" type="button">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <button aria-label="Next videos" onClick={() => step(1)} className="w-10 h-10 rounded-full border border-card-border bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container transition-colors" type="button">
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {ordered.map((v) => (
          <VideoCard key={v.productId} video={v} />
        ))}
      </div>
    </section>
  );
}
