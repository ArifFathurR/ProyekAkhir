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
        Schema::create('undangan_kegiatans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kegiataan_id')->constrained('kegiatans')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nomor_surat');
            $table->string('sifat');
            $table->string('Judul');
            $table->string('deskripsi');
            $table->string('hari');
            $table->date('tanggal');
            $table->time('waktu');
            $table->string('tempat');
            $table->string('angenda');
            $table->string('status');
            $table->string('status_pelaksanaan');
            $table->string('komentar');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('undangan_kegiatans');
    }
};
