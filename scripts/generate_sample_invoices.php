<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Invoice;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

echo "Generating 2 Client Doctor Purchase Invoices...\n";

// Ensure public/invoices folder exists
$invoiceDir = public_path('invoices');
if (!file_exists($invoiceDir)) {
    mkdir($invoiceDir, 0777, true);
}

$companyDetails = config('company');

// --- CLIENT 1 ---
$user1 = User::firstOrCreate(
    ['email' => 'sophia.martinez@vanguard-cp.com'],
    [
        'name' => 'Sophia',
        'surname' => 'Martinez',
        'password' => Hash::make('password123'),
        'phone_number' => '+44 7700 900123',
        'date_of_birth' => '1989-11-04',
        'specialist_id' => 3, // Dr. Amanda Vance (€1,990/mo)
        'subscription_tier' => 'neurological executive',
        'subscription_status' => 'active',
        'weekly_price' => 1990.00,
        'wallet_balance' => 3010.00,
        'invite_token' => Str::random(32),
        'billing_name' => 'Sophia Martinez (Vanguard Capital Partners LLC)',
        'billing_address' => '120 Pall Mall, St. James\'s',
        'billing_city' => 'London',
        'billing_country' => 'United Kingdom',
        'billing_postal_code' => 'SW1Y 5EA',
        'vat_number' => 'GB-849201948',
        'agreed_terms' => true,
    ]
);

// Transaction 1
$tx1 = Transaction::create([
    'user_id' => $user1->id,
    'type' => 'deduction',
    'amount' => 1990.00,
    'description' => 'Immediate Monthly Subscription Charge: Dr. Amanda Vance, M.D., Ph.D.',
    'balance_after' => 3010.00,
    'created_at' => '2026-09-02 14:15:00',
]);

// Invoice 1
$invoice1 = Invoice::firstOrCreate(
    ['invoice_number' => 'INV-2026-889102'],
    [
        'user_id' => $user1->id,
        'doctor_id' => 3,
        'doctor_name' => 'Dr. Amanda Vance, M.D., Ph.D.',
        'amount' => 1990.00,
        'type' => 'subscription',
        'status' => 'paid',
        'billing_snapshot' => [
            'name' => $user1->billing_name,
            'address' => $user1->billing_address,
            'city' => $user1->billing_city,
            'country' => $user1->billing_country,
            'postal_code' => $user1->billing_postal_code,
            'vat_number' => $user1->vat_number,
        ],
        'company_snapshot' => $companyDetails,
        'created_at' => '2026-09-02 14:15:00',
    ]
);

// Render & Save PDF 1
$pdf1 = Pdf::loadView('pdf.wallet_invoice', [
    'payment' => $invoice1,
    'user' => $user1,
]);
$pdfPath1 = $invoiceDir . '/Invoice_INV-2026-889102.pdf';
file_put_contents($pdfPath1, $pdf1->output());
echo "Saved PDF 1 to: {$pdfPath1}\n";

// --- CLIENT 2 ---
$user2 = User::firstOrCreate(
    ['email' => 'a.bernstorff@bernstorff-holding.lu'],
    [
        'name' => 'Alexander',
        'surname' => 'von Bernstorff',
        'password' => Hash::make('password123'),
        'phone_number' => '+352 27 86 12 34',
        'date_of_birth' => '1984-03-22',
        'specialist_id' => 5, // Dr. Victoria Montgomery (€4,990/mo)
        'subscription_tier' => 'vip concierge chair',
        'subscription_status' => 'active',
        'weekly_price' => 4990.00,
        'wallet_balance' => 5010.00,
        'invite_token' => Str::random(32),
        'billing_name' => 'Alexander von Bernstorff (Bernstorff Private Family Office S.A.)',
        'billing_address' => '14 Boulevard Royal',
        'billing_city' => 'Luxembourg',
        'billing_country' => 'Luxembourg',
        'billing_postal_code' => 'L-2449',
        'vat_number' => 'LU-31094829',
        'agreed_terms' => true,
    ]
);

// Transaction 2
$tx2 = Transaction::firstOrCreate(
    ['user_id' => $user2->id, 'amount' => 4990.00, 'type' => 'deduction'],
    [
        'description' => 'Immediate Monthly Subscription Charge: Dr. Victoria Montgomery, M.D., FRCP',
        'balance_after' => 5010.00,
        'created_at' => '2026-09-05 09:30:00',
    ]
);

// Invoice 2
$invoice2 = Invoice::firstOrCreate(
    ['invoice_number' => 'INV-2026-994101'],
    [
        'user_id' => $user2->id,
        'doctor_id' => 5,
        'doctor_name' => 'Dr. Victoria Montgomery, M.D., FRCP',
        'amount' => 4990.00,
        'type' => 'subscription',
        'status' => 'paid',
        'billing_snapshot' => [
            'name' => $user2->billing_name,
            'address' => $user2->billing_address,
            'city' => $user2->billing_city,
            'country' => $user2->billing_country,
            'postal_code' => $user2->billing_postal_code,
            'vat_number' => $user2->vat_number,
        ],
        'company_snapshot' => $companyDetails,
        'created_at' => '2026-09-05 09:30:00',
    ]
);

// Render & Save PDF 2
$pdf2 = Pdf::loadView('pdf.wallet_invoice', [
    'payment' => $invoice2,
    'user' => $user2,
]);
$pdfPath2 = $invoiceDir . '/Invoice_INV-2026-994101.pdf';
file_put_contents($pdfPath2, $pdf2->output());
echo "Saved PDF 2 to: {$pdfPath2}\n";

echo "Invoices generation completed successfully!\n";
