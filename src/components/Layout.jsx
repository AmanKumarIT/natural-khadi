import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import LoginModal from './LoginModal';
import ChatWidget from './ChatWidget';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname, search]);
  return null;
}

/** Shared shell for every storefront page (header stack, footer, cart drawer, login overlay). */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="w-full pt-[216px] bg-surface min-h-screen">
        <Outlet />
      </main>
      <ChatWidget />
      <Footer />
      <CartDrawer />
      <LoginModal />
    </>
  );
}
