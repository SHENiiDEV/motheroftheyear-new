import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, ShieldCheck, Award, Activity, Heart, Clock, Mail, MapPin,
    ChevronDown, Check, Menu, X, Sparkles, User, FileText
} from 'lucide-react';
import { CURRENCIES } from '@/Utils/currency';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';

export default function AboutUs({ company }) {
    const [currency, setCurrency] = useState(() => localStorage.getItem('app_currency') || 'EUR');
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleCurrencySelect = (code) => {
        setCurrency(code);
        localStorage.setItem('app_currency', code);
        setShowCurrencyMenu(false);
    };

    const companyData = company || {
        company_name: 'CARING AND SUPPORTIVE SERVICE LTD',
        company_number: '16120199',
        registered_office_address: '58 Mund St, London, United Kingdom, W14 9LZ',
        email: 'support@caringandsupportive.co.uk',
        phone: '+44 20 7946 0912',
    };

    const bentoStats = [
        {
            title: '5 Board-Certified Specialists',
            number: '100%',
            desc: 'Academically accredited pediatricians & chronobiologists from Harvard, Stanford, and Johns Hopkins.',
            icon: Award,
            color: 'from-rose-500 to-purple-500',
        },
        {
            title: '3x Daily Telegram Care',
            number: '3x / Day',
            desc: 'Proactive morning, afternoon, and evening guidance aligned with your infant circadian windows.',
            icon: Activity,
            color: 'from-purple-500 to-indigo-500',
        },
        {
            title: 'Instant Log Analysis',
            number: '< 60 Sec',
            desc: 'Deep AI-assisted sleep tracking and awakening analysis recorded into your Mother Portal.',
            icon: Clock,
            color: 'from-indigo-500 to-emerald-500',
        },
        {
            title: 'Strict Data Privacy',
            number: 'GDPR / UK',
            desc: '100% encrypted healthcare privacy and complete client data ownership under UK Regulations.',
            icon: ShieldCheck,
            color: 'from-emerald-500 to-teal-500',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="About Us — Mother of the Year Medical Leadership & Mission" />

            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-rose-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Navigation Header */}
            <nav className="relative z-[100] border-b border-slate-800/80 backdrop-blur-md bg-slate-950/80 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img
                            src="/images/favicon.png"
                            alt="Logo"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-lg shadow-rose-500/30 border border-rose-500/30 shrink-0"
                        />
                        <div className="flex flex-row items-center gap-1.5 leading-none">
                            <span className="font-black text-sm sm:text-base tracking-tight text-white whitespace-nowrap">MOTHER</span>
                            <span className="text-[10px] sm:text-xs font-bold text-rose-300 uppercase tracking-wider whitespace-nowrap opacity-90">OF THE YEAR</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <Link href="/how-it-works" className="hidden md:inline-block text-xs font-bold text-slate-300 hover:text-white transition-colors">How It Works</Link>
                        <Link href="/about" className="hidden md:inline-block text-xs font-bold text-rose-400 border-b border-rose-400">About Us</Link>
                        <Link href="/support" className="hidden md:inline-block text-xs font-bold text-slate-300 hover:text-white transition-colors">Support & FAQ</Link>
                        <Link href="/contact" className="hidden lg:inline-block text-xs font-bold text-slate-300 hover:text-white transition-colors">Contact</Link>

                        {/* Floating Currency Selector */}
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all"
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
                                                onClick={() => handleCurrencySelect(curr.code)}
                                                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                                                    currency === curr.code ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-300 hover:bg-slate-800'
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

                        <Link href={route('login')} className="hidden sm:inline-block px-3.5 py-2 text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl">Client Login</Link>
                        <Link href={route('register')} className="hidden sm:inline-block px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl shadow-md">Register</Link>

                        <button onClick={() => setShowMobileMenu(true)} className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                            <Menu className="w-5 h-5 text-rose-400" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mission Statement */}
            <section className="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20 mb-4">
                    Our Mission & Vision
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
                    Restoring Sleep for Infants. <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-500">Bringing Peace to Mothers.</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
                    Mother of the Year was founded with a singular purpose: to remove guesswork from infant sleep management by providing direct daily access to board-certified pediatricians and clinical sleep directors.
                </p>
            </section>

            {/* Bento Statistics Grid */}
            <section className="relative z-10 py-8 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {bentoStats.map((bento, idx) => {
                    const Icon = bento.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${bento.color}`}>
                                        {bento.number}
                                    </span>
                                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                </div>
                                <h3 className="text-base font-black text-white mb-1">{bento.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{bento.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Official Corporate Issuer Block */}
            <section className="relative z-10 py-12 px-6 max-w-5xl mx-auto mb-16">
                <div className="bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl shadow-2xl space-y-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="space-y-3 max-w-xl">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20">
                            Corporate Issuer & Merchant of Record
                        </span>
                        <h3 className="text-2xl font-black text-white">{companyData.company_name}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Incorporated and registered in England & Wales under Company No. <strong>{companyData.company_number}</strong>.<br />
                            Registered Office: {companyData.registered_office_address}.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
                        <Link
                            href="/contact"
                            className="py-3.5 px-6 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-500/25 text-center transition-all"
                        >
                            Contact Corporate Desk ↗
                        </Link>
                        <Link
                            href="/privacy-policy"
                            className="py-3.5 px-6 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl text-center transition-all"
                        >
                            View Legal Compliance
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 pt-12 pb-8 px-6 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>© {new Date().getFullYear()} CARING AND SUPPORTIVE SERVICE LTD (Co. No. 16120199).</div>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-slate-300">Terms of Service</Link>
                        <Link href="/contact" className="hover:text-slate-300">Contact</Link>
                    </div>
                </div>
            </footer>

            {/* System Utilities & Mobile Drawer */}
            <OfflineBanner />
            <CookieConsent />

            <AnimatePresence>
                {showMobileMenu && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMobileMenu(false)} className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl z-[999999] md:hidden" />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 220 }} className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-slate-950 border-l border-slate-800 p-6 z-[1000000] md:hidden flex flex-col justify-between overflow-y-auto">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-2">
                                        <img src="/images/favicon.png" alt="Logo" className="w-8 h-8 rounded-xl object-cover" />
                                        <span className="font-black text-sm text-white">MOTHER OF THE YEAR</span>
                                    </div>
                                    <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-xl bg-slate-900"><X className="w-5 h-5 text-slate-300" /></button>
                                </div>
                                <div className="space-y-2 font-semibold text-sm">
                                    <Link href="/how-it-works" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-slate-200">How It Works</Link>
                                    <Link href="/about" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-rose-300">About Us</Link>
                                    <Link href="/support" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-slate-200">Support & FAQ</Link>
                                    <Link href="/contact" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-slate-200">Contact</Link>
                                </div>
                            </div>
                            <div className="space-y-3 pt-6 border-t border-slate-800">
                                <Link href={route('login')} className="block w-full py-3.5 text-center text-xs font-bold text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-2xl">Client Login</Link>
                                <Link href={route('register')} className="block w-full py-3.5 text-center text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl">Create Account</Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
