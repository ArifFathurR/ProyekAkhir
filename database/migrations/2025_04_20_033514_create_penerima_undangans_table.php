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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('tim_id')->constrained('tims')->onDelete('cascade');
            $table->foreignId('undangan_id')->nullable()->constrained('undangan_kegiatans');
            $table->string('status_penerima', 150);
            $table->string('status_kehadiran', 150);
            $table->text('ttd')->nullable();
            $table->text('latitude')->nullable();
            $table->text('longitude')->nullable();
            $table->point('koordinat')->nullable();
            $table->timestamp('waktu_presensi')->nullable();
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
