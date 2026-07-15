import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import FlashPopup from '@/Components/FlashPopup';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

export default function CreateDokumentasi({ undanganOptions = [] }) {
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
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

  const handleUndanganSelectChange = (value) => {
    setData('undangan_id', value);
  };

  const handleQuillChange = (content) => {
    setData('notulensi', content);
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
    
    Swal.fire({
      title: 'Simpan Dokumentasi?',
      text: 'Apakah Anda yakin ingin menambahkan dokumentasi kegiatan baru ini?',
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
        });
      }
    });
  };

  return (
    <div className="flex justify-start min-h-screen w-full overflow-x-hidden">
      <SidebarSupervisor />
      <div className="flex-1 min-w-0 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-20 md:pt-28 px-4 md:px-6">
          <FlashPopup flash={flash} />
          <div className="max-w-full mx-auto p-4 sm:p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Tambah Dokumentasi Kegiatan</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              


              <div className="space-y-2">
                <Label>Undangan</Label>
                <Select
                  value={data.undangan_id}
                  onValueChange={handleUndanganSelectChange}
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
                {errors.undangan_id && <div className="text-red-500 text-sm">{errors.undangan_id}</div>}
              </div>

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
                {errors.notulensi && <div className="text-red-500 text-sm mt-12">{errors.notulensi}</div>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Link Zoom</Label>
                  <Input
                    type="url"
                    name="link_zoom"
                    value={data.link_zoom}
                    onChange={handleChange}
                  />
                  {errors.link_zoom && <div className="text-red-500 text-sm">{errors.link_zoom}</div>}
                </div>

                <div className="space-y-2">
                  <Label>Link Materi</Label>
                  <Input
                    type="url"
                    name="link_materi"
                    value={data.link_materi}
                    onChange={handleChange}
                  />
                  {errors.link_materi && <div className="text-red-500 text-sm">{errors.link_materi}</div>}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Foto</Label>
                <Input
                  type="file"
                  name="foto"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                />
                {errors.foto && <div className="text-red-500 text-sm">{errors.foto}</div>}

                {previewImages.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={src}
                          alt={`Preview ${index}`}
                          className="w-32 h-32 object-cover border rounded shadow-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#0B2E74] text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-800 transition duration-150 disabled:bg-gray-400"
                >
                  Simpan Dokumentasi
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
