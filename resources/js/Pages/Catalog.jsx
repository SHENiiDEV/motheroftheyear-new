import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Moon, Sparkles, Send, CheckCircle2, ArrowRight, User, Mail, Star,
    ShieldCheck, Heart, Clock, AlertTriangle, ChevronDown, ChevronUp,
    HelpCircle, Activity, Award, MessageSquare, Zap, Smile, Lock, GraduationCap, FileCheck, Check, Globe
} from 'lucide-react';
import { CURRENCIES, formatPrice } from '@/Utils/currency';
import DatePicker from '@/Components/DatePicker';
import CookieConsent from '@/Components/CookieConsent';
import OfflineBanner from '@/Components/OfflineBanner';

const ALL_TESTIMONIALS = [
    {
        name: "Jessica Turner",
        baby: "Mother of 7-month-old Leo",
        text: "Before joining, I was sleeping 3 hours a night. Within 2 weeks under Dr. Emily Carter's structured guidance, Leo was sleeping 8 straight hours!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
    },
    {
        name: "Rebecca Williams",
        baby: "Mother of 4-month-old Maya",
        text: "The 3x daily proactive Telegram check-ins with Dr. Amanda Vance gave me peace of mind during Maya's 4-month regression. Unmatched clinical care!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    {
        name: "Hannah Cooper",
        baby: "Mother of 11-month-old Noah",
        text: "Having Dr. Marcus Sterling manage Noah's nap schedule and twin sleep synchronization was life-changing. Highly recommended!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
    },
    {
        name: "Sophie Bennett",
        baby: "Mother of 5-month-old Oliver",
        text: "Dr. Sarah Jenkins showed us gentle soothing methods that worked within 3 days. No crying-it-out required. Pure magic!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150"
    },
    {
        name: "Elena Rostova",
        baby: "Mother of 8-month-old Alexander",
        text: "Dr. Victoria Montgomery's VIP Concierge care is second to none. Having dedicated 24/7 priority sleep tracking saved our sanity.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
    },
    {
        name: "Charlotte Hayes",
        baby: "Mother of 3-month-old Isla",
        text: "Isla had severe colic and reflux. Dr. Emily Carter adjusted her night routines and feeding intervals. Now we all sleep peacefully!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    },
    {
        name: "Mia Zhang",
        baby: "Mother of 6-month-old Lucas",
        text: "The neurological sleep alignment approach from Dr. Amanda Vance resolved Lucas's micro-awakenings in under 10 days.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150"
    },
    {
        name: "Grace Miller",
        baby: "Mother of 9-month-old twins Ethan & Liam",
        text: "Synchronizing twin sleep felt impossible until Dr. Marcus Sterling stepped in. Now both twins fall asleep simultaneously!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150"
    },
    {
        name: "Chloe Jenkins",
        baby: "Mother of 10-month-old Freya",
        text: "Worth every single penny! The Telegram assistant checks in right when I need it most during morning nap routines.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150"
    },
    {
        name: "Amelia Watson",
        baby: "Mother of 4-month-old Arthur",
        text: "Gentle, compassionate, and highly professional. Arthur transitioned smoothly into his nursery crib thanks to Dr. Sarah!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
    },
    {
        name: "Harper Davis",
        baby: "Mother of 2-month-old Henry",
        text: "I was terrified of postpartum exhaustion. The daily check-ins kept my mental health strong and Henry sleeping 6-hour stretches.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150"
    },
    {
        name: "Isabella Rossi",
        baby: "Mother of 12-month-old Mateo",
        text: "Dr. Amanda Vance adjusted Mateo's circadian rhythm according to chronobiology principles. Night weaning was 100% painless!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150"
    },
    {
        name: "Evelyn Scott",
        baby: "Mother of 6-month-old Harper",
        text: "The combination of web sleep graphs and 3x daily Telegram messages is brilliant. I recommend this service to all new moms!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    {
        name: "Ava Taylor",
        baby: "Mother of 5-month-old Jack",
        text: "Dr. Victoria Montgomery answered every concern with profound clinical wisdom. Jack sleeps 9 hours every single night.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
    },
    {
        name: "Scarlett Brown",
        baby: "Mother of 7-month-old Ivy",
        text: "Nap schedule optimization was the missing piece for us. Dr. Sarah Jenkins gave us an easy 3-step routine that works like a charm.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    },
    {
        name: "Lily Anderson",
        baby: "Mother of 8-month-old James",
        text: "We went from 6 night awakenings down to ZERO in less than two weeks. Dr. Emily Carter is a true lifesaver!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150"
    },
    {
        name: "Zoe Campbell",
        baby: "Mother of 3-month-old Theo",
        text: "Early intervention for newborn circadian rhythm made the biggest difference. Theo goes to sleep peacefully at 7:30 PM.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150"
    },
    {
        name: "Penelope Howard",
        baby: "Mother of 9-month-old triplets",
        text: "Triplets and sleep felt impossible. Dr. Marcus Sterling synchronized all three of them into a seamless sleep schedule!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
    },
    {
        name: "Layla Martinez",
        baby: "Mother of 11-month-old Sophia",
        text: "The web portal dashboard with printable invoices and doctor credentials makes everything feel so professional and safe.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150"
    },
    {
        name: "Victoria Hughes",
        baby: "Mother of 4-month-old Sebastian",
        text: "Sebastian's 4-month regression hit us hard. The instant advice from our assigned pediatrician gave us immediate relief.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150"
    }
];

export default function Catalog({ doctors, botUsername }) {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [previewDoctor, setPreviewDoctor] = useState(null);
    const [openFaq, setOpenFaq] = useState(0);

    // Currency selector state (Default: EUR)
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('app_currency') || 'EUR';
    });
    const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

    const handleCurrencySelect = (code) => {
        setCurrency(code);
        localStorage.setItem('app_currency', code);
    };

    // Randomized Testimonials State (Select 3 random items from 20)
    const [displayTestimonials, setDisplayTestimonials] = useState([]);

    useEffect(() => {
        const shuffled = [...ALL_TESTIMONIALS].sort(() => 0.5 - Math.random());
        setDisplayTestimonials(shuffled.slice(0, 3));
    }, []);

    // Sleep Calculator State
    const [babyAgeMonths, setBabyAgeMonths] = useState(6);
    const [nightAwakenings, setNightAwakenings] = useState(4);

    const { data, setData, post, processing, errors, reset } = useForm({
        specialist_id: 2,
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

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setPreviewDoctor(null);
        setData({
            ...data,
            specialist_id: doctor.id,
        });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const faqs = [
        {
            q: "How does the 24/7 Medical Sleep Tracking work?",
            a: "Your assigned doctor reaches out to you 3 times a day (Morning, Afternoon, Evening) via Telegram with tailored questions regarding your baby's sleep duration, night awakenings, and daytime naps. Simply reply naturally. Your metrics are logged immediately into your Mother Web Portal."
        },
        {
            q: "What is included in my Mother Web Portal dashboard?",
            a: "In addition to Telegram tracking, your Mother Portal allows you to view interactive sleep graphs, monitor awakenings history, log sleep entries directly on the web, and upgrade or switch your attending specialist anytime."
        },
        {
            q: "Are all attending specialists board-certified?",
            a: "Yes. All our featured sleep directors and consultants hold accredited medical degrees, board certifications, and extensive clinical pediatric experience from institutions like Harvard, Johns Hopkins, Yale, and Stanford."
        },
        {
            q: "Is my medical data and journal private?",
            a: "Absolutely. All communication is encrypted and stored securely according to healthcare data compliance standards. Your journal is accessible exclusively to you and your assigned medical specialist."
        }
    ];

    const calcFatigueScore = () => {
        let score = (nightAwakenings * 1.5) + (babyAgeMonths < 6 ? 2 : 1);
        if (score > 10) score = 10;
        return Math.round(score);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
            <Head title="Mother of the Year — World-Class Infant Sleep Specialists & Pediatricians" />

            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-rose-600/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-20 border-b border-slate-800/80 backdrop-blur-md bg-slate-950/80 sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img
                            src="/images/favicon.png"
                            alt="Mother of the Year Logo"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-lg shadow-rose-500/30 border border-rose-500/30 shrink-0"
                        />
                        <div className="flex flex-row items-center gap-1.5 leading-none">
                            <span className="font-black text-sm sm:text-base tracking-tight text-white whitespace-nowrap">
                                MOTHER
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-rose-300 uppercase tracking-wider whitespace-nowrap opacity-90">
                                OF THE YEAR
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <a
                            href="#doctors"
                            className="hidden md:inline-block text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                            Attending Specialists
                        </a>
                        <a
                            href="#calculator"
                            className="hidden lg:inline-block text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                            Sleep Assessment
                        </a>
                        <a
                            href="#faq"
                            className="hidden lg:inline-block text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                            FAQ
                        </a>

                        {/* Interactive Floating Currency Dropdown */}
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                                className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
                            >
                                <span>{CURRENCIES[currency]?.flag}</span>
                                <span className="font-extrabold">{currency}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showCurrencyMenu ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showCurrencyMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 mt-2 w-36 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl p-1.5 z-50 space-y-1"
                                    >
                                        {Object.values(CURRENCIES).map((curr) => (
                                            <button
                                                key={curr.code}
                                                onClick={() => {
                                                    handleCurrencySelect(curr.code);
                                                    setShowCurrencyMenu(false);
                                                }}
                                                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                                                    currency === curr.code
                                                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                                        : 'text-slate-300 hover:bg-slate-800'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span>{curr.flag}</span>
                                                    <span>{curr.code}</span>
                                                </span>
                                                {currency === curr.code && <Check className="w-3.5 h-3.5 text-rose-400" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href={route('login')}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-rose-300 hover:text-white bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all whitespace-nowrap shrink-0"
                        >
                            Client Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0"
                        >
                            Register Account
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-20 pb-16 px-6 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-bold uppercase tracking-wider mb-8"
                >
                    <ShieldCheck className="w-4 h-4 text-rose-400" /> Board-Certified Medical Sleep Leadership
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
                >
                    Elite Pediatric Sleep Care for Your Baby.{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">
                        Complete Rest for You.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
                >
                    Select your attending pediatric sleep specialist, access your Mother Web Portal, and receive 3x daily proactive Telegram check-ins tailored to your baby's unique circadian rhythm.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="#doctors"
                        className="w-full sm:w-auto py-4 px-8 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105"
                    >
                        View Specialists & Credentials <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </section>

            {/* Doctors / Specialists Grid Section */}
            <section id="doctors" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        Attending Medical Faculty
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
                        Our Board-Certified Pediatric Specialists
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto mt-3 text-base">
                        Select an attending physician or sleep director to lead your baby's sleep protocol and daily progress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors && doctors.length > 0 ? (
                        doctors.map((doctor, idx) => (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative bg-slate-900/70 border border-slate-800 rounded-3xl p-6 hover:border-rose-500/50 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between hover:shadow-2xl hover:shadow-rose-500/10"
                            >
                                <div>
                                    <div className="relative mb-5">
                                        <img
                                            src={doctor.avatar}
                                            alt={doctor.name}
                                            className="w-full h-64 object-cover rounded-2xl border border-slate-700/50 group-hover:scale-[1.02] transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xs font-bold text-amber-300 flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 5.0 / 5.0
                                        </div>
                                        <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                                            {doctor.tier}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-white group-hover:text-rose-300 transition-colors">
                                        {doctor.name}
                                    </h3>
                                    <div className="text-xs font-semibold text-rose-400/90 mt-1 mb-3">
                                        {doctor.title}
                                    </div>

                                    {/* Alma Mater Badge */}
                                    <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 mb-4">
                                        <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                                        <span className="truncate font-medium">{doctor.alma_mater}</span>
                                    </div>

                                    {/* Experience & Specialties Pills */}
                                    <div className="space-y-2 mb-6">
                                        <div className="text-[11px] font-semibold text-slate-400">Clinical Expertise:</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {doctor.specialties?.map((spec, i) => (
                                                <span key={i} className="text-[10px] font-medium bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-800/80 pt-4 mt-auto space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400">Weekly Care Plan:</span>
                                        <span className="text-2xl font-black text-white">
                                            {formatPrice(doctor.price, currency)} <span className="text-xs font-normal text-slate-400">/ wk</span>
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setPreviewDoctor(doctor)}
                                            className="py-3 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1"
                                        >
                                            <FileCheck className="w-3.5 h-3.5 text-purple-400" /> Credentials
                                        </button>

                                        <button
                                            onClick={() => handleSelectDoctor(doctor)}
                                            className="py-3 px-3 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-1 transition-all"
                                        >
                                            Select Specialist <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12 text-slate-400">
                            Loading attending specialists...
                        </div>
                    )}
                </div>
            </section>

            {/* Interactive Sleep Calculator Section */}
            <section id="calculator" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
                <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                                Clinical Assessment Tool
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                Infant Sleep & Maternal Fatigue Assessment
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Adjust your baby's age and night wake-up frequency to evaluate your maternal fatigue index.
                            </p>

                            <div className="space-y-5 pt-2">
                                <div>
                                    <div className="flex justify-between text-sm font-semibold mb-2">
                                        <span className="text-slate-300">Baby's Age:</span>
                                        <span className="text-rose-400 font-bold">{babyAgeMonths} Months</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="24"
                                        value={babyAgeMonths}
                                        onChange={(e) => setBabyAgeMonths(Number(e.target.value))}
                                        className="w-full accent-rose-500 cursor-pointer"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-semibold mb-2">
                                        <span className="text-slate-300">Night Awakenings per Night:</span>
                                        <span className="text-rose-400 font-bold">{nightAwakenings} Times</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={nightAwakenings}
                                        onChange={(e) => setNightAwakenings(Number(e.target.value))}
                                        className="w-full accent-rose-500 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Assessment Output Card */}
                        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl text-center space-y-6">
                            <div className="inline-flex p-4 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
                                <Activity className="w-8 h-8" />
                            </div>

                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Maternal Fatigue Risk Index</div>
                                <div className="text-5xl font-black text-rose-400 mt-1">{calcFatigueScore()} / 10</div>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                                {calcFatigueScore() >= 7 ? (
                                    <span className="text-rose-300 font-medium">
                                        ⚠️ <strong>High Fatigue Alert:</strong> Severe sleep fragmentation detected. Daily specialist tracking is strongly recommended.
                                    </span>
                                ) : (
                                    <span className="text-emerald-300 font-medium">
                                        ✨ <strong>Moderate Level:</strong> Sleep routine optimization recommended.
                                    </span>
                                )}
                            </div>

                            <a
                                href="#doctors"
                                className="block w-full py-3.5 px-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/20 transition-all hover:opacity-95"
                            >
                                Get Personal Specialist Plan
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Randomized Testimonials Section */}
            <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/60">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                        Clinical Case Successes
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
                        Loved by Hundreds of Mothers
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {displayTestimonials && displayTestimonials.length > 0 ? (
                        displayTestimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4 flex flex-col justify-between hover:border-rose-500/40 transition-colors"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 text-sm leading-relaxed italic">
                                        "{t.text}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-rose-500/40" />
                                    <div>
                                        <div className="text-sm font-bold text-white">{t.name}</div>
                                        <div className="text-xs text-slate-400">{t.baby}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-8 text-slate-500">Loading reviews...</div>
                    )}
                </div>
            </section>

            {/* FAQ Accordion Section */}
            <section id="faq" className="relative z-10 py-20 px-6 max-w-4xl mx-auto border-t border-slate-800/60">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl transition-colors"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                                className="w-full p-6 text-left font-bold text-white text-base flex justify-between items-center gap-4 hover:text-rose-300 transition-colors"
                            >
                                <span>{faq.q}</span>
                                {openFaq === idx ? (
                                    <ChevronUp className="w-5 h-5 text-rose-400 shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openFaq === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4"
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* Doctor Credentials Detail Modal */}
            <AnimatePresence>
                {previewDoctor && (
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
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
                        >
                            <button
                                onClick={() => setPreviewDoctor(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2"
                            >
                                ✕
                            </button>

                            <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-slate-800 pb-6">
                                <img
                                    src={previewDoctor.avatar}
                                    alt={previewDoctor.name}
                                    className="w-28 h-28 rounded-2xl object-cover border-2 border-rose-500 shadow-xl"
                                />
                                <div className="text-center sm:text-left">
                                    <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">{previewDoctor.tier}</div>
                                    <h3 className="text-2xl font-black text-white">{previewDoctor.name}</h3>
                                    <div className="text-sm font-semibold text-purple-300 mt-1">{previewDoctor.title}</div>
                                    <div className="text-xs text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" /> {previewDoctor.alma_mater}
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Clinical Profile</h4>
                                <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                                    {previewDoctor.bio}
                                </p>
                            </div>

                            {/* Diplomas & Credentials */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Medical Board Credentials & Diplomas</h4>
                                <div className="space-y-2">
                                    {previewDoctor.diplomas?.map((dip, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs text-emerald-300 bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-xl">
                                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span className="font-semibold">{dip}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-slate-400">Weekly Care Plan:</div>
                                    <div className="text-2xl font-black text-white">{formatPrice(previewDoctor.price, currency)} <span className="text-xs font-normal text-slate-400">/ wk</span></div>
                                </div>

                                <button
                                    onClick={() => handleSelectDoctor(previewDoctor)}
                                    className="py-3.5 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-rose-500/25 transition-all hover:scale-105"
                                >
                                    Select This Doctor
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Account Registration & Specialist Selection Modal */}
            <AnimatePresence>
                {selectedDoctor && (
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
                            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedDoctor(null)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2"
                            >
                                ✕
                            </button>

                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={selectedDoctor.avatar}
                                    alt={selectedDoctor.name}
                                    className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-500"
                                />
                                <div>
                                    <div className="text-xs font-semibold text-rose-400">Attending Physician:</div>
                                    <h3 className="text-lg font-bold text-white">{selectedDoctor.name}</h3>
                                    <div className="text-xs text-slate-400">{formatPrice(selectedDoctor.price, currency)} / week</div>
                                </div>
                            </div>

                            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                                {/* First Name & Surname */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            First Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Catherine"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            />
                                        </div>
                                        {errors.name && <div className="text-[11px] text-rose-400 mt-1">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Surname *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Miller"
                                                value={data.surname}
                                                onChange={(e) => setData('surname', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            />
                                        </div>
                                        {errors.surname && <div className="text-[11px] text-rose-400 mt-1">{errors.surname}</div>}
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="email"
                                                required
                                                placeholder="catherine@example.com"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            />
                                        </div>
                                        {errors.email && <div className="text-[11px] text-rose-400 mt-1">{errors.email}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+44 7911 123456"
                                                value={data.phone_number}
                                                onChange={(e) => setData('phone_number', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            />
                                        </div>
                                        {errors.phone_number && <div className="text-[11px] text-rose-400 mt-1">{errors.phone_number}</div>}
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                        Date of Birth *
                                    </label>
                                    <DatePicker
                                        value={data.date_of_birth}
                                        onChange={(val) => setData('date_of_birth', val)}
                                        error={errors.date_of_birth}
                                        placeholder="Select your date of birth"
                                    />
                                </div>

                                {/* Address Section */}
                                <div className="pt-2 border-t border-slate-800">
                                    <span className="text-[10px] font-bold text-rose-300 uppercase tracking-widest block mb-2">
                                        Official Billing Address Details
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        1. Street, house number, apartment *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="58 Mund St, Apt 4B"
                                        value={data.billing_address}
                                        onChange={(e) => setData('billing_address', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    />
                                    {errors.billing_address && <div className="text-[11px] text-rose-400 mt-1">{errors.billing_address}</div>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            2. City *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="London"
                                            value={data.billing_city}
                                            onChange={(e) => setData('billing_city', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                        />
                                        {errors.billing_city && <div className="text-[11px] text-rose-400 mt-1">{errors.billing_city}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                                            4. Post Code *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="W14 9LZ"
                                            value={data.billing_postal_code}
                                            onChange={(e) => setData('billing_postal_code', e.target.value)}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                        />
                                        {errors.billing_postal_code && <div className="text-[11px] text-rose-400 mt-1">{errors.billing_postal_code}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                                        3. Country *
                                    </label>
                                    <select
                                        required
                                        value={data.billing_country}
                                        onChange={(e) => setData('billing_country', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                    >
                                        {WORLD_COUNTRIES.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.billing_country && <div className="text-[11px] text-rose-400 mt-1">{errors.billing_country}</div>}
                                </div>

                                {/* Password & Confirmation */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="password"
                                                required
                                                placeholder="••••••••"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            />
                                        </div>
                                        {errors.password && <div className="text-[11px] text-rose-400 mt-1">{errors.password}</div>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                                            Confirm Password *
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                            <input
                                                type="password"
                                                required
                                                placeholder="••••••••"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Checkbox Terms */}
                                <div className="pt-1">
                                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={data.terms}
                                            onChange={(e) => setData('terms', e.target.checked)}
                                            className="mt-0.5 rounded bg-slate-950 border-slate-800 text-rose-500 focus:ring-0 cursor-pointer"
                                        />
                                        <span className="leading-relaxed text-[11px]">
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
                                    {errors.terms && <div className="text-[11px] text-rose-400 mt-1">{errors.terms}</div>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full mt-3 py-3.5 px-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                                >
                                    {processing ? 'Creating Account...' : 'Create Account & Access Portal'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="space-y-4 md:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center shadow-md">
                                <Moon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-rose-300">
                                Mother of the Year
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            24/7 board-certified pediatric sleep tracking, proactive Telegram check-ins, and personalized web journal portal for new mothers.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Platform</h4>
                        <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                            <li><a href="#doctors" className="hover:text-white transition-colors">Attending Specialists</a></li>
                            <li><a href="#calculator" className="hover:text-white transition-colors">Sleep Assessment Calculator</a></li>
                            <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Legal & Compliance</h4>
                        <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                            <li><Link href={route('legal.privacy')} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href={route('legal.terms')} className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href={route('legal.disclaimer')} className="hover:text-rose-400 transition-colors flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-rose-400" /> Medical Disclaimer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">Account Access</h4>
                        <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                            <li><Link href={route('login')} className="hover:text-white transition-colors font-bold text-rose-300">Client Portal Login</Link></li>
                            <li><Link href={route('register')} className="hover:text-white transition-colors">Create Client Account</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <div>
                        © {new Date().getFullYear()} CARING AND SUPPORTIVE SERVICE LTD. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* System Utilities */}
            <OfflineBanner />
            <CookieConsent />
        </div>
    );
}
