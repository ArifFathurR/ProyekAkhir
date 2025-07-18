import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import FlashPopup from '@/Components/FlashPopup';

export default function CreateDokumentasi({ kegiatanOptions = [], undanganOptions = [] }) {
  const { errors, flash } = usePage().props;

  const [formData, setFormData] = useState({
    kegiatan_id: '',
    undangan_id: '',
    notulensi: '',
    link_zoom: '',
    link_materi: '',
    foto: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'foto') {
      const selectedFiles = Array.from(files);
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        foto: selectedFiles,
      }));

      setPreviewImages(previews);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append('kegiatan_id', formData.kegiatan_id);
    form.append('undangan_id', formData.undangan_id);
    form.append('notulensi', formData.notulensi);
    form.append('link_zoom', formData.link_zoom);
    form.append('link_materi', formData.link_materi);

    if (formData.foto && formData.foto.length > 0) {
      formData.foto.forEach((file) => {
        form.append('foto[]', file);
      });
    }

    router.post('/dokumentasi_kegiatan', form, {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <div className="flex justify-start">
      <SidebarPegawai />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <FlashPopup flash={flash} />
          <div className="max-full mx-auto p-6 bg-white shadow rounded">
          <h1 className="text-2xl font-bold mb-4 text-center">Tambah Dokumentasi Kegiatan</h1>
          <form onSubmit={handleSubmit}  encType="multipart/form-data" className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Kegiatan</label>
              <select
                name="kegiatan_id"
                value={formData.kegiatan_id}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Pilih Kegiatan</option>
                {kegiatanOptions.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama_kegiatan}
                  </option>
                ))}
              </select>
              {errors.kegiatan_id && <div className="text-red-500">{errors.kegiatan_id}</div>}
            </div>

            <div>
              <label className="block text-sm mb-1">Undangan</label>
              <select
                name="undangan_id"
                value={formData.undangan_id}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Pilih Undangan</option>
                {undanganOptions.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.judul}
                  </option>
                ))}
              </select>
              {errors.undangan_id && <div className="text-red-500">{errors.undangan_id}</div>}
            </div>

            <div>
              <label className="block text-sm mb-1">Notulensi</label>
              <textarea
                name="notulensi"
                value={formData.notulensi}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.notulensi && <div className="text-red-500">{errors.notulensi}</div>}
            </div>

            <div>
              <label className="block text-sm mb-1">Link Zoom</label>
              <input
                type="url"
                name="link_zoom"
                value={formData.link_zoom}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.link_zoom && <div className="text-red-500">{errors.link_zoom}</div>}
            </div>

            <div>
              <label className="block text-sm mb-1">Link Materi</label>
              <input
                type="url"
                name="link_materi"
                value={formData.link_materi}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.link_materi && <div className="text-red-500">{errors.link_materi}</div>}
            </div>

            <div>
              <label className="block text-sm mb-1">Upload Foto</label>
              <input
                type="file"
                name="foto"
                multiple
                accept="image/*"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.foto && <div className="text-red-500">{errors.foto}</div>}

              {previewImages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-3">
                  {previewImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-32 h-32 object-cover border rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>
          </div>
        </main>
      </div>
    </div>
  );
}
