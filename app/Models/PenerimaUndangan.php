<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenerimaUndangan extends Model
{
    /** @use HasFactory<\Database\Factories\PenerimaUndanganFactory> */
    use HasFactory;
    protected $table = 'penerima_undangans';

    protected $fillable =[
        'user_id',
        'tim_id',
        'undangan_id',
        'status_penerima',
        'status_kehadiran',
        'ttd',
        'koordinat',
        'waktu_presensi',
        'alasan_berhalangan',
    ];

    public function tim()
{
    return $this->belongsTo(Tim::class, 'id_tim');
}

public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function undangan()
    {
        return $this->belongsTo(UndanganKegiatan::class);
    }

}
