<?php

namespace App\Http\Controllers;

use App\Models\AnggotaTim;
use App\Models\Tim;
    use App\Models\User;
use App\Http\Requests\StoreAnggotaTimRequest;
use App\Http\Requests\UpdateAnggotaTimRequest;
use Inertia\Inertia;

class AnggotaTimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
    
        return Inertia::render('Admin/DataAnggotaTim', [
            'anggota_tims' => $anggota_tims,
            'filters' => [
                'search' => $search,
                'tim' => $filterTim
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
        $users = User::select('id', 'name')->get();
    
        return inertia('Admin/CreateAnggotaTim', [
            'tims' => $tims,
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnggotaTimRequest $request)
    {
        $data = $request->validated();
    AnggotaTim::create($data);
    return redirect()->route('anggota_tim.index')
    ->with('success', 'Anggota Tim berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(AnggotaTim $anggotaTim)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AnggotaTim $anggota_tim)
    {
        $tims = Tim::all();
        $users = User::all();
        return Inertia::render('Admin/EditAnggotaTim', [
            'anggota_tim' => $anggota_tim,
            'tims' => $tims,
            'users' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnggotaTimRequest $request, AnggotaTim $anggota_tim)
    {
         // Validasi dan update data kegiatan
         $data = $request->validated();
         $anggota_tim->update($data);
 
     // Redirect ke halaman index dengan pesan sukses
         return redirect()->route('anggota_tim.index')->with('success', 'Anggota Tim berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnggotaTim $anggotaTim)
    {
    $anggotaTim->delete();

    // Redirect kembali ke halaman kegiatan dengan pesan sukses
    return redirect()->route('anggota_tim.index')->with('success', 'Data berhasil dihapus.');
    }
    public function boot()
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'), // optional
                ];
            },
        ]);
    }
}
