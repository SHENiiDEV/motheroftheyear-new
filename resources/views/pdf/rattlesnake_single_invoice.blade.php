<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoiceNum }} — Rattlesnake Group Limited</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 12px;
            color: #1e293b;
            line-height: 1.5;
            margin: 0;
            padding: 30px;
            background-color: #ffffff;
        }

        .header-table {
            width: 100%;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }

        .brand-title {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
            text-transform: uppercase;
        }

        .brand-subtitle {
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .invoice-badge {
            font-size: 14px;
            font-weight: 900;
            color: #0f172a;
            text-transform: uppercase;
            text-align: right;
        }

        .paid-stamp {
            display: inline-block;
            background-color: #ecfdf5;
            color: #059669;
            border: 1.5px solid #10b981;
            padding: 5px 14px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-top: 6px;
        }

        .details-table {
            width: 100%;
            margin-bottom: 35px;
        }

        .details-box {
            width: 48%;
            vertical-align: top;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
        }

        .box-title {
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 4px;
        }

        .company-name {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 4px;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }

        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 10px 14px;
            text-align: left;
        }

        .items-table td {
            padding: 14px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }

        .item-desc {
            font-weight: 700;
            color: #0f172a;
            font-size: 12px;
        }

        .item-subtext {
            color: #64748b;
            font-size: 10px;
            margin-top: 3px;
        }

        .summary-table {
            width: 45%;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        .summary-table td {
            padding: 8px 14px;
            font-size: 11px;
        }

        .total-row td {
            border-top: 2px solid #0f172a;
            font-size: 15px;
            font-weight: 900;
            color: #0f172a;
            padding-top: 12px;
        }

        .legal-footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            font-size: 9.5px;
            color: #64748b;
            text-align: center;
            line-height: 1.5;
        }
    </style>
</head>
<body>

    <!-- Header Table -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: middle;">
                <div class="brand-title">Rattlesnake Group</div>
                <div class="brand-subtitle">{{ $categorySubtitle ?? 'Software Engineering & Digital Design Studio' }}</div>
            </td>
            <td style="vertical-align: middle; text-align: right;">
                <div class="invoice-badge">Official Tax Invoice</div>
                <div class="paid-stamp">PAID &amp; VERIFIED</div>
            </td>
        </tr>
    </table>

    <!-- Client & Issuer Details -->
    <table class="details-table">
        <tr>
            <td class="details-box">
                <div class="box-title">Merchant of Record (Issuer)</div>
                <div class="company-name">Rattlesnake Group Limited</div>
                <div>Company Reg No: <strong>12551349</strong></div>
                <div>VAT Registration No: <strong>GB 436362592</strong></div>
                <div>Registered Address: 124 City Road, London EC1V 2NX, United Kingdom</div>
                <div>Email: billing@rattlesnake-group.com</div>
            </td>
            <td style="width: 4%;"></td>
            <td class="details-box">
                <div class="box-title">Billed To (Client)</div>
                <div class="company-name">CARING AND SUPPORTIVE SERVICE LTD</div>
                <div>Company Reg No: <strong>16120199</strong></div>
                <div>Address: 58 Mund St, London W14 9LZ, United Kingdom</div>
                <div>Email: support@caringandsupportive.co.uk</div>
                <div style="margin-top: 6px;">Reference: <strong>{{ $invoiceNum }}</strong></div>
                <div>Date: <strong>{{ $invoiceDate }}</strong></div>
            </td>
        </tr>
    </table>

    <!-- Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 55%;">Service Description</th>
                <th style="width: 10%; text-align: center;">Qty</th>
                <th style="width: 17.5%; text-align: right;">Unit Price</th>
                <th style="width: 17.5%; text-align: right;">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="item-desc">{{ $serviceTitle }}</div>
                    <div class="item-subtext">{{ $serviceDesc }}</div>
                </td>
                <td style="text-align: center; font-weight: bold;">1</td>
                <td style="text-align: right;">€{{ number_format($amount, 2) }}</td>
                <td style="text-align: right; font-weight: bold;">€{{ number_format($amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Summary Table -->
    <table class="summary-table">
        <tr>
            <td style="color: #64748b;">Subtotal:</td>
            <td style="text-align: right; font-weight: bold;">€{{ number_format($amount, 2) }}</td>
        </tr>
        <tr>
            <td style="color: #64748b;">VAT / Tax (0% UK B2B Reverse Charge):</td>
            <td style="text-align: right; font-weight: bold;">€0.00</td>
        </tr>
        <tr class="total-row">
            <td>Total Paid:</td>
            <td style="text-align: right;">€{{ number_format($amount, 2) }} EUR</td>
        </tr>
    </table>

    <!-- Legal Footer -->
    <div class="legal-footer">
        © 2020-2026 <strong>Rattlesnake Group Limited</strong>.<br>
        Rattlesnake Group Limited is a limited liability company registered in England and Wales. Registered number: <strong>12551349</strong>.<br>
        Registered address: 124 City Road, London EC1V 2NX. VAT Registration Number: <strong>436362592</strong>.
    </div>

</body>
</html>
