import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Moon, User, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import { CURRENCIES } from '@/Utils/currency';

export default function AuthenticatedLayout({ header, children, selectedCurrency, onCurrencyChange }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('app_currency') || 'EUR';
    });

    const handleCurrencySelect = (code) => {
        setCurrency(code);
        localStorage.setItem('app_currency', code);
        if (onCurrencyChange) {
            onCurrencyChange(code);
        }
    };

    const currentCurr = CURRENCIES[selectedCurrency || currency] || CURRENCIES.EUR;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            {/* Header / Nav */}
            <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex items-center gap-2 shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-md shrink-0">
                                    <Moon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex flex-row items-center gap-1.5 leading-none">
                                    <span className="font-black text-sm tracking-tight text-white whitespace-nowrap">
                                        MOTHER
                                    </span>
                                    <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider whitespace-nowrap opacity-90">
                                        OF THE YEAR
                                    </span>
                                </div>
                            </Link>

                            <div className="hidden space-x-4 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-sm font-semibold text-slate-300 hover:text-white"
                                >
                                    Mother Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('billing.index')}
                                    active={route().current('billing.index')}
                                    className="text-sm font-semibold text-slate-300 hover:text-white"
                                >
                                    Wallet & Invoices
                                </NavLink>
                                <a
                                    href={route('catalog')}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-semibold text-slate-400 hover:text-white transition-colors py-2"
                                >
                                    Specialists & Plans
                                </a>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center gap-4">
                            {/* Currency Switcher Dropdown */}
                            <div className="relative shrink-0">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-sm"
                                >
                                    <span>{currentCurr?.flag}</span>
                                    <span className="font-extrabold">{currentCurr?.code}</span>
                                </button>
                            </div>

                            {/* User Profile Dropdown */}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 transition-colors">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                                            {user.name}
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="bg-slate-900 border border-slate-800 text-slate-200">
                                        <Dropdown.Link href={route('profile.edit')} className="hover:bg-slate-800 text-slate-200">
                                            Account Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="hover:bg-slate-800 text-rose-400">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 text-slate-400 hover:text-white text-xl"
                            >
                                {showingNavigationDropdown ? '✕' : '☰'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden border-b border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-4">
                        <div className="space-y-2">
                            <Link
                                href={route('dashboard')}
                                className={`block px-3 py-2 rounded-xl text-sm font-bold ${
                                    route().current('dashboard') ? 'bg-rose-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                Mother Dashboard
                            </Link>
                            <Link
                                href={route('billing.index')}
                                className={`block px-3 py-2 rounded-xl text-sm font-bold ${
                                    route().current('billing.index') ? 'bg-rose-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                                }`}
                            >
                                Wallet & Invoices
                            </Link>
                            <a
                                href={route('catalog')}
                                target="_blank"
                                rel="noreferrer"
                                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800"
                            >
                                Specialists & Plans ↗
                            </a>
                        </div>

                        {/* Mobile Currency Switcher */}
                        <div className="pt-2 border-t border-slate-800">
                            <div className="text-xs font-semibold text-slate-400 mb-2">Select Display Currency:</div>
                            <div className="flex items-center gap-2">
                                {Object.values(CURRENCIES).map((curr) => (
                                    <button
                                        key={curr.code}
                                        onClick={() => handleCurrencySelect(curr.code)}
                                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                                            (selectedCurrency || currency) === curr.code
                                                ? 'bg-rose-500 border-rose-500 text-white shadow-md'
                                                : 'bg-slate-950 border-slate-800 text-slate-300'
                                        }`}
                                    >
                                        <span>{curr.flag}</span>
                                        <span>{curr.code}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Profile & Logout */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                            <div className="font-bold text-slate-200">
                                👤 {user.name}
                            </div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="px-3 py-1.5 bg-rose-500/20 text-rose-300 font-bold rounded-lg border border-rose-500/30"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="border-b border-slate-800/60 bg-slate-900/40 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
