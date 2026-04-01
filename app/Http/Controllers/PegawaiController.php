<?php

namespace App\Http\Controllers;
use App\Http\Requests\StorePenerimaUndanganRequest;

use App\Models\Pegawai;
use App\Http\Requests\StorePegawaiRequest;
use App\Http\Requests\UpdatePegawaiRequest;
use Inertia\Inertia;
use App\Models\PenerimaUndangan;
use App\Models\UndanganKegiatan;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\UpdatePenerimaUndanganRequest;
use Illuminate\Support\Carbon;
use App\Models\DokumentasiKegiatan;


class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePegawaiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pegawai $pegawai)
{
    $userId = auth()->id();

    $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
        ->where('user_id', $userId)
        ->whereHas('undangan', function ($query) {
            $query->where('status', 'Diterima')
            ->where('status_pelaksanaan', 'Belum Dilaksanakan'); // 🔍 Cek status di tabel undangan_kegiatans
        })
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                'sub_kegiatan' => $item->undangan->judul ?? '-',
                'tanggal' => $item->undangan->tanggal ?? '-',
                'tanggal_lengkap' => $item->undangan->tanggal ? \Carbon\Carbon::parse($item->undangan->tanggal)->translatedFormat('l, d F Y') : '-',
                'waktu' => $item->undangan->waktu ?? '-',
                'tempat' => $item->undangan->tempat ?? '-',
                'agenda' => $item->undangan->agenda ?? '-',
                'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                'status_penerima' => $item->status_penerima,
            ];
        });

    return Inertia::render('Pegawai/KegiatanSaya', [
        'kegiatan' => $kegiatan,
    ]);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pegawai $pegawai)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiRequest $request, Pegawai $pegawai)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pegawai $pegawai)
    {
        //
    }

    public function preview($id)
{
    $undangan = UndanganKegiatan::with(['user', 'kegiatan'])->findOrFail($id);

    $pdf = Pdf::loadView('pdf.undangan', compact('undangan'))->setPaper('A4', 'portrait');

    return $pdf->stream("Undangan_{$undangan->judul}.pdf");
}

public function toggleKonfirmasi(Request $request, $id)
{
    $penerima = \App\Models\PenerimaUndangan::findOrFail($id);
    $penerima->update([
        'status_penerima' => $request->status_penerima,
    ]);

    return back()->with('success', 'Status berhasil diperbarui.');

}


public function Sedang(Pegawai $pegawai)
{
    $userId = auth()->id();
    $status_pelaksanaan = "Sedang Dilaksanakan";
    $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
        ->where('user_id', $userId)
        ->whereHas('undangan', function ($query) use ($status_pelaksanaan) {
            $query->where('status_pelaksanaan', $status_pelaksanaan);
        })
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                'sub_kegiatan' => $item->undangan->judul ?? '-',
                'tanggal' => $item->undangan->tanggal ?? '-',
                'tanggal_lengkap' => $item->undangan->tanggal ? \Carbon\Carbon::parse($item->undangan->tanggal)->translatedFormat('l, d F Y') : '-',
                'waktu' => $item->undangan->waktu ?? '-',
                'tempat' => $item->undangan->tempat ?? '-',
                'agenda' => $item->undangan->agenda ?? '-',
                'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                'status_penerima' => $item->status_penerima,
                'tim_id' => $item->tim_id ?? null,
                'undangan_id' => $item->undangan_id
            ];
        });

    return Inertia::render('Pegawai/KegiatanSadangBerlangsung', [
        'kegiatan' => $kegiatan,
    ]);
}


public function Selesai(Pegawai $pegawai)
{
    $userId = auth()->id();
    $status_pelaksanaan = "Selesai";
    $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
        ->where('user_id', $userId)
        ->whereHas('undangan', function ($query) use ($status_pelaksanaan) {
            $query->where('status_pelaksanaan', $status_pelaksanaan);
        })
        ->get()
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                'sub_kegiatan' => $item->undangan->judul ?? '-',
                'tanggal' => $item->undangan->tanggal ?? '-',
                'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                'status_penerima' => $item->status_penerima,
                'undangan_id' => $item->undangan_id,
            ];
        });

    return Inertia::render('Pegawai/KegiatanSelesai', [
        'kegiatan' => $kegiatan,
    ]);
}

