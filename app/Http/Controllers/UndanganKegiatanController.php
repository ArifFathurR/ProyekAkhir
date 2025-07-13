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
        return Inertia::render('Pegawai/CreateUndangan', [
            'kegiatans' => Kegiatan::select('id', 'nama_kegiatan')->get(),
            'tims' => Tim::select('id', 'nama_tim')->get(),
            'pegawaiList' => User::where('role', 'pegawai')->select('id', 'name', 'email')->get(),
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
        $kegiatans = Kegiatan::select('id', 'nama_kegiatan')->get();

    return Inertia::render('Pegawai/EditUndangan', [
        'undangan' => $undanganKegiatan,
        'kegiatans' => $kegiatans,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUndanganKegiatanRequest $request, UndanganKegiatan $undanganKegiatan)
    {
        $data = $request->validated();
    $data['updated_by'] = auth()->id(); // untuk tracking siapa yang terakhir mengedit

    $undanganKegiatan->update($data);

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
