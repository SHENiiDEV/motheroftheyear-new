import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Moon, Wallet, FileText, CheckCircle2, ShieldCheck, ArrowRight, Clock, User,
    Send, ChevronDown, Check, Menu, X, Sparkles, Activity, Award, HelpCircle
} from 'lucide-react';
import { CURRENCIES, formatPrice } from '@/Utils/currency';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';

export default function HowItWorks() {
    const [currency, setCurrency] = useState(() => localStorage.getItem('app_currency') || 'EUR');
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleCurrencySelect = (code) => {
        setCurrency(code);
        localStorage.setItem('app_currency', code);
        setShowCurrencyMenu(false);
    };

    const steps = [
        {
            num: '01',
            title: 'Instant Provisioning & Digital Wallet',
            badge: 'Step 1 — Onboarding',
            icon: Wallet,
            color: 'from-purple-500 to-rose-500',
            desc: 'Fast account creation, multi-currency balance (EUR / USD / GBP) without forced subscriptions, 14-day money-back guarantee on unused wallet funds, and official UK B2B PDF tax invoices.',
            highlights: ['Multi-Currency Wallet (EUR/USD/GBP)', '14-Day Refund Guarantee', 'Official UK B2B PDF Receipts'],
        },
        {
            num: '02',
            title: 'Pediatric Sleep Architecture & Medical Discovery',
            badge: 'Step 2 — Clinical Analysis',
            icon: Activity,
            color: 'from-rose-500 to-purple-600',
            desc: 'Personalized evaluation of your infant circadian rhythms, night awakening patterns, and daytime naps by board-certified pediatricians and chronobiologists in < 60 seconds.',
            highlights: ['Board-Certified Pediatric Specialists', 'Circadian Rhythm Alignment', 'AI-Assisted Sleep Log Analysis'],
        },
        {
            num: '03',
            title: 'Telegram Proactive Check-Ins (3x Daily)',
            badge: 'Step 3 — Active Care',
            icon: Send,
            color: 'from-indigo-500 to-purple-500',
            desc: 'Proactive morning, afternoon, and evening guidance delivered directly to your Telegram chat by your assigned medical team according to your baby’s exact sleep windows.',
            highlights: ['Morning, Afternoon & Evening Prompts', 'Natural Language Journaling', 'Priority SLA Response'],
        },
        {
            num: '04',
            title: 'Turnkey Mother Dashboard & Tax Invoices',
            badge: 'Step 4 — Complete Control',
            icon: FileText,
            color: 'from-emerald-500 to-teal-500',
            desc: 'Real-time interactive sleep graphs, awakening history, emergency 🚨 Priority SOS escalation, doctor switching, and downloadable PDF tax receipts stamped PAID & VERIFIED.',
            highlights: ['Interactive Sleep Graphs & Trends', '🚨 Priority Emergency SOS Escalation', 'Downloadable PDF Invoices with Stamped Seal'],
        },
    ];

    const tiers = [
        {
            name: 'Starter Care Plan',
            price: 49,
            tier: 'Standard',
            badge: 'Essential Sleep Care',
            doctor: 'Dr. Sarah Jenkins, M.D.',
            features: ['Daily Telegram Journaling', 'Weekly Progress Graph', 'Basic Night Awakening Logs', 'Email Support Access'],
            popular: false,
        },
        {
            name: 'Clinical Pro Executive',
            price: 199,
            tier: 'Executive',
            badge: 'Most Popular Choice',
            doctor: 'Dr. Amanda Vance, M.D., Ph.D.',
            features: ['3x Daily Telegram Check-Ins', 'Direct Senior Pediatrician Review', 'Interactive Mother Web Portal', 'Instant B2B PDF Tax Invoices', '1-on-1 Sleep Architecture Plan'],
            popular: true,
        },
        {
            name: 'VIP Concierge Chair',
            price: 499,
            tier: 'VIP Concierge',
            badge: '24/7 Priority SLA',
            doctor: 'Dr. Victoria Montgomery, M.D.',
            features: ['Unlimited 24/7 Telegram Escalation', 'Direct Medical Director Monitoring', '🚨 <5 Min Emergency SOS SLA', 'Full Family Multi-Child Profiles', 'Custom Pediatrician Consultations'],
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="How It Works — Mother of the Year Workflow & Care Tiers" />

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
                        <Link href="/how-it-works" className="hidden md:inline-block text-xs font-bold text-rose-400 border-b border-rose-400">How It Works</Link>
                        <Link href="/about" className="hidden md:inline-block text-xs font-bold text-slate-300 hover:text-white transition-colors">About Us</Link>
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

            {/* Page Title Header */}
            <section className="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20 mb-4">
                    Pediatric Workflow Architecture
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                    How <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-500">Mother of the Year</span> Works
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    A seamless 4-step workflow designed to restore peaceful night sleep for your baby and bring complete rest to your family.
                </p>
            </section>

            {/* Step-by-Step Workflow Section */}
            <section className="relative z-10 py-12 px-6 max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.num}
                                whileHover={{ scale: 1.01 }}
                                className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${step.color}`}>
                                            {step.num}
                                        </span>
                                        <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20 mb-2">
                                        {step.badge}
                                    </span>

                                    <h3 className="text-xl font-black text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                <ul className="space-y-2 border-t border-slate-800/80 pt-4 text-xs font-semibold text-slate-300">
                                    {step.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Care Packages Grid Section */}
            <section className="relative z-10 py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                        Transparent Specialist Care Plans
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Billed weekly (`/wk`) with 0% hidden fees, full 14-day unused balance refund guarantee, and downloadable B2B PDF tax receipts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between relative ${
                                tier.popular
                                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-rose-500/60 shadow-2xl shadow-rose-500/10'
                                    : 'bg-slate-900/70 border border-slate-800'
                            }`}
                        >
                            {tier.popular && (
                                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-md">
                                    {tier.badge}
                                </span>
                            )}

                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{tier.tier}</div>
                                <h3 className="text-xl font-black text-white mb-2">{tier.name}</h3>
                                <div className="text-3xl font-black text-rose-300 mb-4">
                                    {formatPrice(tier.price, currency)} <span className="text-xs text-slate-400 font-semibold">/ week</span>
                                </div>
                                <div className="text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 p-3 rounded-xl mb-6">
                                    Attending: <span className="text-rose-300 font-extrabold">{tier.doctor}</span>
                                </div>

                                <ul className="space-y-3 text-xs text-slate-300 font-medium mb-8">
                                    {tier.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href={route('register')}
                                className={`w-full py-3.5 text-center text-xs font-extrabold rounded-2xl transition-all ${
                                    tier.popular
                                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg shadow-rose-500/25 hover:scale-[1.02]'
                                        : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800'
                                }`}
                            >
                                Select Care Plan ↗
                            </Link>
                        </div>
                    ))}
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

            {/* System Utilities & Root Level Mobile Drawer */}
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
                                    <Link href="/how-it-works" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-rose-300">How It Works</Link>
                                    <Link href="/about" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-slate-200">About Us</Link>
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
