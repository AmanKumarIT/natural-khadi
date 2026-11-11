import HeroCarousel from '../components/home/HeroCarousel';
import OffersSection from '../components/home/OffersSection';
import VideoSection from '../components/home/VideoSection';
import ProductGridSection from '../components/home/ProductGridSection';
import ConcernsSection from '../components/home/ConcernsSection';
import CategoryBento from '../components/home/CategoryBento';
import IngredientsSection from '../components/home/IngredientsSection';
import TrustBand from '../components/home/TrustBand';
import FraudNotice from '../components/home/FraudNotice';
import { homeSections } from '../data/products';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <OffersSection />
      <VideoSection />
      <ProductGridSection title="BEST SELLERS" ids={homeSections.bestSellers} viewAllTo="/collection/best-sellers" sectionClass="py-[60px]" gapClass="md:gap-[40px]" />
      <ConcernsSection />
      <ProductGridSection title="NEW ARRIVALS" ids={homeSections.newArrivals} viewAllTo="/collection/new-arrivals" sectionClass="py-[70px]" gapClass="md:gap-[39px]" />
      <CategoryBento />
      <ProductGridSection title="CURATED COMBOS & KITS" ids={homeSections.combos} viewAllTo="/collection/combos" sectionClass="py-[60px]" gapClass="md:gap-[39px]" />
      <IngredientsSection />
      <TrustBand />
      <FraudNotice />
    </div>
  );
}
