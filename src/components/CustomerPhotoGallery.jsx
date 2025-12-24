import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera } from 'lucide-react';

// Mock customer photos data
const customerPhotos = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
        customerName: 'Priya S.',
        productName: 'Haven Sectional Sofa',
        productId: 'lr-1',
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
        customerName: 'Rajesh K.',
        productName: 'Minimalist Bed Frame',
        productId: 'br-1',
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&h=500&fit=crop',
        customerName: 'Ananya D.',
        productName: 'Executive Desk',
        productId: 'of-1',
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&h=500&fit=crop',
        customerName: 'Vikram P.',
        productName: 'Dining Table Set',
        productId: 'dr-1',
    },
    {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&h=500&fit=crop',
        customerName: 'Meera I.',
        productName: 'Lounge Chair',
        productId: 'lr-2',
    },
    {
        id: 6,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
        customerName: 'Arjun M.',
        productName: 'Bookshelf',
        productId: 'of-2',
    },
    {
        id: 7,
        imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&h=500&fit=crop',
        customerName: 'Sneha R.',
        productName: 'Wardrobe',
        productId: 'br-2',
    },
    {
        id: 8,
        imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop',
        customerName: 'Karthik N.',
        productName: 'Coffee Table',
        productId: 'lr-3',
    },
];

export default function CustomerPhotoGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Camera size={32} className="text-secondary" />
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
                            #MyFurniturePark
                        </h2>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        See how our customers are styling their homes with our furniture. Share your space and get featured!
                    </p>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {customerPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <img
                                src={photo.imageUrl}
                                alt={`${photo.customerName}'s ${photo.productName}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="font-bold text-sm">{photo.customerName}</p>
                                    <p className="text-xs opacity-90">{photo.productName}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        Share your Furniture Park setup on Instagram with <span className="font-bold text-secondary">#MyFurniturePark</span>
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1">
                        Upload Your Photo
                    </button>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                        >
                            <X size={24} className="text-white" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedPhoto.imageUrl}
                                alt={selectedPhoto.productName}
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                            <div className="mt-6 text-center text-white">
                                <p className="text-2xl font-serif font-bold mb-2">
                                    {selectedPhoto.productName}
                                </p>
                                <p className="text-gray-300">
                                    Photo by {selectedPhoto.customerName}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
