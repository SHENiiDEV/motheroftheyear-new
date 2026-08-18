<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\SleepLog;
use App\Models\Alert;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $doctor1 = User::create([
            'name' => 'Dr. Sarah Jenkins',
            'email' => 'anna.smirnova@motheroftheyear.ru', // Keep existing test login email
            'password' => Hash::make('password'),
            'specialization' => 'Certified Infant Sleep Specialist (0-3 Yrs)',
            'bio' => 'Certified pediatric sleep consultant with over 8 years of clinical experience. Helped over 1,400 families establish healthy sleep habits and gentle sleep training.',
            'monthly_price' => 49.00,
            'avatar_url' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
            'is_doctor' => true,
        ]);

        $doctor2 = User::create([
            'name' => 'Dr. Emily Carter',
            'email' => 'elena.petrova@motheroftheyear.ru',
            'password' => Hash::make('password'),
            'specialization' => 'Board-Certified Pediatrician & Sleep Expert',
            'bio' => 'Senior pediatrician specializing in sleep regressions, frequent night awakenings, colic management, and night-weaning transitions.',
            'monthly_price' => 75.00,
            'avatar_url' => '/images/emily_carter.jpg',
            'is_doctor' => true,
        ]);

        $doctor3 = User::create([
            'name' => 'Dr. Amanda Vance',
            'email' => 'maria.ivanova@motheroftheyear.ru',
            'password' => Hash::make('password'),
            'specialization' => 'Clinical Neurologist & Maternal Wellness Expert',
            'bio' => 'Specializes in postpartum maternal recovery, circadian rhythm alignment, and neurological sleep optimization for high-sensitivity infants.',
            'monthly_price' => 99.00,
            'avatar_url' => 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
            'is_doctor' => true,
        ]);

        // Seed clients for Dr. Sarah Jenkins
        $client1 = Client::create([
            'telegram_id' => 100001,
            'telegram_username' => 'catherine_m',
            'name' => 'Catherine Miller',
            'email' => 'catherine@example.com',
            'specialist_id' => $doctor1->id,
            'invite_token' => Str::random(32),
            'status' => 'active',
        ]);

        $client2 = Client::create([
            'telegram_id' => 100002,
            'telegram_username' => 'olivia_t',
            'name' => 'Olivia Taylor',
            'email' => 'olivia@example.com',
            'specialist_id' => $doctor1->id,
            'invite_token' => Str::random(32),
            'status' => 'active',
        ]);

        $client3 = Client::create([
            'telegram_id' => 100003,
            'telegram_username' => 'sophia_a',
            'name' => 'Sophia Anderson',
            'email' => 'sophia@example.com',
            'specialist_id' => $doctor1->id,
            'invite_token' => Str::random(32),
            'status' => 'active',
        ]);

        // Seed sleep logs for client 1
        $dates = [now()->subDays(4), now()->subDays(3), now()->subDays(2), now()->subDays(1), now()];
        $hours = [4.5, 5.0, 3.5, 6.0, 4.0];
        $awakenings = [5, 4, 7, 2, 6];
        $moods = [2, 3, 1, 4, 2];

        foreach ($dates as $idx => $date) {
            SleepLog::create([
                'client_id' => $client1->id,
                'date' => $date->format('Y-m-d'),
                'period' => 'morning',
                'hours_slept' => $hours[$idx],
                'awakenings_count' => $awakenings[$idx],
                'mood_score' => $moods[$idx],
                'raw_text' => "Slept roughly {$hours[$idx]} hours. Baby woke up {$awakenings[$idx]} times. Extremely fatigued today.",
                'ai_analysis' => [
                    'reply_message' => "Hang in there! 4 hours of fragmented sleep is very demanding. Please try to take a short rest during baby's first nap today.",
                    'hours_slept' => $hours[$idx],
                    'awakenings' => $awakenings[$idx],
                    'needs_help' => $hours[$idx] < 4.0 || $awakenings[$idx] >= 6,
                ],
            ]);
        }

        // Seed sleep logs for client 2 (stable sleep pattern)
        foreach ($dates as $idx => $date) {
            SleepLog::create([
                'client_id' => $client2->id,
                'date' => $date->format('Y-m-d'),
                'period' => 'morning',
                'hours_slept' => 7.0 + ($idx * 0.2),
                'awakenings_count' => 2,
                'mood_score' => 4,
                'raw_text' => "Slept 7 hours with only 2 brief feeding awakenings.",
                'ai_analysis' => [
                    'reply_message' => "Great sleep progress! Steady rhythm recorded.",
                    'hours_slept' => 7.0 + ($idx * 0.2),
                    'awakenings' => 2,
                    'needs_help' => false,
                ],
            ]);
        }

        // Seed urgent alert for client 1 & 3
        Alert::create([
            'client_id' => $client1->id,
            'reason' => 'Critical sleep deprivation (3.5h slept) & 7 night awakenings. Emotional exhaustion risk detected.',
            'is_resolved' => false,
        ]);

        Alert::create([
            'client_id' => $client3->id,
            'reason' => 'Client logged mood score 1/5 and distress during bedtime routine (4-month regression risk).',
            'is_resolved' => false,
        ]);
    }
}
