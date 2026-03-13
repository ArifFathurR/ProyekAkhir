<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {
    $now = Carbon::now()->format('Y-m-d H:i');

    // Update ke Sedang Dilaksanakan jika tanggal + waktu = sekarang
    DB::table('undangan_kegiatans')
        ->whereRaw("DATE_FORMAT(CONCAT(tanggal, ' ', waktu), '%Y-%m-%d %H:%i') = ?", [$now])
        ->where('status', 'Diterima')
        ->update([
            'status_pelaksanaan' => 'Sedang Dilaksanakan'
        ]);

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
