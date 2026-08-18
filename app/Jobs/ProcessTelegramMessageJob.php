<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\SleepLog;
use App\Models\Alert;
use App\Services\DeepSeekService;
use App\Services\TelegramService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessTelegramMessageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public array $payload;

    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    public function handle(DeepSeekService $deepSeekService, TelegramService $telegramService): void
    {
        $message = $this->payload['message'] ?? null;
        if (!$message) {
            return;
        }

        $chatId = $message['chat']['id'] ?? null;
        $text = trim($message['text'] ?? '');
        $username = $message['from']['username'] ?? null;

        if (!$chatId || empty($text)) {
            return;
        }

        // Handle /start {token}
        if (str_starts_with($text, '/start')) {
            $parts = explode(' ', $text);
            $token = $parts[1] ?? null;

            if ($token) {
                $user = User::where('invite_token', $token)->first();
                if ($user) {
                    $user->update([
                        'telegram_id' => $chatId,
                        'telegram_username' => $username,
                        'subscription_status' => 'active',
                    ]);

                    $specialistName = $user->specialist['name'] ?? 'Your Specialist';
                    $welcomeMsg = "🎉 <b>Welcome, {$user->name}!</b>\n\n"
                        . "Your Telegram account is now linked to your Mother of the Year account and AI Specialist <b>{$specialistName}</b>.\n\n"
                        . "I will check in with you 3 times a day (Morning, Afternoon, Evening) to log your baby's sleep and your wellbeing. You can also send me messages anytime!";

                    $telegramService->sendMessage($chatId, $welcomeMsg);
                    return;
                }
            }

            // Check if already registered
            $existingUser = User::where('telegram_id', $chatId)->first();
            if ($existingUser) {
                $specialistName = $existingUser->specialist['name'] ?? 'Your Specialist';
                $telegramService->sendMessage($chatId, "Welcome back, {$existingUser->name}! You are connected with AI Specialist <b>{$specialistName}</b>. How did you and your baby sleep last night?");
                return;
            }

            $noTokenMsg = "Welcome to <b>Mother of the Year</b>! 🌸\n\nTo connect your Telegram and activate AI Sleep Tracking, please sign up or log in on our website.";
            $telegramService->sendMessage($chatId, $noTokenMsg);
            return;
        }

        // Handle incoming sleep log message from registered user
        $user = User::where('telegram_id', $chatId)->first();

        if (!$user) {
            $telegramService->sendMessage($chatId, "We couldn't find your active account. Please sign up on the Mother of the Year website to activate your subscription.");
            return;
        }

        // Analyze via AI Service
        $analysis = $deepSeekService->analyzeSleepMessageUser($user, $text);

        // Determine period based on current hour
        $hour = (int) now()->format('H');
        $period = match (true) {
            $hour >= 5 && $hour < 12 => 'morning',
            $hour >= 12 && $hour < 18 => 'afternoon',
            default => 'evening',
        };

        // Create Sleep Log
        $sleepLog = SleepLog::create([
            'user_id' => $user->id,
            'date' => now()->format('Y-m-d'),
            'period' => $period,
            'hours_slept' => $analysis['hours_slept'] ?? null,
            'awakenings_count' => $analysis['awakenings'] ?? null,
            'mood_score' => $analysis['mood_score'] ?? null,
            'raw_text' => $text,
            'ai_analysis' => $analysis,
        ]);

        // Trigger Alert if needs_help
        if (!empty($analysis['needs_help'])) {
            Alert::create([
                'user_id' => $user->id,
                'reason' => $analysis['alert_reason'] ?? 'Critical sleep deprivation or distress signal detected',
                'is_resolved' => false,
            ]);
        }

        // Send reply to client
        $replyText = $analysis['reply_message'] ?? "Thank you! Your entry has been logged in your sleep journal.";
        $telegramService->sendMessage($chatId, $replyText);
    }
}
