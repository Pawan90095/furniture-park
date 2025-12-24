import React from 'react';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
                <div className="text-sm tracking-[0.2em] text-primary uppercase font-medium animate-pulse">
                    Loading
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
