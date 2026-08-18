<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    protected string $botToken;

    public function __construct()
    {
        $this->botToken = config('services.telegram.bot_token', env('TELEGRAM_BOT_TOKEN', ''));
    }

    public function sendMessage(int|string $chatId, string $text, ?array $replyMarkup = null): bool
    {
        if (empty($this->botToken)) {
            Log::info("[Telegram Mock] To {$chatId}: {$text}");
            return true;
        }

        try {
            $payload = [
                'chat_id' => $chatId,
                'text' => $text,
                'parse_mode' => 'HTML',
            ];

            if ($replyMarkup) {
                $payload['reply_markup'] = json_encode($replyMarkup);
            }

            $response = Http::post("https://api.telegram.org/bot{$this->botToken}/sendMessage", $payload);

            if (!$response->successful()) {
                Log::error("Telegram send error to {$chatId}: " . $response->body());
                return false;
            }

            return true;
        } catch (\Throwable $e) {
            Log::error("Telegram exception sending to {$chatId}: " . $e->getMessage());
            return false;
        }
    }

    public function setWebhook(string $url): bool
    {
        if (empty($this->botToken)) {
            return false;
        }

        $response = Http::post("https://api.telegram.org/bot{$this->botToken}/setWebhook", [
            'url' => $url,
        ]);

        return $response->successful();
    }
}
