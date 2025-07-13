<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FotoDokumentasi extends Model
{
    /** @use HasFactory<\Database\Factories\FotoDokumentasiFactory> */
    use HasFactory;
protected $table = 'foto_dokumentasis';

    protected $fillable = [
        'dokumentasi_id',
        'foto',
    ];

    public function dokumentasi()
    {
        return $this->belongsTo(DokumentasiKegiatan::class, 'dokumentasi_id');
    }
}