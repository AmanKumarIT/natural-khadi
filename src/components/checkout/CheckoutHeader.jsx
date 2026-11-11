import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

const NAV = [
  { label: 'SHOP', to: '/collection/all' },
  { label: 'COMBOS', to: '/collection/combos' },
  { label: 'GIFTING', to: '/collection/gifting' },
  { label: 'NEW ARRIVALS', to: '/collection/new-arrivals' },
  { label: 'HELP', to: '/info/faq' },
];

/** Slim checkout header (layout copied from the reference, styled with Khadi Natural tokens). */
export default function CheckoutHeader() {
  const { cartCount, user } = useStore();
  return (
    <header className="w-full bg-surface-container-lowest border-b border-card-border">
      <div className="h-[30px] bg-crimson-promo text-on-primary flex items-center justify-center px-4 text-center font-announcement-text text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.14em]">
        FREE SHIPPING ON ORDERS ABOVE ₹249 &nbsp;•&nbsp; 100% AYURVEDIC &amp; CHEMICAL-FREE FORMULATIONS
      </div>
      <div className="max-w-[1180px] mx-auto h-[64px] px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="font-headline-xl text-[20px] md:text-[22px] tracking-[0.18em] uppercase text-near-black font-medium">
          Khadi Natural
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} className="font-nav-link text-[11px] font-semibold tracking-[0.18em] text-olive-gold-cta hover:text-near-black transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-near-black">
          <Link to="/collection/all" aria-label="Search" className="hover:text-primary transition-colors flex"><span className="material-symbols-outlined text-[20px]">search</span></Link>
          <Link to="/info/track-order" aria-label="My account" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[20px]">person</span>
            {user?.name && <span className="hidden sm:inline font-nav-link text-xs">{user.name.split(' ')[0]}</span>}
          </Link>
          <span className="font-nav-link text-[11px] font-bold tracking-widest text-crimson-promo border border-crimson-promo rounded-[4px] px-2.5 py-1">
            BAG ({cartCount})
          </span>
        </div>
      </div>
    </header>
  );
}
