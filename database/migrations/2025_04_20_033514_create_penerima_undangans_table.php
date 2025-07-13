<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penerima_undangans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('undangan_kegiataan_id')->constrained('udangan_kegiatan')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('status_penerimaan', 50)->nullable();
            $table->string('status_kehadiran', 50)->nullable();
            $table->string('ttd', 255)->nullable();
            $table->string('koordinat', 150)->nullable();
            $table->time('waktu_presensi')->nullable();
            $table->string('alasan_berhalangan', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penerima_undangans');

    }
};
