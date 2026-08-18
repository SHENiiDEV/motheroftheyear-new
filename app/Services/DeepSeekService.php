<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeepSeekService
{
    protected string $apiKey;
    protected string $baseUrl;
    protected string $model;

    public function __construct()
    {
        $this->apiKey = config('services.deepseek.api_key', env('DEEPSEEK_API_KEY', ''));
        $this->baseUrl = config('services.deepseek.base_url', env('DEEPSEEK_API_BASE_URL', 'https://api.deepseek.com/v1'));
        $this->model = config('services.deepseek.model', env('DEEPSEEK_MODEL', 'deepseek-chat'));
    }

    public function analyzeSleepMessageUser(User $user, string $messageText): array
    {
        $specialistName = $user->specialist['name'] ?? 'Your Sleep Specialist';

        $systemPrompt = <<<PROMPT
You are an empathetic, highly qualified infant sleep consultant AI working as {$specialistName} for the "Mother of the Year" platform.
Your task is to carefully analyze the message sent by a mother named {$user->name}.

Return the result STRICTLY as a valid JSON object without any additional text or markdown formatting (no ```json wrappers):
{
  "reply_message": "Warm, supportive, and empathetic reply to the mother (2-4 sentences) with validation and a practical basic sleep tip.",
  "hours_slept": 5.5,
  "awakenings": 3,
  "mood_score": 3,
  "needs_help": false,
  "alert_reason": "Reason for alarm (if needs_help === true)"
}

Evaluation guidelines:
- hours_slept: float, total hours slept. If not explicitly specified, estimate logically or set to null.
- awakenings: integer, number of night awakenings, or null.
- mood_score: integer from 1 (severe distress, extreme exhaustion) to 5 (excellent, well-rested).
- needs_help: boolean (true if total sleep < 4 hours, awakenings >= 6, or phrases indicating severe emotional distress).
PROMPT;

        if (empty($this->apiKey)) {
            Log::warning("AI API key is empty. Falling back to intelligent heuristic parser.");
            return $this->fallbackAnalysis($messageText);
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post("{$this->baseUrl}/chat/completions", [
                'model' => $this->model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $messageText],
                ],
                'temperature' => 0.4,
                'response_format' => ['type' => 'json_object'],
            ]);

            if ($response->successful()) {
                $content = $response->json('choices.0.message.content');
                $parsed = json_decode($content, true);

                if (is_array($parsed) && isset($parsed['reply_message'])) {
                    return $parsed;
                }
            } else {
                Log::error("AI API error: " . $response->body());
            }
        } catch (\Throwable $e) {
            Log::error("AI API exception: " . $e->getMessage());
        }

        return $this->fallbackAnalysis($messageText);
    }

    public function generateProactivePromptUser(User $user, string $timeOfDay): string
    {
        $specialistName = $user->specialist['name'] ?? 'your sleep specialist';
        $recentLogs = $user->sleepLogs()->latest()->take(3)->get();

        $historySummary = $recentLogs->map(function ($log) {
            return "{$log->date} ({$log->period}): slept {$log->hours_slept}h, awakenings {$log->awakenings_count}, note: {$log->raw_text}";
        })->implode("\n");

        $timeText = match ($timeOfDay) {
            'morning' => 'Morning (ask about last night’s sleep duration, quality, and how mom is feeling)',
            'afternoon' => 'Afternoon (ask about daytime naps and whether mom had a moment to rest)',
            'evening' => 'Evening (ask about bedtime routine preparation and bedtime mood)',
            default => 'Afternoon',
        };

        $systemPrompt = <<<PROMPT
You are a caring AI sleep assistant working as {$specialistName} for the "Mother of the Year" platform.
Write a concise (1-3 sentences), warm, engaging Telegram message in English to a mother named {$user->name}.
Time Context: {$timeText}.
Recent Sleep Logs History:
{$historySummary}

Keep the question empathetic and easy to respond to.
PROMPT;

        if (empty($this->apiKey)) {
            return match ($timeOfDay) {
                'morning' => "Good morning, {$user->name}! ☀️ How was your night? How many hours of sleep did you get, and how is your baby feeling today?",
                'afternoon' => "Good afternoon, {$user->name}! 🌸 How is your day going? Were you able to rest a bit during baby's daytime nap?",
                'evening' => "Good evening, {$user->name}! 🌙 How are you feeling tonight? Are you getting ready for bedtime?",
                default => "Hello {$user->name}! How are you and your baby doing today?",
            };
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(20)->post("{$this->baseUrl}/chat/completions", [
                'model' => $this->model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => "Generate proactive message."],
                ],
                'temperature' => 0.7,
            ]);

            if ($response->successful()) {
                return trim($response->json('choices.0.message.content'));
            }
        } catch (\Throwable $e) {
            Log::error("AI proactive prompt exception: " . $e->getMessage());
        }

        return match ($timeOfDay) {
            'morning' => "Good morning, {$user->name}! ☀️ How was your night? Let us know how many hours of sleep you managed to get.",
            'afternoon' => "Good afternoon, {$user->name}! 🌸 How are you feeling today? Did you manage to catch a nap?",
            'evening' => "Good evening, {$user->name}! 🌙 How is the bedtime routine going? Wishing you a calm night ahead.",
            default => "Hello {$user->name}! How are you feeling today?",
        };
    }

    protected function fallbackAnalysis(string $messageText): array
    {
        preg_match('/(\d+[\.,]?\d*)\s*(hour|hr|h)/iu', $messageText, $hoursMatch);
        preg_match('/(\d+)\s*(times|time|woke|awaken)/iu', $messageText, $awakeningsMatch);

        $hours = isset($hoursMatch[1]) ? (float) str_replace(',', '.', $hoursMatch[1]) : null;
        $awakenings = isset($awakeningsMatch[1]) ? (int) $awakeningsMatch[1] : null;
        $needsHelp = ($hours !== null && $hours < 4.5) || ($awakenings !== null && $awakenings >= 5) || str_contains(strtolower($messageText), 'exhausted') || str_contains(strtolower($messageText), 'crying');

        return [
            'reply_message' => "Thank you for sharing! I've logged this in your daily sleep journal. If you feel overwhelmed, please reach out to us anytime!",
            'hours_slept' => $hours ?? 5.0,
            'awakenings' => $awakenings ?? 3,
            'mood_score' => $needsHelp ? 2 : 4,
            'needs_help' => $needsHelp,
            'alert_reason' => $needsHelp ? "Low sleep duration or high fatigue signals detected" : null,
        ];
    }
}
