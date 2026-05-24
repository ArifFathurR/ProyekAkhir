<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
            ],
            'user_undangans' => function () use ($request) {
                if (!$request->user() || !in_array($request->user()->role, ['pegawai', 'supervisor'])) {
                    return [];
                }
                return \App\Models\PenerimaUndangan::with('undangan')
                    ->where('user_id', $request->user()->id)
                    ->get()
                    ->filter(fn($item) => $item->undangan !== null)
                    ->map(function ($item) {
                        $statusPelaksanaan = $item->undangan->status_pelaksanaan ?? 'Belum Dilaksanakan';
                        $tab = 'saya';
                        if ($statusPelaksanaan === 'Sedang Dilaksanakan') {
                            $tab = 'sedang';
                        } elseif ($statusPelaksanaan === 'Selesai') {
                            $tab = 'selesai';
                        }
                        return [
                            'id' => $item->id,
                            'tab' => $tab,
                        ];
                    })
                    ->values()
                    ->toArray();
            },
            'pending_approvals' => function () use ($request) {
                if (!$request->user() || !in_array($request->user()->role, ['supervisor', 'admin'])) {
                    return 0;
                }
                return \App\Models\UndanganKegiatan::where('status', 'Menunggu')->count();
            },
            'ongoing_activities' => function () use ($request) {
                if (!$request->user() || $request->user()->role !== 'pemantau') {
                    return 0;
                }
                return \App\Models\UndanganKegiatan::where('status_pelaksanaan', 'Sedang Dilaksanakan')->count();
            },
            'absensi_config' => [
                'office_latitude' => (float) config('absensi.office_latitude', 0.568721),
                'office_longitude' => (float) config('absensi.office_longitude', 101.4264105),
                'radius_meters' => (int) config('absensi.radius_meters', 75),
            ],
        ];
    }
}
