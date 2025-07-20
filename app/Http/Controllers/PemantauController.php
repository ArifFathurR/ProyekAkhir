<?php

namespace App\Http\Controllers;

use App\Models\Pemantau;
use App\Http\Requests\StorePemantauRequest;
use App\Http\Requests\UpdatePemantauRequest;
use Inertia\Inertia;
use App\Models\UndanganKegiatan;
use App\Models\User;
use App\Models\Tim;
use App\Models\AnggotaTim;
use App\Models\PenerimaUndangan;
use App\Models\DokumentasiKegiatan;
use Illuminate\Http\Request;


class PemantauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    // Ambil semua undangan (tanpa memfilter user)
    $undangan = UndanganKegiatan::with('kegiatan')->get();

    // Kelompokkan berdasarkan status_pelaksanaan
    $total = $undangan->count();
    $akanDatang = $undangan->where('status_pelaksanaan', 'Belum Dilaksanakan')->count();
    $sedang = $undangan->where('status_pelaksanaan', 'Sedang Dilaksanakan')->count();
    $selesai = $undangan->where('status_pelaksanaan', 'Selesai')->count();

    // Data untuk kalender
    $kegiatan = $undangan->map(function ($item) {
        return [
            'title' => $item->judul,
            'date' => $item->tanggal,
            'status' => $item->status_pelaksanaan,
        ];
    });

    return Inertia::render('Pemantau/Dashboard', [
        'statistik' => [
            'total' => $total,
            'akanDatang' => $akanDatang,
            'berlangsung' => $sedang,
            'selesai' => $selesai,
        ],
        'kegiatan' => $kegiatan,
    ]);
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
    public function store(StorePemantauRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pemantau $pemantau)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pemantau $pemantau)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePemantauRequest $request, Pemantau $pemantau)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pemantau $pemantau)
    {
        //
    }

    public function DataPegawai(){
        $search = request('search');  // Mendapatkan parameter search
    
    // Menggunakan query builder untuk mencari user berdasarkan nama
    $users = User::when($search, function ($query, $search) {
            return $query->where('name', 'like', '%' . $search . '%');
        })
        ->paginate(8)  // Menambahkan pagination
        ->withQueryString();  // Menjaga query string saat pagination

    return Inertia::render('Pemantau/DataPegawai', [
        'users' => $users,
        'filters' => [
            'search' => $search,
        ]
    ]);
    }

    public function DataTim(){
        $search = request('search');  // Mendapatkan parameter search
        $tims = Tim::when($search, function ($query, $search) {
            return $query->where('nama_tim', 'like', '%' . $search . '%');
        })
        ->paginate(5)  // Menambahkan pagination
        ->withQueryString();  // Menjaga query string saat pagination

    return Inertia::render('Pemantau/DataTim', [
        'tims' => $tims,
        'filters' => [
            'search' => $search,
        ]
    ]);
    }

    public function DataAnggotaTim(){
        $search = request('search');  // Mendapatkan parameter search
        $filterTim = request('tim');  // Mendapatkan parameter tim
    
        $anggota_tims = AnggotaTim::with('tim:id,nama_tim', 'user:id,name')
            ->when($search, fn($q) => 
                $q->whereHas('user', fn($q2) =>
                    $q2->where('name', 'like', '%' . $search . '%')
                )
            )
            ->when($filterTim, fn($q) =>
                $q->where('tim_id', $filterTim)
            )
            ->paginate(5)
            ->withQueryString();  // Menjaga query string saat pagination
    
        $tims = Tim::select('id', 'nama_tim')->get();
    
        return Inertia::render('Pemantau/DataAnggotaTim', [
            'anggota_tims' => $anggota_tims,
            'filters' => [
                'search' => $search,
                'tim' => $filterTim
            ],
            'tims' => $tims,
        ]);
    }

    public function DataPresensi(Request $request){
        $search = $request->search;
        $undanganId = $request->undangan_id;

        $penerimas = PenerimaUndangan::with(['user:id,name', 'undangan:id,judul', 'tim:id,nama_tim'])
            ->when($search, fn ($query) =>
                $query->whereHas('user', fn ($q) =>
                    $q->where('name', 'like', '%' . $search . '%')
                )
            )
            ->when($undanganId, fn ($query) =>
                $query->where('undangan_id', $undanganId)
            )
            ->latest()
            ->paginate(5)
            ->withQueryString();

        $undangans = UndanganKegiatan::select('id', 'judul')->get();

        return Inertia::render('Pemantau/DataPresensi', [
            'penerimas' => $penerimas,
            'undangans' => $undangans,
            'filters' => [
                'search' => $search,
                'undangan_id' => $undanganId,
            ],
        ]);
    }

    public function DataDokumentasi(Request $request){
        $search = $request->search;
    $createdAt = $request->created_at;

    $dokumentasis = DokumentasiKegiatan::with([
            'kegiatan:id,nama_kegiatan',
            'undangan:id,judul',
            'fotoDokumentasi',
        ])
        ->when($search, function ($query) use ($search) {
            $query->whereHas('kegiatan', function ($q) use ($search) {
                $q->where('nama_kegiatan', 'like', '%' . $search . '%');
            });
        })
        ->when($createdAt, function ($query) use ($createdAt) {
            $query->whereDate('created_at', $createdAt);
        })
        ->latest()
        ->paginate(5)
        ->withQueryString();

    return Inertia::render('Pemantau/DataDokumentasi', [
        'dokumentasis' => $dokumentasis,
        'filters' => [
            'search' => $search,
            'created_at' => $createdAt,
        ],
    ]);
    }
    
}
