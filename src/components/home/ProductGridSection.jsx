import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { productById } from '../../data/products';

/** Shared markup for Best Sellers / New Arrivals / Combos (exact classes from the original sections). */
export default function ProductGridSection({ title, ids, viewAllTo, sectionClass = 'py-[60px]', gapClass = 'md:gap-[39px]' }) {
  return (
    <section className={`w-full max-w-[1920px] mx-auto px-4 md:px-margin ${sectionClass}`}>
      <div className="text-center mb-[40px]">
        <h2 className="font-headline-xl text-2xl md:text-headline-xl uppercase tracking-[0.15em] text-near-black">{title}</h2>
        <Link
          className="inline-block mt-3 font-nav-link text-sm text-near-black underline underline-offset-4 hover:text-primary transition-colors"
          to={viewAllTo}
        >
          View all
        </Link>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${gapClass}`}>
        {ids.map((id) => (
          <ProductCard key={id} product={productById[id]} />
        ))}
      </div>
    </section>
  );
}
