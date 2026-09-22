import { HeroBanner } from '@/components/home/hero-banner';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { FeaturedProducts } from '@/components/home/featured-products';
import { DiscountedProducts } from '@/components/home/discounted-products';
import { TrustSection } from '@/components/home/trust-section';

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <DiscountedProducts />
      <TrustSection />
    </>
  );
}
