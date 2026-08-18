<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Alert;
use App\Models\Client;
use App\Models\SleepLog;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $doctor = Auth::user();

        // Clients assigned to this doctor
        $clients = Client::where('specialist_id', $doctor->id)
            ->with(['alerts' => fn($q) => $q->where('is_resolved', false)])
            ->withCount('sleepLogs')
            ->get();

        // Unresolved alerts for doctor's clients
        $clientIds = $clients->pluck('id');
        $activeAlerts = Alert::whereIn('client_id', $clientIds)
            ->where('is_resolved', false)
            ->with('client')
            ->latest()
            ->get();

        // Key metrics
        $totalClientsCount = $clients->count();
        $activeAlertsCount = $activeAlerts->count();
        $monthlyRevenue = $totalClientsCount * ($doctor->monthly_price ?? 4900);

        // Average sleep hours across all doctor's clients over last 7 days
        $avgSleepHours = SleepLog::whereIn('client_id', $clientIds)
            ->where('date', '>=', now()->subDays(7))
            ->whereNotNull('hours_slept')
            ->avg('hours_slept');

        return Inertia::render('Dashboard', [
            'doctor' => $doctor,
            'clients' => $clients,
            'activeAlerts' => $activeAlerts,
            'stats' => [
                'totalClients' => $totalClientsCount,
                'activeAlerts' => $activeAlertsCount,
                'monthlyRevenue' => round($monthlyRevenue, 2),
                'avgSleepHours' => round($avgSleepHours ?? 5.2, 1),
            ],
        ]);
    }

    public function showClient(Client $client): Response
    {
        // Security check
        if ($client->specialist_id !== Auth::id()) {
            abort(403, 'У вас нет доступа к этой пациентке.');
        }

        $client->load([
            'specialist',
            'sleepLogs' => fn($q) => $q->orderBy('date', 'desc')->take(30),
            'alerts' => fn($q) => $q->orderBy('created_at', 'desc'),
        ]);

        return Inertia::render('Client/Show', [
            'client' => $client,
        ]);
    }

    public function sendMessage(Request $request, Client $client, TelegramService $telegramService)
    {
        if ($client->specialist_id !== Auth::id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'message' => 'required|string|max:2000',
        ]);

        if (!$client->telegram_id) {
            return back()->with('error', 'У клиентки еще не привязан Telegram аккаунт.');
        }

        $doctorName = Auth::user()->name;
        $formattedText = "👨‍⚕️ <b>Сообщение от вашего врача ({$doctorName}):</b>\n\n" . e($validated['message']);

        $sent = $telegramService->sendMessage($client->telegram_id, $formattedText);

        if ($sent) {
            return back()->with('success', 'Сообщение отправлено пациентке в Telegram!');
        }

        return back()->with('error', 'Не удалось отправить сообщение в Telegram.');
    }

    public function resolveAlert(Alert $alert)
    {
        if ($alert->client->specialist_id !== Auth::id()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $alert->update([
            'is_resolved' => true,
            'resolved_at' => now(),
            'resolved_by' => Auth::id(),
        ]);

        return back()->with('success', 'Алерт успешно закрыт.');
    }
}
