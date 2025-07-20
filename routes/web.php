<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TimController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\SupervisorController;
use App\Http\Controllers\UndanganKegiatanController;
use App\Http\Controllers\AnggotaTimController;
use App\Http\Controllers\DokumentasiKegiatanController;
use App\Http\Controllers\DokumentasiKegiatanSupervisorController;
use App\Http\Controllers\PenerimaUndanganController;
use App\Http\Controllers\PemantauController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PegawaiController;
use App\Http\Middleware\RoleMiddleware;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['web', 'auth'])->group(function () {
    // Untuk admin
    Route::middleware([RoleMiddleware::class . ':admin'])->group(function () {
        Route::get('/dashboard-admin', [AdminController::class, 'index'])->name('admin.index');
        Route::resource('tim', TimController::class);
        Route::resource('anggota_tim', AnggotaTimController::class);
        Route::resource('kegiatan', KegiatanController::class);
        Route::resource('pegawai', AdminController::class)
        
    ->names('admin.pegawai')
    ->parameters(['pegawai' => 'user']);
    
      
    });
       

    // Untuk pegawai
    Route::middleware([RoleMiddleware::class . ':pegawai'])->group(function () {
        Route::get('/dashboard-pegawai', [PegawaiController::class, 'index'])->name('pegawai.index');
        Route::resource('undangan_kegiatan', UndanganKegiatanController::class);
        Route::resource('dokumentasi_kegiatan',DokumentasiKegiatanController ::class);
        Route::get('/kegiatan-saya', [PegawaiController::class, 'show'])->name('pegawai.show');
        Route::get('/kegiatan-SedangBerlangsung', [PegawaiController::class, 'sedang'])->name('pegawai.sedang');
        Route::get('/kegiatan-Selesai', [PegawaiController::class, 'selesai'])->name('pegawai.selesai');
        Route::get('/undangan/{id}/cetak', [UndanganKegiatanController::class, 'cetak'])->name('pegawai.undangan.cetak');
        Route::post('/pegawai/undangan/{id}/kirim', [UndanganKegiatanController::class, 'kirim'])->name('pegawai.undangan.kirim');
        Route::post('/pegawai/konfirmasi/{id}/toggle', [PegawaiController::class, 'toggleKonfirmasi'])->name('pegawai.konfirmasi.toggle');
        Route::post('/presensi/store', [PegawaiController::class, 'storePresensi']);
        Route::post('/ttd/store', [PegawaiController::class, 'storeTtd'])->name('ttd.store');
         Route::get('/kalender', [PegawaiController::class, 'kalender'])->name('pegawai.kalender');
        Route::delete('/foto_dokumentasi/{id}', [DokumentasiKegiatanController::class, 'deleteFoto'])->name('foto_dokumentasi.destroy');
        Route::get('/get-dokumentasi/{penerima_id}', [PegawaiController::class, 'getByPenerimaId']);
});

Route::middleware([RoleMiddleware::class . ':supervisor'])->group(function () {
        Route::resource('supervisor', SupervisorController::class);
        Route::get('/supervisor/undangan/{id}/preview', [SupervisorController::class, 'preview'])->name('supervisor.undangan.preview');
        Route::post('/supervisor/undangan/{id}/konfirmasi', [SupervisorController::class, 'konfirmasi'])->name('supervisor.undangan.konfirmasi');
        Route::get('/semua-dokumentasi', [SupervisorController::class, 'semuaDokumentasi'])->name('supervisor.semuaDokumentasi');
        Route::get('/kegiatan-saya-supervisor', [SupervisorController::class, 'show'])->name('supervisor.show');
        Route::get('/kegiatan-SedangBerlangsung-supervisor', [SupervisorController::class, 'sedang'])->name('supervisor.sedang');
        Route::get('/kegiatan-Selesai-supervisor', [SupervisorController::class, 'selesai'])->name('supervisor.selesai');
        Route::resource('dokumentasisupervisor', DokumentasiKegiatanSupervisorController::class);
        Route::resource('penerima', PenerimaUndanganController::class);
        Route::get('/anggota-tim', [SupervisorController::class, 'AnggotaTim'])->name('supervisor.anggota_tim');
        Route::get('/kalender-supervisor', [SupervisorController::class, 'kalender'])->name('supervisor.kalender');
    });
});

Route::middleware([RoleMiddleware::class . ':pemantau'])->group(function () {
    route::resource('pemantau', PemantauController::class);
    route::get('/data-pegawai',[PemantauController::class, 'DataPegawai'])->name('pemantau.datapegawai');
    route::get('/tim-data', [PemantauController::class, 'DataTim'])->name('pemantau.datatim');
    route::get('/anggota-tim-data',[PemantauController::class, 'DataAnggotaTim'])->name('pemantau.anggotatim');
    route::get('/presensi-kegiatan',[PemantauController::class, 'DataPresensi'])->name('pemantau.datapresensi');
    route::get('/dokumentasi-kegiatan', [PemantauController::class, 'DataDokumentasi'])->name('pemantau.datadokumentasi');
});

Route::get('/pegawai/undangan/{id}', [PegawaiController::class, 'preview'])
    ->name('undangan_kegiatan.preview');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/Admin', [AdminController::class, 'test']);
Route::get('/dashboard-pegawai', [PegawaiController::class, 'index'])->name('pegawai.index');
// Route::get('/dashboard-admin', [AdminController::class, 'index'])->name('admin.index');
Route::get('/test-email', function () {
    Mail::raw('Tes kirim email Laravel via Gmail SMTP.', function ($msg) {
        $msg->to('ariffathurrahman43@gmail.com')->subject('Tes Kirim Gmail SMTP');
    });

    return 'Email test dikirim. Cek inbox/spam.';
});

require __DIR__.'/auth.php';
