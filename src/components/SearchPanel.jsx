import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { formatINR } from '../utils/format';

export default function SearchPanel({ onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products.filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(term));
  }, [q]);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/collection/all?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-surface-container-lowest border-t border-card-border shadow-[0_12px_24px_rgba(0,0,0,0.12)] kn-fade-in">
      <div className="max-w-[900px] mx-auto px-margin-mobile md:px-0 py-6">
        <form onSubmit={submit} className="flex items-center gap-3 border border-card-border rounded-[8px] px-4 h-[48px] focus-within:ring-2 focus-within:ring-olive-gold-cta focus-within:ring-offset-2">
          <span className="material-symbols-outlined text-heading-gray">search</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for face wash, shampoo, kits…"
            className="flex-1 bg-transparent outline-none font-nav-link text-sm text-near-black placeholder:text-[#6B6B6B]"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="text-heading-gray hover:text-near-black">
            <span className="material-symbols-outlined">close</span>
          </button>
        </form>
        {q.trim() && (
          <div className="mt-4 max-h-[360px] overflow-y-auto">
            {results.length === 0 ? (
              <p className="font-nav-link text-sm text-heading-gray py-4 text-center">No products found for “{q}”.</p>
            ) : (
              results.slice(0, 8).map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} onClick={onClose} className="flex items-center gap-4 py-2 px-2 rounded-[8px] hover:bg-surface-container-low transition-colors">
                  <img src={p.image} alt={p.imageAlt} className="w-12 h-12 object-contain border border-card-border rounded bg-white" />
                  <span className="flex-1 font-nav-link text-sm text-near-black line-clamp-1">{p.name}</span>
                  <span className="font-nav-link text-sm font-bold text-price-red">{formatINR(p.price)}</span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
