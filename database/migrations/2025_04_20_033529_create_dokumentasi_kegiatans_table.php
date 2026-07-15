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
        Schema::create('dokumentasi_kegiatans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kegiatan_id')->nullable()->constrained('kegiatans')->onDelete('cascade');
            $table->foreignId('undangan_id')->nullable()->constrained('undangan_kegiatans')->onDelete('cascade');
            $table->foreignId('penerima_id')->nullable()->constrained('penerima_undangans');
            $table->string('notulensi', 255)->nullable();
            $table->string('link_zoom', 255)->nullable();
            $table->string('link_materi', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumentasi_kegiatans');
    }
};
