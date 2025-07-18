<?php

namespace App\Http\Controllers;

use App\Models\UndanganKegiatan;
use App\Http\Requests\StoreUndanganKegiatanRequest;
use App\Http\Requests\UpdateUndanganKegiatanRequest;
use App\Models\Kegiatan;
use App\Models\Tim;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use App\Mail\UndanganKegiatanMail;
use App\Models\PenerimaUndangan;
use App\Models\AnggotaTim;
use Illuminate\Support\Facades\Auth;

class UndanganKegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->search;
        $status = $request->status;

        $undangans = UndanganKegiatan::with(['updatedByUser', 'supervisor'])
            ->where('user_id', auth()->id())
            ->when(
                $search,
                fn($query) =>
                $query->where('judul', 'like', "%$search%")
            )
            ->when(
                $status,
                fn($query) =>
                $query->where('status', $status)
            )
            ->paginate(10)
            ->withQueryString();

        $pegawaiList = User::where('role', 'pegawai')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Pegawai/CekStatusUndangan', [
            'undangans' => $undangans,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'pegawaiList' => $pegawaiList,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
public function create()
{
    $userId = Auth::id();

    // Ambil semua tim_id yang diikuti oleh user dari tabel anggota_tim
    $timIds = AnggotaTim::where('user_id', $userId)->pluck('tim_id');

    // Ambil kegiatan yang memiliki tim_id dalam daftar tersebut
    $kegiatanOptions = Kegiatan::whereIn('tim_id', $timIds)->get(['id', 'nama_kegiatan']);

    return Inertia::render('Pegawai/CreateUndangan', [
        'kegiatans' => $kegiatanOptions,
        'tims' => Tim::select('id', 'nama_tim')->get(),
        'pegawaiList' => User::where('role', 'pegawai')
            ->select('id', 'name', 'email')
            ->get(),
        'anggotaTim' => AnggotaTim::select('user_id', 'tim_id')->get(),
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUndanganKegiatanRequest $request)
{
    $data = $request->validated();
    $data['user_id'] = auth()->id();

    // Simpan ke tabel undangan_kegiatans
    $undangan = UndanganKegiatan::create($data);

    // Simpan ke tabel penerima_undangan (hanya isi undangan_id, user_id, tim_id)
    if ($request->has('user_ids') && is_array($request->user_ids)) {
        foreach ($request->user_ids as $userId) {
            $timId = AnggotaTim::where('user_id', $userId)->value('tim_id');

            PenerimaUndangan::create([
                'undangan_id' => $undangan->id,
                'user_id' => $userId,
                'tim_id' => $timId ?? $data['tim_id'] ?? null,
                'status_penerima' => 'terima',
                'status_kehadiran' => 'belum',
            ]);
        }
    }

    return redirect()->route('undangan_kegiatan.index')
        ->with('success', 'Undangan dan penerima berhasil disimpan.');
}


    /**
     * Display the specified resource.
     */
    public function show(UndanganKegiatan $undanganKegiatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
public function edit(UndanganKegiatan $undanganKegiatan)
{
    $user = Auth::user();

    // Ambil semua tim yang diikuti user (anggota tim)
    $timIds = $user->anggotaTim()->pluck('tim_id');

    // Filter kegiatan berdasarkan tim yang user ikuti
    $kegiatans = Kegiatan::whereIn('tim_id', $timIds)->get(['id', 'nama_kegiatan', 'tim_id']);

    // Ambil semua tim (opsional, jika perlu untuk dropdown tim)
    $tims = Tim::all(['id', 'nama_tim']);

    // Ambil semua pegawai yang tergabung dalam tim-tim tersebut
    $pegawaiOptions = User::whereHas('anggotaTim', function ($query) use ($timIds) {
        $query->whereIn('tim_id', $timIds);
    })->get()->map(function ($user) {
        return [
            'value' => $user->id,
            'label' => $user->name,
        ];
    });

    // Ambil data undangan beserta relasi penerima undangan
    $undangan = UndanganKegiatan::with(['penerimaUndangan.user'])->findOrFail($undanganKegiatan->id);

    // Format pegawai yang sudah dipilih (penerima undangan)
    $selectedPegawai = $undangan->penerimaUndangan->map(function ($penerima) {
        return [
            'value' => $penerima->user_id,
            'label' => $penerima->user->name ?? 'Tidak diketahui',
        ];
    });

    return Inertia::render('Pegawai/EditUndangan', [
        'undangan' => $undangan,
        'kegiatans' => $kegiatans,
        'tims' => $tims,
        'pegawaiOptions' => $pegawaiOptions,
        'selectedPegawai' => $selectedPegawai,
    ]);
}


    /**
     * Update the specified resource in storage.
     */
public function update(UpdateUndanganKegiatanRequest $request, UndanganKegiatan $undanganKegiatan)
{
    $data = $request->validated();
    $data['updated_by'] = auth()->id();

    // Update data undangan kegiatan (seperti nama undangan, kegiatan_id, dll)
    $undanganKegiatan->update($data);

    // Cek apakah ada user_id yang dikirim dari frontend
    if ($request->has('user_ids') && is_array($request->user_ids)) {
        // Hapus semua penerima lama yang terkait dengan undangan ini
        PenerimaUndangan::where('undangan_id', $undanganKegiatan->id)->delete();

        // Masukkan ulang user_id yang baru
        foreach ($request->user_ids as $userId) {
            // Ambil tim_id dari tabel anggota_tim (jika ada)
            $timId = AnggotaTim::where('user_id', $userId)->value('tim_id');

            // Buat penerima undangan baru
            PenerimaUndangan::create([
                'undangan_id'      => $undanganKegiatan->id,
                'user_id'          => $userId,
                'tim_id'           => $timId,
                'status_penerima'  => 'terima',
                'status_kehadiran' => 'belum',
            ]);
        }
    }

    return redirect()->route('undangan_kegiatan.index')
        ->with('success', 'Undangan berhasil diperbarui.');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UndanganKegiatan $undanganKegiatan)
    {
        //
    }



    public function cetak($id)
    {
        $undangan = UndanganKegiatan::with(['user', 'tim', 'kegiatan'])->findOrFail($id);

        $pdf = Pdf::loadView('pdf.undangan', compact('undangan'))->setPaper('A4', 'portrait');

        return $pdf->download("Undangan_{$undangan->judul}.pdf");
    }
    public function kirim(Request $request, $id)
    {
        $request->validate([
            'subjek' => 'required|string',
            'pesan' => 'required|string',
            'pegawai' => 'required',
            'file' => 'required|file|mimes:pdf,doc,docx',
        ]);

        try {
            \Log::info('🟢 Mulai kirim undangan', [
                'subjek' => $request->subjek,
                'pesan' => $request->pesan,
            ]);

            // Simpan file ke storage
            $filePath = $request->file('file')->store('undangan', 'public');
            $fullPath = storage_path('app/public/' . $filePath);
            \Log::info('📎 File upload OK', ['filePath' => $filePath]);

            // Ambil daftar email pegawai dari form
            $pegawai = json_decode($request->pegawai);
            \Log::info('📬 Email tujuan:', $pegawai);

            // Kirim email satu per satu
            foreach ($pegawai as $email) {
                try {
                    Mail::raw("Yth. Bapak/Ibu,\n\n{$request->pesan}\n\nTerima kasih.\n\nSistem Undangan", function ($message) use ($email, $request, $fullPath) {
                        $message->to($email)
                            ->subject($request->subjek)
                            ->from(config('mail.from.address'), config('mail.from.name'))
                            ->attach($fullPath, [
                                'as' => 'Undangan.pdf',
                                'mime' => 'application/pdf',
                            ]);
                    });

                    \Log::info("✅ Email berhasil dikirim ke: $email");
                } catch (\Exception $e) {
                    \Log::error("❌ Gagal kirim ke $email: " . $e->getMessage());
                }
            }

            return back()->with('success', 'Undangan berhasil dikirim ke pegawai.');
        } catch (\Exception $e) {
            \Log::error("🔥 ERROR SAAT KIRIM: " . $e->getMessage());
            return back()->with('error', 'Gagal mengirim undangan. Silakan cek log.');
        }
    }
}
