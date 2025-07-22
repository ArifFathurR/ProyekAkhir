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
        $request->validate([
            'penerima_id' => 'required|exists:penerima_undangans,id',
            'ttd' => 'required|string',
        ]);

        $penerima = PenerimaUndangan::findOrFail($request->penerima_id);

        $penerima->update([
            'ttd' => $request->ttd,
            'status_kehadiran' => 'hadir',
            'waktu_presensi' => Carbon::now(),
        ]);

        return response()->json(['message' => 'TTD dan presensi berhasil disimpan.']);
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
}
