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
        $userId = Auth::id();

        $request->validate([
            'undangan_id' => 'required|exists:undangan_kegiatan,id',
            'kegiatan_id' => 'required|exists:kegiatan,id',
            'deskripsi' => 'required|string',
            'foto_dokumentasi.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $isAuthorized = PenerimaUndangan::where('user_id', $userId)
            ->where('undangan_id', $request->undangan_id)
            ->exists();

        if (!$isAuthorized) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk undangan ini.'
            ], 403);
        }

        $dokumentasi = DokumentasiKegiatan::create([
            'undangan_id' => $request->undangan_id,
            'kegiatan_id' => $request->kegiatan_id,
            'deskripsi' => $request->deskripsi,
        ]);

        if ($request->hasFile('foto_dokumentasi')) {
            foreach ($request->file('foto_dokumentasi') as $file) {
                $path = $file->store('foto_dokumentasi', 'public');
                FotoDokumentasi::create([
                    'dokumentasi_kegiatan_id' => $dokumentasi->id,
                    'foto' => $path,
                ]);
            }
        }

        return response()->json([
            'message' => 'Dokumentasi berhasil disimpan.',
            'data' => $dokumentasi->load('fotoDokumentasi')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $userId = Auth::id();

        $request->validate([
            'undangan_id' => 'required|exists:undangan_kegiatan,id',
            'kegiatan_id' => 'required|exists:kegiatan,id',
            'deskripsi' => 'required|string',
            'foto_dokumentasi.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $dokumentasi = DokumentasiKegiatan::findOrFail($id);

        $isAuthorized = PenerimaUndangan::where('user_id', $userId)
            ->where('undangan_id', $request->undangan_id)
            ->exists();

        if (!$isAuthorized) {
            return response()->json([
                'message' => 'Anda tidak memiliki akses untuk mengedit dokumentasi ini.'
            ], 403);
        }

        $dokumentasi->update([
            'undangan_id' => $request->undangan_id,
            'kegiatan_id' => $request->kegiatan_id,
            'deskripsi' => $request->deskripsi,
        ]);

        if ($request->hasFile('foto_dokumentasi')) {
            foreach ($request->file('foto_dokumentasi') as $file) {
                $path = $file->store('foto_dokumentasi', 'public');
                FotoDokumentasi::create([
                    'dokumentasi_kegiatan_id' => $dokumentasi->id,
                    'foto' => $path,
                ]);
            }
        }

        return response()->json([
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
