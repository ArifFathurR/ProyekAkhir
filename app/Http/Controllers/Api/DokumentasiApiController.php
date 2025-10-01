<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\DokumentasiKegiatan;
use App\Models\FotoDokumentasi;
use App\Models\PenerimaUndangan;

class DokumentasiApiController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $undanganIds = PenerimaUndangan::where('user_id', $userId)
            ->pluck('undangan_id');

        $dokumentasi = DokumentasiKegiatan::with('fotoDokumentasi', 'undangan.kegiatan')
            ->whereIn('undangan_id', $undanganIds)
            ->get();

        return response()->json([
            'data' => $dokumentasi
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kegiatan_id' => 'required|integer',
            'undangan_id' => 'required|integer',
            'link_zoom' => 'nullable|string',
            'link_materi' => 'nullable|string',
            'foto_dokumentasi' => 'nullable', // bisa single atau multiple
        ]);

        // simpan dokumentasi kegiatan
        $dokumentasi = DokumentasiKegiatan::create([
            'kegiatan_id' => $request->kegiatan_id,
            'undangan_id' => $request->undangan_id,
            'notulensi' => $request->notulensi,
            'link_zoom' => $request->link_zoom,
            'link_materi' => $request->link_materi,
        ]);

        // cek kalau ada file foto_dokumentasi
        if ($request->hasFile('foto_dokumentasi')) {
            $files = $request->file('foto_dokumentasi');

            // kalau 1 file → bungkus ke array supaya bisa foreach
            if (!is_array($files)) {
                $files = [$files];
            }

            foreach ($files as $file) {
                if ($file->isValid()) {
                    $path = $file->store('dokumentasi', 'public');

                    FotoDokumentasi::create([
                        'dokumentasi_id' => $dokumentasi->id,
                        'foto' => $path,
                    ]);
                }
            }
        }

        // reload dengan relasi foto
        $dokumentasi->load('fotoDokumentasi');

        return response()->json([
            'status' => true,
            'message' => 'Dokumentasi berhasil ditambahkan.',
            'data' => $dokumentasi,
        ], 201);
    }

    public function update(Request $request, $id)
{
    $userId = Auth::id();

    $request->validate([
        'undangan_id' => 'required|exists:undangan_kegiatans,id',
        'kegiatan_id' => 'required|exists:kegiatans,id',
        'notulensi'   => 'nullable|string',
        'link_zoom'   => 'nullable|string',
        'link_materi' => 'nullable|string',
        'foto_dokumentasi' => 'nullable', // single atau multiple
    ]);

    $dokumentasi = DokumentasiKegiatan::findOrFail($id);

    // cek apakah user berhak update
    $isAuthorized = PenerimaUndangan::where('user_id', $userId)
        ->where('undangan_id', $request->undangan_id)
        ->exists();

    if (!$isAuthorized) {
        return response()->json([
            'message' => 'Anda tidak memiliki akses untuk mengedit dokumentasi ini.'
        ], 403);
    }

    // update data dokumentasi
    $dokumentasi->update([
        'undangan_id' => $request->undangan_id,
        'kegiatan_id' => $request->kegiatan_id,
        'notulensi'   => $request->notulensi,
        'link_zoom'   => $request->link_zoom,
        'link_materi' => $request->link_materi,
    ]);

    // kalau ada file baru diupload
    if ($request->hasFile('foto_dokumentasi')) {
        $files = $request->file('foto_dokumentasi');

        if (!is_array($files)) {
            $files = [$files];
        }

        foreach ($files as $file) {
            if ($file->isValid()) {
                $path = $file->store('dokumentasi', 'public');

                FotoDokumentasi::create([
                    'dokumentasi_id' => $dokumentasi->id, // pakai dokumentasi_id
                    'foto' => $path,
                ]);
            }
        }
    }

    return response()->json([
        'status' => true,
        'message' => 'Dokumentasi berhasil diperbarui.',
        'data' => $dokumentasi->load('fotoDokumentasi')
    ]);
}


    public function destroy($id)
    {
        $userId = Auth::id();

        $dokumentasi = DokumentasiKegiatan::with('fotoDokumentasi')->findOrFail($id);

        $isAuthorized = PenerimaUndangan::where('user_id', $userId)
            ->where('undangan_id', $dokumentasi->undangan_id)
            ->exists();

        if (!$isAuthorized) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk menghapus dokumentasi ini.'
            ], 403);
        }

        foreach ($dokumentasi->fotoDokumentasi as $foto) {
            Storage::disk('public')->delete($foto->foto);
            $foto->delete();
        }

        $dokumentasi->delete();

        return response()->json([
            'message' => 'Dokumentasi berhasil dihapus.'
        ]);
    }
}
