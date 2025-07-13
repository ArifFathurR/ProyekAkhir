<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnggotaTim extends Model
{
    use HasFactory;

    // Menentukan nama tabel jika berbeda dengan nama model
    protected $table = 'anggota_tims';

    // Menentukan kolom yang bisa diisi
    protected $fillable = [
        'role', 
        'tim_id', 
        'user_id'
    ];

    /**
     * Relasi dengan Tim (Many to One)
     */
    public function tim()
    {
        return $this->belongsTo(Tim::class);
    }

    /**
     * Relasi dengan User (Many to One)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}