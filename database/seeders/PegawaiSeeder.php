<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class PegawaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 2; $i <= 21; $i++) {
            User::create([
                'name' => 'Pegawai ' . $i,
                'email' => 'pegawai' . $i . '@bps.go.id',
                'password' => Hash::make('12345678'),
                'role' => 'pegawai',
                'no_hp' => '0812345678' . str_pad($i, 2, '0', STR_PAD_LEFT),
            ]);
        }
    }
}
