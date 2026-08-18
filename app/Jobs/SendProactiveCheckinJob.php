<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\DeepSeekService;
use App\Services\TelegramService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendProactiveCheckinJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public string $timeOfDay; // morning, afternoon, evening

    public function __construct(string $timeOfDay = 'morning')
    {
        $this->timeOfDay = $timeOfDay;
    }

    public function handle(DeepSeekService $deepSeekService, TelegramService $telegramService): void
    {
        $activeUsers = User::where('subscription_status', 'active')
            ->whereNotNull('telegram_id')
            ->get();

        foreach ($activeUsers as $user) {
            $questionText = $deepSeekService->generateProactivePromptUser($user, $this->timeOfDay);
            $telegramService->sendMessage($user->telegram_id, $questionText);
        }
    }
}
