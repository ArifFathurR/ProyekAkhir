<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;

class UndanganKegiatanMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $subjek;
    public $pesan;
    public $filePath;

    /**
     * Create a new message instance.
     */
    public function __construct($subjek, $pesan, $filePath)
    {
        $this->subjek = $subjek;
        $this->pesan = $pesan;
        $this->filePath = $filePath;
    }

    /**
     * Set the email subject.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subjek,
        );
    }

    /**
     * Set the email content and variables.
     */
    public function content(): Content
{
    return new Content(
        markdown: 'emails.undangan',
        with: [
            'pesan' => $this->pesan,
        ]
    );
}

    /**
     * Attach the file.
     */
    public function attachments(): array
    {
        return [
            Attachment::fromStorageDisk('public', $this->filePath)
                ->as('Undangan.pdf')
                ->withMime('application/pdf')
        ];
    }
}
