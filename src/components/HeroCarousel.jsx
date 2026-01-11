import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        overline: "Spring Collection 2026",
        title: "Elevate Your Living Space",
        description: "Discover curated furniture pieces that blend timeless elegance with modern comfort",
        cta: "Explore Collection",
        link: "/shop"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        overline: "Bedroom Essentials",
        title: "Sleep in Luxury",
        description: "Transform your bedroom into a sanctuary with our premium collection",
        cta: "Shop Bedroom",
        link: "/shop?category=Bedroom"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        overline: "Home Office",
        title: "Work Meets Design",
        description: "Create your perfect workspace with ergonomic and stylish furniture",
        cta: "Shop Office",
        link: "/shop?q=office"
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
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
        <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-[#2C2C2C]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Ken Burns Effect */}
                    <motion.img
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.08 }}
                        transition={{ duration: 6, ease: "linear" }}
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-full object-cover"
                    />

                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                        <div className="container-custom w-full">
                            <motion.div
                                initial={{ y: 60, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                                className="max-w-2xl"
                            >
                                {/* Overline */}
                                <p className="text-overline text-[#D4816E] mb-4 animate-fade-in">
                                    {slides[currentSlide].overline}
                                </p>

                                {/* Title */}
                                <h1 className="text-display font-display text-white mb-6 leading-[1.1]">
                                    {slides[currentSlide].title}
                                </h1>

                                {/* Description */}
                                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl font-light leading-relaxed">
                                    {slides[currentSlide].description}
                                </p>

                                {/* CTA Button */}
                                <Link
                                    to={slides[currentSlide].link}
                                    className="btn btn-primary"
                                >
                                    {slides[currentSlide].cta}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Minimalist */}
            <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="text-white" size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="text-white" size={24} />
            </button>

            {/* Dots Indicator - Elegant */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide
                            ? 'bg-white w-12'
                            : 'bg-white/40 w-8 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
