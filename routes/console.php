<?php

use App\Jobs\SendProactiveCheckinJob;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Cron Schedule for Proactive AI Check-ins 3 times a day
Schedule::job(new SendProactiveCheckinJob('morning'))->dailyAt('09:00');
Schedule::job(new SendProactiveCheckinJob('afternoon'))->dailyAt('14:00');
Schedule::job(new SendProactiveCheckinJob('evening'))->dailyAt('21:00');

// Artisan command to manually trigger check-in for testing
Artisan::command('checkin:send {period=morning}', function (string $period) {
    $this->info("Dispatching proactive check-in job for period: {$period}...");
    SendProactiveCheckinJob::dispatch($period);
    $this->info("Done!");
})->purpose('Send proactive DeepSeek check-in to all active Telegram clients');
