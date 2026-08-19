<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 — Page Fast Asleep | Mother of the Year</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.bunny.net/css?family=figtree:400,600,700,800,900&display=swap" rel="stylesheet" />
</head>
<body class="bg-slate-950 text-slate-100 font-sans min-h-screen flex flex-col justify-between items-center p-6 relative overflow-hidden">
    <!-- Glowing Orbs -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none"></div>

    <!-- Header -->
    <nav class="w-full max-w-7xl mx-auto flex items-center justify-between py-4 relative z-10">
        <a href="/" class="flex items-center gap-2">
            <img src="/images/favicon.png" alt="Logo" class="w-9 h-9 rounded-xl object-cover shadow-lg shadow-rose-500/30 border border-rose-500/30">
            <div class="flex flex-row items-center gap-1.5 leading-none">
                <span class="font-black text-base tracking-tight text-white">MOTHER</span>
                <span class="text-xs font-bold text-rose-300 uppercase tracking-wider opacity-90">OF THE YEAR</span>
            </div>
        </a>
    </nav>

    <!-- Error Card -->
    <div class="relative z-10 max-w-lg w-full my-auto text-center py-10">
        <div class="bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
            <span class="text-7xl sm:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-rose-500">
                404
            </span>
            <div class="space-y-2">
                <span class="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest text-rose-300 bg-rose-500/10 border border-rose-500/20">
                    Page Fast Asleep
                </span>
                <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Lost in the Night Routine
                </h1>
                <p class="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                    The page you are looking for has moved into a different circadian cycle or doesn't exist.
                </p>
            </div>
            <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="/" class="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-500/25 transition-all">
                    Return to Landing Page
                </a>
                <a href="/dashboard" class="w-full sm:w-auto py-3 px-6 bg-slate-950 border border-slate-800 text-slate-200 font-bold text-xs rounded-xl">
                    Mother Dashboard
                </a>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="relative z-10 text-center text-xs text-slate-500 py-4">
        © {{ date('Y') }} CARING AND SUPPORTIVE SERVICE LTD. Company No. 16120199
    </div>
</body>
</html>
