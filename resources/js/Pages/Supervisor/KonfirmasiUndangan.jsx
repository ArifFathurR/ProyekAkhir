import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import Header from '@/Components/Header';
import FlashPopup from '@/Components/FlashPopup';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import ModalKonfirmasiUndangan from '@/Components/ModalKonfirmasiUndangan';

export default function KonfirmasiUndangan({ undangans }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="flex justify-start">
            <SidebarSupervisor />
              <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
                <Header />
                <FlashPopup />
                <main className="pt-28 px-6">
                    <div className="bg-white shadow rounded p-8 mx-auto">
                        <h2 className="text-xl font-semibold text-center mb-4">Data Undangan Kegiatan</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-[#0B2E74] text-white">
                                    <tr className="text-center">
                                        <th className="p-2 border">No</th>
                                        <th className="p-2 border">Nama Pengaju</th>
                                        <th className="p-2 border">Kegiatan</th>
                                        <th className="p-2 border">Judul</th>
                                        <th className="p-2 border">Jadwal</th>
                                        <th className="p-2 border">Undangan</th>
                                        <th className="p-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {undangans.map((undangan, index) => (
                                        <tr key={undangan.id} className="text-center border-t">
                                            <td className="p-2">{index + 1}</td>
                                            <td className="p-2">{undangan.user?.name || '-'}</td>
                                            <td className="p-2">{undangan.kegiatan?.nama_kegiatan || '-'}</td>
                                            <td className="p-2">{undangan.judul}</td>
                                            <td className="p-2">{new Date(undangan.tanggal).toLocaleDateString()}</td>
                                            <td className="p-2">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        onClick={() =>
                                                            window.open(
                                                                route('supervisor.undangan.preview', undangan.id),
                                                                '_blank'
                                                            )
                                                        }
                                                        className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 mr-2"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M14.59 2.59A2 2 0 0013.17 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8.83a2 2 0 00-.59-1.41l-5.82-5.83zM13 3.5L18.5 9H14a1 1 0 01-1-1V3.5zM9 12h1v5H9v-5zm5 0h-1v5h1v-2h1v-1h-1v-2zm-6 0h-1v5h1v-2h1v-1H8v-2z" />
                                                        </svg>
                                                        Lihat PDF
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-2 space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedId(undangan.id);
                                                        setShowModal(true);
                                                    }}
                                                    className="bg-blue-600 text-white px-2 py-1 rounded"
                                                >
                                                    Konfirmasi
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal Konfirmasi */}
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
