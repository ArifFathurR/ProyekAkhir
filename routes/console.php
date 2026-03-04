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

    logger("Status pelaksanaan otomatis diperbarui: $now");
})->everyMinute();
