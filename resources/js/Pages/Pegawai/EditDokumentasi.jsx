import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import FlashPopup from '@/Components/FlashPopup';
import Header from '@/Components/Header';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditDokumentasi({ dokumentasi, undanganOptions }) {
    const { errors } = usePage().props;

    const [data, setData] = useState({
        undangan_id: dokumentasi.undangan_id || '',
        notulensi: dokumentasi.notulensi || '',
        link_zoom: dokumentasi.link_zoom || '',
        link_materi: dokumentasi.link_materi || '',
        foto: null,
    });

    const handleSelectChange = (value) => {
        setData((prev) => ({ ...prev, undangan_id: value }));
    };

    const handleQuillChange = (content) => {
        setData((prev) => ({ ...prev, notulensi: content }));
    };

    const quillModules = {
        toolbar: [
            ['italic', { 'color': [] }, { 'background': [] }],
            [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
            [{ 'list': 'bullet' }, { 'list': 'ordered' }],
            ['clean']
        ],
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
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
            <SidebarPegawai />
            <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
                <Header />
                <main className="pt-28 px-6">
                    <FlashPopup />
                    <div className="max-w-full mx-auto p-6 bg-white shadow rounded">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Dokumentasi Kegiatan</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">

                            {/* Pilih Undangan */}
                            <div className="space-y-2">
                                <Label>Pilih Undangan</Label>
                                <Select
                                    value={String(data.undangan_id)}
                                    onValueChange={handleSelectChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="-- Pilih Undangan --" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {undanganOptions.map((item) => (
                                            <SelectItem key={item.id} value={String(item.id)}>
                                                {item.judul}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.undangan_id && <p className="text-sm text-red-600">{errors.undangan_id}</p>}
                            </div>

                            {/* Notulensi */}
                            <div className="space-y-2">
                                <Label>Notulensi</Label>
                                <div className="bg-white rounded">
                                    <ReactQuill
                                        theme="snow"
                                        value={data.notulensi}
                                        onChange={handleQuillChange}
                                        modules={quillModules}
                                        placeholder="Tulis notulensi kegiatan di sini..."
                                        className="h-40 mb-12"
                                    />
                                </div>
                                {errors.notulensi && <p className="text-sm text-red-600 mt-12">{errors.notulensi}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Link Zoom */}
                                <div className="space-y-2">
                                    <Label>Link Zoom</Label>
                                    <Input
                                        type="url"
                                        value={data.link_zoom}
                                        onChange={(e) => setData({ ...data, link_zoom: e.target.value })}
                                    />
                                </div>

                                {/* Link Materi */}
                                <div className="space-y-2">
                                    <Label>Link Materi</Label>
                                    <Input
                                        type="url"
                                        value={data.link_materi}
                                        onChange={(e) => setData({ ...data, link_materi: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Upload Foto Baru */}
                            <div className="space-y-2">
                                <Label>Upload Foto Baru</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setData({ ...data, foto: e.target.files })}
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
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-[#0B2E74] text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800 transition duration-150"
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
