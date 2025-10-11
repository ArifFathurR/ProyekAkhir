import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { router } from '@inertiajs/react';
import FlashPopup from '@/Components/FlashPopup';
import { useState } from 'react';
import ModalKirimUndangan from '@/Components/ModalKirimUndangan';
import StatsCard from '@/Components/StatsCard';
import TableCard from '@/Components/TableCard';
import Pagination from '@/Components/Pagination';

export default function CekStatusUndangan({ undangans, filters, pegawaiList }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');
    const [showKirimModal, setShowKirimModal] = useState(false);
    const [selectedUndanganId, setSelectedUndanganId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('undangan_kegiatan.index'), { search, status }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilter = () => {
        setSearch('');
        setStatus('');
        router.get(route('undangan_kegiatan.index'));
    };

    const handleKirim = (id) => {
        if (confirm('Yakin ingin mengirim undangan ini?')) {
            router.post(route('pegawai.undangan.kirim', id));
        }
    };

    const handleEdit = (id) => {
        router.get(route('undangan_kegiatan.edit', id));
    };

    // Hitung statistik berdasarkan status
    const totalUndangan = undangans?.total || 0;
    const undanganDiterima = undangans?.data?.filter(u => u.status === 'Diterima').length || 0;
    const undanganMenunggu = undangans?.data?.filter(u => u.status === 'Menunggu').length || 0;
    const undanganDitolak = undangans?.data?.filter(u => u.status === 'Ditolak').length || 0;

    // Stats data
    const statsData = [
        {
            title: 'Total Undangan',
            value: totalUndangan,
            gradientFrom: 'blue-500',
            gradientTo: 'blue-600',
            iconBgColor: 'blue-400',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
            )
        },
        {
            title: 'Diterima',
            value: undanganDiterima,
            gradientFrom: 'green-500',
            gradientTo: 'green-600',
            iconBgColor: 'green-400',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
            )
        },
        {
            title: 'Menunggu',
            value: undanganMenunggu,
            gradientFrom: 'yellow-500',
            gradientTo: 'orange-600',
            iconBgColor: 'yellow-400',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
            )
        },
        {
            title: 'Ditolak',
            value: undanganDitolak,
            gradientFrom: 'red-500',
            gradientTo: 'red-600',
            iconBgColor: 'red-400',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
            )
        }
    ];

    // Filter form component
    const filterForm = (
        <div onSubmit={handleSearch}>
            <div className="flex flex-col lg:flex-row gap-3">
                {/* Search Input */}
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
                        placeholder="Cari berdasarkan judul undangan..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                    />
                </div>

                {/* Status Filter */}
                <div className="flex-shrink-0 w-full lg:w-48">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                    >
                        <option value="">Semua Status</option>
                        <option value="Menunggu">Menunggu</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
                    >
                        Filter
                    </button>
                    {(search || status) && (
                        <button
                            type="button"
                            onClick={handleClearFilter}
                            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
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
                        {/* Page Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Status Undangan Kegiatan</h1>
                            <p className="text-gray-600 mt-1">Monitor status persetujuan undangan kegiatan</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {statsData.map((stat, index) => (
                                <StatsCard key={index} {...stat} />
                            ))}
                        </div>

                        {/* Main Content Card */}
                        <TableCard
                            title="Data Undangan Kegiatan"
                            description="Daftar undangan dan status persetujuan"
                            filterForm={filterForm}
                            pagination={<Pagination data={undangans} />}
                        >
                            <table className="w-full">
                                <thead className="bg-[#0B2E74] text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tanggal Pengajuan</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Judul</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Komentar</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Supervisor</th>
                                        <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {undangans?.data?.length > 0 ? (
                                        undangans.data.map((undangan, idx) => (
                                            <tr key={undangan.id} className="hover:bg-gray-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                    {idx + 1 + (undangans.current_page - 1) * undangans.per_page}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(undangan.created_at).toLocaleDateString('id-ID', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{undangan.judul}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                        undangan.status === 'Diterima'
                                                            ? 'bg-green-100 text-green-800'
                                                            : undangan.status === 'Menunggu'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {undangan.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                                        {undangan.komentar || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {undangan.supervisor?.name || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button
                                                            onClick={() => window.open(route('pegawai.undangan.cetak', undangan.id), '_blank')}
                                                            className="inline-flex items-center px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-medium rounded-md transition-colors duration-200"
                                                        >
                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            Detail
                                                        </button>

                                                        {undangan.status === 'Diterima' && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedUndanganId(undangan.id);
                                                                    setShowKirimModal(true);
                                                                }}
                                                                className="inline-flex items-center px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-medium rounded-md transition-colors duration-200"
                                                            >
                                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                                </svg>
                                                                Kirim
                                                            </button>
                                                        )}
                                                        
                                                        {undangan.status === 'Ditolak' && (
                                                            <button
                                                                onClick={() => handleEdit(undangan.id)}
                                                                className="inline-flex items-center px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs font-medium rounded-md transition-colors duration-200"
                                                            >
                                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                Edit
                                                            </button>
                                                        )}
                                                    </div>
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
                                                    <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada undangan</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {search || status ? 'Tidak ditemukan undangan yang sesuai dengan filter.' : 'Belum ada undangan kegiatan yang diajukan.'}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </TableCard>
                    </div>
                </main>

                {/* Modal Kirim Undangan */}
                <ModalKirimUndangan
                    isOpen={showKirimModal}
                    onClose={() => setShowKirimModal(false)}
                    onSubmit={(formData) => {
                        router.post(route('pegawai.undangan.kirim', selectedUndanganId), formData, {
                            forceFormData: true,
                            onSuccess: () => setShowKirimModal(false),
                        });
                    }}
                    pegawaiList={pegawaiList}
                />
            </div>
        </div>
    );
}