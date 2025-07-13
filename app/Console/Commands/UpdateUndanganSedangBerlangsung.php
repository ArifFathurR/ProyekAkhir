<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\UndanganKegiatan;

class UpdateUndanganSedangBerlangsung extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-undangan-sedang-berlangsung';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update status undangan menjadi Sedang Berlangsung jika waktu sekarang sama';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $nowTanggal = now()->toDateString();
        $nowWaktu = now()->format('H:i:s');

        // Ambil undangan yang diterima & waktunya cocok
        $undangans = UndanganKegiatan::where('status', 'Diterima')
            ->whereDate('tanggal', $nowTanggal)
            ->whereTime('waktu', $nowWaktu)
            ->get();

        if ($undangans->isEmpty()) {
            $this->info('Tidak ada undangan yang cocok saat ini.');
            return Command::SUCCESS;
        }

        foreach ($undangans as $undangan) {
            $undangan->update(['status_pelaksanaan' => 'Sedang Berlangsung']);
            $this->info("✅ Undangan #{$undangan->id} diupdate menjadi Sedang Berlangsung");
        }

        $this->info('Pengecekan selesai.');
        return Command::SUCCESS;
    }
}
