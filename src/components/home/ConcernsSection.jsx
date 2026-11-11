import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { concerns } from '../../data/concerns';

export default function ConcernsSection() {
  const rowRef = useRef(null);
  const scroll = (dir) => rowRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <section className="w-full bg-blush-concern py-[65px] px-4 select-none relative">
      <div className="max-w-[1920px] mx-auto">
        <div className="text-center mb-[45px]">
          <h2 className="font-headline-xl text-2xl md:text-headline-xl uppercase tracking-[0.15em] text-near-black">SHOP BY CONCERNS</h2>
        </div>
        <div className="relative flex items-center justify-center">
          <button aria-label="Previous Concern" onClick={() => scroll(-1)} className="absolute left-2 md:left-6 z-20 w-[55px] h-[55px] rounded-full bg-surface-container-lowest text-near-black flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:scale-105 transition-all" type="button">
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>
          <div ref={rowRef} className="flex items-center gap-6 md:gap-[50px] overflow-x-auto no-scrollbar py-4 px-12 max-w-full justify-start md:justify-center">
            {concerns.map((c) => (
              <Link key={c.slug} className="group flex flex-col items-center flex-shrink-0 cursor-pointer" to={`/collection/${c.slug}`}>
                <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-[3px] border-surface-container-lowest shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:ring-4 group-hover:ring-crimson-promo/30">
                  <img className="w-full h-full object-cover" alt={c.alt} src={c.image} />
                </div>
                <span className="font-nav-link text-base md:text-lg uppercase font-medium text-near-black mt-3 group-hover:text-crimson-promo transition-colors">{c.label}</span>
              </Link>
            ))}
          </div>
          <button aria-label="Next Concern" onClick={() => scroll(1)} className="absolute right-2 md:right-6 z-20 w-[55px] h-[55px] rounded-full bg-surface-container-lowest text-near-black flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:scale-105 transition-all" type="button">
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}
