<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Barryvdh\DomPDF\Facade\Pdf;

echo "Generating 2 Separate Rattlesnake Group Limited B2B Invoices (Design & Development)...\n";

$invoiceDir = public_path('invoices');
if (!file_exists($invoiceDir)) {
    mkdir($invoiceDir, 0777, true);
}

// INVOICE 1: DESIGN (€10,000)
$designPdf = Pdf::loadView('pdf.rattlesnake_single_invoice', [
    'invoiceNum' => 'INV-RSG-2026-0492',
    'invoiceDate' => 'Sep 07, 2026',
    'categorySubtitle' => 'Digital UI/UX Design & Visual Identity Studio',
    'serviceTitle' => 'UI/UX Design, Visual System & Graphic Suite',
    'serviceDesc' => 'Complete web UI design system, mobile drawer menu UX, responsive layout architecture, typography calibration, color palette system, and brand identity suite.',
    'amount' => 10000.00,
]);
$designPdfPath = $invoiceDir . '/Invoice_Rattlesnake_Group_Design_INV-RSG-2026-0492.pdf';
file_put_contents($designPdfPath, $designPdf->output());
echo "Saved Design PDF Invoice (€10,000) to: {$designPdfPath}\n";

// INVOICE 2: DEVELOPMENT (€12,000)
$devPdf = Pdf::loadView('pdf.rattlesnake_single_invoice', [
    'invoiceNum' => 'INV-RSG-2026-0493',
    'invoiceDate' => 'Sep 07, 2026',
    'categorySubtitle' => 'Full-Stack Software Engineering & Cloud Architecture',
    'serviceTitle' => 'Turnkey Web Development & Platform Engineering',
    'serviceDesc' => 'Full-stack Laravel 12 & Inertia.js platform engineering, B2B DomPDF invoice engine, Telegram Bot webhook integration, multi-currency wallet system, and performance optimization.',
    'amount' => 12000.00,
]);
$devPdfPath = $invoiceDir . '/Invoice_Rattlesnake_Group_Development_INV-RSG-2026-0493.pdf';
file_put_contents($devPdfPath, $devPdf->output());
echo "Saved Development PDF Invoice (€12,000) to: {$devPdfPath}\n";

echo "2 Separate Rattlesnake Invoices generated successfully!\n";
