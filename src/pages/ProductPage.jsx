import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { productById, products } from '../data/products';
import { navMenu } from '../data/navMenu';
import ProductCard, { Stars } from '../components/ProductCard';
import { formatRS } from '../utils/format';
import { PRICING } from '../config/site';

const starStyle = { fontVariationSettings: '"FILL" 1' };

function Accordion({ title, children, defaultOpen = false }) {
  return (
    <details open={defaultOpen} className="group border-b border-card-border">
      <summary className="flex items-center justify-between cursor-pointer list-none py-4 font-nav-link text-[15px] font-semibold uppercase tracking-widest text-near-black">
        {title}
        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
      </summary>
      <div className="pb-5 font-nav-link text-[15px] leading-relaxed text-heading-gray">{children}</div>
    </details>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = productById[id];
  const { addToCart, requireLogin } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => { setQty(1); setAdded(false); }, [id]);
  useEffect(() => { if (product) document.title = `${product.name} – Khadi Natural`; return () => { document.title = 'Khadi Natural – Herbal & Ayurvedic Luxury'; }; }, [product]);

  if (!product) {
    return (
      <div className="max-w-[900px] mx-auto px-margin py-24 text-center">
        <h1 className="font-headline-xl text-2xl uppercase tracking-[0.15em] text-heading-gray">Product not found</h1>
        <Link to="/collection/all" className="inline-block mt-6 underline underline-offset-4 font-nav-link text-sm hover:text-primary">Browse all products</Link>
      </div>
    );
  }

  const menu = navMenu.find((m) => m.slug === product.categories[0]);
  const related = products.filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c))).slice(0, 4);
  const fallbackRelated = related.length ? related : products.filter((p) => p.id !== product.id).slice(0, 4);

  const add = () => {
    addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  const buyNow = () => {
    addToCart(product.id, qty, { openDrawer: false });
    requireLogin(() => navigate('/checkout'), 'Login to proceed to checkout');
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 md:px-margin pt-8 pb-[70px]">
      <nav className="font-nav-link text-xs uppercase tracking-widest text-heading-gray mb-8 flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        {menu && (<><Link to={`/collection/${menu.slug}`} className="hover:text-primary">{menu.label}</Link><span>/</span></>)}
        <span className="text-near-black line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px]">
        {/* image */}
        <div className="relative w-full aspect-square bg-surface-container-lowest border border-card-border rounded-lg flex items-center justify-center overflow-hidden p-8">
          {product.badge && (
            <span className="absolute top-0 left-0 bg-forest-badge text-on-primary font-badge-label text-[11px] font-bold px-3 py-1 uppercase tracking-wider z-10">{product.badge}</span>
          )}
          <img src={product.image} alt={product.imageAlt} className="w-full h-full object-contain" />
        </div>

        {/* details */}
        <div className="flex flex-col">
          <h1 className="font-nav-link text-[28px] md:text-[34px] font-medium text-near-black leading-tight">{product.name}</h1>
          {product.tagline && <p className="font-card-tagline text-[17px] text-forest-badge mt-2">{product.tagline}</p>}

          <div className="flex items-center gap-1.5 mt-4 text-sm">
            <Stars emptyStars={product.emptyStars} />
            <span className="font-bold text-near-black">{product.ratingLabel}</span>
            {product.reviews > 0 && <span className="text-heading-gray">({product.reviews} reviews)</span>}
            <span className="material-symbols-outlined text-verified-blue text-base" style={starStyle}>verified</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-card-price text-[28px] text-price-red font-bold">{formatRS(product.price)}</span>
            <span className="font-nav-link text-xs text-heading-gray">Inclusive of all taxes</span>
          </div>
          {product.size && <p className="font-nav-link text-sm text-heading-gray mt-1">Net quantity: {product.size}</p>}

          <p className="font-nav-link text-[15px] leading-relaxed text-heading-gray mt-5">{product.description}</p>

          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 font-nav-link text-sm text-near-black">
                <span className="material-symbols-outlined text-forest-badge text-lg" style={starStyle}>check_circle</span>
                {b}
              </li>
            ))}
          </ul>

          {/* purchase */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {product.inStock && (
              <div className="inline-flex items-center border border-card-border rounded-[8px] h-[50px]">
                <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => q - 1)} className="w-12 h-full flex items-center justify-center hover:bg-surface-container disabled:opacity-40 rounded-l-[8px]"><span className="material-symbols-outlined">remove</span></button>
                <span className="w-12 text-center font-nav-link font-medium">{qty}</span>
                <button type="button" aria-label="Increase quantity" disabled={qty >= 10} onClick={() => setQty((q) => q + 1)} className="w-12 h-full flex items-center justify-center hover:bg-surface-container disabled:opacity-40 rounded-r-[8px]"><span className="material-symbols-outlined">add</span></button>
              </div>
            )}
            {product.inStock ? (
              <>
                <button type="button" onClick={add} className={`flex-1 min-w-[200px] h-[50px] rounded-[8px] ${added ? 'bg-forest-badge' : 'bg-olive-gold-cta hover:bg-[#85692B]'} text-on-primary font-btn-primary text-base font-semibold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors`}>
                  {added ? (<><span className="material-symbols-outlined text-base">check</span> Added!</>) : 'ADD TO CART'}
                </button>
                <button type="button" onClick={buyNow} className="flex-1 min-w-[160px] h-[50px] rounded-[8px] border border-near-black text-near-black font-btn-primary text-base font-semibold uppercase tracking-wider hover:bg-near-black hover:text-on-primary transition-colors">
                  BUY NOW
                </button>
              </>
            ) : (
              <button type="button" disabled className="flex-1 h-[50px] rounded-[8px] bg-card-border text-heading-gray font-btn-primary text-base font-semibold uppercase tracking-wider cursor-not-allowed">OUT OF STOCK</button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-nav-link text-xs uppercase tracking-widest text-heading-gray">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg text-primary">local_shipping</span>Free shipping above ₹{PRICING.freeShippingThreshold}</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg text-primary">cruelty_free</span>Animal test-free</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg text-primary">eco</span>100% Ayurvedic</span>
          </div>

          <div className="mt-8 border-t border-card-border">
            <Accordion title="Product Details" defaultOpen>{product.description}</Accordion>
            <Accordion title="Key Ingredients">{product.ingredientsText}</Accordion>
            <Accordion title="How to Use">{product.howToUse}</Accordion>
          </div>
        </div>
      </div>

      <section className="mt-[80px]">
        <div className="text-center mb-[40px]">
          <h2 className="font-headline-xl text-2xl md:text-headline-xl uppercase tracking-[0.15em] text-near-black">YOU MAY ALSO LIKE</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[39px]">
          {fallbackRelated.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
