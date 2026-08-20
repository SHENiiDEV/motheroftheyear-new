<?php

namespace App\Mail;

use App\Models\Transaction;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WalletTopUpMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $user, public Transaction $transaction)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Mother of the Year — Wallet Top-Up Receipt (€" . number_format($this->transaction->amount, 2) . ")",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.wallet_topup',
        );
    }

    public function attachments(): array
    {
        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $this->transaction,
            'user' => $this->user,
        ]);

        $ref = $this->transaction->gateway_reference ?: ('TOPUP-' . $this->transaction->id);

        return [
            Attachment::fromData(fn () => $pdf->output(), "Invoice_{$ref}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
