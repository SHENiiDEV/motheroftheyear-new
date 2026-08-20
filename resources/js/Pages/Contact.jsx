import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, MapPin, Building2, Phone, Send, CheckCircle2, Clock, ShieldCheck,
    ChevronDown, Check, Menu, X, AlertTriangle
} from 'lucide-react';
import { CURRENCIES } from '@/Utils/currency';
import OfflineBanner from '@/Components/OfflineBanner';
import CookieConsent from '@/Components/CookieConsent';

export default function Contact({ company }) {
    const { flash } = usePage().props;
    const [currency, setCurrency] = useState(() => localStorage.getItem('app_currency') || 'EUR');
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleCurrencySelect = (code) => {
        setCurrency(code);
        localStorage.getItem('app_currency');
        setShowCurrencyMenu(false);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => reset(),
        });
    };

    const companyData = {
        company_name: company?.company_name || company?.name || 'CARING AND SUPPORTIVE SERVICE LTD',
        company_number: company?.company_number || company?.tax_id || '16120199',
        registered_office_address: company?.registered_office_address || company?.address || '58 Mund St, London, United Kingdom, W14 9LZ',
        email: company?.email || 'support@caringandsupportive.co.uk',
        phone: company?.phone || '+44 20 7946 0912',
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="Contact Us — Corporate Desk & Medical Support SLA" />

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
                        <Link href="/support" className="hidden md:inline-block text-xs font-bold text-slate-300 hover:text-white transition-colors">Support & FAQ</Link>
                        <Link href="/contact" className="hidden lg:inline-block text-xs font-bold text-rose-400 border-b border-rose-400">Contact</Link>

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
                    Corporate Desk & Support Escalation
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                    Get in Touch with <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-purple-500">Our Executive Team</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Have questions regarding specialist plans, corporate B2B invoices, or priority pediatric SLA? We are here to assist.
                </p>
            </section>

            {/* Success Flash Toast */}
            {flash?.success && (
                <div className="max-w-4xl mx-auto px-6 mb-8 relative z-10">
                    <div className="bg-emerald-950 border border-emerald-500/40 text-emerald-200 p-4 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                </div>
            )}

            {/* Main Content: Corporate Details & Support Form */}
            <section className="relative z-10 py-8 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                {/* Corporate Issuer Details Box */}
                <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl space-y-6 shadow-xl">
                    <div>
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20 mb-3">
                            Merchant of Record (Issuer)
                        </span>
                        <h3 className="text-xl font-black text-white">{companyData.company_name}</h3>
                        <p className="text-xs text-slate-400 mt-1">Incorporated in England & Wales (Company No. {companyData.company_number})</p>
                    </div>

                    <div className="space-y-4 text-xs font-semibold text-slate-300 border-t border-slate-800/80 pt-6">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400 shrink-0">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registered Office Address</div>
                                <div className="text-slate-200 mt-0.5">{companyData.registered_office_address}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400 shrink-0">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Executive Support Email</div>
                                <a href={`mailto:${companyData.email}`} className="text-rose-300 hover:underline mt-0.5 block">{companyData.email}</a>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400 shrink-0">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Guaranteed Response SLA</div>
                                <div className="text-emerald-400 font-extrabold mt-0.5">24-48 Hours Response Guaranteed</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Support Ticket Form */}
                <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 rounded-3xl shadow-xl">
                    <h3 className="text-xl font-black text-white mb-2">Submit Support Ticket</h3>
                    <p className="text-xs text-slate-400 mb-6">Our client operations desk handles all inquiries under strict SLA protocols.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Your Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Jane Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                />
                                {errors.name && <div className="text-[11px] text-rose-400 mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Your Email *</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="jane@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                />
                                {errors.email && <div className="text-[11px] text-rose-400 mt-1">{errors.email}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Inquiry Subject *</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Wallet Top-Up Invoice / Doctor Selection Assistance"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                            />
                            {errors.subject && <div className="text-[11px] text-rose-400 mt-1">{errors.subject}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">Detailed Message *</label>
                            <textarea
                                required
                                rows={5}
                                placeholder="Describe your question or technical inquiry in detail..."
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors resize-none"
                            />
                            {errors.message && <div className="text-[11px] text-rose-400 mt-1">{errors.message}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all"
                        >
                            <Send className="w-4 h-4" />
                            <span>{processing ? 'Sending Ticket...' : 'Send Support Ticket ↗'}</span>
                        </button>
                    </form>
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
                                    <Link href="/support" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-slate-200">Support & FAQ</Link>
                                    <Link href="/contact" onClick={() => setShowMobileMenu(false)} className="block py-3 px-4 rounded-2xl bg-slate-900 text-rose-300">Contact</Link>
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
