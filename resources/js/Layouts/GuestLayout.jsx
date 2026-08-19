import { Link } from '@inertiajs/react';
import { Moon, ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';
import { CURRENCIES } from '@/Utils/currency';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuestLayout({ children }) {
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('app_currency') || 'EUR';
    });
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

    const handleCurrencySelect = (code) => {
        setCurrency(code);
        localStorage.setItem('app_currency', code);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white">
            {/* Glowing background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Navigation Header for Guest Pages */}
            <nav className="w-full relative z-20 border-b border-slate-800/80 backdrop-blur-md bg-slate-950/80 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img
                            src="/images/favicon.png"
                            alt="Mother of the Year Logo"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-lg shadow-rose-500/30 border border-rose-500/30 shrink-0"
                        />
                        <div className="flex flex-row items-center gap-1.5 leading-none">
                            <span className="font-black text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
                                MOTHER
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-rose-300 uppercase tracking-wider whitespace-nowrap opacity-90">
                                OF THE YEAR
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        {/* Interactive Floating Currency Dropdown */}
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
                            >
                                <span>{CURRENCIES[currency]?.flag}</span>
                                <span className="font-extrabold">{currency}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showCurrencyMenu ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showCurrencyMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-36 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl p-1.5 z-50 space-y-1"
                                    >
                                        {Object.values(CURRENCIES).map((curr) => (
                                            <button
                                                key={curr.code}
                                                onClick={() => {
                                                    handleCurrencySelect(curr.code);
                                                    setShowCurrencyMenu(false);
                                                }}
                                                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                                                    currency === curr.code
                                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                        : 'text-slate-300 hover:bg-slate-800'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>{curr.flag}</span>
                                                    <span>{curr.code}</span>
                                                </span>
                                                {currency === curr.code && <Check className="w-3.5 h-3.5 text-rose-400" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href={route('login')}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-rose-300 hover:text-white bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all whitespace-nowrap shrink-0"
                        >
                            Log In
                        </Link>

                        <Link
                            href={route('register')}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0"
                        >
                            Register
                        </Link>

                        <Link
                            href="/"
                            className="hidden sm:inline-block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-all whitespace-nowrap shrink-0"
                        >
                            Doctors ↗
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Auth Card Container */}
            <div className="relative z-10 w-full max-w-md my-auto p-4 sm:p-6">
                <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4">
                    {children}
                </div>
            </div>

            {/* Footer Copy */}
            <div className="relative z-10 py-6 text-center text-xs text-slate-500">
                © {new Date().getFullYear()} CARING AND SUPPORTIVE SERVICE LTD. All rights reserved.
            </div>
        </div>
    );
}
