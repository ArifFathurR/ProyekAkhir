import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { router } from '@inertiajs/react';
import FlashPopup from '@/Components/FlashPopup';
import { useState } from 'react';
import ModalKirimUndangan from '@/Components/ModalKirimUndangan';



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

    const handleKirim = (id) => {
        if (confirm('Yakin ingin mengirim undangan ini?')) {
            router.post(route('pegawai.undangan.kirim', id));
        }
    };

    const handleEdit = (id) => {
        router.get(route('undangan_kegiatan.edit', id));
    };

    return (
        <div className="flex justify-start">
              <SidebarPegawai />
              <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
                <Header />
                <FlashPopup/>
                <main className="pt-28 px-6">
                  <div className="bg-white shadow rounded p-8 mx-auto">
                        <h2 className="text-xl font-semibold text-center mb-4">Data Undangan Kegiatan</h2>

                        {/* Form Search & Filter */}
                        <form onSubmit={handleSearch} className="flex justify-between mb-4 items-center">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan judul..."
                                    className="border px-3 py-2 rounded w-64 mr-2"
                                />
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="border px-3 py-2 rounded mr-1 w-40"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="Menunggu">Menunggu</option>
                                    <option value="Diterima">Diterima</option>
                                    <option value="Ditolak">Ditolak</option>
                                </select>
                                <button
                                    type="submit"
                                    className="bg-sky-500 text-white px-4 py-2 rounded"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>

                        {/* Tabel */}
                        <div className="overflow-x-auto">
                            <table className="w-full border text-sm">
                                <thead className="bg-[#0B2E74] text-white">
                                    <tr className="text-center">
                                        <th className="p-2 border">No</th>
                                        <th className="p-2 border">Tanggal Pengajuan</th>
                                        <th className="p-2 border">Judul</th>
                                        <th className="p-2 border">Status</th>
                                        <th className="p-2 border">Komentar</th>
                                        <th className="p-2 border">Supervisor</th>
                                        <th className="p-2 border">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {undangans?.data?.length > 0 ? (
                                        undangans.data.map((undangan, idx) => (
                                            <tr key={undangan.id} className="text-center border-t">
                                                <td className="p-2">{idx + 1 + (undangans.current_page - 1) * undangans.per_page}</td>
                                                <td className="p-2">{new Date(undangan.created_at).toLocaleDateString()}</td>
                                                <td className="p-2">{undangan.judul}</td>
                                                <td className="p-2">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-semibold ${undangan.status === 'Diterima'
                                                            ? 'bg-green-100 text-green-700'
                                                            : undangan.status === 'Menunggu'
                                                                ? 'bg-yellow-100 text-yellow-700'
                                                                : 'bg-red-100 text-red-700'
                                                            }`}
                                                    >
                                                        {undangan.status}
                                                    </span>
                                                </td>
                                                <td className="p-2">{undangan.komentar || '-'}</td>
                                                <td className="p-2">
                                                    {undangan.supervisor?.name || '-'}
                                                </td>
                                                <td className="p-2 space-x-2">
                                                    <button
                                                        onClick={() => window.open(route('pegawai.undangan.cetak', undangan.id), '_blank')}
                                                        className="bg-purple-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Detail
                                                    </button>

                                                    {undangan.status === 'Diterima' && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedUndanganId(undangan.id);
                                                                setShowKirimModal(true);
                                                            }}
                                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                                        >
                                                            Kirim
                                                        </button>
                                                    )}
                                                    {undangan.status === 'Ditolak' && (
                                                        <button
                                                            onClick={() => handleEdit(undangan.id)}
                                                            className="bg-orange-500 text-white px-3 py-1 rounded"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center p-4 text-gray-500">
                                                Tidak ada data undangan ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
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

                        {/* Pagination */}
                        <div className="mt-4 flex justify-center">
                            <nav>
                                <ul className="flex space-x-2">
                                    {undangans.links.map((link, index) => (
                                        <li key={index}>
                                            <a
                                                href={link.url}
                                                className={`px-3 py-1 border rounded ${link.active ? 'bg-sky-500 text-white' : 'bg-white text-sky-500'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
