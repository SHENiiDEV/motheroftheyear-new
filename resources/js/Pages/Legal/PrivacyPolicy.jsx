import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Moon, ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="Privacy Policy — Mother of the Year" />

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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-wider">
                        <Shield className="w-4 h-4 text-purple-400" /> Compliance & Protection
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Privacy Policy & Data Security</h1>
                    <p className="text-slate-400 text-sm">Effective Date: August 10, 2026 | Last Updated: August 2026</p>
                </div>

                <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Lock className="w-5 h-5 text-rose-400" /> 1. Commitment to Health Data Confidentiality
                        </h2>
                        <p>
                            Mother of the Year ("Company", "We", "Our", or "Us") operates an advanced maternal health and infant sleep management platform connecting mothers with board-certified pediatric sleep physicians. We prioritize the security, confidentiality, and protection of your personal health data, daily sleep logs, and maternal well-being entries.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Eye className="w-5 h-5 text-purple-400" /> 2. Information We Collect
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400">
                            <li><strong>Account Identifiers:</strong> Name, professional or personal email address, and encrypted Telegram user identification numbers (<code className="text-rose-300">telegram_id</code>).</li>
                            <li><strong>Sleep Journal Entries:</strong> Self-reported nocturnal sleep duration, infant awakening frequencies, daytime nap notes, and subjective maternal fatigue ratings.</li>
                            <li><strong>Automated Natural Language Logs:</strong> Text responses submitted during 3x daily proactive AI check-ins to monitor infant sleep architecture and maternal mood score.</li>
                            <li><strong>Physician Clinical Communication:</strong> Direct messages exchanged between you and your assigned physician via our physician CRM dashboard.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-400" /> 3. How Artificial Intelligence Processes Your Data
                        </h2>
                        <p>
                            Our proprietary <strong>AI Sleep Intelligence Engine</strong> automatically parses natural language journal entries sent via Telegram to calculate numerical metrics (sleep hours, awakenings, mood score).
                        </p>
                        <p className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs text-slate-300">
                            <strong>Note on AI Privacy:</strong> Natural language processing occurs in encrypted memory environments. Your health metrics are processed solely for personal daily logging, trend visualization on your doctor's dashboard, and emergency fatigue risk triaging. We never sell your health data to third-party advertisers.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-emerald-400" /> 4. Data Sharing & Physician Access
                        </h2>
                        <p>
                            Your sleep logs, calculated metrics, and automated risk alerts are strictly restricted to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-slate-400">
                            <li>You (the mother/account holder).</li>
                            <li>Your specifically selected board-certified sleep specialist.</li>
                            <li>Authorized medical software system administrators under strict HIPAA/GDPR non-disclosure agreements.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            5. Data Retention & Account Erasure Rights
                        </h2>
                        <p>
                            You maintain full ownership of your journal logs. You may request complete erasure of your profile and sleep records at any time by contacting <a href="mailto:privacy@motheroftheyear.com" className="text-rose-400 underline">privacy@motheroftheyear.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
