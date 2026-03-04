import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function SelectRole({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (data.role) {
            post(route('role.select.store'));
        }
    };

    // Dictionary for pretty names
    const roleLabels = {
        'admin': 'Admin',
        'pegawai': 'Pegawai',
        'supervisor': 'Supervisor',
        'pemantau': 'Pemantau',
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4 font-sans">
            <Head title="Pilih Role" />

            <div className="w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 relative flex flex-col items-center">

                {/* Logo */}
                <div className="w-24 h-24 bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] flex items-center justify-center mb-6 z-10 -mt-2">
                    <img src="/storage/logo_bps.png" alt="Logo BPS" className="h-14 w-auto object-contain" />
                </div>

                <div className="text-center mb-6 w-full">
                    <h2 className="text-[24px] font-bold text-slate-800 mb-2">Pilih Akses Anda</h2>
                    <p className="text-[14px] text-slate-500">Akun Anda memiliki lebih dari satu hak akses</p>
                </div>

                <form onSubmit={submit} className="w-full space-y-4">

                    <div className="space-y-3">
                        {roles.map((r) => (
                            <label
                                key={r}
                                className={`relative flex items-center justify-between p-4 cursor-pointer rounded-xl border-2 transition-all ${data.role === r
                                        ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                                        : 'border-slate-100 hover:border-slate-200 bg-white hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="role"
                                        value={r}
                                        checked={data.role === r}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                                    />
                                    <span className="ml-3 font-semibold text-slate-800">
                                        Masuk sebagai {roleLabels[r] || r}
                                    </span>
                                </div>
                                {data.role === r && (
                                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </label>
                        ))}
                    </div>

                    <InputError message={errors.role} className="mt-2 text-center" />

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={processing || !data.role}
                            className="w-full bg-blue-600 text-white font-bold text-[13px] tracking-widest py-3.5 rounded-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            LANJUTKAN
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
