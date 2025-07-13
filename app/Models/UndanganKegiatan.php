<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UndanganKegiatan extends Model
{
    /** @use HasFactory<\Database\Factories\UndanganKegiatanFactory> */
    use HasFactory;

    protected $table = 'undangan_kegiatans';

    protected $fillable = [
        'nomor_surat', 
        'user_id', //
        'kegiatan_id',
        'sifat',
        'judul',
        'deskripsi',
        'hari',
        'tanggal',
        'waktu',
        'tempat',
        'agenda',
        'status',
        'status_pelaksanaan',
        'komentar'

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kegiatan()
    {
        return $this->belongsTo(Kegiatan::class);
    }

    public function updatedByUser()
{
    return $this->belongsTo(User::class, 'updated_by');
}

public function tim()
{
    return $this->belongsTo(Tim::class, 'id_tim');
}

public function supervisor()
{
    return $this->belongsTo(User::class, 'id_supervisor');
}
public function penerimaUndangan()
{
    return $this->hasMany(PenerimaUndangan::class, 'undangan_id');
}

}
