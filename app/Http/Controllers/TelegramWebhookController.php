<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessTelegramMessageJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TelegramWebhookController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        $payload = $request->all();

        Log::info('Telegram Webhook Received:', $payload);

        if (!empty($payload)) {
            // Process message job (sync or async depending on QUEUE_CONNECTION)
            ProcessTelegramMessageJob::dispatch($payload);
        }

        // Return 200 OK to Telegram
        return response()->json(['status' => 'ok'], 200);
    }
}
