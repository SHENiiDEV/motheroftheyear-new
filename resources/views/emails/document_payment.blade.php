<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Subscription & Specialist Care Payment</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #090d16; color: #f8fafc; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 30px auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 35px 30px; text-align: center; border-bottom: 1px solid #1e293b; }
        .logo-title { font-size: 22px; font-weight: 900; color: #ffffff; text-transform: uppercase; letter-spacing: -0.5px; }
        .logo-sub { font-size: 11px; font-weight: 700; color: #f43f5e; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
        .content { padding: 35px 30px; }
        .tier-card { background-color: #020617; border: 1px solid #f43f5e; border-radius: 16px; padding: 25px; text-align: center; margin-bottom: 25px; }
        .tier-label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .tier-name { font-size: 20px; font-weight: 900; color: #ffffff; margin: 6px 0; }
        .tier-price { font-size: 28px; font-weight: 900; color: #f43f5e; margin-bottom: 4px; }
        .details-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
        .details-table td { padding: 10px 0; border-bottom: 1px solid #1e293b; font-size: 13px; }
        .details-label { color: #94a3b8; font-weight: 600; }
        .details-val { color: #ffffff; font-weight: 800; text-align: right; }
        .btn-container { text-align: center; margin: 30px 0 15px; }
        .btn { display: inline-block; background: linear-gradient(135deg, #f43f5e 0%, #9333ea 100%); color: #ffffff !important; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 32px; border-radius: 12px; }
        .footer { background-color: #020617; padding: 25px 30px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="logo-title">Mother of the Year</div>
            <div class="logo-sub">✓ Official Subscription Invoice & Receipt</div>
        </div>

        <div class="content">
            <p style="font-size: 15px; color: #cbd5e1; margin-bottom: 20px;">Dear {{ $user->name }},</p>
            <p style="font-size: 14px; color: #cbd5e1; margin-bottom: 25px; line-height: 1.5;">
                Your weekly specialist care plan has been successfully activated. Your official B2B tax invoice and receipt is attached to this email.
            </p>

            <div class="tier-card">
                <div class="tier-label">Unlocked Specialist Service</div>
                <div class="tier-name">{{ $invoice->doctor_name }}</div>
                <div class="tier-price">€{{ number_format($invoice->amount, 2) }} / week</div>
            </div>

            <table class="details-table">
                <tr>
                    <td class="details-label">Invoice Number</td>
                    <td class="details-val">{{ $invoice->gateway_reference }}</td>
                </tr>
                <tr>
                    <td class="details-label">Amount Paid</td>
                    <td class="details-val">€{{ number_format($invoice->amount, 2) }} EUR</td>
                </tr>
                <tr>
                    <td class="details-label">Remaining Wallet Balance</td>
                    <td class="details-val">€{{ number_format($user->wallet_balance, 2) }} EUR</td>
                </tr>
                <tr>
                    <td class="details-label">Date & Time</td>
                    <td class="details-val">{{ $invoice->created_at ? $invoice->created_at->format('M d, Y H:i T') : date('M d, Y') }}</td>
                </tr>
                <tr>
                    <td class="details-label">PDF Invoice Attachment</td>
                    <td class="details-val" style="color: #f43f5e;">Invoice_{{ $invoice->gateway_reference }}.pdf</td>
                </tr>
            </table>

            <div class="btn-container">
                <a href="{{ route('dashboard') }}" class="btn">View & Access Specialist Portal ↗</a>
            </div>
        </div>

        <div class="footer">
            © {{ date('Y') }} <strong>{{ config('company.company_name', 'CARING AND SUPPORTIVE SERVICE LTD') }}</strong><br>
            Registered Office: {{ config('company.registered_office_address', '58 Mund St, London, W14 9LZ, UK') }} (Co. No. {{ config('company.company_number', '16120199') }})
        </div>
    </div>
</body>
</html>
