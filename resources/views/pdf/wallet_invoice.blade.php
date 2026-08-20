<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Official Invoice — {{ $payment->gateway_reference }}</title>
    <style>
        @page {
            margin: 40px 45px;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #1e293b;
            font-size: 13px;
            line-height: 1.5;
            background-color: #ffffff;
        }
        .header-table {
            width: 100%;
            margin-bottom: 30px;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 20px;
        }
        .brand-title {
            font-size: 22px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
            text-transform: uppercase;
        }
        .brand-subtitle {
            font-size: 11px;
            color: #e11d48;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .invoice-badge {
            font-size: 20px;
            font-weight: 900;
            color: #0f172a;
            text-align: right;
            text-transform: uppercase;
        }
        .paid-stamp {
            display: inline-block;
            background-color: #dcfce7;
            color: #15803d;
            border: 1px solid #bbf7d0;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin-top: 4px;
        }
        .details-table {
            width: 100%;
            margin-bottom: 30px;
        }
        .details-box {
            vertical-align: top;
            width: 48%;
        }
        .box-title {
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 3px;
        }
        .company-name {
            font-size: 14px;
            font-weight: 800;
            color: #0f172a;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 10px 12px;
            text-align: left;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 12px;
        }
        .totals-table {
            width: 40%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .totals-table td {
            padding: 6px 12px;
            font-size: 12px;
        }
        .totals-table .total-row td {
            border-top: 2px solid #0f172a;
            font-size: 15px;
            font-weight: 900;
            color: #0f172a;
            padding-top: 10px;
        }
        .legal-notice {
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 10px;
            color: #64748b;
            text-align: center;
            line-height: 1.4;
        }
    </style>
</head>
<body>

    <!-- Header Table -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: middle;">
                <div class="brand-title">Mother of the Year</div>
                <div class="brand-subtitle">Pediatric Sleep Care & Maternal Wellness</div>
            </td>
            <td style="vertical-align: middle; text-align: right;">
                <div class="invoice-badge">Official Receipt</div>
                <div class="paid-stamp">✓ Paid & Verified</div>
            </td>
        </tr>
    </table>

    <!-- Client & Company Details -->
    <table class="details-table">
        <tr>
            <td class="details-box">
                <div class="box-title">Merchant of Record (Issuer)</div>
                <div class="company-name">{{ config('company.company_name', 'CARING AND SUPPORTIVE SERVICE LTD') }}</div>
                <div>Company No: <strong>{{ config('company.company_number', '16120199') }}</strong></div>
                <div>{{ config('company.registered_office_address', '58 Mund St, London, United Kingdom, W14 9LZ') }}</div>
                <div>Email: {{ config('company.email', 'support@caringandsupportive.co.uk') }}</div>
            </td>
            <td style="width: 4%;"></td>
            <td class="details-box">
                <div class="box-title">Billed To (Client)</div>
                <div class="company-name">{{ $user->billing_name ?: $user->name }}</div>
                <div>Email: {{ $user->email }}</div>
                @if($user->phone_number)
                <div>Phone: {{ $user->phone_number }}</div>
                @endif
                @if($user->billing_address)
                <div>Address: {{ $user->billing_address }}, {{ $user->billing_city }} {{ $user->billing_postal_code }}, {{ $user->billing_country }}</div>
                @endif
                <div style="margin-top: 6px;">
                    <div>Reference: <strong>{{ $payment->gateway_reference }}</strong></div>
                    <div>Date: <strong>{{ $payment->created_at ? $payment->created_at->format('M d, Y — H:i T') : date('M d, Y') }}</strong></div>
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 55%;">Service Description</th>
                <th style="width: 15%; text-align: center;">Qty</th>
                <th style="width: 15%; text-align: right;">Unit Price</th>
                <th style="width: 15%; text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>{{ $payment->service_name }}</strong>
                    <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
                        @if($payment->type === 'deposit' || $payment->type === 'topup')
                        Official Wallet Balance Deposit via Credit/Debit Card.
                        @else
                        24/7 Dedicated Pediatrician Monitoring & Sleep Tracking Access.
                        @endif
                    </div>
                </td>
                <td style="text-align: center;">1</td>
                <td style="text-align: right;">€{{ number_format($payment->amount, 2) }}</td>
                <td style="text-align: right;"><strong>€{{ number_format($payment->amount, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <!-- Totals Table -->
    <table class="totals-table">
        <tr>
            <td>Subtotal:</td>
            <td style="text-align: right;">€{{ number_format($payment->amount, 2) }}</td>
        </tr>
        <tr>
            <td>VAT / Tax (0% UK B2B):</td>
            <td style="text-align: right;">€0.00</td>
        </tr>
        <tr class="total-row">
            <td>Total Paid:</td>
            <td style="text-align: right;">€{{ number_format($payment->amount, 2) }} EUR</td>
        </tr>
    </table>

    <!-- Legal Notice & Disclaimer -->
    <div class="legal-notice">
        This document constitutes an official receipt and B2B invoice issued by <strong>{{ config('company.company_name', 'CARING AND SUPPORTIVE SERVICE LTD') }}</strong> (Registered in England & Wales, Company No. {{ config('company.company_number', '16120199') }}). Unused wallet balances are eligible for refund within 14 days of deposit in accordance with UK Consumer Rights Regulations. All services governed under the Laws of England and Wales.
    </div>

</body>
</html>
