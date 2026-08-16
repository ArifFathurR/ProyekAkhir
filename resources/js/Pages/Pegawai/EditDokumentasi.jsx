import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditDokumentasi({ show, onClose, dokumentasi, undanganOptions = [] }) {
  const { errors } = usePage().props;

  const [data, setData] = useState({
    undangan_id: '',
    notulensi: '',
    link_zoom: '',
    link_materi: '',
    foto: null,
  });

  const [existingFotos, setExistingFotos] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (dokumentasi) {
      setData({
        undangan_id: dokumentasi.undangan_id ? String(dokumentasi.undangan_id) : '',
        notulensi: dokumentasi.notulensi || '',
        link_zoom: dokumentasi.link_zoom || '',
        link_materi: dokumentasi.link_materi || '',
        foto: null,
      });
      setExistingFotos(dokumentasi.foto_dokumentasi || []);
      setPreviewImages([]);
    }
  }, [dokumentasi]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setData(prev => ({ ...prev, foto: e.target.files }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dokumentasi?.id) return;

    Swal.fire({
      title: 'Update Dokumentasi?',
      text: 'Apakah Anda yakin ingin menyimpan perubahan dokumentasi ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Update',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setProcessing(true);
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
          onFinish: () => setProcessing(false),
          onSuccess: () => {
            onClose();
          }
        });
      }
    });
  };

  const handleDeleteFoto = (fotoId) => {
    Swal.fire({
      title: 'Hapus Foto?',
      text: 'Yakin ingin menghapus foto ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal'
    }).then((res) => {
      if (res.isConfirmed) {
        router.delete(`/foto_dokumentasi/${fotoId}`, {
          preserveScroll: true,
          onSuccess: () => {
            setExistingFotos(prev => prev.filter(f => f.id !== fotoId));
          }
        });
      }
    });
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="2xl">
      <div className="p-6">
        <h2 className="text-xl font-bold text-sky-700 mb-1">Edit Dokumentasi Kegiatan</h2>
        <p className="text-gray-500 text-xs mb-5">Perbarui informasi dokumentasi kegiatan di bawah ini.</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div className="space-y-1">
            <Label className="text-sm">Undangan <span className="text-red-500">*</span></Label>
            <Select
              value={String(data.undangan_id)}
              onValueChange={(val) => setData(prev => ({ ...prev, undangan_id: val }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Undangan" />
              </SelectTrigger>
              <SelectContent>
                {undanganOptions.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.judul}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.undangan_id && <p className="text-xs text-red-600 mt-0.5">{errors.undangan_id}</p>}
          </div>

          <div className="space-y-1">
            <Label className="text-sm">Notulensi <span className="text-red-500">*</span></Label>
            <div className="bg-white rounded border border-gray-200">
              <ReactQuill
                theme="snow"
                value={data.notulensi}
                onChange={(content) => setData(prev => ({ ...prev, notulensi: content }))}
                placeholder="Tulis notulensi kegiatan di sini..."
                className="h-32 mb-12"
              />
            </div>
            {errors?.notulensi && <p className="text-xs text-red-600 mt-12">{errors.notulensi}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-sm">Link Zoom</Label>
              <Input
                type="url"
                value={data.link_zoom}
                onChange={(e) => setData(prev => ({ ...prev, link_zoom: e.target.value }))}
                placeholder="https://zoom.us/..."
              />
              {errors?.link_zoom && <p className="text-xs text-red-600 mt-0.5">{errors.link_zoom}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Link Materi</Label>
              <Input
                type="url"
                value={data.link_materi}
                onChange={(e) => setData(prev => ({ ...prev, link_materi: e.target.value }))}
                placeholder="https://drive.google.com/..."
              />
              {errors?.link_materi && <p className="text-xs text-red-600 mt-0.5">{errors.link_materi}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm">Upload Foto Baru</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {errors?.foto && <p className="text-xs text-red-600 mt-0.5">{errors.foto}</p>}

            {previewImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview Baru ${index}`}
                    className="w-20 h-20 object-cover border-2 border-sky-400 rounded shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>

          {existingFotos.length > 0 && (
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700">Foto Sebelumnya</Label>
              <div className="flex flex-wrap gap-3 pt-1">
                {existingFotos.map((foto, index) => (
                  <div key={foto.id || index} className="relative group">
                    <img
                      src={`/storage/${foto.foto}`}
                      alt={`Foto ${index + 1}`}
                      className="w-20 h-20 object-cover border rounded shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteFoto(foto.id)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={processing} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              {processing ? 'Menyimpan...' : 'Update Dokumentasi'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
