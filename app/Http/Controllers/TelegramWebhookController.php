<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessTelegramMessageJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TelegramWebhookController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        $payload = $request->all();

        if (!empty($payload)) {
            // Dispatch asynchronously to Redis queue
            ProcessTelegramMessageJob::dispatch($payload);
        }

        // Immediately return 200 OK to Telegram webhook
        return response()->json(['status' => 'ok'], 200);
    }
}
