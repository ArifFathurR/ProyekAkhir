<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUndanganKegiatanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'kegiatan_id' => 'required|exists:kegiatans,id',
            'nomor_surat' => 'required|string|max:255',
            'sifat' => 'required|string|max:100',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'hari' => 'required|string|max:20',
            'tanggal' => 'required|date',
            'waktu' => 'required|date_format:H:i',
            'tempat' => 'required|string|max:255',
            'agenda' => 'required|string|max:255',
            'status' => 'nullable|string|max:50',
            'status_pelaksanaan' => 'nullable|string|max:50',
            'komentar' => 'nullable|string|max:500',
        ];
    }
}
