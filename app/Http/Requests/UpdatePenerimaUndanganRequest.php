<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePenerimaUndanganRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'tim_id' => 'required|exists:tims,id',
            'undangan_id' => 'required|exists:undangan_kegiatans,id',
            'status_penerima' => 'required|string|max:150',
            'status_kehadiran' => 'required|string|max:150',
            'ttd' => 'nullable|string',
            'koordinat' => 'nullable', // bisa ditambah regex jika format khusus (misal lat,lng)
            'waktu_presensi' => 'nullable|date',
            'alasan_berhalangan' => 'nullable|string|max:255',
        ];
    }
}
