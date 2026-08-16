import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';

export default function EditKegiatan({ show, onClose, kegiatan, tims = [] }) {
  const { data, setData, put, processing, errors } = useForm({
    nama_kegiatan: '',
    jenis_kegiatan: '',
    deskripsi: '',
    tanggal: '',
    tanggal_selesai: '',
    tim_id: '',
  });

  const jenisKegiatanOptions = [
    'Rapat',
    'Pelatihan',
    'Sosialisasi',
    'Survei / Sensus',
    'Workshop',
    'Lainnya',
  ];

  useEffect(() => {
    if (kegiatan) {
      setData({
        nama_kegiatan: kegiatan.nama_kegiatan || '',
        jenis_kegiatan: kegiatan.jenis_kegiatan || '',
        deskripsi: kegiatan.deskripsi || '',
        tanggal: kegiatan.tanggal || '',
        tanggal_selesai: kegiatan.tanggal_selesai || '',
        tim_id: kegiatan.tim_id ? kegiatan.tim_id.toString() : '',
      });
    }
  }, [kegiatan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kegiatan?.id) return;

    Swal.fire({
      title: 'Update Kegiatan?',
      text: 'Apakah Anda yakin ingin menyimpan perubahan data kegiatan ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Update',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        put(route('kegiatan.update', kegiatan.id), {
          onSuccess: () => {
            onClose();
          },
        });
      }
    });
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="md">
      <div className="p-6">
        <h2 className="text-xl font-bold text-sky-700 mb-1">Edit Data Kegiatan</h2>
        <p className="text-gray-500 text-xs mb-5">Perbarui informasi kegiatan di bawah ini.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="edit_nama_kegiatan">Nama Kegiatan <span className="text-red-500">*</span></Label>
            <Input
              id="edit_nama_kegiatan"
              type="text"
              placeholder="Masukkan nama kegiatan..."
              value={data.nama_kegiatan}
              onChange={(e) => setData('nama_kegiatan', e.target.value)}
              required
            />
            {errors.nama_kegiatan && <p className="text-red-500 text-xs mt-0.5">{errors.nama_kegiatan}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit_jenis_kegiatan">Jenis Kegiatan</Label>
            <Select
              onValueChange={(value) => setData('jenis_kegiatan', value)}
              value={data.jenis_kegiatan || ""}
            >
              <SelectTrigger id="edit_jenis_kegiatan">
                <SelectValue placeholder="-- Pilih Jenis Kegiatan --" />
              </SelectTrigger>
              <SelectContent>
                {jenisKegiatanOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.jenis_kegiatan && <p className="text-red-500 text-xs mt-0.5">{errors.jenis_kegiatan}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit_deskripsi">Deskripsi</Label>
            <Textarea
              id="edit_deskripsi"
              placeholder="Tulis deskripsi kegiatan..."
              value={data.deskripsi}
              onChange={(e) => setData('deskripsi', e.target.value)}
            />
            {errors.deskripsi && <p className="text-red-500 text-xs mt-0.5">{errors.deskripsi}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="edit_tanggal">Tanggal Mulai <span className="text-red-500">*</span></Label>
              <Input
                id="edit_tanggal"
                type="date"
                value={data.tanggal}
                onChange={(e) => setData('tanggal', e.target.value)}
                required
              />
              {errors.tanggal && <p className="text-red-500 text-xs mt-0.5">{errors.tanggal}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="edit_tanggal_selesai">Tanggal Selesai</Label>
              <Input
                id="edit_tanggal_selesai"
                type="date"
                value={data.tanggal_selesai}
                onChange={(e) => setData('tanggal_selesai', e.target.value)}
              />
              {errors.tanggal_selesai && <p className="text-red-500 text-xs mt-0.5">{errors.tanggal_selesai}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit_tim_id">Pilih Tim <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => setData('tim_id', value)}
              value={data.tim_id ? data.tim_id.toString() : ""}
            >
              <SelectTrigger id="edit_tim_id">
                <SelectValue placeholder="-- Pilih Tim --" />
              </SelectTrigger>
              <SelectContent>
                {tims.map((tim) => (
                  <SelectItem key={tim.id} value={tim.id.toString()}>
                    {tim.nama_tim}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.tim_id && <p className="text-red-500 text-xs mt-0.5">{errors.tim_id}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={processing} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              {processing ? 'Menyimpan...' : 'Update Kegiatan'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
