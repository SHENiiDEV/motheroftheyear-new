import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password — Mother of the Year" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-white tracking-tight">Forgot Password?</h2>
                <p className="text-xs text-slate-400 mt-1">Enter your medical email address to receive a password reset link</p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Registered Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                        <input
                            id="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="doctor@motheroftheyear.com"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                    </div>
                    {errors.email && <div className="text-xs text-rose-400 mt-1">{errors.email}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all"
                >
                    <KeyRound className="w-4 h-4" /> Send Reset Link
                </button>

                <div className="text-center pt-2">
                    <Link
                        href={route('login')}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
