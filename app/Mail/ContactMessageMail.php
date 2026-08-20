<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $senderEmail,
        public string $msgSubject,
        public string $msgContent
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Support Ticket Inquiry: {$this->msgSubject} — {$this->name}",
            replyTo: [$this->senderEmail],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact_message',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
