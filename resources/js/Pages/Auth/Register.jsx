import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { WORLD_COUNTRIES } from '@/Utils/countries';
import { Mail, Lock, User, Phone, Calendar, MapPin, Building, Globe, Hash, CheckSquare, ShieldCheck } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        date_of_birth: '',
        billing_address: '',
        billing_city: '',
        billing_country: 'United Kingdom',
        billing_postal_code: '',
        terms: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Client Account Registration — Mother of the Year" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-white">Create Client Account</h2>
                <p className="text-xs text-slate-400 mt-1">
                    Fill out your profile and address details to activate your pediatric sleep portal.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="name" value="First Name *" className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1" />
                        <div className="relative">
                            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Catherine"
                            />
                        </div>
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="surname" value="Surname *" className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1" />
                        <div className="relative">
                            <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="surname"
                                name="surname"
                                value={data.surname}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                autoComplete="family-name"
                                onChange={(e) => setData('surname', e.target.value)}
                                required
                                placeholder="Miller"
                            />
                        </div>
                        <InputError message={errors.surname} className="mt-1" />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="email" value="Email Address *" className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1" />
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                placeholder="catherine@example.com"
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone_number" value="Phone Number *" className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1" />
                        <div className="relative">
                            <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="phone_number"
                                type="tel"
                                name="phone_number"
                                value={data.phone_number}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                autoComplete="tel"
                                onChange={(e) => setData('phone_number', e.target.value)}
                                required
                                placeholder="+44 7911 123456"
                            />
                        </div>
                        <InputError message={errors.phone_number} className="mt-1" />
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <InputLabel htmlFor="date_of_birth" value="Date of Birth *" className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1" />
                    <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <TextInput
                            id="date_of_birth"
                            type="date"
                            name="date_of_birth"
                            value={data.date_of_birth}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.date_of_birth} className="mt-1" />
                </div>

                {/* Address Divider Header */}
                <div className="pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-bold text-rose-300 uppercase tracking-widest block mb-2">
                        Official Billing Address Details
                    </span>
                </div>

                {/* Address Section 1: Street, House, Apartment */}
                <div>
                    <InputLabel htmlFor="billing_address" value="1. Street, house number, apartment *" className="text-slate-300 text-xs font-semibold mb-1" />
                    <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <TextInput
                            id="billing_address"
                            name="billing_address"
                            value={data.billing_address}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                            onChange={(e) => setData('billing_address', e.target.value)}
                            required
                            placeholder="58 Mund St, Apt 4B"
                        />
                    </div>
                    <InputError message={errors.billing_address} className="mt-1" />
                </div>

                {/* Address Section 2 & 4: City & Post Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="billing_city" value="2. City *" className="text-slate-300 text-xs font-semibold mb-1" />
                        <div className="relative">
                            <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="billing_city"
                                name="billing_city"
                                value={data.billing_city}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                onChange={(e) => setData('billing_city', e.target.value)}
                                required
                                placeholder="London"
                            />
                        </div>
                        <InputError message={errors.billing_city} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="billing_postal_code" value="4. Post Code *" className="text-slate-300 text-xs font-semibold mb-1" />
                        <div className="relative">
                            <Hash className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="billing_postal_code"
                                name="billing_postal_code"
                                value={data.billing_postal_code}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                onChange={(e) => setData('billing_postal_code', e.target.value)}
                                required
                                placeholder="W14 9LZ"
                            />
                        </div>
                        <InputError message={errors.billing_postal_code} className="mt-1" />
                    </div>
                </div>

                {/* Address Section 3: Country Dropdown */}
                <div>
                    <InputLabel htmlFor="billing_country" value="3. Country *" className="text-slate-300 text-xs font-semibold mb-1" />
                    <div className="relative">
                        <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <select
                            id="billing_country"
                            name="billing_country"
                            value={data.billing_country}
                            onChange={(e) => setData('billing_country', e.target.value)}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
                        >
                            {WORLD_COUNTRIES.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                    <InputError message={errors.billing_country} className="mt-1" />
                </div>

                {/* Password & Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="password" value="Password *" className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1" />
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password *" className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1" />
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>
                </div>

                {/* Checkbox: Terms & Privacy Policy links */}
                <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-300">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            required
                            className="mt-0.5 rounded bg-slate-950 border-slate-800 text-rose-500 focus:ring-0 cursor-pointer"
                        />
                        <span className="leading-relaxed">
                            I agree to the{' '}
                            <Link href={route('legal.terms')} target="_blank" className="font-bold text-rose-400 hover:underline">
                                Terms & Conditions
                            </Link>{' '}
                            and{' '}
                            <Link href={route('legal.privacy')} target="_blank" className="font-bold text-rose-400 hover:underline">
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </label>
                    <InputError message={errors.terms} className="mt-1" />
                </div>

                <div className="pt-2 flex items-center justify-between">
                    <Link
                        href={route('login')}
                        className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                    >
                        Already registered? Log in
                    </Link>

                    <PrimaryButton className="py-3 px-6 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-500/25" disabled={processing}>
                        {processing ? 'Processing...' : 'Register Client Account'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
