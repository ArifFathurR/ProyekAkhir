<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Tim;
use App\Http\Requests\StoreTimRequest;
use App\Http\Requests\UpdateTimRequest;
use Illuminate\Support\Facades\Auth;

class TimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search');  // Mendapatkan parameter search
        $tims = Tim::when($search, function ($query, $search) {
            return $query->where('nama_tim', 'like', '%' . $search . '%');
        })
        ->paginate(5)  // Menambahkan pagination
        ->withQueryString();  // Menjaga query string saat pagination

    return Inertia::render('Admin/DataTim', [
        'tims' => $tims,
        'filters' => [
            'search' => $search,
        ]
    ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/TambahTim');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTimRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Tim::create($data);

        return redirect()->route('tim.index')
            ->with('success', 'Tim berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tim $tim)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tim $tim)
    {
        return inertia('Admin/EditTim', [
            'tim' => $tim  // Pastikan data tim dikirim
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTimRequest $request, Tim $tim)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $tim->update($data);

        return redirect()->route('tim.index')
            ->with('success', 'Tim berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tim $tim)
    {

        $tim->delete();

        return redirect()->route('tim.index')
            ->with('success', "Tim berhasil dihapus.");
    }
}
