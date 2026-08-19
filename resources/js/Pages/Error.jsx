import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Moon, Home, ArrowLeft, ShieldAlert, AlertTriangle, RefreshCw, HelpCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Error({ status }) {
    const errorConfigs = {
        404: {
            code: '404',
            badge: 'Page Fast Asleep',
            title: 'Lost in the Night Routine',
            description: "The page you are looking for has moved into a different circadian cycle or doesn't exist.",
            icon: Moon,
            color: 'from-purple-500 to-rose-500',
            glow: 'bg-purple-600/20',
        },
        500: {
            code: '500',
            badge: 'System Glitch',
            title: 'Temporary Clinical Rest',
            description: 'Our medical servers encountered an unexpected issue. Our on-call technical team has been notified.',
            icon: AlertTriangle,
            color: 'from-amber-500 to-rose-500',
            glow: 'bg-amber-600/20',
        },
        403: {
            code: '403',
            badge: 'Access Restricted',
            title: 'Restricted Medical Section',
            description: 'You do not have active authorization credentials to access this portal area.',
            icon: ShieldAlert,
            color: 'from-rose-500 to-purple-600',
            glow: 'bg-rose-600/20',
        },
        503: {
            code: '503',
            badge: 'Under Maintenance',
            title: 'Scheduled System Care',
            description: 'We are currently upgrading our pediatric sleep intelligence algorithms. We will be back online shortly.',
            icon: RefreshCw,
            color: 'from-indigo-500 to-purple-500',
            glow: 'bg-indigo-600/20',
        },
    };

    const config = errorConfigs[status] || errorConfigs[404];
    const IconComponent = config.icon;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between items-center relative overflow-hidden font-sans selection:bg-rose-500 selection:text-white p-6">
            <Head title={`${config.code} — ${config.title}`} />

            {/* Glowing background Orbs */}
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] ${config.glow} rounded-full blur-[140px] pointer-events-none`} />

            {/* Top Brand Navbar */}
            <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 relative z-10">
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/images/favicon.png"
                        alt="Mother of the Year Logo"
                        className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-rose-500/30 border border-rose-500/30"
                    />
                    <div className="flex flex-row items-center gap-1.5 leading-none">
                        <span className="font-black text-base tracking-tight text-white whitespace-nowrap">
                            MOTHER
                        </span>
                        <span className="text-xs font-bold text-rose-300 uppercase tracking-wider whitespace-nowrap opacity-90">
                            OF THE YEAR
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <a
                        href="mailto:support@caringandsupportive.co.uk"
                        className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
                    >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Support</span>
                    </a>
                </div>
            </nav>

            {/* Main Error Content Card */}
            <div className="relative z-10 max-w-lg w-full my-auto text-center py-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
                >
                    {/* Big Status Number & Floating Icon */}
                    <div className="relative inline-block">
                        <span className={`text-7xl sm:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r ${config.color}`}>
                            {config.code}
                        </span>
                        <div className="absolute -top-2 -right-4 w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg">
                            <IconComponent className="w-5 h-5 text-rose-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20">
                            {config.badge}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {config.title}
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                            {config.description}
                        </p>
                    </div>

                    {/* Action Navigation Buttons */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
                        >
                            <Home className="w-4 h-4" />
                            <span>Return to Landing Page</span>
                        </Link>

                        <Link
                            href={route('dashboard')}
                            className="w-full sm:w-auto py-3 px-6 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4 text-slate-400" />
                            <span>Mother Dashboard</span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-center text-xs text-slate-500 py-4">
                © {new Date().getFullYear()} CARING AND SUPPORTIVE SERVICE LTD. Company No. 16120199
            </div>
        </div>
    );
}
