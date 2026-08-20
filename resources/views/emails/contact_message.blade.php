<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Support Ticket</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #090d16; color: #f8fafc; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 30px auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 30px; text-align: center; border-bottom: 1px solid #1e293b; }
        .title { font-size: 20px; font-weight: 900; color: #ffffff; text-transform: uppercase; }
        .content { padding: 30px; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .meta-table td { padding: 8px 0; border-bottom: 1px solid #1e293b; font-size: 13px; }
        .meta-label { color: #94a3b8; font-weight: 600; }
        .meta-val { color: #ffffff; font-weight: 800; text-align: right; }
        .msg-box { background-color: #020617; border: 1px solid #1e293b; border-radius: 14px; padding: 20px; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap; }
        .footer { background-color: #020617; padding: 20px; text-align: center; font-size: 11px; color: #64748b; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="title">📨 New Support Ticket Inquiry</div>
        </div>
        <div class="content">
            <table class="meta-table">
                <tr>
                    <td class="meta-label">Client Name</td>
                    <td class="meta-val">{{ $name }}</td>
                </tr>
                <tr>
                    <td class="meta-label">Client Email</td>
                    <td class="meta-val">{{ $senderEmail }}</td>
                </tr>
                <tr>
                    <td class="meta-label">Subject</td>
                    <td class="meta-val">{{ $msgSubject }}</td>
                </tr>
            </table>

            <div style="font-size: 12px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px;">Message Content:</div>
            <div class="msg-box">{{ $msgContent }}</div>
        </div>
        <div class="footer">
            © {{ date('Y') }} {{ config('company.company_name', 'CARING AND SUPPORTIVE SERVICE LTD') }}
        </div>
    </div>
</body>
</html>
