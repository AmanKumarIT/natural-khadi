import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { resolveCollection } from '../data/collections';
import { products } from '../data/products';
import { subLink } from '../data/navMenu';
import { CONTACT } from '../config/site';

export default function CollectionPage() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const type = params.get('type') || undefined;
  const q = (params.get('q') || '').trim().toLowerCase();

  let collection = resolveCollection(slug, type);
  if (!collection) {
    return (
      <div className="max-w-[900px] mx-auto px-margin py-24 text-center">
        <h1 className="font-headline-xl text-2xl uppercase tracking-[0.15em] text-heading-gray">Collection not found</h1>
        <Link to="/collection/all" className="inline-block mt-6 underline underline-offset-4 font-nav-link text-sm hover:text-primary">Browse all products</Link>
      </div>
    );
  }
  if (q && slug === 'all') {
    collection = { ...collection, title: `RESULTS FOR “${params.get('q')}”`, products: products.filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(q)) };
  }
  const { title, products: list, menu, kind, typeLabel } = collection;

  return (
    <div className="w-full max-w-[1920px] mx-auto px-4 md:px-margin pt-[50px] pb-[70px]">
      <div className="text-center mb-[40px]">
        <h1 className="font-headline-xl text-2xl md:text-headline-xl uppercase tracking-[0.15em] text-heading-gray">{title}</h1>
        {typeLabel && <p className="font-nav-link text-sm uppercase tracking-widest text-heading-gray mt-3">{typeLabel}</p>}
      </div>

      {menu && kind !== 'enquiry' && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Link to={`/collection/${menu.slug}`} className={`px-4 py-2 rounded-[9999px] border font-nav-link text-xs uppercase tracking-widest transition-colors ${!type ? 'bg-near-black text-on-primary border-near-black' : 'border-card-border text-near-black hover:border-near-black'}`}>All</Link>
          {menu.items.map((item) => (
            <Link key={item.slug} to={subLink(menu, item)} className={`px-4 py-2 rounded-[9999px] border font-nav-link text-xs uppercase tracking-widest transition-colors ${type === item.slug ? 'bg-near-black text-on-primary border-near-black' : 'border-card-border text-near-black hover:border-near-black'}`}>{item.label}</Link>
          ))}
        </div>
      )}

      {kind === 'enquiry' ? (
        <div className="max-w-[640px] mx-auto text-center border border-card-border rounded-lg p-10 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-primary text-5xl">handshake</span>
          <h2 className="font-nav-link text-xl font-semibold text-near-black mt-4">Private Label Enquiries</h2>
          <p className="font-nav-link text-[15px] text-heading-gray mt-3 leading-relaxed">
            Launch your own brand with Khadi Natural&apos;s Ayurvedic formulations. Share your requirements and our team will get back to you.
          </p>
          <a href={`mailto:${CONTACT.email}?subject=Private%20Label%20Enquiry`} className="inline-flex items-center justify-center mt-6 h-[50px] px-8 rounded-[8px] bg-olive-gold-cta hover:bg-[#85692B] text-on-primary font-btn-primary text-sm font-semibold uppercase tracking-wider transition-colors">Email {CONTACT.email}</a>
          <p className="font-nav-link text-xs text-heading-gray mt-4">Toll free: {CONTACT.phone}</p>
        </div>
      ) : list.length === 0 ? (
        <div className="max-w-[640px] mx-auto text-center py-16">
          <span className="material-symbols-outlined text-heading-gray text-5xl">inventory_2</span>
          <p className="font-nav-link text-[17px] text-near-black mt-4">No products here yet.</p>
          <p className="font-nav-link text-sm text-heading-gray mt-1">New arrivals are on the way – explore the rest of our range in the meantime.</p>
          <Link to="/collection/all" className="inline-block mt-6 underline underline-offset-4 font-nav-link text-sm text-near-black hover:text-primary">View all products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-[39px]">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
