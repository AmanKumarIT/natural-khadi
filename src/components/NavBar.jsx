import { Link, useLocation } from 'react-router-dom';
import { navMenu, subLink } from '../data/navMenu';

/** Charcoal category bar with hover / focus dropdowns (styled after the reference screenshots). */
export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="w-full h-full flex items-center justify-between" data-active-classes="text-primary-fixed font-semibold">
      {navMenu.map((menu, i) => {
        const active = pathname === `/collection/${menu.slug}`;
        const alignRight = i >= navMenu.length - 2; // keep the last dropdowns inside the viewport
        return (
          <div key={menu.slug} className="relative h-full flex items-center group">
            <Link
              to={`/collection/${menu.slug}`}
              className={`font-nav-link text-nav-link uppercase hover:text-primary-fixed transition-colors ${active ? 'text-primary-fixed font-semibold' : 'text-surface-container-high'}`}
            >
              {menu.label}
            </Link>
            <div
              className={`absolute top-full ${alignRight ? 'right-0' : 'left-0'} z-50 w-max min-w-[220px] bg-charcoal-surface pt-[17px] pb-[12px] shadow-[0_12px_24px_rgba(0,0,0,0.25)]
                invisible opacity-0 translate-y-1 transition-all duration-200
                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0`}
            >
              {menu.items.map((item) => (
                <Link
                  key={item.slug}
                  to={subLink(menu, item)}
                  className="block px-[31px] py-[10px] whitespace-nowrap font-nav-link text-[13px] leading-[18px] tracking-[0.1em] uppercase text-surface-container-lowest hover:text-primary-fixed hover:bg-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
