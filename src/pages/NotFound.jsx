import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
            <h1 className="font-display text-9xl text-primary/10 select-none">404</h1>
            <div className="absolute">
                <h2 className="text-3xl md:text-4xl font-display text-primary mb-4">Page Not Found</h2>
                <p className="text-taupe max-w-md mx-auto mb-8 font-body">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm font-medium"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-white transition-colors uppercase tracking-wider text-sm font-medium"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
