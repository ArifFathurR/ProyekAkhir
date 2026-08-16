<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UndanganKegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardAdminController extends Controller
{
    public function index()
    {
        // Ambil seluruh data undangan kegiatan untuk Admin
        $undangan = UndanganKegiatan::with('kegiatan')->get();

        $total = $undangan->count();
        $akanDatang = $undangan->where('status_pelaksanaan', 'Belum Dilaksanakan')->count();
        $sedang = $undangan->where('status_pelaksanaan', 'Sedang Dilaksanakan')->count();
        $selesai = $undangan->where('status_pelaksanaan', 'Selesai')->count();

        $kegiatan = $undangan->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->judul,
                'date' => $item->tanggal,
                'status' => $item->status_pelaksanaan,
                'nama_kegiatan' => $item->kegiatan->nama_kegiatan ?? '-',
                'sub_kegiatan' => $item->judul,
                'tanggal' => $item->tanggal,
                'tanggal_lengkap' => Carbon::parse($item->tanggal)->locale('id')->isoFormat('dddd, D MMMM Y'),
                'waktu' => $item->waktu,
                'tempat' => $item->tempat ?? '-',
                'agenda' => $item->agenda ?? '-',
                'file_undangan' => route('undangan_kegiatan.preview', $item->id),
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'statistik' => [
                'total' => $total,
                'akanDatang' => $akanDatang,
                'berlangsung' => $sedang,
                'selesai' => $selesai,
            ],
            'kegiatan' => $kegiatan,
        ]);
    }
}
