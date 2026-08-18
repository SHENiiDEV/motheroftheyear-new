import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, CreditCard, FileText, Building2, CheckCircle2, ArrowUpRight, ArrowDownLeft, Plus, Download, Printer, User, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';
import { CURRENCIES, formatPrice } from '@/Utils/currency';

export default function BillingIndex({ user, company, invoices, transactions }) {
    const { flash } = usePage().props;
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('app_currency') || 'EUR';
    });

    const [showTopUpModal, setShowTopUpModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // Form for Billing Profile
    const profileForm = useForm({
        billing_name: user.billing_name || user.name || '',
        billing_address: user.billing_address || '',
        billing_city: user.billing_city || '',
        billing_country: user.billing_country || 'United States',
        billing_postal_code: user.billing_postal_code || '',
        vat_number: user.vat_number || '',
    });

    // Form for Top-Up Wallet
    const topUpForm = useForm({
        amount: 100,
    });

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.post(route('billing.profile'));
    };

    const handleTopUpSubmit = (e) => {
        e.preventDefault();
        topUpForm.post(route('billing.topup'), {
            onSuccess: () => setShowTopUpModal(false),
        });
    };

    return (
        <AuthenticatedLayout
            selectedCurrency={currency}
            onCurrencyChange={(c) => setCurrency(c)}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-bold text-2xl text-slate-100 leading-tight flex items-center gap-3">
                            <Wallet className="w-6 h-6 text-rose-400" /> Wallet & Billing Portal
                        </h2>
                        <p className="text-xs text-slate-400 mt-1">
                            Manage your wallet balance, billing profile details, and official company invoices.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowTopUpModal(true)}
                            className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-500/25 flex items-center gap-2 transition-all"
                        >
                            <Plus className="w-4 h-4" /> Top-Up Wallet Balance
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Wallet & Invoices — Mother of the Year" />

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

                {/* Top Section: Wallet Balance & Company Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Wallet Balance Bento Card */}
                    <div className="bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-900 border border-rose-500/30 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Account Wallet Balance</span>
                                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
                                    <Wallet className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="text-4xl sm:text-5xl font-black text-white">
                                {formatPrice(user.wallet_balance, currency)}
                            </div>
                            <div className="text-xs text-slate-400 mt-2 leading-relaxed">
                                Doctor monthly fees are immediately deducted from this balance upon selection.
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
                            <span className="text-xs text-slate-400">Current Doctor Weekly Rate:</span>
                            <span className="text-sm font-bold text-rose-300">
                                {formatPrice(user.weekly_price, currency)} / wk
                            </span>
                        </div>
                    </div>

                    {/* Official Company Details Box */}
                    <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-purple-400" /> Official Merchant Company Information
                            </h3>
                            <span className="text-[10px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase">
                                Registered Entity
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                                <div className="text-slate-400 font-semibold uppercase tracking-wider">Company Name</div>
                                <div className="text-white font-bold text-sm">{company.name}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-slate-400 font-semibold uppercase tracking-wider">Tax ID / VAT Registration</div>
                                <div className="text-rose-300 font-mono font-bold text-sm">{company.tax_id}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-slate-400 font-semibold uppercase tracking-wider">Official Address</div>
                                <div className="text-slate-200 leading-relaxed">{company.address}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-slate-400 font-semibold uppercase tracking-wider">Contact & Support</div>
                                <div className="text-slate-200">{company.email} | {company.phone}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Client Billing Details Form */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-rose-400" /> Your Personal Billing Profile
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                            This billing information is printed on your official receipts and tax invoices.
                        </p>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                Billing Full Name / Entity
                            </label>
                            <input
                                type="text"
                                required
                                value={profileForm.data.billing_name}
                                onChange={(e) => profileForm.setData('billing_name', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                Billing Street Address
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="124 Ocean Drive, Apt 4B"
                                value={profileForm.data.billing_address}
                                onChange={(e) => profileForm.setData('billing_address', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                City
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="San Francisco"
                                value={profileForm.data.billing_city}
                                onChange={(e) => profileForm.setData('billing_city', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                Country
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="United States"
                                value={profileForm.data.billing_country}
                                onChange={(e) => profileForm.setData('billing_country', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                Postal Code / Zip
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="94103"
                                value={profileForm.data.billing_postal_code}
                                onChange={(e) => profileForm.setData('billing_postal_code', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                Tax ID / VAT Number (Optional)
                            </label>
                            <input
                                type="text"
                                placeholder="US-9920194"
                                value={profileForm.data.vat_number}
                                onChange={(e) => profileForm.setData('vat_number', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            />
                        </div>

                        <div className="md:col-span-3 flex justify-end">
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="py-2.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
                            >
                                {profileForm.processing ? 'Saving Changes...' : 'Save Billing Profile'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Invoices History Table */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-sky-400" /> Invoices & Payment Receipts
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="pb-3">Invoice #</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Description</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                {invoices && invoices.length > 0 ? (
                                    invoices.map((inv) => (
                                        <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-4 font-mono font-bold text-rose-300">{inv.invoice_number}</td>
                                            <td className="py-4 text-slate-400">{new Date(inv.created_at).toLocaleDateString()}</td>
                                            <td className="py-4 font-semibold text-white">{inv.doctor_name}</td>
                                            <td className="py-4 font-black text-white">{formatPrice(inv.amount, currency)}</td>
                                            <td className="py-4">
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                                    {inv.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedInvoice(inv)}
                                                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                                                >
                                                    <FileText className="w-3.5 h-3.5 text-sky-400" /> View Invoice
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-slate-500">
                                            No invoices generated yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Wallet Transactions History Table */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-rose-400" /> Wallet Transactions Ledger
                    </h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="pb-3">Type</th>
                                    <th className="pb-3">Description</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3 text-right">Balance After</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-slate-300">
                                {transactions && transactions.length > 0 ? (
                                    transactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="py-4">
                                                {tx.type === 'deposit' ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                                        <ArrowDownLeft className="w-3 h-3" /> Deposit
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                                        <ArrowUpRight className="w-3 h-3" /> Deduction
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 font-medium text-slate-200">{tx.description}</td>
                                            <td className="py-4 text-slate-400">{new Date(tx.created_at).toLocaleDateString()}</td>
                                            <td className={`py-4 font-black ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {tx.type === 'deposit' ? '+' : '-'}{formatPrice(tx.amount, currency)}
                                            </td>
                                            <td className="py-4 font-bold text-white text-right">{formatPrice(tx.balance_after, currency)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-slate-500">
                                            No transactions recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Top-Up Wallet Modal */}
            <AnimatePresence>
                {showTopUpModal && (
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
                                onClick={() => setShowTopUpModal(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2"
                            >
                                ✕
                            </button>

                            <h3 className="text-xl font-bold text-white mb-1">Top-Up Wallet Balance</h3>
                            <p className="text-xs text-slate-400 mb-6">Select an amount to credit to your Mother of the Year wallet balance.</p>

                            <form onSubmit={handleTopUpSubmit} className="space-y-6">
                                <div className="grid grid-cols-4 gap-2">
                                    {[50, 100, 250, 500].map((preset) => (
                                        <button
                                            type="button"
                                            key={preset}
                                            onClick={() => topUpForm.setData('amount', preset)}
                                            className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                                                topUpForm.data.amount === preset
                                                    ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/30'
                                                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                                            }`}
                                        >
                                            {formatPrice(preset, currency)}
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Custom Deposit Amount (€ Base)
                                    </label>
                                    <input
                                        type="number"
                                        min="10"
                                        max="5000"
                                        required
                                        value={topUpForm.data.amount}
                                        onChange={(e) => topUpForm.setData('amount', Number(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={topUpForm.processing}
                                    className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/25 transition-opacity"
                                >
                                    {topUpForm.processing ? 'Processing Credit Card...' : `Credit ${formatPrice(topUpForm.data.amount, currency)} to Wallet`}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Printable Invoice Modal */}
            <AnimatePresence>
                {selectedInvoice && (
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
                            className="bg-white text-slate-900 border border-slate-300 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
                        >
                            <button
                                onClick={() => setSelectedInvoice(null)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-black text-xl p-2"
                            >
                                ✕
                            </button>

                            {/* Header */}
                            <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                                <div>
                                    <div className="text-2xl font-black tracking-tight text-slate-900">INVOICE RECEIPT</div>
                                    <div className="text-sm font-mono text-rose-600 font-bold mt-1">{selectedInvoice.invoice_number}</div>
                                </div>

                                <div className="text-right">
                                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-xs rounded-full">
                                        PAID IN FULL
                                    </span>
                                    <div className="text-xs text-slate-500 mt-2">
                                        Date: {new Date(selectedInvoice.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            {/* Billing & Merchant Info */}
                            <div className="grid grid-cols-2 gap-8 text-xs border-b border-slate-200 pb-6">
                                <div>
                                    <div className="font-bold text-slate-400 uppercase tracking-wider mb-2">Merchant Entity</div>
                                    <div className="font-bold text-sm text-slate-900">{selectedInvoice.company_snapshot?.name || company.name}</div>
                                    <div className="text-slate-600 mt-1">{selectedInvoice.company_snapshot?.address || company.address}</div>
                                    <div className="text-slate-600">Tax ID: {selectedInvoice.company_snapshot?.tax_id || company.tax_id}</div>
                                    <div className="text-slate-600">Email: {selectedInvoice.company_snapshot?.email || company.email}</div>
                                </div>

                                <div>
                                    <div className="font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</div>
                                    <div className="font-bold text-sm text-slate-900">{selectedInvoice.billing_snapshot?.name || user.name}</div>
                                    <div className="text-slate-600 mt-1">{selectedInvoice.billing_snapshot?.address}</div>
                                    <div className="text-slate-600">{selectedInvoice.billing_snapshot?.city}, {selectedInvoice.billing_snapshot?.country}</div>
                                    <div className="text-slate-600">VAT: {selectedInvoice.billing_snapshot?.vat_number || 'N/A'}</div>
                                </div>
                            </div>

                            {/* Line Items */}
                            <table className="w-full text-left text-xs border-b border-slate-200 pb-6">
                                <thead>
                                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                                        <th className="pb-2">Item Description</th>
                                        <th className="pb-2 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-4 font-bold text-slate-900">{selectedInvoice.doctor_name}</td>
                                        <td className="py-4 text-right font-black text-slate-900">{formatPrice(selectedInvoice.amount, currency)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Total */}
                            <div className="flex justify-between items-center text-sm font-bold pt-2">
                                <span>Total Paid:</span>
                                <span className="text-2xl font-black text-slate-900">{formatPrice(selectedInvoice.amount, currency)}</span>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    onClick={() => window.print()}
                                    className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
                                >
                                    <Printer className="w-4 h-4" /> Print / Save PDF Invoice
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthenticatedLayout>
    );
}
