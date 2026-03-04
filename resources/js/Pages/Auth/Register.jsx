import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        no_hp: '',
        role: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] py-8 px-4 font-sans">
            <Head title="Register" />

            <div className="w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 relative flex flex-col items-center">

                {/* Logo */}
                <div className="w-24 h-24 bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] flex items-center justify-center mb-6 z-10 -mt-2">
                    <img src="/storage/logo_bps.png" alt="Logo BPS" className="h-14 w-auto object-contain" />
                </div>

                <div className="text-center mb-8 w-full">
                    <h2 className="text-[26px] font-bold text-slate-800 mb-2">Buat Akun</h2>
                    <p className="text-[15px] text-slate-500">Daftar untuk membuat akun baru</p>
                </div>

                <form onSubmit={submit} className="w-full space-y-4">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 ml-1">
                            Nama Lengkap
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm text-slate-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
                                placeholder="Nama Lengkap"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 ml-1">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm text-slate-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
                                placeholder="nama@email.com"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Role Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="role" className="block text-sm font-semibold text-slate-700 ml-1">
                            Role (Peran)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <select
                                id="role"
                                name="role"
                                value={data.role}
                                className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors appearance-none"
                                onChange={(e) => setData('role', e.target.value)}
                                required
                            >
                                <option value="" disabled className="text-gray-400">Pilih Role Akses</option>
                                <option value="admin">Admin</option>
                                <option value="pegawai">Pegawai</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="pemantau">Pemantau</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <InputError message={errors.role} className="mt-1" />
                    </div>

                    {/* Phone Number Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="no_hp" className="block text-sm font-semibold text-slate-700 ml-1">
                            Nomor HP
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                                    <path d="M12 18h.01" />
                                </svg>
                            </div>
                            <input
                                id="no_hp"
                                type="text"
                                name="no_hp"
                                value={data.no_hp}
                                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent rounded-xl text-slate-800 placeholder-gray-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
                                placeholder="08XXXXXXXXXX"
                                autoComplete="no_hp"
                                onChange={(e) => setData('no_hp', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.no_hp} className="mt-1" />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-[16px] text-slate-800 placeholder-[600] tracking-[0.3em] font-mono focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
                                placeholder="........"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1.5">
                        <label htmlFor="password_confirmation" className="block text-sm font-semibold text-slate-700 ml-1">
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-[16px] text-slate-800 placeholder-[600] tracking-[0.3em] font-mono focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
                                placeholder="........"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-slate-800 text-white font-bold text-sm tracking-widest py-3 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-75"
                        >
                            DAFTAR AKUN
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <span className="text-[14px] text-slate-500">
                            Sudah memiliki akun?{' '}
                        </span>
                        <Link
                            href={route('login')}
                            className="text-[14px] font-bold text-slate-800 hover:text-indigo-600 transition-colors"
                        >
                            Masuk
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
