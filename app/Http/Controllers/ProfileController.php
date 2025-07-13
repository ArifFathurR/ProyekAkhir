<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => false, // Jika kamu tidak menggunakan fitur verifikasi email
            'status' => session('status'),
            'pegawai' => $request->user(), // Kirim data pegawai ke frontend
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $pegawai = $request->user();
        $pegawai->fill($request->validated());

        if ($pegawai->isDirty('email')) {
            $pegawai->email_verified_at = null;
        }

        $pegawai->save();

        return Redirect::route('profile.edit')->with('status', 'Profile updated.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password:web'], // Sesuaikan guard jika perlu
        ]);

        $pegawai = $request->user();

        Auth::guard('web')->logout();

        $pegawai->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
