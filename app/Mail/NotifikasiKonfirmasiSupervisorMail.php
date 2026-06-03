<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use App\Models\UndanganKegiatan;

class NotifikasiKonfirmasiSupervisorMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

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
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[Konfirmasi Undangan] Kegiatan Baru: ' . $this->undangan->judul,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.notifikasi_konfirmasi_supervisor',
            with: [
                'undangan' => $this->undangan,
                'tanggalFormatted' => $this->tanggalFormatted,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
