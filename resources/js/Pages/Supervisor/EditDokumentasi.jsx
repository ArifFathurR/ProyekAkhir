import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import FlashPopup from '@/Components/FlashPopup';
import Header from '@/Components/Header';

export default function EditDokumentasi({ dokumentasi, kegiatanOptions, undanganOptions }) {
    const { errors } = usePage().props;

    const [data, setData] = useState({
        kegiatan_id: dokumentasi.kegiatan_id || '',
        undangan_id: dokumentasi.undangan_id || '',
        notulensi: dokumentasi.notulensi || '',
        link_zoom: dokumentasi.link_zoom || '',
        link_materi: dokumentasi.link_materi || '',
        foto: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('kegiatan_id', data.kegiatan_id);
        formData.append('undangan_id', data.undangan_id);
        formData.append('notulensi', data.notulensi);
        formData.append('link_zoom', data.link_zoom);
        formData.append('link_materi', data.link_materi);

        if (data.foto) {
            for (let i = 0; i < data.foto.length; i++) {
                formData.append('foto[]', data.foto[i]);
            }
        }

        router.post(`/dokumentasi_kegiatan/${dokumentasi.id}`, formData, {
            forceFormData: true,
            preserveScroll: true,
            method: 'post',
            headers: { 'X-HTTP-Method-Override': 'PUT' },
        });
    };
    const handleDeleteFoto = (fotoId) => {
        if (confirm('Yakin ingin menghapus foto ini?')) {
            router.delete(`/foto_dokumentasi/${fotoId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally: refresh or remove photo manually from local state
                },
            });
        }
    };

    return (
        <div className="flex justify-start">
            <SidebarSupervisor />
            <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
                <Header />
                <main className="pt-28 px-6">
                    <FlashPopup />
                    <div className="max-full mx-auto p-6 bg-white shadow rounded">
                        <h2 className="text-xl font-semibold mb-4">Edit Dokumentasi Kegiatan</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
                            {/* Pilih Kegiatan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pilih Kegiatan</label>
                                <select
                                    className="mt-1 block w-full rounded border border-gray-300 shadow-sm px-3 py-2"
                                    value={data.kegiatan_id}
                                    onChange={(e) => setData({ ...data, kegiatan_id: e.target.value })}
                                >
                                    <option value="">-- Pilih Kegiatan --</option>
                                    {kegiatanOptions.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nama_kegiatan}</option>
                                    ))}
                                </select>
                                {errors.kegiatan_id && <p className="text-sm text-red-600">{errors.kegiatan_id}</p>}
                            </div>

                            {/* Pilih Undangan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pilih Undangan</label>
                                <select
                                    className="mt-1 block w-full rounded border border-gray-300 shadow-sm px-3 py-2"
                                    value={data.undangan_id}
                                    onChange={(e) => setData({ ...data, undangan_id: e.target.value })}
                                >
                                    <option value="">-- Pilih Undangan --</option>
                                    {undanganOptions.map((item) => (
                                        <option key={item.id} value={item.id}>{item.judul}</option>
                                    ))}
                                </select>
                                {errors.undangan_id && <p className="text-sm text-red-600">{errors.undangan_id}</p>}
                            </div>

                            {/* Notulensi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Notulensi</label>
                                <textarea
                                    rows={4}
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
                                    value={data.notulensi}
                                    onChange={(e) => setData({ ...data, notulensi: e.target.value })}
                                />
                            </div>

                            {/* Link Zoom */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Link Zoom</label>
                                <input
                                    type="url"
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
                                    value={data.link_zoom}
                                    onChange={(e) => setData({ ...data, link_zoom: e.target.value })}
                                />
                            </div>

                            {/* Link Materi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Link Materi</label>
                                <input
                                    type="url"
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
                                    value={data.link_materi}
                                    onChange={(e) => setData({ ...data, link_materi: e.target.value })}
                                />
                            </div>

                            {/* Upload Foto Baru */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Upload Foto Baru</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setData({ ...data, foto: e.target.files })}
                                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm"
                                />
                                {errors.foto && <p className="text-sm text-red-600">{errors.foto}</p>}
                            </div>

                            {/* Preview Foto Lama */}
                            {dokumentasi.foto_dokumentasi?.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Foto Sebelumnya</label>
                                    <div className="flex flex-wrap gap-3">
                                        {dokumentasi.foto_dokumentasi.map((foto, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={`/storage/${foto.foto}`}
                                                    alt={`Foto ${index + 1}`}
                                                    className="w-32 h-32 object-cover border rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteFoto(foto.id)}
                                                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Submit */}
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
