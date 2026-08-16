<?php

namespace App\Http\Controllers\Supervisor;

use App\Http\Controllers\Controller;
use App\Models\PenerimaUndangan;
use App\Models\UndanganKegiatan;
use App\Models\AnggotaTim;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardSupervisorController extends Controller
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

        // 2. Data Kegiatan untuk Kalender Bulanan
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

        // 4. Undangan Memerlukan Konfirmasi oleh Supervisor
        $supervisorTimIds = AnggotaTim::where('user_id', $userId)->pluck('tim_id');
        $undanganKonfirmasiQuery = UndanganKegiatan::with(['user', 'kegiatan'])
            ->where('status', 'Menunggu');

        if ($supervisorTimIds->isNotEmpty()) {
            $undanganKonfirmasiQuery->whereIn('user_id', function ($query) use ($supervisorTimIds) {
                $query->select('user_id')
                    ->from('anggota_tims')
                    ->whereIn('tim_id', $supervisorTimIds);
            });
        } else {
            $undanganKonfirmasiQuery->whereNull('id');
        }

        $undanganKonfirmasi = $undanganKonfirmasiQuery->latest()->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'judul_undangan' => $item->judul ?? '-',
                'judul_kegiatan' => $item->kegiatan->nama_kegiatan ?? '-',
                'pembuat' => $item->user->name ?? '-',
                'tanggal' => $item->tanggal ? Carbon::parse($item->tanggal)->translatedFormat('d M Y') : '-',
                'waktu' => $item->waktu ?? '-',
                'tempat' => $item->tempat ?? '-',
                'status' => $item->status ?? 'Menunggu',
            ];
        });

        return Inertia::render('Supervisor/Dashboard', [
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
            ],
            'undanganKonfirmasi' => $undanganKonfirmasi,
        ]);
    }
}
