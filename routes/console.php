<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schedule;


Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {
    $now = Carbon::now()->format('H:i');

    DB::table('undangan_kegiatans')
        ->where('waktu', $now)
        ->where('status', 'Diterima')
        ->update(['status_pelaksanaan' => 'Sedang Dilaksanakan']);
    
    logger("Status pelaksanaan diperbarui otomatis pada $now");
})->everyMinute();

