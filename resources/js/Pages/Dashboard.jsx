import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Moon, Send, Sparkles, CheckCircle2, Clock, Calendar, MessageSquare, Zap, Activity, Smile, Frown, Meh, ArrowRight, ShieldCheck, GraduationCap, Check, ShieldAlert, Plus, Baby, AlertTriangle } from 'lucide-react';
import { CURRENCIES, formatPrice } from '@/Utils/currency';

export default function Dashboard({ user, company, children, sleepLogs, stats, telegramUrl, specialists, recentInvoices }) {
    const { flash, errors } = usePage().props;
    const [showChangeSpecialistModal, setShowChangeSpecialistModal] = useState(false);
    const [showAddChildModal, setShowAddChildModal] = useState(false);
    const [showSosModal, setShowSosModal] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState(children?.[0]?.id || null);

    // Currency selector state (Default: EUR)
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('app_currency') || 'EUR';
    });

    // Form for logging web sleep entry directly
    const logForm = useForm({
        message: '',
        child_id: selectedChildId,
    });

    // Form for changing specialist tier
    const specialistForm = useForm({
        specialist_id: user.specialist_id || 2,
    });

    // Form for adding a child
    const childForm = useForm({
        name: '',
        birth_date: '',
        gender: 'boy',
        is_twin: false,
        notes: '',
    });

    // Form for SOS Alert
    const sosForm = useForm({
        reason: '',
    });

    const handleLogSubmit = (e) => {
        e.preventDefault();
        logForm.setData('child_id', selectedChildId);
        logForm.post(route('client.log'), {
            onSuccess: () => logForm.reset('message'),
        });
    };

    const handleSpecialistSubmit = (id) => {
        specialistForm.setData('specialist_id', id);
        specialistForm.post(route('client.specialist'), {
            onSuccess: () => setShowChangeSpecialistModal(false),
        });
    };

    const handleChildSubmit = (e) => {
        e.preventDefault();
        childForm.post(route('client.child'), {
            onSuccess: () => {
                setShowAddChildModal(false);
                childForm.reset();
            },
        });
    };

    const handleSosSubmit = (e) => {
        e.preventDefault();
        sosForm.post(route('client.sos'), {
            onSuccess: () => {
                setShowSosModal(false);
                sosForm.reset();
            },
        });
    };

    // Filter logs for selected child if any
    const filteredLogs = selectedChildId
        ? (sleepLogs || []).filter((log) => !log.child_id || log.child_id === selectedChildId)
        : (sleepLogs || []);

    // Recharts data (chronological)
    const chartData = filteredLogs
        .slice()
        .reverse()
        .map((log) => ({
            date: log.date,
            hours: log.hours_slept ? Number(log.hours_slept) : 0,
            awakenings: log.awakenings_count ? Number(log.awakenings_count) : 0,
        }));

    const getMoodIcon = (score) => {
        if (score >= 4) return <Smile className="w-4 h-4 text-emerald-400" />;
        if (score === 3) return <Meh className="w-4 h-4 text-amber-400" />;
        return <Frown className="w-4 h-4 text-rose-400" />;
    };

    return (
        <AuthenticatedLayout
            selectedCurrency={currency}
            onCurrencyChange={(c) => setCurrency(c)}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-slate-100 leading-tight flex items-center gap-3">
                            Welcome, {user.name} 👋
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Your Personal Mother Web Portal & Infant Sleep Intelligence Journal
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Emergency SOS Button */}
                        <button
                            onClick={() => setShowSosModal(true)}
                            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-all animate-pulse"
                        >
                            <ShieldAlert className="w-4 h-4" /> Priority SOS
                        </button>

                        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-2xl backdrop-blur-xl">
                            <img
                                src={user.specialist?.avatar}
                                alt={user.specialist?.name}
                                className="w-10 h-10 rounded-full object-cover border border-rose-500"
                            />
                            <div>
                                <div className="text-xs text-slate-400">Attending Physician:</div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    {user.specialist?.name}
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                        {formatPrice(user.weekly_price, currency)}/wk
                                    </span>
                                </div>
                            </div>

                            <div className="h-8 w-px bg-slate-800 mx-1" />

                            <div>
                                <div className="text-[10px] text-slate-400">Wallet Balance:</div>
                                <div className="text-xs font-black text-emerald-400">
                                    {formatPrice(user.wallet_balance, currency)}
                                </div>
                            </div>

                            <Link
                                href={route('billing.index')}
                                className="ml-2 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-xs font-bold text-rose-300 rounded-xl border border-rose-500/30 transition-colors"
                            >
                                Wallet & Billing
                            </Link>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Mother Portal — Sleep Journal & Attending Physician" />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Success Flash Toast */}
                {flash?.success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-medium"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        {flash.success}
                    </motion.div>
                )}

                {/* Multi-Child Profile Switcher & Selector */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                            <Baby className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white">Children Profiles & Twins Alignment</h3>
                            <p className="text-xs text-slate-400">Select child profile to view custom sleep journals and circadian analytics.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {children && children.length > 0 ? (
                            children.map((child) => (
                                <button
                                    key={child.id}
                                    onClick={() => setSelectedChildId(child.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                                        selectedChildId === child.id
                                            ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/25'
                                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                                    }`}
                                >
                                    <span>{child.gender === 'girl' ? '👧' : '👶'}</span>
                                    <span>{child.name} ({child.age_months}m)</span>
                                    {child.is_twin && <span className="text-[10px] bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-200">Twin</span>}
                                </button>
                            ))
                        ) : (
                            <span className="text-xs text-slate-500">No child profiles added yet.</span>
                        )}

                        <button
                            onClick={() => setShowAddChildModal(true)}
                            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add Child Profile
                        </button>
                    </div>
                </div>

                {/* Top Bento Grid Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* 7-Day Sleep Avg */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">7-Day Avg Sleep</span>
                            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                                <Moon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-white">{stats.avgSleepHours} <span className="text-sm font-normal text-slate-400">hrs/day</span></div>
                        <div className="text-xs text-slate-400 mt-1">Average sleep duration</div>
                    </div>

                    {/* Awakenings Avg */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Night Awakenings</span>
                            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-purple-300">{stats.avgAwakenings} <span className="text-sm font-normal text-slate-400">wakeups/night</span></div>
                        <div className="text-xs text-slate-400 mt-1">Nighttime wake frequency</div>
                    </div>

                    {/* Total Entries */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Journal Entries</span>
                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                                <Calendar className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-white">{stats.totalEntries}</div>
                        <div className="text-xs text-slate-400 mt-1">Logged sleep records</div>
                    </div>

                    {/* Telegram Connection Box */}
                    <div className="bg-gradient-to-br from-sky-950/80 to-slate-900 border border-sky-500/30 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Telegram Medical Channel</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.telegram_id ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                                {user.telegram_id ? 'Linked' : 'Pending Link'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-300 mb-3">
                            Connect Telegram for 3x daily proactive check-ins from {user.specialist?.name}.
                        </p>
                        <a
                            href={telegramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-3 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20"
                        >
                            <Send className="w-3.5 h-3.5" /> Launch Telegram Channel
                        </a>
                    </div>
                </div>

                {/* Direct Web Journal Logging & Recharts Graph */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Log New Sleep Entry (Web Chat) */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4 flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-rose-400" /> Log Sleep Entry via Web
                            </h3>
                            <p className="text-xs text-slate-400">
                                Type how your baby slept last night. Your attending physician will analyze your hours and log metrics automatically.
                            </p>
                        </div>

                        <form onSubmit={handleLogSubmit} className="space-y-4 pt-2">
                            <textarea
                                rows={4}
                                required
                                placeholder="e.g. Baby slept 6.5 hours last night with 2 wakeups for feeding. I feel well rested today!"
                                value={logForm.data.message}
                                onChange={(e) => logForm.setData('message', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors resize-none placeholder-slate-600"
                            />

                            <button
                                type="submit"
                                disabled={logForm.processing}
                                className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 hover:opacity-95 transition-all"
                            >
                                <Send className="w-4 h-4" />
                                {logForm.processing ? 'Analyzing Entry...' : 'Submit Journal Entry'}
                            </button>
                        </form>
                    </div>

                    {/* Sleep Duration Recharts Graph */}
                    <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Moon className="w-5 h-5 text-rose-400" /> Sleep Duration Trends
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">Nocturnal sleep hours logged over recent days</p>
                        </div>

                        {chartData.length > 0 ? (
                            <div className="h-64 w-full pt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                                        <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 12]} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#0f172a',
                                                borderColor: '#334155',
                                                borderRadius: '12px',
                                                color: '#fff',
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="hours"
                                            name="Hours Slept"
                                            stroke="#f43f5e"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorHours)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="py-16 text-center text-slate-500">
                                No sleep logs recorded yet. Submit your first entry above!
                            </div>
                        )}
                    </div>
                </div>

                {/* Sleep Journal Logs Timeline */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6">
                    <h3 className="text-lg font-bold text-white">Your Sleep Journal & Physician Feedback</h3>

                    <div className="space-y-4">
                        {filteredLogs && filteredLogs.length > 0 ? (
                            filteredLogs.map((log) => (
                                <div key={log.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-rose-300 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                                                {log.date} ({log.period})
                                            </span>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                                <Clock className="w-3.5 h-3.5 text-slate-500" />
                                                Sleep: <strong className="text-white">{log.hours_slept ?? 'N/A'} hrs</strong>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-300">
                                                Awakenings: <strong className="text-white">{log.awakenings_count ?? 'N/A'}</strong>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <span>Mood Rating:</span>
                                            <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                                                {getMoodIcon(log.mood_score)}
                                                <span className="font-bold text-white">{log.mood_score}/5</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Your Journal Message:</div>
                                        <p className="text-sm text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 italic">
                                            "{log.raw_text}"
                                        </p>
                                    </div>

                                    {log.ai_analysis?.reply_message && (
                                        <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-3 space-y-1">
                                            <div className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                                                🩺 Clinical Recommendation from {user.specialist?.name}:
                                            </div>
                                            <p className="text-xs text-purple-200">
                                                {log.ai_analysis.reply_message}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                No journal entries logged yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Child Profile Modal */}
            <AnimatePresence>
                {showAddChildModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setShowAddChildModal(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2"
                            >
                                ✕
                            </button>

                            <h3 className="text-xl font-bold text-white mb-1">Add Child Profile</h3>
                            <p className="text-xs text-slate-400 mb-6">Create a dedicated sleep profile for your baby or twins.</p>

                            <form onSubmit={handleChildSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Child's Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Leo / Maya"
                                        value={childForm.data.name}
                                        onChange={(e) => childForm.setData('name', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={childForm.data.birth_date}
                                        onChange={(e) => childForm.setData('birth_date', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Gender
                                        </label>
                                        <select
                                            value={childForm.data.gender}
                                            onChange={(e) => childForm.setData('gender', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                        >
                                            <option value="boy">Boy 👦</option>
                                            <option value="girl">Girl 👧</option>
                                        </select>
                                    </div>

                                    <div className="flex items-center pt-6">
                                        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 font-semibold">
                                            <input
                                                type="checkbox"
                                                checked={childForm.data.is_twin}
                                                onChange={(e) => childForm.setData('is_twin', e.target.checked)}
                                                className="rounded bg-slate-950 border-slate-800 text-rose-500 focus:ring-0"
                                            />
                                            <span>Twin / Multiple</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={childForm.processing}
                                    className="w-full mt-4 py-3.5 px-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/25 transition-opacity"
                                >
                                    {childForm.processing ? 'Creating Profile...' : 'Save Child Profile'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Priority SOS Escalation Modal */}
            <AnimatePresence>
                {showSosModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-slate-900 border border-rose-500/50 rounded-3xl p-8 max-w-md w-full shadow-2xl relative space-y-4"
                        >
                            <button
                                onClick={() => setShowSosModal(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2"
                            >
                                ✕
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white">Emergency SOS Escalation</h3>
                                    <div className="text-xs text-rose-400 font-bold">Priority SLA Escalation (&lt;5 min response)</div>
                                </div>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">
                                Use this emergency button if you or your baby are experiencing severe sleep distress, crying crisis, or acute emotional exhaustion.
                            </p>

                            <form onSubmit={handleSosSubmit} className="space-y-4 pt-2">
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Describe your emergency crisis (e.g., Baby crying uncontrollably for 3 hours, mother severely exhausted)..."
                                    value={sosForm.data.reason}
                                    onChange={(e) => sosForm.setData('reason', e.target.value)}
                                    className="w-full bg-slate-950 border border-rose-500/40 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors resize-none placeholder-slate-600"
                                />

                                <button
                                    type="submit"
                                    disabled={sosForm.processing}
                                    className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-rose-600/40 flex items-center justify-center gap-2 hover:opacity-95 transition-all"
                                >
                                    <ShieldAlert className="w-4 h-4" />
                                    {sosForm.processing ? 'Dispatching Emergency Alert...' : 'Dispatch Immediate Emergency SOS'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Change AI Specialist Modal */}
            <AnimatePresence>
                {showChangeSpecialistModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
                        >
                            <button
                                onClick={() => setShowChangeSpecialistModal(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2"
                            >
                                ✕
                            </button>

                            <div>
                                <h3 className="text-2xl font-black text-white">Select Your Attending Pediatric Specialist</h3>
                                <p className="text-xs text-slate-400 mt-1">Upgrade or switch your attending physician tier anytime. Fees are immediately deducted from your wallet balance.</p>
                            </div>

                            {errors?.wallet && (
                                <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center justify-between">
                                    <span>⚠️ {errors.wallet}</span>
                                    <Link
                                        href={route('billing.index')}
                                        className="px-3 py-1.5 bg-rose-500 text-white font-bold rounded-lg text-xs hover:bg-rose-600 transition-colors"
                                    >
                                        Top-Up Wallet
                                    </Link>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {specialists.map((spec) => (
                                    <div
                                        key={spec.id}
                                        onClick={() => handleSpecialistSubmit(spec.id)}
                                        className={`p-5 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                                            user.specialist_id === spec.id
                                                ? 'bg-rose-500/20 border-rose-500 text-white shadow-xl shadow-rose-500/10'
                                                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                                        }`}
                                    >
                                        <div>
                                            <img src={spec.avatar} alt={spec.name} className="w-20 h-20 rounded-2xl object-cover mb-3 mx-auto border-2 border-rose-500/40" />
                                            <div className="font-extrabold text-base text-center text-white">{spec.name}</div>
                                            <div className="text-[11px] font-semibold text-rose-300 text-center mt-0.5">{spec.title}</div>
                                            <div className="text-[10px] text-slate-400 text-center mt-1 flex items-center justify-center gap-1">
                                                <GraduationCap className="w-3 h-3 text-purple-400" /> {spec.alma_mater}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                                            {spec.diplomas?.slice(0, 2).map((d, i) => (
                                                <div key={i} className="text-[10px] text-slate-300 flex items-center gap-1.5">
                                                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                                                    <span className="truncate">{d}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-400">Weekly Care Plan:</span>
                                            <span className="text-xl font-black text-white">{formatPrice(spec.price, currency)} <span className="text-xs font-normal text-slate-400">/ wk</span></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
