import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HelpCircle, Mail, FileText, Building2, ChevronDown, Check, Menu, X,
    ShieldCheck, Wallet, Lock, ArrowRight, MessageSquare
} from 'lucide-react';
import { CURRENCIES } from '@/Utils/currency';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';

export default function Support({ company }) {
    const [currency, setCurrency] = useState(() => localStorage.getItem('app_currency') || 'EUR');
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    const handleCurrencySelect = (code) => {
        setCurrency(code);
        localStorage.setItem('app_currency', code);
        setShowCurrencyMenu(false);
    };

    const companyData = {
        company_name: company?.company_name || company?.name || 'CARING AND SUPPORTIVE SERVICE LTD',
        company_number: company?.company_number || company?.tax_id || '16120199',
        registered_office_address: company?.registered_office_address || company?.address || '58 Mund St, London, United Kingdom, W14 9LZ',
        email: company?.email || 'support@caringandsupportive.co.uk',
        phone: company?.phone || '+44 20 7946 0912',
    };

    const faqs = [
        {
            q: "How does the weekly specialist care plan billing work?",
            a: "Specialist plans are billed weekly (`/wk`). Money is deducted directly from your profile wallet balance. You can switch your attending pediatrician or pause your plan anytime from your Mother Web Portal."
        },
        {
            q: "What is your 14-day unused wallet balance refund policy?",
            a: "Under UK Consumer Rights Regulations, any unused funds deposited into your digital wallet are 100% eligible for a full refund back to your original payment card within 14 days of deposit."
        },
        {
            q: "How do 0% VAT UK B2B Reverse Charge tax invoices work?",
            a: "All wallet deposits and weekly specialist charges generate an official UK B2B tax invoice issued by CARING AND SUPPORTIVE SERVICE LTD (Company No. 16120199). Invoices are stamped PAID & VERIFIED and feature 0% VAT Reverse Charge compliance for corporate clients."
        },
        {
            q: "Is my baby's sleep journal and medical data private?",
            a: "Yes. All sleep logs, Telegram check-ins, and pediatrician notes are encrypted under strict healthcare privacy standards (GDPR / UK Data Protection Act). Your data is accessible exclusively to you and your assigned medical team."
        },
        {
            q: "How do I download my official B2B PDF tax receipts?",
            a: "Simply navigate to your Mother Web Portal > Wallet & Invoices Ledger (/billing). Next to every deposit and specialist deduction, click the PDF Invoice button to download a clean, print-ready PDF."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="Support & Help Desk — FAQs, Invoices & SLA" />

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
                        <Link href="/about" className="hidden md:inline-block text-xs font-bold text-slate-300 hover:text-white transition-colors">About Us</Link>
                        <Link href="/support" className="hidden md:inline-block text-xs font-bold text-rose-400 border-b border-rose-400">Support & FAQ</Link>
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

            {/* Page Header */}
            <section className="relative z-10 pt-16 pb-12 px-6 max-w-7xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20 mb-4">
                    Client Help Desk & Knowledge Base
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                    Support & <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-500">Frequently Asked Questions</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Everything you need to know about pediatric care plans, 14-day wallet refunds, B2B PDF tax receipts, and clinical Telegram tracking.
                </p>
            </section>

            {/* Support Channels Grid */}
            <section className="relative z-10 py-6 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <a
                    href={`mailto:${companyData.email}`}
                    className="bg-slate-900/80 border border-slate-800 hover:border-rose-500/50 p-6 rounded-3xl backdrop-blur-xl transition-all hover:scale-[1.02] flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white">Executive Email Support</h3>
                        <p className="text-xs text-rose-300 font-semibold mt-0.5">{companyData.email}</p>
                    </div>
                </a>

                <Link
                    href={route('billing.index')}
                    className="bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 p-6 rounded-3xl backdrop-blur-xl transition-all hover:scale-[1.02] flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white">B2B Invoices & Wallet Ledger</h3>
                        <p className="text-xs text-purple-300 font-semibold mt-0.5">Go to /billing Portal ↗</p>
                    </div>
                </Link>

                <Link
                    href="/contact"
                    className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-3xl backdrop-blur-xl transition-all hover:scale-[1.02] flex items-center gap-4"
                >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-white">Corporate Support Desk</h3>
                        <p className="text-xs text-emerald-300 font-semibold mt-0.5">Submit Support Ticket ↗</p>
                    </div>
                </Link>
            </section>

            {/* Interactive FAQ Accordion Section */}
            <section className="relative z-10 py-12 px-6 max-w-4xl mx-auto mb-16">
                <h2 className="text-2xl sm:text-3xl font-black text-white text-center tracking-tight mb-8">
                    Help Center & Policy Details
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = openFaqIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-xl transition-all"
                            >
                                <button
                                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                                    className="w-full p-6 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4"
                                >
                                    <span>{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-rose-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
                                    <Link href="/about" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-slate-200">About Us</Link>
                                    <Link href="/support" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-rose-300">Support & FAQ</Link>
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
