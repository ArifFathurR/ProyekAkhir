<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\AnggotaTim;

class AnggotaTimSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil 20 pegawai dummy yang baru saja di-seed
        $pegawais = User::where('role', 'pegawai')->orderBy('id', 'asc')->skip(1)->take(20)->get();

        // Jika tidak cukup, kita ambil apa adanya dari pegawai
        if ($pegawais->count() < 20) {
            $pegawais = User::where('role', 'pegawai')->get();
        }

        // Distribusikan ke tim dengan ID 3 sampai 12 (10 tim)
        $timId = 3;
        $counter = 0;

        foreach ($pegawais as $pegawai) {
            AnggotaTim::create([
                'tim_id' => $timId,
                'user_id' => $pegawai->id,
                'role' => 'anggota', // Asumsi default role di tim adalah anggota
            ]);

            $counter++;

            // Setelah 2 pegawai ditambahkan ke satu tim, pindah ke tim selanjutnya
            if ($counter % 2 == 0) {
                $timId++;
            }

            // Berhenti jika sudah melewati tim ID 12
            if ($timId > 12) {
                break;
            }
        }
    }
}
