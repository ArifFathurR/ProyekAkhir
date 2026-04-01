import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { router } from '@inertiajs/react';
import FlashPopup from '@/Components/FlashPopup';
import { useState } from 'react';
import StatsCard from '@/Components/StatsCard';
import TableCard from '@/Components/TableCard';

export default function RiwayatPresensi({ presensi }) {
    const [search, setSearch] = useState('');

    // Filter array based on search text for client-side search since we passed all data
    const filteredPresensi = presensi?.filter(item => 
        item.nama_kegiatan.toLowerCase().includes(search.toLowerCase()) ||
        item.sub_kegiatan.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const hadirCount = presensi?.filter(item => item.status_kehadiran?.toLowerCase() === 'hadir').length || 0;
    const terlambatCount = presensi?.filter(item => item.status_kehadiran?.toLowerCase() === 'terlambat').length || 0;
    const tidakHadirCount = presensi?.filter(item => {
        const status = item.status_kehadiran?.toLowerCase();
        return status === 'tidak hadir' || status === 'alpa' || status === 'izin' || status === null || status === undefined || status === '';
    }).length || 0;

    const statsData = [
        {
            title: 'Total Presensi',
            value: presensi?.length || 0,
            gradientFrom: 'blue-500',
            gradientTo: 'blue-600',
            iconBgColor: 'blue-400',
            icon: (
                <svg className="w-6 h-6 outline-none" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: 'Hadir',
            value: hadirCount,
            gradientFrom: 'green-500',
            gradientTo: 'green-600',
            iconBgColor: 'green-400',
            icon: (
                <svg className="w-6 h-6 outline-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: 'Terlambat',
            value: terlambatCount,
            gradientFrom: 'yellow-500',
            gradientTo: 'yellow-600',
            iconBgColor: 'yellow-400',
            icon: (
                <svg className="w-6 h-6 outline-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: 'Tidak Hadir',
            value: tidakHadirCount,
            gradientFrom: 'red-500',
            gradientTo: 'red-600',
            iconBgColor: 'red-400',
            icon: (
                <svg className="w-6 h-6 outline-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    const filterForm = (
        <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari berdasarkan nama kegiatan atau undangan..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                />
            </div>
            {(search) && (
                <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                >
                    Clear
                </button>
            )}
        </div>
    );

    return (
        <div className="flex justify-start">
            <SidebarPegawai />
            <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
                <Header />
                <FlashPopup />

                <main className="pt-28 px-4">
                    <div className="w-full">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Riwayat Presensi</h1>
                            <p className="text-gray-600 mt-1">Daftar presensi kegiatan yang pernah Anda ikuti.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {statsData.map((stat, index) => (
                                <StatsCard key={index} {...stat} />
                            ))}
                        </div>

                        <TableCard
                            title="Data Riwayat Presensi"
                            description="Riwayat kehadiran pada undangan kegiatan"
                            filterForm={filterForm}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-max">
                                    <thead className="bg-[#0B2E74] text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Kegiatan</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Sub Kegiatan</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tanggal</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Waktu Presensi</th>
                                            <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">TTD</th>
                                            <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Lokasi</th>
                                            <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Status Kehadiran</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredPresensi.length > 0 ? (
                                            filteredPresensi.map((item, idx) => (
                                                <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{item.nama_kegiatan}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{item.sub_kegiatan}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{item.tanggal}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                            {item.waktu_presensi}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {item.ttd ? (
                                                            <div className="flex justify-center">
                                                                <img src={item.ttd} alt="TTD" className="h-10 w-auto object-contain bg-white border border-gray-200 rounded p-1" />
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-gray-500">-</span>
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        {item.latitude && item.longitude ? (
                                                            <a
                                                                href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md text-xs font-semibold transition-colors duration-200"
                                                            >
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                                Lihat Peta
                                                            </a>
                                                        ) : (
                                                            <span className="text-sm text-gray-500">Tidak ada lokasi</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${item.status_kehadiran === 'hadir'
                                                            ? 'bg-green-100 text-green-800'
                                                            : item.status_kehadiran === 'terlambat'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {item.status_kehadiran}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada presensi</h3>
                                                        <p className="text-sm text-gray-500">
                                                            {search ? 'Tidak ditemukan presensi yang sesuai.' : 'Belum ada riwayat presensi yang tersedia.'}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </TableCard>

                    </div>
                </main>
            </div>
        </div>
    );
}
