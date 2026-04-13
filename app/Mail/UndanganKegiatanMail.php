<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use App\Models\UndanganKegiatan;

class UndanganKegiatanMail extends Mailable
{
    use SerializesModels;

    public $undangan;
    public $tanggalFormatted;

    /**
     * Create a new message instance.
     */
    public function __construct(UndanganKegiatan $undangan)
    {
        $this->undangan = $undangan;
        $this->tanggalFormatted = \Carbon\Carbon::parse($undangan->tanggal)
            ->locale('id')
            ->isoFormat('dddd, D MMMM Y');
    }

    /**
     * Set the email subject.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Undangan ' . $this->undangan->judul,
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
                'undangan' => $this->undangan,
                'tanggalFormatted' => $this->tanggalFormatted,
            ]
        );
    }

    /**
     * No attachments needed.
     */
    public function attachments(): array
    {
        return [];
    }
}
