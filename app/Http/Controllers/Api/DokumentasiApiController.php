<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DokumentasiKegiatan;
use App\Models\FotoDokumentasi;
use App\Models\PenerimaUndangan;
use App\Models\UndanganKegiatan;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DokumentasiApiController extends Controller
{
    public function index(Request $request)
{
    $search = $request->search;
    $createdAt = $request->created_at;

    $dokumentasis = DokumentasiKegiatan::with(['kegiatan:id,nama_kegiatan', 'undangan:id,judul', 'fotoDokumentasi'])
        ->when($search, fn ($query) =>
            $query->whereHas('kegiatan', fn ($q) =>
                $q->where('nama_kegiatan', 'like', '%' . $search . '%')
            )
        )
        ->when($createdAt, fn ($query) =>
            $query->whereDate('created_at', $createdAt)
        )
        ->latest()
        ->get();

    return response()->json($dokumentasis);
}

    public function store(Request $request)
    {
        $data = $request->validate([
            'kegiatan_id' => 'required|exists:kegiatans,id',
            'undangan_id' => 'required|exists:undangan_kegiatans,id',
            'notulensi'   => 'nullable|string',
            'link_zoom'   => 'nullable|url',
            'link_materi' => 'nullable|url',
            'foto.*'      => 'nullable|image|max:2048'
        ]);

        $dokumentasi = DokumentasiKegiatan::create([
            'kegiatan_id' => $data['kegiatan_id'],
            'undangan_id' => $data['undangan_id'],
            'notulensi'   => $data['notulensi'] ?? null,
            'link_zoom'   => $data['link_zoom'] ?? null,
            'link_materi' => $data['link_materi'] ?? null,
        ]);

        if ($request->hasFile('foto')) {
            foreach ($request->file('foto') as $file) {
                $filename = Str::random(20) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('foto_dokumentasi', $filename, 'public');

                FotoDokumentasi::create([
                    'dokumentasi_id' => $dokumentasi->id,
                    'foto' => $path,
                ]);
            }
        }

        return response()->json([
            'message' => 'Dokumentasi berhasil ditambahkan.',
            'data' => $dokumentasi->load('fotoDokumentasi')
        ]);
    }

    public function show($id)
    {
        $dokumentasi = DokumentasiKegiatan::with(['kegiatan', 'undangan', 'fotoDokumentasi'])->findOrFail($id);
        return response()->json($dokumentasi);
    }

    public function update(Request $request, $id)
    {
        $dokumentasi = DokumentasiKegiatan::findOrFail($id);

        $data = $request->validate([
            'kegiatan_id' => 'required|exists:kegiatans,id',
            'undangan_id' => 'required|exists:undangan_kegiatans,id',
            'notulensi'   => 'nullable|string',
            'link_zoom'   => 'nullable|url',
            'link_materi' => 'nullable|url',
        ]);

        $dokumentasi->update($data);

        return response()->json(['message' => 'Dokumentasi berhasil diperbarui.']);
    }

    public function destroy($id)
    {
        $dokumentasi = DokumentasiKegiatan::with('fotoDokumentasi')->findOrFail($id);

        foreach ($dokumentasi->fotoDokumentasi as $foto) {
            if (Storage::disk('public')->exists($foto->foto)) {
                Storage::disk('public')->delete($foto->foto);
            }
            $foto->delete();
        }

        $dokumentasi->delete();

        return response()->json(['message' => 'Dokumentasi berhasil dihapus.']);
    }

    public function formOptions()
    {
        $userId = auth()->id();

        $undangan = UndanganKegiatan::with('kegiatan:id,nama_kegiatan')
            ->whereHas('penerimaUndangan', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->select('id', 'judul', 'kegiatan_id')
            ->get();

        $kegiatan = $undangan->pluck('kegiatan')->unique('id')->values();

        return response()->json([
            'kegiatan' => $kegiatan,
            'undangan' => $undangan
        ]);
    }
}
