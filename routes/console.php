<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schedule;


Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {
    $now = Carbon::now();

    // Update ke Sedang Dilaksanakan
    DB::table('undangan_kegiatans')
        ->whereRaw("CONCAT(tanggal, ' ', waktu) = ?", [$now->format('Y-m-d H:i')])
        ->where('status', 'Diterima')
        ->where('status_pelaksanaan', 'Akan Datang')
        ->update(['status_pelaksanaan' => 'Sedang Dilaksanakan']);

    // Update ke Selesai
    DB::table('undangan_kegiatans')
        ->whereRaw("CONCAT(tanggal, ' ', waktu) < ?", [$now->format('Y-m-d H:i')])
        ->where('status', 'Diterima')
        ->where('status_pelaksanaan', 'Sedang Dilaksanakan')
        ->update(['status_pelaksanaan' => 'Selesai']);

    logger("Status pelaksanaan diperbarui otomatis pada " . $now->format('Y-m-d H:i'));
})->everyMinute();

