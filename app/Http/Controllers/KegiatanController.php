<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Http\Requests\StoreKegiatanRequest;
use App\Http\Requests\UpdateKegiatanRequest;
use Inertia\Inertia;
use \App\Models\Tim;
use Illuminate\Support\Facades\Auth;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search');
        $timId = request('tim_id');
    
        $kegiatans = Kegiatan::with('tim:id,nama_tim')
            ->when($search, fn($query) =>
                $query->where('nama_kegiatan', 'like', '%' . $search . '%')
            )
            ->when($timId, fn($query) =>
                $query->where('tim_id', $timId)
            )
            ->latest()
            ->paginate(10)
            ->withQueryString(); // untuk menjaga query search & filter saat pagination
    
        $tims = Tim::select('id', 'nama_tim')->get();
    
        return Inertia::render('Admin/DataKegiatan', [
            'kegiatans' => $kegiatans,
            'filters' => [
                'search' => $search,
                'tim_id' => $timId,
            ],
            'tims' => $tims,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tims = Tim::select('id', 'nama_tim')->get();

        return inertia('Admin/CreateKegiatan', [
            'tims' => $tims,
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKegiatanRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id(); // Set user_id dari user yang login
        Kegiatan::create($data);

        return redirect()->route('kegiatan.index')
            ->with('success', 'Kegiatan berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kegiatan $kegiatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kegiatan $kegiatan)
    {
        $tims = Tim::all();
        return Inertia::render('Admin/EditKegiatan', [
            'kegiatan' => $kegiatan,
            'tims' => $tims,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKegiatanRequest $request, Kegiatan $kegiatan)
    {
        // Validasi dan update data kegiatan
        $data = $request->validated();
        $kegiatan->update($data);

    // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        // Menghapus data kegiatan berdasarkan ID
    $kegiatan->delete();

    // Redirect kembali ke halaman kegiatan dengan pesan sukses
    return redirect()->route('kegiatan.index')->with('success', 'Kegiatan berhasil dihapus.');
    }
}
