<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Kegiatan;
use Carbon\Carbon;

class StoreUndanganKegiatanRequest extends FormRequest
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
            'waktu_selesai' => 'nullable|date_format:H:i',
            'tempat' => 'required|string|max:255',
            'agenda' => 'required|string|max:255',
            'status' => 'nullable|string|max:50',
            'status_pelaksanaan' => 'nullable|string|max:50',
            'komentar' => 'nullable|string|max:500',
            'tim_ids' => 'nullable|array',
            'tim_ids.*' => 'exists:tims,id',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $kegiatanId = $this->input('kegiatan_id');
            $tanggalUndangan = $this->input('tanggal');

            if ($kegiatanId && $tanggalUndangan) {
                $kegiatan = Kegiatan::find($kegiatanId);
                if ($kegiatan && $kegiatan->tanggal) {
                    $selectedDate = date('Y-m-d', strtotime($tanggalUndangan));
                    $startDate = date('Y-m-d', strtotime($kegiatan->tanggal));
                    $endDate = $kegiatan->tanggal_selesai
                        ? date('Y-m-d', strtotime($kegiatan->tanggal_selesai))
                        : $startDate;

                    if ($selectedDate < $startDate || $selectedDate > $endDate) {
                        $formattedSelected = Carbon::parse($selectedDate)->translatedFormat('d F Y');
                        $formattedStart = Carbon::parse($startDate)->translatedFormat('d F Y');

                        if ($kegiatan->tanggal_selesai) {
                            $formattedEnd = Carbon::parse($endDate)->translatedFormat('d F Y');
                            $msg = "Tanggal undangan ({$formattedSelected}) harus berada dalam rentang tanggal kegiatan ({$formattedStart} s/d {$formattedEnd}).";
                        } else {
                            $msg = "Tanggal undangan ({$formattedSelected}) harus sesuai dengan tanggal kegiatan ({$formattedStart}).";
                        }

                        $validator->errors()->add('tanggal', $msg);
                    }
                }
            }
        });
    }
}
