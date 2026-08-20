<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Mother of the Year</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #090d16; color: #f8fafc; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 30px auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 35px 30px; text-align: center; border-bottom: 1px solid #1e293b; }
        .logo-title { font-size: 22px; font-weight: 900; color: #ffffff; text-transform: uppercase; letter-spacing: -0.5px; }
        .logo-sub { font-size: 11px; font-weight: 700; color: #f43f5e; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px; }
        .content { padding: 35px 30px; }
        .greeting { font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 15px; }
        .text { font-size: 14px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px; }
        .feature-card { background-color: #020617; border: 1px solid #1e293b; border-radius: 14px; padding: 16px 20px; margin-bottom: 12px; }
        .feature-title { font-size: 13px; font-weight: 800; color: #ffffff; margin-bottom: 4px; }
        .feature-desc { font-size: 12px; color: #94a3b8; line-height: 1.4; }
        .btn-container { text-align: center; margin: 30px 0 15px; }
        .btn { display: inline-block; background: linear-gradient(135deg, #f43f5e 0%, #9333ea 100%); color: #ffffff !important; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 32px; border-radius: 12px; box-shadow: 0 10px 20px -5px rgba(244, 63, 94, 0.4); }
        .footer { background-color: #020617; padding: 25px 30px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="logo-title">Mother of the Year</div>
            <div class="logo-sub">Pediatric Sleep Care & Maternal Wellness</div>
        </div>

        <div class="content">
            <div class="greeting">Dear {{ $user->name }},</div>
            <p class="text">
                Welcome to <strong>Mother of the Year</strong>. Your dedicated pediatric sleep care portal is now active and ready. Our team of board-certified pediatricians and chronobiologists is here to optimize your baby's sleep schedule and restore your family's rest.
            </p>

            <div class="feature-card">
                <div class="feature-title">🩺 24/7 Board-Certified Specialists</div>
                <div class="feature-desc">Access direct daily tracking and clinical sleep architecture guidance from senior pediatric leaders.</div>
            </div>

            <div class="feature-card">
                <div class="feature-title">📱 3x Daily Telegram Check-Ins</div>
                <div class="feature-desc">Receive proactive morning, afternoon, and evening guidance tailored to your baby's exact sleep windows.</div>
            </div>

            <div class="feature-card">
                <div class="feature-title">🧾 Wallet & Tax Invoice Ledger</div>
                <div class="feature-desc">Download official B2B PDF receipts for all subscriptions and wallet deposits directly from your portal.</div>
            </div>

            <div class="btn-container">
                <a href="{{ route('dashboard') }}" class="btn">Access Your Mother Portal ↗</a>
            </div>
        </div>

        <div class="footer">
            © {{ date('Y') }} <strong>{{ config('company.company_name', 'CARING AND SUPPORTIVE SERVICE LTD') }}</strong><br>
            Registered Office: {{ config('company.registered_office_address', '58 Mund St, London, W14 9LZ, UK') }} (Co. No. {{ config('company.company_number', '16120199') }})<br>
            Need assistance? Contact us at <a href="mailto:{{ config('company.email') }}" style="color: #f43f5e; text-decoration: none;">{{ config('company.email', 'support@caringandsupportive.co.uk') }}</a>
        </div>
    </div>
</body>
</html>
