import HeroCarousel from '@/components/HeroCarousel';
import USPStrip from '@/components/USPStrip';
import TrendingSection from '@/components/TrendingSection';
import CategoryGrid from '@/components/CategoryGrid';
import Lookbook from '@/components/Lookbook';
import Recommendations from '@/components/Recommendations';
import DesignYourTee from '@/components/DesignYourTee';
import ReviewsUGC from '@/components/ReviewsUGC';
import FabricStory from '@/components/FabricStory';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <USPStrip />
      <TrendingSection />
      <CategoryGrid />
      <Lookbook />
      <Recommendations />
      <DesignYourTee />
      <ReviewsUGC />
      <FabricStory />
    </>
  );
}
