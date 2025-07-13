<?php

namespace App\Http\Controllers;

use App\Models\Supervisor;
use App\Http\Requests\StoreSupervisorRequest;
use App\Http\Requests\UpdateSupervisorRequest;
use App\Models\UndanganKegiatan;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
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

    return Inertia::render('Supervisor/KonfirmasiUndangan', [
        'undangans' => $undangans,
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
        //
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
}
