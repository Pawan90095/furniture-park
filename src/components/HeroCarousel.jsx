import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        title: "Monsoon Sale",
        subtitle: "Flat 40% Off",
        description: "Transform your space with our exclusive monsoon collection",
        cta: "Shop Now",
        link: "/shop"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        title: "Sleep in Luxury",
        subtitle: "Premium Mattresses",
        description: "Experience comfort like never before with our handcrafted mattresses",
        cta: "Explore Beds",
        link: "/shop?category=Bedroom"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        title: "Work from Home Essentials",
        subtitle: "Productivity Meets Style",
        description: "Create your perfect home office with ergonomic furniture",
        cta: "Shop Office",
        link: "/shop?q=office"
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="max-w-[1440px] mx-auto px-4 lg:px-12 w-full">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="max-w-xl"
                            >
                                <h1 className="text-5xl md:text-7xl font-display font-normal text-white mb-4 leading-tight">
                                    {slides[currentSlide].title}
                                </h1>
                                <p className="text-xl md:text-2xl text-secondary font-semibold mb-4 uppercase tracking-wider">
                                    {slides[currentSlide].subtitle}
                                </p>
                                <p className="text-base text-gray-200 mb-8 max-w-md font-light">
                                    {slides[currentSlide].description}
                                </p>
                                <Link
                                    to={slides[currentSlide].link}
                                    className="inline-block bg-white text-stone-900 px-8 py-3 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all"
                                >
                                    {slides[currentSlide].cta}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="text-white" size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="text-white" size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                            ? 'bg-white w-8'
                            : 'bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
