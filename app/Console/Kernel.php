<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Jalankan command update undangan setiap menit
        $schedule->command('app:update-undangan-sedang-berlangsung')->everyMinute();

        // Hapus log ini kalau sudah tidak perlu
        \Log::info('✅ Kernel schedule() terpanggil!');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        // Load semua file Command di app/Console/Commands
        $this->load(__DIR__.'/Commands');

        // Jalankan file routes/console.php
        require base_path('routes/console.php');
    }
}
