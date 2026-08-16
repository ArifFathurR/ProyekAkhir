<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\PenerimaUndangan;
use App\Models\UndanganKegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $now = Carbon::now();

        // 1. Hitung Statistik Cards
        $totalAcaraBulanIni = PenerimaUndangan::where('user_id', $userId)
            ->whereHas('undangan', function ($query) use ($now) {
                $query->whereMonth('tanggal', $now->month)
                      ->whereYear('tanggal', $now->year);
            })
            ->count();

        $totalAkanDatang = PenerimaUndangan::where('user_id', $userId)
            ->whereHas('undangan', function ($query) {
                $query->where('status_pelaksanaan', 'Belum Dilaksanakan');
            })
            ->count();

        $totalSedang = PenerimaUndangan::where('user_id', $userId)
            ->whereHas('undangan', function ($query) {
                $query->where('status_pelaksanaan', 'Sedang Dilaksanakan');
            })
            ->count();

        $totalSelesai = PenerimaUndangan::where('user_id', $userId)
            ->whereHas('undangan', function ($query) {
                $query->where('status_pelaksanaan', 'Selesai');
            })
            ->count();

        // 2. Data Kegiatan untuk Kalender (Monthly view)
        $kegiatanKalender = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', function ($query) {
                $query->where('status', 'Diterima');
            })
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->undangan->judul ?? 'Kegiatan',
                    'date' => $item->undangan->tanggal ?? '',
                    'waktu' => $item->undangan->waktu ?? '',
                    'nama_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                    'sub_kegiatan' => $item->undangan->judul ?? '-',
                    'tanggal_lengkap' => $item->undangan->tanggal ? Carbon::parse($item->undangan->tanggal)->translatedFormat('l, d F Y') : '-',
                    'tempat' => $item->undangan->tempat ?? '-',
                    'agenda' => $item->undangan->agenda ?? '-',
                    'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                ];
            });

        // 3. Data Undangan per Tab
        $mapper = function ($item) {
            return [
                'id' => $item->id,
                'penerima_id' => $item->id,
                'undangan_id' => $item->undangan_id,
                'tim_id' => $item->tim_id ?? null,
                'judul_undangan' => $item->undangan->judul ?? '-',
                'judul_kegiatan' => $item->undangan->kegiatan->nama_kegiatan ?? '-',
                'tanggal' => $item->undangan->tanggal ? Carbon::parse($item->undangan->tanggal)->translatedFormat('d M Y') : '-',
                'waktu' => $item->undangan->waktu ?? '-',
                'tempat' => $item->undangan->tempat ?? '-',
                'status_penerima' => $item->status_penerima ?? '-',
                'waktu_presensi' => $item->waktu_presensi,
                'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
            ];
        };

        $undanganAkanDatang = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', function ($query) {
                $query->where('status_pelaksanaan', 'Belum Dilaksanakan');
            })
            ->latest()
            ->get()
            ->map($mapper);

        $undanganSedang = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', function ($query) {
                $query->where('status_pelaksanaan', 'Sedang Dilaksanakan');
            })
            ->latest()
            ->get()
            ->map($mapper);

        $undanganSelesai = PenerimaUndangan::with(['undangan.kegiatan'])
            ->where('user_id', $userId)
            ->whereHas('undangan', function ($query) {
                $query->where('status_pelaksanaan', 'Selesai');
            })
            ->latest()
            ->get()
            ->map($mapper);

        return Inertia::render('Pegawai/Dashboard', [
            'stats' => [
                'totalAcaraBulanIni' => $totalAcaraBulanIni,
                'totalAkanDatang' => $totalAkanDatang,
                'totalSedang' => $totalSedang,
                'totalSelesai' => $totalSelesai,
            ],
            'kegiatanKalender' => $kegiatanKalender,
            'tabData' => [
                'akanDatang' => $undanganAkanDatang,
                'sedang' => $undanganSedang,
                'selesai' => $undanganSelesai,
            ]
        ]);
    }
}
