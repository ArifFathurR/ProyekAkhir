<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleSelectionController extends Controller
{
    /**
     * Display the role selection view.
     */
    public function create(Request $request)
    {
        $user = $request->user();

        // If user already has an active role or only has one role, they shouldn't be here normally
        // But we just show them the choice anyway if they have multiple.
        if (count($user->roles) <= 1) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Auth/SelectRole', [
            'roles' => $user->roles
        ]);
    }

    /**
     * Store the active role in session and redirect to corresponding dashboard.
     */
    public function store(Request $request)
    {
        $request->validate([
            'role' => 'required|string',
        ]);

        $user = $request->user();

        // Verify the chosen role is actually one of the user's assigned roles
        if (!in_array($request->role, $user->roles)) {
            return back()->withErrors(['role' => 'Role tidak valid untuk akun Anda.']);
        }

        session(['active_role' => $request->role]);

        // Redirect based on selected active role
        if ($request->role == 'admin') {
            return redirect()->route('admin.index');
        } elseif ($request->role == 'pegawai') {
            return redirect()->route('dokumentasi_kegiatan.index');
        } elseif ($request->role == 'supervisor') {
            return redirect()->route('supervisor.index');
        } elseif ($request->role == 'pemantau') {
            return redirect()->route('pemantau.index');
        }

        return redirect()->intended(route('dashboard'));
    }
}
