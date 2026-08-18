<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SleepLog;
use App\Models\Alert;
use App\Models\Invoice;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $companyDetails = config('company');

        // Mother 1
        $user1 = User::create([
            'name' => 'Catherine Miller',
            'email' => 'catherine@example.com',
            'password' => Hash::make('password'),
            'telegram_id' => 100001,
            'telegram_username' => 'catherine_m',
            'specialist_id' => 2, // Dr. Emily Carter (€39/wk)
            'subscription_tier' => 'clinical care',
            'subscription_status' => 'active',
            'weekly_price' => 39.00,
            'wallet_balance' => 150.00,
            'invite_token' => Str::random(32),
            'billing_name' => 'Catherine Miller',
            'billing_address' => '124 Ocean Drive',
            'billing_city' => 'San Francisco',
            'billing_country' => 'United States',
            'billing_postal_code' => '94103',
            'vat_number' => 'US-9920194',
        ]);

        // Initial deposit transaction
        Transaction::create([
            'user_id' => $user1->id,
            'type' => 'deposit',
            'amount' => 200.00,
            'description' => 'Initial Wallet Deposit (Credit Card)',
            'balance_after' => 200.00,
        ]);

        // Subscription deduction transaction
        Transaction::create([
            'user_id' => $user1->id,
            'type' => 'deduction',
            'amount' => 39.00,
            'description' => 'Immediate Weekly Subscription Fee: Dr. Emily Carter, M.D., FAAP',
            'balance_after' => 161.00,
        ]);

        // Sample Invoice for Catherine
        Invoice::create([
            'invoice_number' => 'INV-2026-0001',
            'user_id' => $user1->id,
            'doctor_id' => 2,
            'doctor_name' => 'Dr. Emily Carter, M.D., FAAP',
            'amount' => 39.00,
            'type' => 'subscription',
            'status' => 'paid',
            'billing_snapshot' => [
                'name' => 'Catherine Miller',
                'address' => '124 Ocean Drive',
                'city' => 'San Francisco',
                'country' => 'United States',
                'postal_code' => '94103',
                'vat_number' => 'US-9920194',
            ],
            'company_snapshot' => $companyDetails,
        ]);

        // Mother 2
        $user2 = User::create([
            'name' => 'Olivia Taylor',
            'email' => 'olivia@example.com',
            'password' => Hash::make('password'),
            'telegram_id' => 100002,
            'telegram_username' => 'olivia_t',
            'specialist_id' => 1, // Dr. Sarah Jenkins (€19/wk)
            'subscription_tier' => 'standard care',
            'subscription_status' => 'active',
            'weekly_price' => 19.00,
            'wallet_balance' => 100.00,
            'invite_token' => Str::random(32),
            'billing_name' => 'Olivia Taylor',
            'billing_address' => '500 Market St',
            'billing_city' => 'New York',
            'billing_country' => 'United States',
            'billing_postal_code' => '10001',
        ]);

        // Seed sleep logs for Catherine
        $dates = [now()->subDays(4), now()->subDays(3), now()->subDays(2), now()->subDays(1), now()];
        $hours = [4.5, 5.0, 3.5, 6.0, 4.0];
        $awakenings = [5, 4, 7, 2, 6];
        $moods = [2, 3, 1, 4, 2];

        foreach ($dates as $idx => $date) {
            SleepLog::create([
                'user_id' => $user1->id,
                'date' => $date->format('Y-m-d'),
                'period' => 'morning',
                'hours_slept' => $hours[$idx],
                'awakenings_count' => $awakenings[$idx],
                'mood_score' => $moods[$idx],
                'raw_text' => "Slept roughly {$hours[$idx]} hours. Baby woke up {$awakenings[$idx]} times. Extremely fatigued today.",
                'ai_analysis' => [
                    'reply_message' => "Hang in there! 4 hours of fragmented sleep is demanding. Please try to rest during baby's first nap today.",
                    'hours_slept' => $hours[$idx],
                    'awakenings' => $awakenings[$idx],
                    'needs_help' => $hours[$idx] < 4.0 || $awakenings[$idx] >= 6,
                ],
            ]);
        }
    }
}
