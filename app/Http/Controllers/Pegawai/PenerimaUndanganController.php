<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\PenerimaUndangan;
use App\Models\UndanganKegiatan;
use App\Http\Requests\StorePenerimaUndanganRequest;
use App\Http\Requests\UpdatePenerimaUndanganRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenerimaUndanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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

        $stats = [
            'total' => 0,
            'hadir' => 0,
            'tidakHadir' => 0,
            'berhalangan' => 0,
        ];

        if ($undanganId) {
            $baseQuery = PenerimaUndangan::where('undangan_id', $undanganId);
            if ($search) {
                $baseQuery->whereHas('user', fn ($q) => $q->where('name', 'like', '%' . $search . '%'));
            }

            $stats['total'] = (clone $baseQuery)->count();
            $stats['hadir'] = (clone $baseQuery)->whereRaw('LOWER(status_kehadiran) = ?', ['hadir'])->count();
            $stats['tidakHadir'] = (clone $baseQuery)->where(fn($q) => $q->where('status_kehadiran', 'Tidak Hadir')->orWhere('status_kehadiran', 'Izin'))->count();
            $stats['berhalangan'] = (clone $baseQuery)->where(fn($q) => $q->where('status_penerima', 'berhalangan')->orWhereNotNull('alasan_berhalangan'))->count();
        }

        $undangans = UndanganKegiatan::select('id', 'judul')->get();

        return Inertia::render('Supervisor/DataPresensi', [
            'penerimas' => $penerimas,
            'undangans' => $undangans,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
                'undangan_id' => $undanganId,
            ],
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
    public function store(StorePenerimaUndanganRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PenerimaUndangan $penerimaUndangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PenerimaUndangan $penerimaUndangan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePenerimaUndanganRequest $request, PenerimaUndangan $penerimaUndangan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PenerimaUndangan $penerimaUndangan)
    {
        //
    }
}
