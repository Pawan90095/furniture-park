import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class GlobalErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-primary">
                    <div className="max-w-md w-full text-center space-y-6">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                            <AlertTriangle size={40} strokeWidth={1.5} />
                        </div>

                        <div className="space-y-2">
                            <h1 className="font-display text-3xl font-medium">Something went wrong</h1>
                            <p className="text-taupe leading-relaxed">
                                We apologize for the inconvenience. An unexpected error has occurred.
                                Please try reloading the page.
                            </p>
                        </div>

                        {/* Optional: Show technically details in dev only */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="text-left text-xs bg-red-50 p-4 rounded border border-red-100 overflow-auto max-h-40 font-mono text-red-800">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <button
                            onClick={this.handleReload}
                            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm font-medium"
                        >
                            <RefreshCw size={18} />
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
