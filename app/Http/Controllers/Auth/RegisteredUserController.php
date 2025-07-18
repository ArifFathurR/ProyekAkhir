<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role'=>'required|string|max:255',
            'no_hp' => 'required|string|max:255',

        ]);

        $user = User::create([  
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'no_hp' => $request->no_hp,
            
        ]);

        event(new Registered($user));

        Auth::login($user);

        $user = Auth::user();
        if ($user->role == 'admin') {
            return redirect()->route('admin.index');
        } elseif ($user->role == 'pegawai') {
            return redirect()->route('pegawai.index');
        }elseif ($user->role == 'supervisor') {
            return redirect()->route('supervisor.index');
        }

        // Default redirect jika role tidak sesuai
        return redirect()->intended(route('dashboard'));
    }
}
