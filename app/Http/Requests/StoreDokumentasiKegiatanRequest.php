<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDokumentasiKegiatanRequest extends FormRequest
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
            'undangan_id'   => 'nullable|exists:undangan_kegiatans,id',
            'kegiatan_id'   => 'nullable|exists:kegiatans,id',
            'notulensi'     => 'required|string|max:255|string',
            'link_zoom'     => 'required|string|max:255|url',
            'link_materi'   => 'required|string|max:255|url',
        ];
    }
}
