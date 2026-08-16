import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select";

export default function CreateKegiatan({ show, onClose, tims = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Tambah Kegiatan?',
      text: 'Apakah Anda yakin ingin menambahkan kegiatan baru ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Tambah',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('kegiatan.store'), {
          onSuccess: () => {
            onClose();
            reset();
          },
        });
      }
    });
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="md">
      <div className="p-6">
        <h2 className="text-xl font-bold text-sky-700 mb-1">Tambah Kegiatan Baru</h2>
        <p className="text-gray-500 text-xs mb-5">Lengkapi data kegiatan di bawah ini.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="nama_kegiatan">Nama Kegiatan <span className="text-red-500">*</span></Label>
            <Input
              id="nama_kegiatan"
              type="text"
              placeholder="Masukkan nama kegiatan..."
              value={data.nama_kegiatan}
              onChange={(e) => setData('nama_kegiatan', e.target.value)}
              required
            />
            {errors.nama_kegiatan && <p className="text-red-500 text-xs mt-0.5">{errors.nama_kegiatan}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="jenis_kegiatan">Jenis Kegiatan</Label>
            <Select
              onValueChange={(value) => setData('jenis_kegiatan', value)}
              value={data.jenis_kegiatan || ""}
            >
              <SelectTrigger id="jenis_kegiatan">
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
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              placeholder="Tulis deskripsi kegiatan..."
              value={data.deskripsi}
              onChange={(e) => setData('deskripsi', e.target.value)}
            />
            {errors.deskripsi && <p className="text-red-500 text-xs mt-0.5">{errors.deskripsi}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="tanggal">Tanggal Mulai <span className="text-red-500">*</span></Label>
              <Input
                id="tanggal"
                type="date"
                value={data.tanggal}
                onChange={(e) => setData('tanggal', e.target.value)}
                required
              />
              {errors.tanggal && <p className="text-red-500 text-xs mt-0.5">{errors.tanggal}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
              <Input
                id="tanggal_selesai"
                type="date"
                value={data.tanggal_selesai}
                onChange={(e) => setData('tanggal_selesai', e.target.value)}
              />
              {errors.tanggal_selesai && <p className="text-red-500 text-xs mt-0.5">{errors.tanggal_selesai}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="tim_id">Pilih Tim <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => setData('tim_id', value)}
              value={data.tim_id ? data.tim_id.toString() : ""}
            >
              <SelectTrigger>
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
              {processing ? 'Menyimpan...' : 'Simpan Kegiatan'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
