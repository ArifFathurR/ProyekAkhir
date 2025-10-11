import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import Header from '@/Components/Header';
import FlashPopup from '@/Components/FlashPopup';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import ModalKonfirmasiUndangan from '@/Components/ModalKonfirmasiUndangan';

export default function KonfirmasiUndangan({ undangans, historyUndangans }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [activeTab, setActiveTab] = useState("konfirmasi");
    const [isHistory, setIsHistory] = useState(false);

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending': {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                border: 'border-yellow-200',
                icon: '⏳'
            },
            'diterima': {
                bg: 'bg-green-100',
                text: 'text-green-800',
                border: 'border-green-200',
                icon: '✓'
            },
            'ditolak': {
                bg: 'bg-red-100',
                text: 'text-red-800',
                border: 'border-red-200',
                icon: '❌'
            }
        };

        const config = statusConfig[status?.toLowerCase()] || statusConfig['pending'];

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
                {config.icon} {status || 'Pending'}
            </span>
        );
    };

    const getRowBackground = (status, isHistoryTab) => {
        if (!isHistoryTab) return 'hover:bg-gray-50';

        const statusLower = status?.toLowerCase();
        if (statusLower === 'ditolak') {
            return 'bg-red-50/50 hover:bg-red-50';
        } else if (statusLower === 'diterima') {
            return 'bg-blue-50/30 hover:bg-blue-50/50';
        }
        return 'hover:bg-gray-50';
    };

    const renderTable = (data, isKonfirmasi = false) => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gradient-to-r from-[#0B2E74] to-[#1a4599] text-white">
                    <tr>
                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">No</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Nama Pengaju</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Kegiatan</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Judul</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Jadwal</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Undangan</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-16 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <p className="text-gray-500 font-medium">
                                        {isKonfirmasi ? 'Tidak ada undangan yang perlu dikonfirmasi' : 'Tidak ada riwayat undangan'}
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {isKonfirmasi ? 'Undangan baru akan muncul di sini' : 'Riwayat undangan akan tersimpan di sini'}
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        data.map((undangan, index) => (
                            <tr
                                key={undangan.id}
                                className={`transition-all duration-200 ${getRowBackground(undangan.status, !isKonfirmasi)}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900 font-medium">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">

                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{undangan.user?.name || '-'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 font-medium">{undangan.kegiatan?.nama_kegiatan || '-'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">{undangan.judul}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-sm text-gray-900">
                                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(undangan.tanggal).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() =>
                                            window.open(
                                                route('supervisor.undangan.preview', undangan.id),
                                                '_blank'
                                            )
                                        }
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M14.59 2.59A2 2 0 0013.17 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8.83a2 2 0 00-.59-1.41l-5.82-5.83zM13 3.5L18.5 9H14a1 1 0 01-1-1V3.5zM9 12h1v5H9v-5zm5 0h-1v5h1v-2h1v-1h-1v-2zm-6 0h-1v5h1v-2h1v-1H8v-2z" />
                                        </svg>
                                        Lihat PDF
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {getStatusBadge(undangan.status)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => {
                                            setSelectedId(undangan.id);
                                            setIsHistory(!isKonfirmasi);
                                            setShowModal(true);
                                        }}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {isKonfirmasi ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            )}
                                        </svg>
                                        {isKonfirmasi ? "Konfirmasi" : "Ubah Status"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="flex justify-start">
            <SidebarSupervisor />
            <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
                <Header />
                <FlashPopup />
                <main className="pt-28 px-6">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Konfirmasi Undangan</h1>
                        <p className="text-gray-600 mt-1">Kelola konfirmasi undangan kegiatan</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Perlu Konfirmasi */}
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-100 text-sm font-medium">Perlu Konfirmasi</p>
                                    <p className="text-2xl font-bold mt-1">{undangans?.length || 0}</p>
                                </div>
                                <div className="bg-yellow-400 bg-opacity-50 rounded-full p-3">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-4.707l-3-3 1.414-1.414L9 11.586l4.293-4.293 1.414 1.414-5.707 5.707z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Diterima */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Diterima</p>
                                    <p className="text-2xl font-bold mt-1">
                                        {historyUndangans?.filter(u => u.status?.toLowerCase() === 'diterima').length || 0}
                                    </p>
                                </div>
                                <div className="bg-green-400 bg-opacity-50 rounded-full p-3">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L9 14.414 5.293 10.707a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Ditolak */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-100 text-sm font-medium">Ditolak</p>
                                    <p className="text-2xl font-bold mt-1">
                                        {historyUndangans?.filter(u => u.status?.toLowerCase() === 'ditolak').length || 0}
                                    </p>
                                </div>
                                <div className="bg-red-400 bg-opacity-50 rounded-full p-3">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Main Content Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        {/* Card Header with Tabs */}
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Undangan Kegiatan</h2>

                            {/* Tabs */}
                            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
                                <button
                                    onClick={() => setActiveTab("konfirmasi")}
                                    className={`flex items-center px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${activeTab === "konfirmasi"
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Konfirmasi
                                    {activeTab === "konfirmasi" && (
                                        <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {undangans?.length || 0}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab("history")}
                                    className={`flex items-center px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${activeTab === "history"
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Riwayat
                                    {activeTab === "history" && (
                                        <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {historyUndangans?.length || 0}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Table Content */}
                        {activeTab === "konfirmasi"
                            ? renderTable(undangans, true)
                            : renderTable(historyUndangans, false)}
                    </div>
                </main>
            </div>

            {/* Modal Konfirmasi / Ubah Status */}
            <ModalKonfirmasiUndangan
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={({ status, komentar }) => {
                    router.post(route('supervisor.undangan.konfirmasi', selectedId), {
                        status,
                        komentar,
                    });
                    setShowModal(false);
                }}
            />
        </div>
    );
}