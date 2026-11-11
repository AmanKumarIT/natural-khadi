import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CollectionPage from './pages/CollectionPage';
import InfoPage from './pages/InfoPage';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      {/* Checkout has its own slim header (matches the checkout reference) */}
      <Route path="/checkout" element={<Checkout />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/collection/:slug" element={<CollectionPage />} />
        <Route path="/info/:slug" element={<InfoPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
