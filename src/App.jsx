import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomerProtectedRoute from './components/CustomerProtectedRoute';
import NewsletterPopup from './components/NewsletterPopup';
import ScrollToTop from './components/ScrollToTop';
import InfiniteMarquee from './components/InfiniteMarquee';
import LiveChatWidget from './components/LiveChatWidget';
import CompareFloatingBar from './components/CompareFloatingBar';
import { ToastProvider } from './context/ToastContext';
import { useStore } from './store/useStore';
import PageLoader from './components/PageLoader';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';
import NotFound from './pages/NotFound';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const About = lazy(() => import('./pages/About'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Contact = lazy(() => import('./pages/Contact'));

// Account Pages
const AccountLayout = lazy(() => import('./pages/account/AccountLayout'));
const Overview = lazy(() => import('./pages/account/Overview'));
const MyOrders = lazy(() => import('./pages/account/MyOrders'));
const SavedAddresses = lazy(() => import('./pages/account/SavedAddresses'));
const AccountDetails = lazy(() => import('./pages/account/AccountDetails'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const DashboardOverview = lazy(() => import('./pages/admin/DashboardOverview'));
const ProductManager = lazy(() => import('./pages/admin/ProductManager'));
const OrderManager = lazy(() => import('./pages/admin/OrderManager'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));

function App() {
    const fetchProducts = useStore((state) => state.fetchProducts);
    const fetchSiteSettings = useStore((state) => state.fetchSiteSettings);

    useEffect(() => {
        fetchProducts();
        fetchSiteSettings();
    }, [fetchProducts, fetchSiteSettings]);

    const siteSettings = useStore((state) => state.siteSettings);
    const bannerText = siteSettings?.bannerText || 'FREE SHIPPING ON ORDERS OVER ₹10,000 • HANDCRAFTED IN INDIA • SUSTAINABLE MATERIALS • ';

    return (
        <ToastProvider>
            <GlobalErrorBoundary>
                <div className="flex flex-col min-h-screen bg-background">
                    <ScrollToTop />
                    <NewsletterPopup />

                    {/* Marquee Band */}
                    <div className="bg-primary text-white py-2 overflow-hidden whitespace-nowrap">
                        <div className="animate-marquee inline-block">
                            <span className="text-xs font-bold tracking-[0.2em] px-4">{bannerText}</span>
                            <span className="text-xs font-bold tracking-[0.2em] px-4">{bannerText}</span>
                            <span className="text-xs font-bold tracking-[0.2em] px-4">{bannerText}</span>
                            <span className="text-xs font-bold tracking-[0.2em] px-4">{bannerText}</span>
                        </div>
                    </div>

                    <Navbar />
                    <main className="flex-grow relative">
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/product/:id" element={<ProductDetails />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/wishlist" element={<Wishlist />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/order-success" element={<OrderSuccess />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />

                                {/* User Auth Routes */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/signup" element={<Signup />} />

                                {/* User Dashboard Routes */}
                                <Route path="/account" element={
                                    <CustomerProtectedRoute>
                                        <AccountLayout />
                                    </CustomerProtectedRoute>
                                }>
                                    <Route index element={<Overview />} />
                                    <Route path="orders" element={<MyOrders />} />
                                    <Route path="addresses" element={<SavedAddresses />} />
                                    <Route path="details" element={<AccountDetails />} />
                                </Route>

                                {/* Admin Routes */}
                                <Route path="/admin" element={<AdminLogin />} />
                                <Route path="/admin/dashboard" element={<AdminLayout />}>
                                    <Route index element={<DashboardOverview />} />
                                    <Route path="products" element={<ProductManager />} />
                                    <Route path="orders" element={<OrderManager />} />
                                    <Route path="settings" element={<SiteSettings />} />
                                </Route>

                                {/* 404 Route */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <InfiniteMarquee />
                    <Footer />

                    {/* Global Widgets */}
                    <LiveChatWidget />
                    <CompareFloatingBar />
                </div>
            </GlobalErrorBoundary>
        </ToastProvider>
    );
}

export default App;
