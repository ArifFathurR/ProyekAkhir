<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\PenerimaUndangan;
use App\Models\UndanganKegiatan;
use App\Models\DokumentasiKegiatan;
use App\Models\FotoDokumentasi;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class PegawaiApiController extends Controller
{
    public function show()
    {
        $userId = Auth::id();

        $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', fn($q) => $q->where('status', 'Diterima'))
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                    'sub_kegiatan' => $item->undangan->judul ?? '-',
                    'tanggal' => $item->undangan->tanggal ?? '-',
                    'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                    'status_penerima' => $item->status_penerima,
                ];
            });

        return response()->json(['kegiatan' => $kegiatan]);
    }

    public function sedang()
    {
        $userId = Auth::id();

        $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', fn($q) => $q->where('status_pelaksanaan', 'Sedang Dilaksanakan'))
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                    'sub_kegiatan' => $item->undangan->judul ?? '-',
                    'tanggal' => $item->undangan->tanggal ?? '-',
                    'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                    'status_penerima' => $item->status_penerima,
                ];
            });

        return response()->json(['kegiatan' => $kegiatan]);
    }

    public function selesai()
    {
        $userId = Auth::id();

        $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', fn($q) => $q->where('status_pelaksanaan', 'Selesai'))
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                    'sub_kegiatan' => $item->undangan->judul ?? '-',
                    'tanggal' => $item->undangan->tanggal ?? '-',
                    'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                    'status_penerima' => $item->status_penerima,
                ];
            });

        return response()->json(['kegiatan' => $kegiatan]);
    }

    public function kalender()
    {
        $userId = Auth::id();

        $kegiatan = PenerimaUndangan::with('undangan')
            ->where('user_id', $userId)
            ->whereHas('undangan', fn($q) => $q->where('status', 'Diterima'))
            ->get()
            ->map(function ($item) {
                return [
                    'title' => $item->undangan->judul,
                    'date' => $item->undangan->tanggal,
                    'waktu' => $item->undangan->waktu,
                ];
            });

        return response()->json(['kegiatan' => $kegiatan]);
    }

    public function storeTtd(Request $request)
{
    try {
        $validated = $request->validate([
            'penerima_id' => 'required|exists:penerima_undangans,id',
            'ttd'         => 'required|string', // base64 image
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
        ]);

        $penerima = PenerimaUndangan::with('undangan')->findOrFail($validated['penerima_id']);

        // Pastikan folder penyimpanan ada
        $folderPath = storage_path('app/public/ttd');
        if (!file_exists($folderPath)) {
            mkdir($folderPath, 0777, true);
        }

        // Proses decode base64
        $image = $validated['ttd'];
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        $imageData = base64_decode($image);

        // Simpan file ke folder
        $fileName = 'ttd_' . $penerima->id . '_' . time() . '.png';
        file_put_contents($folderPath . '/' . $fileName, $imageData);

        // Simpan path file (bukan base64 string)
        $penerima->update([
            'ttd' => 'storage/ttd/' . $fileName,
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'status_kehadiran' => 'hadir',
            'waktu_presensi' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'TTD berhasil disimpan',
            'data' => [
                'penerima_id' => $penerima->id,
                'file_ttd' => asset('storage/ttd/' . $fileName),
            ],
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan saat menyimpan TTD dan presensi.',
            'error' => $e->getMessage(),
        ], 500);
    }
}



    public function getByPenerimaId($penerima_id)
    {
        $penerima = PenerimaUndangan::find($penerima_id);

        if (!$penerima) {
            return response()->json(['message' => 'Penerima tidak ditemukan'], 404);
        }

        $undanganId = $penerima->undangan_id;

        $dokumentasi = DokumentasiKegiatan::with('fotoDokumentasi')
            ->where('undangan_id', $undanganId)
            ->first();

        if (!$dokumentasi) {
            return response()->json([
                'notulensi' => '-',
                'link_zoom' => '-',
                'link_materi' => '-',
                'foto' => [],
            ]);
        }

        return response()->json([
            'notulensi' => $dokumentasi->notulensi,
            'link_zoom' => $dokumentasi->link_zoom,
            'link_materi' => $dokumentasi->link_materi,
            'foto' => $dokumentasi->fotoDokumentasi->map(fn($foto) => [
                'file_foto' => $foto->foto,
                'id' => $foto->id,
                'created_at' => $foto->created_at,
            ]),
        ]);
    }

    // PegawaiApiController.php
public function dropdownDokumentasi()
{
    $userId = auth()->id();

    // Ambil undangan yang diterima user
    $undangans = PenerimaUndangan::with('undangan.kegiatan')
        ->where('user_id', $userId)
        ->get()
        ->map(function($penerima) {
            return [
                'undangan_id' => $penerima->undangan->id,
                'judul' => $penerima->undangan->judul,
                'kegiatan_id' => $penerima->undangan->kegiatan->id,
                'nama_kegiatan' => $penerima->undangan->kegiatan->nama_kegiatan,
            ];
        });

    return response()->json([
        'data' => $undangans
    ]);
}




}
