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
            'name' => 'Catherine',
            'surname' => 'Miller',
            'email' => 'catherine@example.com',
            'password' => Hash::make('password'),
            'phone_number' => '+44 7911 123456',
            'date_of_birth' => '1990-05-15',
            'telegram_id' => 100001,
            'telegram_username' => 'catherine_m',
            'specialist_id' => 2, // Dr. Emily Carter (€99/wk)
            'subscription_tier' => 'clinical care',
            'subscription_status' => 'active',
            'weekly_price' => 99.00,
            'wallet_balance' => 300.00,
            'invite_token' => Str::random(32),
            'billing_name' => 'Catherine Miller',
            'billing_address' => '58 Mund St, Apt 4B',
            'billing_city' => 'London',
            'billing_country' => 'United Kingdom',
            'billing_postal_code' => 'W14 9LZ',
            'vat_number' => 'GB-9920194',
            'agreed_terms' => true,
        ]);

        // Initial deposit transaction
        Transaction::create([
            'user_id' => $user1->id,
            'type' => 'deposit',
            'amount' => 300.00,
            'description' => 'Initial Wallet Deposit (Credit Card)',
            'balance_after' => 300.00,
        ]);

        // Subscription deduction transaction
        Transaction::create([
            'user_id' => $user1->id,
            'type' => 'deduction',
            'amount' => 99.00,
            'description' => 'Immediate Weekly Subscription Fee: Dr. Emily Carter, M.D., FAAP',
            'balance_after' => 201.00,
        ]);

        // Sample Invoice for Catherine
        Invoice::create([
            'invoice_number' => 'INV-2026-0001',
            'user_id' => $user1->id,
            'doctor_id' => 2,
            'doctor_name' => 'Dr. Emily Carter, M.D., FAAP',
            'amount' => 99.00,
            'type' => 'subscription',
            'status' => 'paid',
            'billing_snapshot' => [
                'name' => 'Catherine Miller',
                'address' => '58 Mund St, Apt 4B',
                'city' => 'London',
                'country' => 'United Kingdom',
                'postal_code' => 'W14 9LZ',
                'vat_number' => 'GB-9920194',
            ],
            'company_snapshot' => $companyDetails,
        ]);

        // Mother 2
        $user2 = User::create([
            'name' => 'Olivia',
            'surname' => 'Taylor',
            'email' => 'olivia@example.com',
            'password' => Hash::make('password'),
            'phone_number' => '+44 7922 654321',
            'date_of_birth' => '1992-08-20',
            'telegram_id' => 100002,
            'telegram_username' => 'olivia_t',
            'specialist_id' => 1, // Dr. Sarah Jenkins (€49/wk)
            'subscription_tier' => 'standard care',
            'subscription_status' => 'active',
            'weekly_price' => 49.00,
            'wallet_balance' => 200.00,
            'invite_token' => Str::random(32),
            'billing_name' => 'Olivia Taylor',
            'billing_address' => '500 Market St',
            'billing_city' => 'London',
            'billing_country' => 'United Kingdom',
            'billing_postal_code' => 'EC1A 1BB',
            'agreed_terms' => true,
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
