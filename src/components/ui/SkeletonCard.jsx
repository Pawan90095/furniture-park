import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-[4/5] bg-gray-200 rounded-lg mb-4"></div>

            {/* Title Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

            {/* Price Skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
    );
}

export function SkeletonGrid({ count = 8 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
}
