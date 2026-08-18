import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowLeft, Send, Moon, Smile, Frown, Meh, Clock, CheckCircle2 } from 'lucide-react';

export default function Show({ client }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    const handleSendMessage = (e) => {
        e.preventDefault();
        post(route('doctor.clients.send-message', client.id), {
            onSuccess: () => reset('message'),
        });
    };

    // Prepare charts data (chronological order)
    const chartData = (client.sleep_logs || [])
        .slice()
        .reverse()
        .map((log) => ({
            date: log.date,
            hours: log.hours_slept ? Number(log.hours_slept) : 0,
            awakenings: log.awakenings_count ? Number(log.awakenings_count) : 0,
            mood: log.mood_score || 3,
        }));

    const getMoodIcon = (score) => {
        if (score >= 4) return <Smile className="w-4 h-4 text-emerald-400" />;
        if (score === 3) return <Meh className="w-4 h-4 text-amber-400" />;
        return <Frown className="w-4 h-4 text-rose-400" />;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('dashboard')}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h2 className="font-bold text-xl text-slate-100 leading-tight flex items-center gap-2">
                                {client.name}
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-slate-700">
                                    {client.status === 'active' ? 'Active in Telegram' : 'Pending Link'}
                                </span>
                            </h2>
                            <p className="text-xs text-slate-400">
                                {client.telegram_username ? `@${client.telegram_username}` : 'No username'} | {client.email || 'No email provided'}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Patient Profile: ${client.name} — Mother of the Year`} />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Flash Messages */}
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

                {/* Sleep History Recharts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Moon className="w-5 h-5 text-rose-400" /> Nocturnal Sleep Duration (Hours)
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">Daily sleep trends recorded via Telegram AI journal</p>
                            </div>
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
                                No sleep entries logged yet for this patient.
                            </div>
                        )}
                    </div>

                    {/* Direct Doctor Telegram Messaging Box */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
                        <div>
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                                <Send className="w-5 h-5 text-sky-400" /> Direct Physician Telegram Communication
                            </h3>
                            <p className="text-xs text-slate-400 mb-4">
                                Send a message from your doctor dashboard directly to the mother's Telegram.
                            </p>
                        </div>

                        <form onSubmit={handleSendMessage} className="space-y-4 flex-1 flex flex-col justify-end">
                            <textarea
                                rows={5}
                                required
                                placeholder="Type medical recommendations or questions to the mother..."
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors resize-none"
                            />

                            <button
                                type="submit"
                                disabled={processing || !client.telegram_id}
                                className="w-full py-3.5 px-4 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
                            >
                                <Send className="w-4 h-4" />
                                {processing ? 'Delivering...' : 'Send Direct Telegram Message'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sleep Logs Timeline */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6">
                    <h3 className="text-lg font-bold text-white">Sleep Journal History & AI Analysis Breakdown</h3>

                    <div className="space-y-4">
                        {client.sleep_logs && client.sleep_logs.length > 0 ? (
                            client.sleep_logs.map((log) => (
                                <div
                                    key={log.id}
                                    className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3"
                                >
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
                                            <span>Maternal Mood:</span>
                                            <div className="flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                                                {getMoodIcon(log.mood_score)}
                                                <span className="font-bold text-white">{log.mood_score}/5</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Raw Message from Mother:</div>
                                        <p className="text-sm text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 italic">
                                            "{log.raw_text}"
                                        </p>
                                    </div>

                                    {log.ai_analysis?.reply_message && (
                                        <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-3 space-y-1">
                                            <div className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                                                🤖 AI Assistant Automated Response:
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
                                No entries recorded.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
