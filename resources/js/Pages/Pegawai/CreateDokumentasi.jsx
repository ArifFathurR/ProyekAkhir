import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import FlashPopup from '@/Components/FlashPopup';
// Edit Delete Belum
export default function CreateDokumentasi({ kegiatanOptions = [], undanganOptions = [] }) {
  const { errors } = usePage().props;

  const [formData, setFormData] = useState({
    kegiatan_id: '',
    undangan_id: '',
    notulensi: '',
    foto: [],
    link_zoom: '',
    link_materi: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'foto') {
      setFormData((prev) => ({
        ...prev,
        foto: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('kegiatan_id', formData.kegiatan_id);
    data.append('undangan_id', formData.undangan_id);
    data.append('notulensi', formData.notulensi);
    data.append('link_zoom', formData.link_zoom);
    data.append('link_materi', formData.link_materi);

    formData.foto.forEach((file, index) => {
      data.append(`foto[${index}]`, file);
    });

    router.post('/dokumentasi_kegiatan', data, {
      forceFormData: true,
      onSuccess: () => {
        setFormData({
          kegiatan_id: '',
          undangan_id: '',
          notulensi: '',
          foto: [],
          link_zoom: '',
          link_materi: '',
        });
      },
      onFinish: () => setIsSubmitting(false),
    });
  };

  return (
    <div className="flex justify-start">
      <SidebarPegawai />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <FlashPopup />
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Tambah Dokumentasi Kegiatan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm mb-1">Kegiatan Utama</label>
                <select
                  name="kegiatan_id"
                  value={formData.kegiatan_id}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  {kegiatanOptions.length === 0 ? (
                    <option value="">Anda tidak memiliki kegiatan</option>
                  ) : (
                    <>
                      <option value="">Pilih Kegiatan</option>
                      {kegiatanOptions.map((k) => (
                        <option key={k.id} value={k.id}>{k.nama_kegiatan}</option>
                      ))}
                    </>
                  )}
                </select>
                {errors.kegiatan_id && <div className="text-red-500">{errors.kegiatan_id}</div>}
              </div>

              <div>
                <label className="block text-sm mb-1">Judul Undangan</label>
                <select
                  name="undangan_id"
                  value={formData.undangan_id}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  {undanganOptions.length === 0 ? (
                    <option value="">Anda tidak memiliki undangan</option>
                  ) : (
                    <>
                      <option value="">Pilih Undangan</option>
                      {undanganOptions.map((u) => (
                        <option key={u.id} value={u.id}>{u.judul}</option>
                      ))}
                    </>
                  )}
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

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded text-white flex items-center justify-center
                  ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  'Tambah'
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
