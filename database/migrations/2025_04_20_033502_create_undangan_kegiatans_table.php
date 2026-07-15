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
            $table->foreignId('kegiatan_id')->constrained('kegiatans')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('nomor_surat');
            $table->string('sifat');
            $table->string('judul');
            $table->string('deskripsi');
            $table->string('hari');
            $table->date('tanggal');
            $table->time('waktu');
            $table->time('waktu_selesai');
            $table->string('tempat');
            $table->string('agenda');
            $table->string('status');
            $table->string('status_pelaksanaan');
            $table->string('komentar')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('id_supervisor')->nullable();
            $table->integer('terkirim')->default(0);
            $table->text('file_undangan')->nullable();
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
