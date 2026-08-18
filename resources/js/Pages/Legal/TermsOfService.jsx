import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Moon, ArrowLeft, FileCheck, DollarSign, RefreshCw, AlertCircle } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="Terms of Service — Mother of the Year" />

            {/* Navbar */}
            <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                            <Moon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-rose-300">
                            Mother of the Year
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
                <div className="space-y-4 border-b border-slate-800 pb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-bold uppercase tracking-wider">
                        <FileCheck className="w-4 h-4 text-rose-400" /> Platform Terms
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Terms of Service & Clinical Subscription Agreement</h1>
                    <p className="text-slate-400 text-sm">Effective Date: August 10, 2026 | Revision 2.4</p>
                </div>

                <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            1. Acceptance of Terms & Service Overview
                        </h2>
                        <p>
                            By subscribing to or interacting with Mother of the Year ("Platform"), you agree to be bound by these Terms of Service. Mother of the Year provides a hybrid clinical sleep coaching infrastructure comprising:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-slate-400">
                            <li>Proactive 3x daily AI-guided sleep logging via Telegram.</li>
                            <li>Continuous sleep metrics processing and maternal fatigue trend visualization.</li>
                            <li>Professional clinical oversight by board-certified pediatric sleep specialists.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-400" /> 2. Subscription Fees, Tiers & Automatic Renewal
                        </h2>
                        <p>
                            Subscription pricing varies according to your selected specialist ($49.00/month, $75.00/month, or $99.00/month). Subscriptions automatically renew every 30 days unless canceled at least 24 hours prior to the billing date.
                        </p>
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-slate-400 space-y-1">
                            <div>• <strong>Cancellation Policy:</strong> You may cancel your subscription anytime via your account portal or by emailing support@motheroftheyear.com.</div>
                            <div>• <strong>Refund Policy:</strong> 14-day money-back guarantee for first-time subscribers if you are not fully satisfied with your sleep plan.</div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-purple-400" /> 3. Telegram Automation & Interactive Bot Usage
                        </h2>
                        <p>
                            Upon selecting a physician, you will receive a unique cryptographic token linking your account to our Telegram assistant. You agree to submit truthful, accurate sleep information. Automated 3x daily check-ins occur at standard time windows (Morning ~09:00, Afternoon ~14:00, Evening ~21:00 local time).
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-rose-400" /> 4. Intellectual Property & Acceptable Use
                        </h2>
                        <p>
                            All platform materials, medical sleep algorithms, proprietary AI prompt frameworks, and dashboard design elements are protected under international copyright laws. Users may not copy, reverse-engineer, or redistribute platform content.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
