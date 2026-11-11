import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ANNOUNCEMENTS, SOCIAL_LINKS } from '../config/site';
import NavBar from './NavBar';
import SearchPanel from './SearchPanel';
import ProfileMenu from './ProfileMenu';
import Logo from './Logo';

export default function Header() {
  const { cartCount, openCart, user, openLogin } = useStore();
  const [ann, setAnn] = useState(0);
  const [annPaused, setAnnPaused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const n = ANNOUNCEMENTS.length;

  useEffect(() => {
    if (annPaused) return undefined;
    const t = setInterval(() => setAnn((i) => (i + 1) % n), 5000);
    return () => clearInterval(t);
  }, [annPaused, n]);

  useEffect(() => {
    if (!profileOpen) return undefined;
    const onDown = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    const onKey = (e) => e.key === 'Escape' && setProfileOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); window.removeEventListener('keydown', onKey); };
  }, [profileOpen]);

  useEffect(() => { if (!user) setProfileOpen(false); }, [user]);

  const current = ANNOUNCEMENTS[ann];
  const onProfileClick = () => (user ? setProfileOpen((o) => !o) : openLogin('Enter your mobile number to continue'));

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      {/* 1. Promo announcement bar */}
      <div
        className="h-[50px] w-full bg-crimson-promo text-on-primary flex items-center justify-between px-margin select-none"
        onMouseEnter={() => setAnnPaused(true)}
        onMouseLeave={() => setAnnPaused(false)}
      >
        <button aria-label="Previous announcement" onClick={() => setAnn((i) => (i - 1 + n) % n)} className="flex items-center text-on-primary hover:opacity-80 transition-opacity" type="button">
          <span className="material-symbols-outlined text-base">chevron_left</span>
        </button>
        <Link to={current.to} className="flex items-center gap-space-md font-announcement-text text-announcement-text uppercase tracking-widest text-center hover:underline underline-offset-4">
          {current.parts.length > 1 ? (
            <>
              <span className="hidden md:inline font-semibold">{current.parts[0]}</span>
              <span className="hidden md:inline opacity-60 text-xs">•</span>
              <span className="font-semibold">{current.parts[1]}</span>
            </>
          ) : (
            <span className="font-semibold">{current.parts[0]}</span>
          )}
        </Link>
        <button aria-label="Next announcement" onClick={() => setAnn((i) => (i + 1) % n)} className="flex items-center text-on-primary hover:opacity-80 transition-opacity" type="button">
          <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>

      {/* 2. Branding & utility tier */}
      <div className="h-[113px] w-full bg-surface-container-lowest px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-md text-heading-gray">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.key} aria-label={s.label} className="hover:text-primary transition-colors flex items-center" href={s.href} target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined text-lg">{s.icon}</span>
            </a>
          ))}
        </div>

        <Link to="/" aria-label="Khadi Natural – home" className="cursor-pointer">
          <Logo />
        </Link>

        <div className="flex items-center gap-space-lg text-near-black">
          <button aria-label="Search store" onClick={() => setSearchOpen((o) => !o)} className="hover:text-primary transition-colors flex items-center" type="button">
            <span className="material-symbols-outlined text-2xl">{searchOpen ? 'close' : 'search'}</span>
          </button>

          <div ref={profileRef} className="relative flex items-center">
            <button aria-label="Customer profile" onClick={onProfileClick} className="hover:text-primary transition-colors flex items-center" type="button">
              <span className="material-symbols-outlined text-2xl">person</span>
            </button>
            {profileOpen && user && <ProfileMenu onClose={() => setProfileOpen(false)} />}
          </div>

          <button aria-label="Shopping basket" onClick={openCart} className="relative hover:text-primary transition-colors flex items-center" type="button">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-crimson-promo text-on-primary font-badge-label text-[10px] leading-tight font-bold min-w-4 h-4 px-[3px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button aria-label={user ? 'Open profile' : 'Login'} onClick={onProfileClick} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center" type="button">
            {user && user.name ? (
              <span className="text-on-primary text-sm font-semibold">{user.name.trim().charAt(0).toUpperCase()}</span>
            ) : (
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Primary category navigation */}
      <div className="h-[53px] w-full bg-charcoal-surface px-margin flex items-center">
        <NavBar />
      </div>

      {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
