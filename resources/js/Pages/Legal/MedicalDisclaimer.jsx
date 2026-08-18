import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Moon, ArrowLeft, AlertTriangle, Stethoscope, PhoneCall, ShieldAlert } from 'lucide-react';

export default function MedicalDisclaimer() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="Medical & AI Disclaimer — Mother of the Year" />

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
                        <AlertTriangle className="w-4 h-4 text-rose-400" /> Clinical Notice
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Medical & AI Advisory Disclaimer</h1>
                    <p className="text-slate-400 text-sm">Mandatory Clinical & Emergency Information</p>
                </div>

                <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
                    {/* RED EMERGENCY BOX */}
                    <div className="bg-gradient-to-r from-rose-950/80 to-slate-900 border-2 border-rose-500/60 rounded-3xl p-8 shadow-2xl space-y-4">
                        <div className="flex items-center gap-3 text-rose-400 font-black text-xl">
                            <PhoneCall className="w-6 h-6 animate-pulse" /> EMERGENCY MEDICAL PROTOCOL
                        </div>
                        <p className="text-rose-200 text-sm leading-relaxed">
                            <strong>MOTHER OF THE YEAR IS NOT AN EMERGENCY MEDICAL SERVICE.</strong> IF YOUR INFANT IS EXPERIENCING HIGH FEVER, DIFFICULTY BREATHING, UNRESPONSIVENESS, SEVERE ILLNESS, OR IF YOU ARE EXPERIENCING ACUTE POSTPARTUM DEPRESSION OR THOUGHTS OF SELF-HARM, <strong>CALL 911 (OR YOUR LOCAL EMERGENCY NUMBER) IMMEDIATELY OR VISIT THE NEAREST EMERGENCY ROOM.</strong>
                        </p>
                    </div>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Stethoscope className="w-5 h-5 text-purple-400" /> 1. Scope of Service & Clinical Boundaries
                        </h2>
                        <p>
                            Mother of the Year is an adjunct wellness, sleep journaling, and behavioral coaching platform. While our specialists are accredited physicians and pediatric sleep experts, digital interactions through Telegram and our web portal do not constitute a formal hospital admission or hands-on clinical examination.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-indigo-400" /> 2. Role of Automated AI Intelligence Core
                        </h2>
                        <p>
                            Our automated Telegram check-in system utilizes natural language processing AI to collect journal entries, calculate routine metrics, and provide initial empathetic feedback.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-400">
                            <li>Automated AI messages are designed for supportive behavioral check-ins and are <strong>not standalone medical diagnoses</strong>.</li>
                            <li>Critical fatigue triggers or distress messages automatically create alerts for human physician review.</li>
                            <li>Physicians review patient trends during business hours and communicate via the physician portal.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            3. Maternal Mental Health & Postpartum Support
                        </h2>
                        <p>
                            Maternal exhaustion and postpartum mood changes are serious medical conditions. Our platform actively screens for fatigue thresholds to support mothers. If you feel overwhelmed, we encourage discussing symptoms with your primary obstetrician or psychiatric healthcare provider.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