public function kalender(Pegawai $pegawai)
{
    $userId = auth()->id();

    $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
        ->where('user_id', $userId)
        ->whereHas('undangan', fn($q) => $q->where('status', 'Diterima'))
        ->get()
        ->map(function ($item) {
            return [
                'title' => $item->undangan->judul,
                'date' => $item->undangan->tanggal,
                'waktu' => $item->undangan->waktu, // ⏰ Tambahkan waktu di sini
                // Data untuk ModalDetailUndangan
                'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                'sub_kegiatan' => $item->undangan->judul ?? '-',
                'tanggal_lengkap' => $item->undangan->tanggal ? \Carbon\Carbon::parse($item->undangan->tanggal)->translatedFormat('l, d F Y') : '-',
                'tempat' => $item->undangan->tempat ?? '-',
                'agenda' => $item->undangan->agenda ?? '-',
                'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
            ];
        });

    return Inertia::render('Pegawai/KalenderKegiatan', [
        'kegiatan' => $kegiatan,
    ]);
}

public function riwayatPresensi(Pegawai $pegawai)
{
    $userId = auth()->id();

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

    return Inertia::render('Pegawai/RiwayatPresensi', [
        'presensi' => $kegiatan,
    ]);
}





public function storeTtd(Request $request)
{
    $validated = $request->validate([
        'penerima_id' => 'required|exists:penerima_undangans,id',
        'ttd'         => 'required|string',
        'latitude'    => 'nullable|numeric',
        'longitude'   => 'nullable|numeric',
    ]);

    $penerima = PenerimaUndangan::with('undangan')->findOrFail($validated['penerima_id']);

    // Waktu kegiatan
    $waktuKegiatan = Carbon::parse($penerima->undangan->tanggal . ' ' . $penerima->undangan->waktu);
    $waktuPresensi = Carbon::now();

    $statusKehadiran = $waktuPresensi->greaterThan($waktuKegiatan->copy()->addMinutes(5))
        ? 'terlambat'
        : 'hadir';

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

    $penerima->update([
        'ttd'              => 'storage/ttd/' . $fileName,
        'latitude'         => $validated['latitude'] ?? null,
        'longitude'        => $validated['longitude'] ?? null,
        'status_kehadiran' => $statusKehadiran,
        'waktu_presensi'   => $waktuPresensi,
    ]);

    return redirect()->route('pegawai.sedang')->with('success', 'TTD dan presensi berhasil disimpan.');
}



    public function getByPenerimaId($penerima_id)
    {
        // 1. Cari data penerima undangan
        $penerima = PenerimaUndangan::find($penerima_id);

        if (!$penerima) {
            return response()->json(['message' => 'Penerima tidak ditemukan'], 404);
        }

        // 2. Ambil undangan_id dari penerima
        $undanganId = $penerima->undangan_id;

        // 3. Cari dokumentasi berdasarkan undangan_id
        $dokumentasi = DokumentasiKegiatan::with('fotoDokumentasi')
            ->where('undangan_id', $undanganId)
            ->first();

        // 4. Jika dokumentasi tidak ditemukan, beri respons kosong
        if (!$dokumentasi) {
            return response()->json([
                'notulensi' => '-',
                'link_zoom' => '-',
                'link_materi' => '-',
                'foto' => [],
            ]);
        }

        // 5. Kembalikan semua data dokumentasi & foto terkait
        return response()->json([
            'notulensi' => $dokumentasi->notulensi,
            'link_zoom' => $dokumentasi->link_zoom,
            'link_materi' => $dokumentasi->link_materi,
            'foto' => $dokumentasi->fotoDokumentasi->map(function ($foto) {
                return [
                    'file_foto' => $foto->foto, // ← kolom foto dari tabel foto_dokumentasis
                    'id' => $foto->id,
                    'created_at' => $foto->created_at,
                ];
            }),
        ]);
    }

    public function getAllDokumentasiByUndanganId($undangan_id)
    {
        $dokumentasi = DokumentasiKegiatan::with(['fotoDokumentasi', 'penerima.user'])
            ->where('undangan_id', $undangan_id)
            ->get();

        if ($dokumentasi->isEmpty()) {
            return response()->json([]);
        }

        return response()->json($dokumentasi->map(function ($doc) {
            return [
                'id' => $doc->id,
                'nama' => $doc->penerima->user->name ?? '-',
                'link_zoom' => $doc->link_zoom,
                'link_materi' => $doc->link_materi,
                'notulensi' => $doc->notulensi,
                'foto' => $doc->fotoDokumentasi->map(function ($foto) {
                    return [
                        'file_foto' => $foto->foto,
                        'id' => $foto->id,
                        'created_at' => $foto->created_at,
                    ];
                }),
            ];
        }));
    }
}
