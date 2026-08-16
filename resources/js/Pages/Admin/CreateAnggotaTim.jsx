import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';

export default function CreateAnggotaTim({ show, onClose, users = [], tims = [] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    user_id: '',
    tim_id: '',
    role: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Tambah Anggota Tim?',
      text: 'Apakah Anda yakin ingin menambahkan anggota tim baru ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Tambah',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('anggota_tim.store'), {
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
        <h2 className="text-xl font-bold text-sky-700 mb-1">Tambah Anggota Tim</h2>
        <p className="text-gray-500 text-xs mb-5">Pilih pegawai, tim, dan posisi anggota tim.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="user_id">Nama Pegawai <span className="text-red-500">*</span></Label>
            <Select
              value={data.user_id ? data.user_id.toString() : ""}
              onValueChange={(value) => setData('user_id', value)}
            >
              <SelectTrigger id="user_id">
                <SelectValue placeholder="-- Pilih Pegawai --" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.user_id && <p className="text-red-500 text-xs mt-0.5">{errors.user_id}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="tim_id">Nama Tim <span className="text-red-500">*</span></Label>
            <Select
              value={data.tim_id ? data.tim_id.toString() : ""}
              onValueChange={(value) => setData('tim_id', value)}
            >
              <SelectTrigger id="tim_id">
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

          <div className="space-y-1">
            <Label htmlFor="role">Role / Jabatan <span className="text-red-500">*</span></Label>
            <Select
              value={data.role}
              onValueChange={(value) => setData('role', value)}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="-- Pilih Role / Jabatan --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ketua Tim">Ketua Tim</SelectItem>
                <SelectItem value="Anggota">Anggota</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-xs mt-0.5">{errors.role}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={processing} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              {processing ? 'Menyimpan...' : 'Simpan Anggota'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
