import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export default function ImageZoom({ src, alt, className = '' }) {
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const elem = imgRef.current;
        const { top, left, width, height } = elem.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMagnifierPosition({ x, y });
    };

    return (
        <>
            {/* Main Image with Hover Zoom */}
            <div
                className={`relative overflow-hidden group cursor-zoom-in ${className}`}
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setLightboxOpen(true)}
            >
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{
                        transformOrigin: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                    }}
                />

                {/* Zoom Icon Hint */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn size={20} className="text-gray-700" />
                </div>

                {/* Magnifier Overlay (Desktop Only) */}
                {showMagnifier && (
                    <div
                        className="hidden md:block absolute inset-0 pointer-events-none"
                        style={{
                            background: `url(${src})`,
                            backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                            backgroundSize: '200%',
                            opacity: 0.95,
                        }}
                    />
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <X size={24} className="text-white" />
                        </button>

                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                            Click anywhere to close
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
