<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDokumentasiKegiatanRequest;
use App\Models\DokumentasiKegiatan;
use App\Models\FotoDokumentasi;
use App\Models\Kegiatan;
use App\Models\UndanganKegiatan;
use App\Models\PenerimaUndangan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;

class DokumentasiKegiatanController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $createdAt = $request->created_at;
        $userId = Auth::id();

        $undanganIds = PenerimaUndangan::where('user_id', $userId)->pluck('undangan_id');

        $dokumentasis = DokumentasiKegiatan::with(['kegiatan:id,nama_kegiatan', 'undangan:id,judul', 'fotoDokumentasi'])
            ->whereIn('undangan_id', $undanganIds)
            ->when($search, fn ($query) =>
                $query->whereHas('kegiatan', fn ($q) =>
                    $q->where('nama_kegiatan', 'like', '%' . $search . '%')
                )
            )
            ->when($createdAt, fn ($query) =>
                $query->whereDate('created_at', $createdAt)
            )
            ->latest()
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Pegawai/DataDokumentasi', [
            'dokumentasis' => $dokumentasis,
            'filters' => [
                'search' => $search,
                'created_at' => $createdAt,
            ],
        ]);
    }

    public function create()
    {
        $userId = auth()->id();

        $undangan = UndanganKegiatan::with('kegiatan:id,nama_kegiatan')
            ->whereHas('penerimaUndangan', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->select('id', 'judul', 'kegiatan_id')
            ->get();

        $kegiatan = $undangan->pluck('kegiatan')->unique('id')->values();

        return Inertia::render('Pegawai/CreateDokumentasi', [
            'kegiatanOptions' => $kegiatan,
            'undanganOptions' => $undangan,
        ]);
    }

    public function store(StoreDokumentasiKegiatanRequest $request)
    {
        $data = $request->validated();

        $dokumentasi = DokumentasiKegiatan::create([
            'kegiatan_id' => $data['kegiatan_id'],
            'undangan_id' => $data['undangan_id'],
            'notulensi'   => $data['notulensi'] ?? null,
            'link_zoom'   => $data['link_zoom'],
            'link_materi' => $data['link_materi'],
        ]);

        $this->handleFotoUpload($request, $dokumentasi->id);

        return redirect()->route('dokumentasi_kegiatan.index')->with('success', 'Dokumentasi berhasil ditambahkan.');
    }

    public function edit(DokumentasiKegiatan $dokumentasi_kegiatan)
    {
        $kegiatan = Kegiatan::select('id', 'nama_kegiatan')->get();
        $undangan = UndanganKegiatan::select('id', 'judul')->get();

        $dokumentasi_kegiatan->load('fotoDokumentasi');

        return Inertia::render('Pegawai/EditDokumentasi', [
            'dokumentasi' => $dokumentasi_kegiatan,
            'kegiatanOptions' => $kegiatan,
            'undanganOptions' => $undangan,
        ]);
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'kegiatan_id' => 'required|exists:kegiatans,id',
        'undangan_id' => 'required|exists:undangan_kegiatans,id',
        'notulensi' => 'nullable|string',
        'link_zoom' => 'nullable|url',
        'link_materi' => 'nullable|url',
        'foto' => 'nullable|array',
        'foto.*' => 'image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $dokumentasi = DokumentasiKegiatan::findOrFail($id);

    $dokumentasi->update([
        'kegiatan_id' => $request->kegiatan_id,
        'undangan_id' => $request->undangan_id,
        'notulensi' => $request->notulensi,
        'link_zoom' => $request->link_zoom,
        'link_materi' => $request->link_materi,
    ]);

    if ($request->hasFile('foto')) {
        // Hapus foto lama
        foreach ($dokumentasi->fotoDokumentasi as $foto) {
            if (Storage::disk('public')->exists($foto->foto)) {
                Storage::disk('public')->delete($foto->foto);
            }
            $foto->delete();
        }

        $this->handleFotoUpload($request, $dokumentasi->id);
    }

    return redirect()->route('dokumentasi_kegiatan.index')->with('success', 'Dokumentasi berhasil diperbarui.');
}


    public function destroy(DokumentasiKegiatan $dokumentasi_kegiatan)
    {
        foreach ($dokumentasi_kegiatan->fotoDokumentasi as $foto) {
            if (Storage::disk('public')->exists($foto->foto)) {
                Storage::disk('public')->delete($foto->foto);
            }
            $foto->delete();
        }

        $dokumentasi_kegiatan->delete();

        return redirect()->route('dokumentasi_kegiatan.index')->with('success', 'Dokumentasi berhasil dihapus.');
    }

    private function handleFotoUpload(Request $request, $dokumentasiId)
    {
        if ($request->hasFile('foto')) {
            $manager = new ImageManager(new GdDriver());

            foreach ($request->file('foto') as $file) {
                $filename = Str::random(20) . '.jpg';

                $image = $manager->read($file->getPathname());
                $image = $image->scale(width: 800);

                $quality = 75;
                $encodedImage = $image->toJpeg($quality);

                while (strlen((string) $encodedImage) > 30 * 1024 && $quality > 10) {
                    $quality -= 5;
                    $encodedImage = $image->toJpeg($quality);
                }

                Storage::disk('public')->put('foto_dokumentasi/' . $filename, $encodedImage);

                FotoDokumentasi::create([
                    'dokumentasi_id' => $dokumentasiId,
                    'foto' => 'foto_dokumentasi/' . $filename,
                ]);
            }
        }
    }

    public function deleteFoto($id)
{
    $foto = FotoDokumentasi::findOrFail($id);

    if (Storage::disk('public')->exists($foto->foto)) {
        Storage::disk('public')->delete($foto->foto);
    }

    $foto->delete();

    return back()->with('success', 'Foto berhasil dihapus.');
}

}
