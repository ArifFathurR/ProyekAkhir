import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateDokumentasi({ show, onClose, undanganOptions = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
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
      setData('foto', selectedFiles);
      setPreviewImages(previews);
    } else {
      setData(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Simpan Dokumentasi?',
      text: 'Apakah Anda yakin ingin menambahkan dokumentasi kegiatan ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Simpan',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        post('/dokumentasisupervisor', {
          forceFormData: true,
          preserveScroll: true,
          onSuccess: () => {
            onClose();
            reset();
            setPreviewImages([]);
          }
        });
      }
    });
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="2xl">
      <div className="p-6">
        <h2 className="text-xl font-bold text-sky-700 mb-1">Tambah Dokumentasi Kegiatan</h2>
        <p className="text-gray-500 text-xs mb-5">Lengkapi formulir di bawah ini untuk menambahkan dokumentasi baru.</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div className="space-y-1">
            <Label className="text-sm">Undangan <span className="text-red-500">*</span></Label>
            <Select
              value={data.undangan_id ? String(data.undangan_id) : ""}
              onValueChange={(val) => setData('undangan_id', val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Undangan" />
              </SelectTrigger>
              <SelectContent>
                {undanganOptions.map((u) => (
                  <SelectItem key={u.id} value={String(u.id)}>
                    {u.judul}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.undangan_id && <div className="text-red-500 text-xs mt-0.5">{errors.undangan_id}</div>}
          </div>

          <div className="space-y-1">
            <Label className="text-sm">Notulensi <span className="text-red-500">*</span></Label>
            <div className="bg-white rounded border border-gray-200">
              <ReactQuill
                theme="snow"
                value={data.notulensi}
                onChange={(content) => setData('notulensi', content)}
                placeholder="Tulis notulensi kegiatan di sini..."
                className="h-32 mb-12"
              />
            </div>
            {errors.notulensi && <div className="text-red-500 text-xs mt-12">{errors.notulensi}</div>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-sm">Link Zoom</Label>
              <Input
                type="url"
                name="link_zoom"
                placeholder="https://zoom.us/..."
                value={data.link_zoom}
                onChange={handleChange}
              />
              {errors.link_zoom && <div className="text-red-500 text-xs mt-0.5">{errors.link_zoom}</div>}
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Link Materi</Label>
              <Input
                type="url"
                name="link_materi"
                placeholder="https://drive.google.com/..."
                value={data.link_materi}
                onChange={handleChange}
              />
              {errors.link_materi && <div className="text-red-500 text-xs mt-0.5">{errors.link_materi}</div>}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm">Upload Foto</Label>
            <Input
              type="file"
              name="foto"
              multiple
              accept="image/*"
              onChange={handleChange}
            />
            {errors.foto && <div className="text-red-500 text-xs mt-0.5">{errors.foto}</div>}

            {previewImages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover border rounded shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={processing} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              {processing ? 'Menyimpan...' : 'Simpan Dokumentasi'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
