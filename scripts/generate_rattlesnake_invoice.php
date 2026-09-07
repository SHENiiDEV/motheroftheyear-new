<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Barryvdh\DomPDF\Facade\Pdf;

echo "Generating Rattlesnake Group Limited B2B Invoice...\n";

$invoiceDir = public_path('invoices');
if (!file_exists($invoiceDir)) {
    mkdir($invoiceDir, 0777, true);
}

$pdf = Pdf::loadView('pdf.rattlesnake_invoice');
$pdfPath = $invoiceDir . '/Invoice_Rattlesnake_Group_INV-RSG-2026-0491.pdf';
file_put_contents($pdfPath, $pdf->output());

echo "Saved Rattlesnake Group PDF Invoice to: {$pdfPath}\n";
