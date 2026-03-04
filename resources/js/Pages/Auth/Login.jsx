import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4 font-sans">
            <Head title="Log in" />

            <div className="w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 relative flex flex-col items-center">

                {/* Logo */}
                <div className="w-24 h-24 bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] flex items-center justify-center mb-6 z-10 -mt-2">
                    <img src="/storage/logo_bps.png" alt="Logo BPS" className="h-14 w-auto object-contain" />
                </div>

                <div className="text-center mb-8 w-full">
                    <h2 className="text-[26px] font-bold text-slate-800 mb-2">Selamat Datang</h2>
                    <p className="text-[15px] text-slate-500">Masuk untuk melanjutkan ke Dashboard</p>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 text-center w-full">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="w-full space-y-5">
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
                                autoFocus
                            />
                        </div>
                        <InputError message={errors.email} className="mt-1" />
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                        </div>
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center cursor-pointer group">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-gray-300 text-[#0f172a] focus:ring-[#0f172a] w-5 h-5 shadow-sm"
                            />
                            <span className="ml-2.5 text-[14px] text-slate-600 font-medium group-hover:text-slate-800 transition-colors">
                                Ingat Saya
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[14px] text-slate-400 hover:text-slate-600 font-medium transition-colors"
                            >
                                Lupa?
                            </Link>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-slate-800 text-white font-bold text-sm tracking-widest py-3 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-75"
                        >
                            MASUK KE AKUN
                        </button>
                    </div>

                    <div className="text-center mt-6">
                        <span className="text-[14px] text-slate-500">
                            Belum memiliki akun?{' '}
                        </span>
                        <Link
                            href={route('register')}
                            className="text-[14px] font-bold text-slate-800 hover:text-indigo-600 transition-colors"
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
