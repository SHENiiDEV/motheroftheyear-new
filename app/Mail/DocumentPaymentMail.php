<?php

namespace App\Mail;

use App\Models\Invoice;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DocumentPaymentMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public User $user, public Invoice $invoice)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Mother of the Year — Official Receipt & Specialist Care Unlocked (€" . number_format($this->invoice->amount, 2) . ")",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.document_payment',
        );
    }

    public function attachments(): array
    {
        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $this->invoice,
            'user' => $this->user,
        ]);

        $ref = $this->invoice->gateway_reference ?: ('INV-' . $this->invoice->id);

        return [
            Attachment::fromData(fn () => $pdf->output(), "Invoice_{$ref}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
