<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
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
        $scope = $request->input('scope', 'kegiatan_saya');
        $userId = Auth::id();

        // Ambil semua id penerima_undangan milik user ini
        $userPenerimaIds = PenerimaUndangan::where('user_id', $userId)->pluck('id')->toArray();

        if ($scope === 'semua_kegiatan') {
            $undangansQuery = UndanganKegiatan::with(['kegiatan'])
                ->where('status_pelaksanaan', 'Selesai')
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('judul', 'like', "%{$search}%")
                          ->orWhereHas('kegiatan', fn ($k) => $k->where('nama_kegiatan', 'like', "%{$search}%"));
                    });
                })
                ->when($createdAt, fn ($query) =>
                    $query->whereDate('tanggal', $createdAt)
                )
                ->latest('tanggal');

            $dokumentasis = $undangansQuery->paginate(10)
                ->withQueryString()
                ->through(function ($u) {
                    return [
                        'id' => $u->id,
                        'undangan_id' => $u->id,
                        'nama_kegiatan' => $u->kegiatan->nama_kegiatan ?? '-',
                        'sub_kegiatan' => $u->judul ?? '-',
                        'tanggal' => $u->tanggal ?? '-',
                        'file_undangan' => route('undangan_kegiatan.preview', $u->id),
                    ];
                });
        } else {
            $query = DokumentasiKegiatan::with([
                'kegiatan:id,nama_kegiatan',
                'undangan:id,judul',
                'fotoDokumentasi',
                'penerima.user:id,name'
            ])->whereIn('penerima_id', $userPenerimaIds);

            $dokumentasis = $query
                ->when($search, fn ($q) =>
                    $q->whereHas('kegiatan', fn ($k) =>
                        $k->where('nama_kegiatan', 'like', '%' . $search . '%')
                    )
                )
                ->when($createdAt, fn ($q) =>
                    $q->whereDate('created_at', $createdAt)
                )
                ->latest()
                ->paginate(10)
                ->withQueryString();
        }

        // Ambil semua undangan yang diterima user
        $undanganIds = PenerimaUndangan::where('user_id', $userId)->pluck('undangan_id');
        $totalUndangan = UndanganKegiatan::whereIn('id', $undanganIds)->count();

        // Ambil semua foto dokumentasi milik user
        $totalFoto = FotoDokumentasi::whereIn('dokumentasi_id', function($q) use ($userPenerimaIds) {
            $q->select('id')->from('dokumentasi_kegiatans')->whereIn('penerima_id', $userPenerimaIds);
        })->count();

        // Ambil semua undangan yang diterima user untuk pilihan modal
        $undanganOptions = UndanganKegiatan::with('kegiatan:id,nama_kegiatan')
            ->whereHas('penerimaUndangan', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->select('id', 'judul', 'kegiatan_id')
            ->get();

        return Inertia::render('Pegawai/DataDokumentasi', [
            'dokumentasis' => $dokumentasis,
            'filters' => [
                'search' => $search,
                'created_at' => $createdAt,
                'scope' => $scope,
            ],
            'totalUndangan' => $totalUndangan,
            'totalFoto' => $totalFoto,
            'currentUserId' => $userId,
            'userPenerimaIds' => $userPenerimaIds,
            'undanganOptions' => $undanganOptions,
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

        return Inertia::render('Pegawai/CreateDokumentasi', [
            'undanganOptions' => $undangan,
        ]);
    }

    public function store(StoreDokumentasiKegiatanRequest $request)
{
    $data = $request->validated();
    $userId = Auth::id();

    // Ambil kegiatan_id otomatis berdasarkan undangan_id
    $undangan = UndanganKegiatan::findOrFail($data['undangan_id']);
    $data['kegiatan_id'] = $undangan->kegiatan_id;

    // Pastikan user ini adalah penerima undangan tersebut
    $penerima = PenerimaUndangan::where('user_id', $userId)
        ->where('undangan_id', $data['undangan_id'])
        ->first();

    // Validasi apakah undangan tersebut termasuk undangan yang diterima user
    if (!$penerima) {
        return back()->with('error', 'Anda tidak berhak membuat dokumentasi untuk undangan ini.');
    }

    // ✅ Cek apakah user sudah pernah membuat dokumentasi untuk undangan ini
    $sudahAda = DokumentasiKegiatan::where('undangan_id', $data['undangan_id'])
        ->where('penerima_id', $penerima->id)
        ->exists();

    if ($sudahAda) {
        return back()->with('error', 'Anda sudah pernah membuat dokumentasi untuk kegiatan ini.');
    }

    // Jika lolos validasi, buat dokumentasi baru
    $dokumentasi = DokumentasiKegiatan::create([
        'kegiatan_id' => $data['kegiatan_id'],
        'undangan_id' => $data['undangan_id'],
        'penerima_id' => $penerima->id, // Menyimpan ID user yang terlibat dari penerima undangan
        'notulensi'   => $data['notulensi'],
        'link_zoom'   => $data['link_zoom'],
        'link_materi' => $data['link_materi'],
    ]);

    $this->handleFotoUpload($request, $dokumentasi->id);

    return redirect()->route('dokumentasi_kegiatan.index')->with('success', 'Dokumentasi berhasil ditambahkan.');
}


    public function edit(DokumentasiKegiatan $dokumentasi_kegiatan)
    {
        $undangan = UndanganKegiatan::select('id', 'judul')->get();

        $dokumentasi_kegiatan->load('fotoDokumentasi');

        return Inertia::render('Pegawai/EditDokumentasi', [
            'dokumentasi' => $dokumentasi_kegiatan,
            'undanganOptions' => $undangan,
        ]);
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'undangan_id' => 'required|exists:undangan_kegiatans,id',
        'notulensi' => 'nullable|string',
        'link_zoom' => 'nullable|url',
        'link_materi' => 'nullable|url',
        'foto' => 'nullable|array',
        'foto.*' => 'image|mimes:jpeg,png,jpg|max:2048',
    ]);

    $dokumentasi = DokumentasiKegiatan::findOrFail($id);
    
    // Ambil kegiatan_id otomatis berdasarkan undangan_id
    $undangan = UndanganKegiatan::findOrFail($request->undangan_id);

    $dokumentasi->update([
        'kegiatan_id' => $undangan->kegiatan_id,
        'undangan_id' => $request->undangan_id,
        'notulensi' => $request->notulensi,
        'link_zoom' => $request->link_zoom,
        'link_materi' => $request->link_materi,
    ]);

    if ($request->hasFile('foto')) {
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

                while (strlen((string) $encodedImage) > 300 * 1024 && $quality > 10) {
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
