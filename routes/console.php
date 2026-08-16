<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Kirim pengingat H-3, H-2, dan H-1 setiap hari jam 08:00 WIB
Schedule::call(function () {
    $reminderDays = [
        3 => 'H-3',
        2 => 'H-2',
        1 => 'H-1',
    ];

    foreach ($reminderDays as $days => $label) {
        $targetDate = Carbon::today()->addDays($days)->format('Y-m-d');

        $kegiatanReminder = \App\Models\UndanganKegiatan::with(['penerimaUndangan.user', 'supervisor'])
            ->where('tanggal', $targetDate)
            ->where('status', 'Diterima')
            ->get();

        foreach ($kegiatanReminder as $undangan) {
            $emails = $undangan->penerimaUndangan
                ->filter(fn($p) => $p->user && $p->user->email)
                ->pluck('user.email')
                ->unique();

            if ($undangan->supervisor && $undangan->supervisor->email) {
                $emails->push($undangan->supervisor->email);
            }

            $emails = $emails->unique();

            foreach ($emails as $email) {
                \Illuminate\Support\Facades\Mail::to($email)
                    ->send(new \App\Mail\NotifikasiKegiatanMail($undangan, $label));
            }

            logger("Reminder {$label} kegiatan '{$undangan->judul}' telah dikirim ke " . count($emails) . " penerima.");
        }
    }
})->dailyAt('08:00');

Schedule::call(function () {
    $now = Carbon::now()->format('Y-m-d H:i');

    // Update ke Sedang Dilaksanakan jika tanggal + waktu = sekarang dan kirim notifikasi
    $kegiatanSekarang = \App\Models\UndanganKegiatan::with(['penerimaUndangan.user', 'supervisor'])
        ->whereRaw("DATE_FORMAT(CONCAT(tanggal, ' ', waktu), '%Y-%m-%d %H:%i') = ?", [$now])
        ->where('status', 'Diterima')
        ->get();

    foreach ($kegiatanSekarang as $undangan) {
        $undangan->update([
            'status_pelaksanaan' => 'Sedang Dilaksanakan'
        ]);

        $emails = $undangan->penerimaUndangan
            ->filter(fn($p) => $p->user && $p->user->email)
            ->pluck('user.email')
            ->unique();

        if ($undangan->supervisor && $undangan->supervisor->email) {
            $emails->push($undangan->supervisor->email);
        }

        $emails = $emails->unique();

        foreach ($emails as $email) {
            \Illuminate\Support\Facades\Mail::to($email)->send(new \App\Mail\NotifikasiKegiatanMail($undangan));
        }

        logger("Notifikasi kegiatan {$undangan->judul} telah diantrekan ke " . count($emails) . " penerima.");
    }

    // Update ke Selesai jika tanggal sekarang sudah lebih dari tanggal pada undangan kegiatan
    $today = Carbon::now()->format('Y-m-d');
    DB::table('undangan_kegiatans')
        ->where('tanggal', '<', $today)
        ->where('status', 'Diterima')
        ->update([
            'status_pelaksanaan' => 'Selesai'
        ]);

    // Update status_kehadiran penerima dari 'belum' menjadi 'Tidak Hadir'
    // jika waktu selesai kegiatan sudah terlewat
    DB::table('penerima_undangans')
        ->join('undangan_kegiatans', 'penerima_undangans.undangan_id', '=', 'undangan_kegiatans.id')
        ->whereRaw("CONCAT(undangan_kegiatans.tanggal, ' ', undangan_kegiatans.waktu_selesai) < ?", [$now])
        ->where('penerima_undangans.status_kehadiran', 'belum')
        ->update([
            'penerima_undangans.status_kehadiran' => 'Tidak Hadir'
        ]);

    logger("Status pelaksanaan & kehadiran otomatis diperbarui: $now");
})->everyMinute();
