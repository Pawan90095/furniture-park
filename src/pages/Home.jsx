import React from 'react';
import { useStore } from '../store/useStore';
import HeroCarousel from '../components/HeroCarousel';
import TrustStrip from '../components/TrustStrip';
import BentoGrid from '../components/BentoGrid';
import HorizontalProductScroll from '../components/HorizontalProductScroll';
import PromoBanner from '../components/PromoBanner';
import ShopTheLook from '../components/ShopTheLook';
import TestimonialCarousel from '../components/TestimonialCarousel';
import StatsCounter from '../components/StatsCounter';
import CustomerPhotoGallery from '../components/CustomerPhotoGallery';
import AsSeenIn from '../components/AsSeenIn';
import RecentlyViewed from '../components/RecentlyViewed';

export default function Home() {
    const products = useStore((state) => state.products);

    // Get different product sets
    const newArrivals = products.slice(0, 8);
    const bestsellers = products.filter(p => p.isBestseller || p.rating > 4.7).slice(0, 8);

    return (
        <div className="bg-white min-h-screen">
            {/* 1. Hero Carousel */}
            <HeroCarousel />

            {/* 2. Trust Strip */}
            <TrustStrip />

            {/* 3. Shop By Category (Bento Grid) */}
            <BentoGrid />

            {/* 4. New Arrivals (Horizontal Scroll) */}
            <HorizontalProductScroll title="Fresh This Week" products={newArrivals} />

            {/* 5. Testimonial Carousel */}
            <TestimonialCarousel />

            {/* 6. Promotional Banner */}
            <PromoBanner />

            {/* 7. Bestsellers (Horizontal Scroll) */}
            <section className="py-16 bg-white">
                <div className="max-w-[1440px] mx-auto">
                    <HorizontalProductScroll title="Bestsellers" products={bestsellers} />
                </div>
            </section>

            {/* 8. Stats Counter */}
            <StatsCounter />

            {/* 9. Customer Photo Gallery */}
            <CustomerPhotoGallery />

            {/* 10. Recently Viewed */}
            <RecentlyViewed />

            {/* 11. Shop The Look */}
            <ShopTheLook />

            {/* 12. As Seen In */}
            <AsSeenIn />
        </div>
    );
}
