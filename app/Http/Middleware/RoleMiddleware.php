<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();
        
        // Single role scenario fallback or active session check
        $activeRole = session('active_role');
        
        if (!$activeRole) {
             // If they only have one role, we can just use that
             if (count($user->roles) === 1) {
                 $activeRole = $user->roles[0];
                 session(['active_role' => $activeRole]);
             } else {
                 return redirect()->route('role.select');
             }
        }

        // Jika halaman membutuhkan role pegawai, izinkan juga role supervisor untuk mengaksesnya
        if ($role === 'pegawai' && $activeRole === 'supervisor') {
            // Izinkan akses (bypass ke next request)
        } elseif ($activeRole !== $role) {
            abort(403, "Akses ditolak. Anda sedang menggunakan peran: {$activeRole}, sedangkan halaman ini membutuhkan peran: {$role}.");
        }

        return $next($request);
    }
}
