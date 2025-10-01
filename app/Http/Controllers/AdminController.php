<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $search = request('search');  // Mendapatkan parameter search
    
    // Menggunakan query builder untuk mencari user berdasarkan nama
    $users = User::when($search, function ($query, $search) {
            return $query->where('name', 'like', '%' . $search . '%')
                        ->orWhere('email', 'like', '%' . $search . '%');
        })
        ->paginate(8)  // Menambahkan pagination
        ->withQueryString();  // Menjaga query string saat pagination
        // Add total counts from database
    $totalSupervisor = User::where('role', 'supervisor')->count();
    $totalPemantau = User::where('role', 'pemantau')->count();

        

    return Inertia::render('Admin/DataPegawai', [
        'users' => $users,
        'filters' => [
            'search' => $search,
        ],
        'totalSupervisor' => $totalSupervisor,
        'totalPemantau' => $totalPemantau,
        
    ]);
    }

    public function create()
    {
        $roles = ['admin', 'pegawai', 'supervisor'];
        return Inertia::render('Admin/CreatePegawai', [
            'roles' => $roles
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']); // Hash password sebelum menyimpannya

        $user = User::create($validated);

        return redirect()->route('admin.index')->with('success', 'Data berhasil ditambahkan.');
    }
    public function edit(User $user)
    {
        $roles = ['admin', 'pegawai', 'supervisor', 'pemantau'];
        return Inertia::render('Admin/EditPegawai', [
            'pegawai' => $user,
            'roles' => $roles
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();
        $user->update($validated);

        return redirect()->route('admin.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.index')->with('success', 'Data berhasil dihapus.');
    }
}
