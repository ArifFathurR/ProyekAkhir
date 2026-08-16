<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
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
        $tab = $request->input('tab', 'belum_terkirim');

        $undangansQuery = UndanganKegiatan::with(['updatedByUser', 'supervisor', 'penerimaUndangan.user'])
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
            );

        if ($tab === 'terkirim') {
            $undangansQuery->whereNotNull('file_undangan')
                           ->where('status', '!=', 'Revisi');
        } else {
            $undangansQuery->where(function ($query) {
                $query->whereNull('file_undangan')
                      ->orWhere('status', 'Revisi');
            });
        }

        $undangans = $undangansQuery->paginate(10)
            ->withQueryString();

        $userId = Auth::id();

        // Ambil semua tim_id yang diikuti oleh user dari tabel anggota_tim
        $timIds = AnggotaTim::where('user_id', $userId)->pluck('tim_id');

        // Ambil kegiatan yang memiliki tim_id dalam daftar tersebut
        $kegiatanOptions = Kegiatan::whereIn('tim_id', $timIds)->get(['id', 'nama_kegiatan', 'tanggal', 'tanggal_selesai']);

        return Inertia::render('Pegawai/CekStatusUndangan', [
            'undangans' => $undangans,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'tab' => $tab,
            ],
            'kegiatans' => $kegiatanOptions,
            'tims' => Tim::select('id', 'nama_tim')->get(),
            'pegawaiList' => User::select('id', 'name', 'email')->get(),
            'anggotaTim' => AnggotaTim::select('user_id', 'tim_id')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return redirect()->route('undangan_kegiatan.index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUndanganKegiatanRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        // Validasi tambahan: Tanggal undangan harus berada dalam rentang tanggal kegiatan
        $kegiatan = Kegiatan::find($request->kegiatan_id);
        if ($kegiatan && $kegiatan->tanggal) {
            $selectedDate = date('Y-m-d', strtotime($request->tanggal));
            $startDate = date('Y-m-d', strtotime($kegiatan->tanggal));
            $endDate = $kegiatan->tanggal_selesai
                ? date('Y-m-d', strtotime($kegiatan->tanggal_selesai))
                : $startDate;

            if ($selectedDate < $startDate || $selectedDate > $endDate) {
                $formattedSelected = \Carbon\Carbon::parse($selectedDate)->translatedFormat('d F Y');
                $formattedStart = \Carbon\Carbon::parse($startDate)->translatedFormat('d F Y');

                if ($kegiatan->tanggal_selesai) {
                    $formattedEnd = \Carbon\Carbon::parse($endDate)->translatedFormat('d F Y');
                    $msg = "Tanggal undangan ({$formattedSelected}) harus berada dalam rentang tanggal kegiatan ({$formattedStart} s/d {$formattedEnd}).";
                } else {
                    $msg = "Tanggal undangan ({$formattedSelected}) harus sesuai dengan tanggal kegiatan ({$formattedStart}).";
                }

                return redirect()->back()->withErrors(['tanggal' => $msg])->withInput();
            }
        }

        // Simpan ke tabel undangan_kegiatans
        $undangan = UndanganKegiatan::create($data);

    // Simpan ke tabel penerima_undangan (hanya isi undangan_id, user_id, tim_id)
    if ($request->has('user_ids') && is_array($request->user_ids)) {
        $selectedTimIds = $request->input('tim_ids', []);
        foreach ($request->user_ids as $userId) {
            // Cari tim_id user yang ada dalam daftar selectedTimIds
            $timId = AnggotaTim::where('user_id', $userId)
                ->whereIn('tim_id', $selectedTimIds)
                ->value('tim_id');

            // Jika tidak ditemukan, fallback ke tim mana saja yang diikuti user tersebut
            if (!$timId) {
                $timId = AnggotaTim::where('user_id', $userId)->value('tim_id');
            }

            PenerimaUndangan::create([
                'undangan_id' => $undangan->id,
                'user_id' => $userId,
                'tim_id' => $timId,
                'status_penerima' => 'terima',
                'status_kehadiran' => 'belum',
            ]);
        }
    }

    // Kirim notifikasi email ke supervisor yang berada dalam 1 tim dengan pembuat undangan
    $userTimIds = AnggotaTim::where('user_id', auth()->id())->pluck('tim_id');
    if ($userTimIds->isNotEmpty()) {
        $supervisors = User::where(function ($query) {
                $query->where('role', 'supervisor')
                      ->orWhere('role', 'like', '%supervisor%');
            })
            ->whereIn('id', function ($query) use ($userTimIds) {
                $query->select('user_id')
                      ->from('anggota_tims')
                      ->whereIn('tim_id', $userTimIds);
            })
            ->get();

        foreach ($supervisors as $supervisor) {
            if ($supervisor->email) {
                try {
                    Mail::to($supervisor->email)
                        ->send(new \App\Mail\NotifikasiKonfirmasiSupervisorMail($undangan));
                } catch (\Exception $e) {
                    \Log::error("Gagal mengirim email konfirmasi ke supervisor {$supervisor->email}: " . $e->getMessage());
                }
            }
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

    // Ambil semua pegawai
    $pegawaiOptions = User::all(['id', 'name'])->map(function ($user) {
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

        $selectedTimIds = $request->input('tim_ids', []);

        // Masukkan ulang user_id yang baru
        foreach ($request->user_ids as $userId) {
            // Cari tim_id user yang ada dalam daftar selectedTimIds
            $timId = AnggotaTim::where('user_id', $userId)
                ->whereIn('tim_id', $selectedTimIds)
                ->value('tim_id');

            // Jika tidak ditemukan, fallback ke tim mana saja yang diikuti user tersebut
            if (!$timId) {
                $timId = AnggotaTim::where('user_id', $userId)->value('tim_id');
            }

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
            'file_undangan' => 'required|file|mimes:pdf|max:2048',
        ]);

        try {
            $undangan = UndanganKegiatan::with(['kegiatan', 'penerimaUndangan.user', 'supervisor'])
                ->findOrFail($id);

            if ($request->hasFile('file_undangan')) {
                // Hapus file lama jika ada
                if ($undangan->file_undangan && Storage::disk('public')->exists($undangan->file_undangan)) {
                    Storage::disk('public')->delete($undangan->file_undangan);
                }

                $path = $request->file('file_undangan')->store('surat_undangan', 'public');
                $undangan->update(['file_undangan' => $path]);
            }

            // Ambil semua email penerima undangan dari database
            $emails = $undangan->penerimaUndangan
                ->filter(fn($p) => $p->user && $p->user->email)
                ->pluck('user.email')
                ->unique()
                ->values()
                ->toArray();

            if ($undangan->supervisor && $undangan->supervisor->email) {
                if (!in_array($undangan->supervisor->email, $emails)) {
                    $emails[] = $undangan->supervisor->email;
                }
            }

            if (empty($emails)) {
                return back()->with('error', 'Tidak ada penerima undangan yang memiliki email.');
            }

            \Log::info(" Mulai kirim undangan: {$undangan->judul}", [
                'total_penerima' => count($emails),
            ]);

            // Kirim email ke semua penerima menggunakan queue
            // Setiap email dikirim secara terpisah agar jika satu gagal tidak mempengaruhi yang lain di antrean
            foreach ($emails as $email) {
                Mail::to($email)->send(new UndanganKegiatanMail($undangan));
            }

            $message = "Undangan sedang diproses untuk dikirim ke " . count($emails) . " pegawai melalui antrean.";

            return back()->with('success', $message);
        } catch (\Exception $e) {
            \Log::error("🔥 ERROR SAAT KIRIM: " . $e->getMessage());
            return back()->with('error', 'Gagal mengirim undangan. Silakan cek log.');
        }
    }
}
