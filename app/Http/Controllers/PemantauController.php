<?php

namespace App\Http\Controllers;

use App\Models\Pemantau;
use App\Http\Requests\StorePemantauRequest;
use App\Http\Requests\UpdatePemantauRequest;
use Inertia\Inertia;

class PemantauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Pemantau/Dashboard');
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
}
