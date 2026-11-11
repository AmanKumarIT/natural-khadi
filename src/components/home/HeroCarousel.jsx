import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/heroSlides';
import HeroOverlay from './HeroOverlay';

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = heroSlides.length;
  const go = (i) => setIndex((i + n) % n);

  useEffect(() => {
    if (paused || n < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F7ECE1] select-none"
      id="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full aspect-[16/7] md:aspect-[10/3] flex items-center">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? 'opacity-100 z-[1]' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={i !== index}
          >
            {slide.type === 'overlay' ? (
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out" role="img" aria-label={slide.alt} style={{ backgroundImage: `url("${slide.image}")` }} />
            ) : (
              <>
                <div className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-70" style={{ backgroundImage: `url("${slide.image}")` }} />
                <div className="absolute inset-0 bg-contain bg-no-repeat bg-center" role="img" aria-label={slide.alt} style={{ backgroundImage: `url("${slide.image}")` }} />
              </>
            )}
            <Link to={slide.to} aria-label="Shop this offer" className="absolute inset-0 z-[5]" tabIndex={i === index ? 0 : -1} />
            {slide.type === 'overlay' && (
              <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                <HeroOverlay />
              </div>
            )}
          </div>
        ))}

        <button aria-label="Previous Slide" onClick={() => go(index - 1)} className="absolute left-4 md:left-[50px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-[62px] md:h-[62px] rounded-full bg-surface-container-lowest text-near-black flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition-all" type="button">
          <span className="material-symbols-outlined text-2xl md:text-3xl">chevron_left</span>
        </button>
        <button aria-label="Next Slide" onClick={() => go(index + 1)} className="absolute right-4 md:right-[50px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-[62px] md:h-[62px] rounded-full bg-surface-container-lowest text-near-black flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition-all" type="button">
          <span className="material-symbols-outlined text-2xl md:text-3xl">chevron_right</span>
        </button>

        <div className="absolute bottom-5 right-6 md:right-margin z-20 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === index ? 'bg-near-black ring-2 ring-near-black ring-offset-2' : 'bg-near-black/40 hover:bg-near-black/70'}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
