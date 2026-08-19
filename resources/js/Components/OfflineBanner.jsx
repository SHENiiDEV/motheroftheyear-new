import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);
    const [showRestoredToast, setShowRestoredToast] = useState(false);

    useEffect(() => {
        const handleOffline = () => setIsOffline(true);
        const handleOnline = () => {
            setIsOffline(false);
            setShowRestoredToast(true);
            const timer = setTimeout(() => setShowRestoredToast(false), 4000);
            return () => clearTimeout(timer);
        };

        // Check initial state
        if (typeof window !== 'undefined' && !navigator.onLine) {
            setIsOffline(true);
        }

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    return (
        <>
            {/* Persistent Offline Warning Banner */}
            <AnimatePresence>
                {isOffline && (
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-slate-950 px-4 py-2.5 shadow-lg font-sans"
                    >
                        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs font-bold">
                            <div className="flex items-center gap-2">
                                <WifiOff className="w-4 h-4 text-slate-950 shrink-0 animate-pulse" />
                                <span>
                                    No Internet Connection — You are currently working offline. Your sleep log entries will sync automatically once reconnected.
                                </span>
                            </div>
                            <span className="hidden sm:inline bg-slate-950/20 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
                                Offline Mode
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Connection Restored Toast */}
            <AnimatePresence>
                {showRestoredToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-[100] bg-emerald-950 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs font-bold"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                            <div>Internet Connection Restored!</div>
                            <div className="text-[11px] font-normal text-emerald-300">Your portal is synced and ready.</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
