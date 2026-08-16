<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use App\Models\UndanganKegiatan;

class NotifikasiKegiatanMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $undangan;
    public $tanggalFormatted;
    public $labelReminder;

    /**
     * Create a new message instance.
     */
    public function __construct(UndanganKegiatan $undangan, ?string $labelReminder = null)
    {
        $this->undangan = $undangan;
        $this->labelReminder = $labelReminder;
        $this->tanggalFormatted = \Carbon\Carbon::parse($undangan->tanggal)
            ->locale('id')
            ->isoFormat('dddd, D MMMM Y');
    }

    /**
     * Set the email subject.
     */
    public function envelope(): Envelope
    {
        $subject = $this->labelReminder 
            ? "[Pengingat {$this->labelReminder}] Kegiatan: " . $this->undangan->judul
            : 'Pengingat Kegiatan: ' . $this->undangan->judul;

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Set the email content and variables.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.notifikasi_kegiatan',
            with: [
                'undangan' => $this->undangan,
                'tanggalFormatted' => $this->tanggalFormatted,
                'labelReminder' => $this->labelReminder,
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
