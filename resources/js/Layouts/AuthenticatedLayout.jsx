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
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-md">
                                    <Moon className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-rose-300">
                                    Mother of the Year
                                </span>
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
                            {/* Currency Selector */}
                            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
                                {Object.values(CURRENCIES).map((curr) => (
                                    <button
                                        key={curr.code}
                                        onClick={() => handleCurrencySelect(curr.code)}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                            (selectedCurrency || currency) === curr.code
                                                ? 'bg-rose-500 text-white shadow-md'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                        }`}
                                    >
                                        <span>{curr.flag}</span>
                                        <span>{curr.code}</span>
                                    </button>
                                ))}
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
                                className="p-2 text-slate-400 hover:text-white"
                            >
                                ☰
                            </button>
                        </div>
                    </div>
                </div>
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
