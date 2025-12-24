import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Priya Sharma',
        location: 'Mumbai, Maharashtra',
        role: 'Interior Designer',
        rating: 5,
        text: 'Absolutely stunning furniture! The quality exceeded my expectations. I\'ve recommended Furniture Park to all my clients. The craftsmanship is impeccable and the delivery was seamless.',
        image: 'https://i.pravatar.cc/150?img=1',
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        location: 'Bangalore, Karnataka',
        role: 'Software Engineer',
        rating: 5,
        text: 'Best furniture shopping experience ever! The website is easy to navigate, and the customer service team helped me choose the perfect sofa for my living room. Highly satisfied!',
        image: 'https://i.pravatar.cc/150?img=13',
    },
    {
        id: 3,
        name: 'Ananya Desai',
        location: 'Delhi NCR',
        role: 'Architect',
        rating: 5,
        text: 'The attention to detail in every piece is remarkable. I furnished my entire home office with Furniture Park, and it looks like a magazine spread. Premium quality at reasonable prices!',
        image: 'https://i.pravatar.cc/150?img=5',
    },
    {
        id: 4,
        name: 'Vikram Patel',
        location: 'Ahmedabad, Gujarat',
        role: 'Business Owner',
        rating: 5,
        text: 'I was skeptical about buying furniture online, but Furniture Park changed my mind completely. The 10-year warranty and 30-day return policy gave me confidence. Zero regrets!',
        image: 'https://i.pravatar.cc/150?img=12',
    },
    {
        id: 5,
        name: 'Meera Iyer',
        location: 'Chennai, Tamil Nadu',
        role: 'Doctor',
        rating: 5,
        text: 'Elegant, sustainable, and beautifully crafted. The dining set I ordered arrived perfectly packaged, and the assembly service was complimentary. This is luxury furniture done right!',
        image: 'https://i.pravatar.cc/150?img=9',
    },
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join thousands of happy customers who have transformed their homes with our premium furniture
                    </p>
                </div>

                <div className="relative">
                    {/* Testimonial Card */}
                    <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                }}
                                className="absolute w-full"
                            >
                                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
                                    <Quote size={48} className="text-secondary/20 mb-6" />

                                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                        {/* Customer Photo */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={testimonials[currentIndex].image}
                                                alt={testimonials[currentIndex].name}
                                                className="w-24 h-24 rounded-full object-cover border-4 border-secondary/20 shadow-lg"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 text-center md:text-left">
                                            {/* Stars */}
                                            <div className="flex justify-center md:justify-start text-yellow-400 mb-4">
                                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                    <Star key={i} size={20} fill="currentColor" />
                                                ))}
                                            </div>

                                            {/* Quote */}
                                            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                                                "{testimonials[currentIndex].text}"
                                            </p>

                                            {/* Customer Info */}
                                            <div>
                                                <p className="font-bold text-xl text-primary">
                                                    {testimonials[currentIndex].name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-secondary hover:text-white transition-all z-20 group"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-secondary hover:text-white transition-all z-20 group"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex
                                        ? 'bg-secondary w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
