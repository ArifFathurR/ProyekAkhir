<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tim extends Model
{
    use HasFactory;

    // Jika nama tabel di database berbeda dari nama model, definisikan nama tabelnya
    protected $table = 'tims';

    // Tentukan kolom mana yang dapat diisi massal
    protected $fillable = [
        'nama_tim', // Misalnya kolom nama tim
    ];

    public function anggotaTim()
{
    return $this->hasMany(AnggotaTim::class, 'tim_id');
}

}
