<?php

namespace App\Http\Controllers;
use App\Models\DokumentasiKegiatan;
use App\Models\Supervisor;
use App\Http\Requests\StoreSupervisorRequest;
use App\Http\Requests\UpdateSupervisorRequest;
use App\Models\UndanganKegiatan;
use App\Models\AnggotaTim;
use App\Models\Tim;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\PenerimaUndangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupervisorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    $undangans = UndanganKegiatan::with(['user', 'kegiatan'])
        ->where('status', 'Menunggu')
        ->latest()
        ->get();

    $historyUndangans = UndanganKegiatan::with(['user', 'kegiatan'])
        ->latest()
        ->get();

    

    return Inertia::render('Supervisor/KonfirmasiUndangan', [
        'undangans' => $undangans,
        'historyUndangans' => $historyUndangans,
    ]);
    }


public function konfirmasi(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:Diterima,Ditolak',
        'komentar' => 'nullable|string|max:1000',
    ]);

    $undangan = UndanganKegiatan::findOrFail($id);
    $undangan->status = $request->status;
    $undangan->komentar = $request->komentar;
    $undangan->id_supervisor = auth()->id();
    $undangan->save();

    return redirect()->back()->with('success', 'Status dan komentar berhasil diperbarui.');
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
    public function store(StoreSupervisorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Supervisor $supervisor)
   {
    $userId = auth()->id();

    $kegiatan = PenerimaUndangan::with(['undangan.kegiatan'])
        ->where('user_id', $userId)
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

    return Inertia::render('Supervisor/KegiatanSaya', [
        'kegiatan' => $kegiatan,
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supervisor $supervisor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupervisorRequest $request, Supervisor $supervisor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supervisor $supervisor)
    {
        //
    }
   public function preview($id)
{
    $undangan = UndanganKegiatan::with(['user', 'kegiatan'])->findOrFail($id);

    $pdf = Pdf::loadView('pdf.undangan', compact('undangan'))->setPaper('A4', 'portrait');

    return $pdf->stream("Undangan_{$undangan->judul}.pdf");
}


    public function semuaDokumentasi(Request $request)
{
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

    return Inertia::render('Supervisor/DataDokumentasi', [
        'dokumentasis' => $dokumentasis,
        'filters' => [
            'search' => $search,
            'created_at' => $createdAt,
        ],
    ]);
}

public function Sedang(Supervisor $Supervisor)
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
                'file_undangan' => route('undangan_kegiatan.preview', $item->undangan_id),
                'status_penerima' => $item->status_penerima,
            ];
        });

    return Inertia::render('Supervisor/KegiatanSadangBerlangsung', [
        'kegiatan' => $kegiatan,
    ]);
}
public function Selesai(Supervisor $Supervisor)
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
            ];
        });

    return Inertia::render('Supervisor/KegiatanSelesai', [
        'kegiatan' => $kegiatan,
    ]);
}

public function kalender(){
    {
    $userId = auth()->id();

    $kegiatan = PenerimaUndangan::with('undangan')
        ->where('user_id', $userId)
        ->whereHas('undangan', fn($q) => $q->where('status', 'Diterima'))
        ->get()
        ->map(function ($item) {
            return [
                'title' => $item->undangan->judul,
                'date' => $item->undangan->tanggal,
                'waktu' => $item->undangan->waktu, // ⏰ Tambahkan waktu di sini
            ];
        });

    return Inertia::render('Supervisor/KalenderKegiatan', [
        'kegiatan' => $kegiatan,
    ]);
}
}

public function AnggotaTim(){
    $search = request('search');
    $filterTim = request('tim');
    $userId = Auth::id();

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
        ->withQueryString();

    // hanya ambil tim yang memiliki anggota dengan user login
    $tims = Tim::whereHas('anggotaTim', function ($query) use ($userId) {
        $query->where('user_id', $userId);
    })->select('id', 'nama_tim')->get();

    return Inertia::render('Supervisor/DataAnggotaTim', [
        'anggota_tims' => $anggota_tims,
        'filters' => [
            'search' => $search,
            'tim' => $filterTim
        ],
        'tims' => $tims,
    ]);
}
}
