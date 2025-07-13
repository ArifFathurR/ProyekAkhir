<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumentasiKegiatan extends Model
{
    /** @use HasFactory<\Database\Factories\DokumentasiKegiatanFactory> */
    use HasFactory;
    protected $table = 'dokumentasi_kegiatans';

    protected $fillable = [
        'kegiatan_id',
        'undangan_id',
        'link_zoom',
        'link_materi',
    ];


    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class, 'kegiatan_id');
    }


    public function undangan()
    {
        return $this->belongsTo(UndanganKegiatan::class, 'undangan_id');
    }

    // 🔁 Relasi ke banyak foto dokumentasi
    public function fotoDokumentasi()
    {
        return $this->hasMany(FotoDokumentasi::class, 'dokumentasi_id');
    }
}