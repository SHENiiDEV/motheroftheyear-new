<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Mail\DocumentPaymentMail;
use App\Models\Alert;
use App\Models\Invoice;
use App\Models\SleepLog;
use App\Models\Transaction;
use App\Models\User;
use App\Services\DeepSeekService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();

        // Generate invite token if missing
        if (!$user->invite_token) {
            $user->update(['invite_token' => Str::random(32)]);
        }

        $sleepLogs = SleepLog::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->take(30)
            ->get();

        $avgSleepHours = SleepLog::where('user_id', $user->id)
            ->where('date', '>=', now()->subDays(7))
            ->whereNotNull('hours_slept')
            ->avg('hours_slept');

        $avgAwakenings = SleepLog::where('user_id', $user->id)
            ->where('date', '>=', now()->subDays(7))
            ->whereNotNull('awakenings_count')
            ->avg('awakenings_count');

        $botUsername = env('TELEGRAM_BOT_USERNAME', 'MotherOfTheYearBot');
        $telegramUrl = "https://t.me/{$botUsername}?start={$user->invite_token}";

        $specialists = [
            User::getSpecialistConfig(1),
            User::getSpecialistConfig(2),
            User::getSpecialistConfig(3),
            User::getSpecialistConfig(4),
            User::getSpecialistConfig(5),
        ];

        $recentInvoices = Invoice::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get();

        $children = $user->children()->get();

        return Inertia::render('Dashboard', [
            'user' => $user,
            'company' => config('company'),
            'children' => $children,
            'sleepLogs' => $sleepLogs,
            'stats' => [
                'avgSleepHours' => round($avgSleepHours ?? 5.5, 1),
                'avgAwakenings' => round($avgAwakenings ?? 3.0, 1),
                'totalEntries' => $sleepLogs->count(),
            ],
            'telegramUrl' => $telegramUrl,
            'specialists' => $specialists,
            'recentInvoices' => $recentInvoices,
        ]);
    }

    public function createChild(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|in:boy,girl',
            'is_twin' => 'boolean',
            'notes' => 'nullable|string|max:1000',
        ]);

        /** @var User $user */
        $user = Auth::user();

        $child = $user->children()->create($validated);

        return back()->with('success', "Child profile for {$child->name} added successfully!");
    }

    public function submitWebLog(Request $request, DeepSeekService $deepSeekService)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:2000',
        ]);

        /** @var User $user */
        $user = Auth::user();

        $analysis = $deepSeekService->analyzeSleepMessageUser($user, $validated['message']);

        $hour = (int) now()->format('H');
        $period = match (true) {
            $hour >= 5 && $hour < 12 => 'morning',
            $hour >= 12 && $hour < 18 => 'afternoon',
            default => 'evening',
        };

        SleepLog::create([
            'user_id' => $user->id,
            'date' => now()->format('Y-m-d'),
            'period' => $period,
            'hours_slept' => $analysis['hours_slept'] ?? null,
            'awakenings_count' => $analysis['awakenings'] ?? null,
            'mood_score' => $analysis['mood_score'] ?? null,
            'raw_text' => $validated['message'],
            'ai_analysis' => $analysis,
        ]);

        return back()->with('success', 'Sleep journal entry recorded successfully!');
    }

    public function updateSpecialist(Request $request)
    {
        $validated = $request->validate([
            'specialist_id' => 'required|integer|in:1,2,3,4,5',
        ]);

        /** @var User $user */
        $user = Auth::user();

        $config = User::getSpecialistConfig($validated['specialist_id']);
        $doctorPrice = (float) $config['price'];

        // Check if wallet balance is sufficient
        if ($user->wallet_balance < $doctorPrice) {
            return back()->withErrors([
                'wallet' => "Insufficient wallet balance (€" . number_format($user->wallet_balance, 2) . "). Selecting {$config['name']} requires €" . number_format($doctorPrice, 2) . ". Please top up your wallet balance first."
            ]);
        }

        // Deduct money immediately
        $newBalance = $user->wallet_balance - $doctorPrice;

        $user->update([
            'specialist_id' => $validated['specialist_id'],
            'subscription_tier' => strtolower($config['tier']),
            'weekly_price' => $doctorPrice,
            'wallet_balance' => $newBalance,
        ]);

        // Record Transaction
        Transaction::create([
            'user_id' => $user->id,
            'type' => 'deduction',
            'amount' => $doctorPrice,
            'description' => "Immediate Weekly Subscription Charge: {$config['name']}",
            'balance_after' => $newBalance,
        ]);

        // Generate Invoice
        $invoice = Invoice::create([
            'invoice_number' => 'INV-' . date('Y') . '-' . strtoupper(Str::random(6)),
            'user_id' => $user->id,
            'doctor_id' => $config['id'],
            'doctor_name' => $config['name'],
            'amount' => $doctorPrice,
            'type' => 'subscription',
            'status' => 'paid',
            'billing_snapshot' => [
                'name' => $user->billing_name ?: $user->name,
                'address' => $user->billing_address ?: 'N/A',
                'city' => $user->billing_city ?: 'N/A',
                'country' => $user->billing_country ?: 'N/A',
                'postal_code' => $user->billing_postal_code ?: 'N/A',
                'vat_number' => $user->vat_number ?: 'N/A',
            ],
            'company_snapshot' => config('company'),
        ]);

        // Send DocumentPaymentMail with attached DomPDF invoice
        try {
            Mail::to($user->email)->send(new DocumentPaymentMail($user, $invoice));
        } catch (\Throwable $e) {
            Log::warning("Failed to send DocumentPaymentMail: {$e->getMessage()}");
        }

        return back()->with('success', "Assigned Doctor updated to {$config['name']}! €{$doctorPrice} was deducted from your wallet balance and invoice generated.");
    }

    public function triggerSosAlert(Request $request, \App\Services\TelegramService $telegramService)
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        /** @var User $user */
        $user = Auth::user();

        $alert = Alert::create([
            'user_id' => $user->id,
            'reason' => "EMERGENCY SOS: " . $validated['reason'],
            'is_priority_sos' => true,
            'is_resolved' => false,
        ]);

        // Send high priority alert if telegram linked
        if ($user->telegram_id) {
            $sosMsg = "🚨 <b>EMERGENCY SOS ESCALATION</b>\n\n"
                . "Mother <b>{$user->name}</b> has triggered an Emergency SOS Escalation for Specialist <b>{$user->specialist['name']}</b>.\n\n"
                . "<b>Reason:</b> {$validated['reason']}\n\n"
                . "<i>Priority SLA Active (<5 min response).</i>";

            $telegramService->sendMessage($user->telegram_id, $sosMsg);
        }

        return back()->with('success', '🚨 Emergency SOS Escalation triggered! Your attending physician team has received top-priority alert.');
    }
}
