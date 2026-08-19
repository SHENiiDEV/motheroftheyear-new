import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('app_cookie_consent');
        if (!consent) {
            // Delay banner appearance slightly for smooth load
            const timer = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = (type = 'all') => {
        localStorage.setItem('app_cookie_consent', type);
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
                >
                    <div className="bg-slate-900/95 border border-slate-800 backdrop-blur-2xl p-5 rounded-3xl shadow-2xl space-y-4 relative">
                        <button
                            onClick={() => handleAccept('essential')}
                            className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                            title="Close"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400">
                                <Cookie className="w-5 h-5" />
                            </div>
                            <div className="space-y-1 pr-4">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                    <span>Cookie & Data Preferences</span>
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    We use essential cookies to secure your portal session and optimize your pediatric sleep tracking experience. Learn more in our{' '}
                                    <Link href={route('legal.privacy')} target="_blank" className="font-semibold text-rose-400 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                            <button
                                onClick={() => handleAccept('all')}
                                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all hover:scale-[1.02]"
                            >
                                Accept All Cookies
                            </button>
                            <button
                                onClick={() => handleAccept('essential')}
                                className="py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all"
                            >
                                Essential Only
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
