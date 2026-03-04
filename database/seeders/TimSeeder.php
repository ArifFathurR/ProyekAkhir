<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tim;

class TimSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tims = [
            ['nama_tim' => 'Neraca'],
            ['nama_tim' => 'Distribusi'],
            ['nama_tim' => 'Sosial'],
            ['nama_tim' => 'Produksi'],
            ['nama_tim' => 'Statistik Sektoral'],
            ['nama_tim' => 'Umum'],
            ['nama_tim' => 'Administrasi'],
            ['nama_tim' => 'Kehumasan'],
            ['nama_tim' => 'Diseminasi dan Layanan Statistik'],
            ['nama_tim' => 'Pengolahan & TI'],
        ];

        foreach ($tims as $tim) {
            Tim::create($tim);
        }
    }
}
