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
    public function index()
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
                    'waktu' => $item->undangan->waktu ?? '-',
                    'tanggal' => $item->undangan->tanggal ?? '-',
                    'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                    'status_penerima' => $item->status_penerima,
                ];
            });

        return response()->json(['kegiatan' => $kegiatan]);
    }
    
    public function akanDatang()
    {
        $userId = Auth::id();

        $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', fn($q) => $q->where('status_pelaksanaan', 'Belum Dilaksanakan'))
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                    'sub_kegiatan' => $item->undangan->judul ?? '-',
                    'waktu' => $item->undangan->waktu ?? '-',
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
                    'id' => $item->undangan_id,
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

        // Waktu kegiatan untuk cek keterlambatan
        $waktuKegiatan = Carbon::parse($penerima->undangan->tanggal . ' ' . $penerima->undangan->waktu);
        $waktuPresensi = Carbon::now();

        $statusKehadiran = $waktuPresensi->greaterThan($waktuKegiatan->copy()->addMinutes(5))
            ? 'terlambat'
            : 'hadir';

        // Simpan path file (bukan base64 string)
        $penerima->update([
            'ttd' => 'storage/ttd/' . $fileName,
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'status_kehadiran' => $statusKehadiran,
            'waktu_presensi' => $waktuPresensi,
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

    public function getAllKegiatanUser()
    {
        $userId = Auth::id();

        $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->get()
            ->map(function ($item) {
                return [
                    'id_undangan' => $item->undangan->id ?? null,
                    'id_penerima' => $item->id,
                    'nama_undangan_kegiatan' => $item->undangan->judul ?? '-',
                    'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                    'tanggal' => $item->undangan->tanggal ?? '-',
                    'waktu' => $item->undangan->waktu ?? '-',
                    'waktu_selesai' => $item->undangan->waktu_selesai ?? '-',
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $kegiatan
        ], 200);
    }

    public function riwayatPresensi()
    {
        $userId = Auth::id();

        $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->where(function ($query) {
                $query->whereNotNull('waktu_presensi')
                      ->orWhereHas('undangan', function ($q) {
                          $q->where('status_pelaksanaan', 'Selesai');
                      });
            })
            ->get()
            ->sortByDesc(function ($item) {
                return $item->undangan->tanggal . ' ' . $item->undangan->waktu;
            })
            ->values()
            ->map(function ($item) {
                $status_kehadiran = $item->status_kehadiran;
                if (is_null($status_kehadiran) && is_null($item->waktu_presensi)) {
                    $status_kehadiran = 'Tidak Hadir';
                }

                return [
                    'id' => $item->id,
                    'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                    'sub_kegiatan' => $item->undangan->judul ?? '-',
                    'tanggal' => $item->undangan->tanggal ? \Carbon\Carbon::parse($item->undangan->tanggal)->translatedFormat('l, d F Y') : '-',
                    'waktu_presensi' => $item->waktu_presensi ? \Carbon\Carbon::parse($item->waktu_presensi)->format('H:i') : '-',
                    'ttd' => $item->ttd,
                    'status_kehadiran' => $status_kehadiran,
                    'latitude' => $item->latitude,
                    'longitude' => $item->longitude,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $kegiatan
        ], 200);
    }
}
