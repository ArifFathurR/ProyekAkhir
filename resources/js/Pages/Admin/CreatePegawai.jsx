import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select";

export default function CreatePegawai({ show, onClose, roles = ['admin', 'pegawai', 'supervisor', 'pemantau'] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    no_hp: '',
    password: '',
    role: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Tambah Pegawai?',
      text: 'Apakah Anda yakin ingin menambahkan pegawai baru ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Tambah',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('admin.pegawai.store'), {
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
        <h2 className="text-xl font-bold text-sky-700 mb-1">Tambah Pegawai Baru</h2>
        <p className="text-gray-500 text-xs mb-5">Lengkapi data pegawai di bawah ini.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Nama <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              type="text"
              placeholder="Masukkan nama pegawai..."
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email..."
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="no_hp">No HP <span className="text-red-500">*</span></Label>
            <Input
              id="no_hp"
              type="text"
              placeholder="Masukkan nomor HP..."
              value={data.no_hp}
              onChange={(e) => setData('no_hp', e.target.value)}
              required
            />
            {errors.no_hp && <p className="text-red-500 text-xs mt-0.5">{errors.no_hp}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password..."
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
            <Select
              onValueChange={(value) => setData('role', value)}
              value={data.role || ""}
            >
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="-- Pilih Role --" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r} className="capitalize">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-xs mt-0.5">{errors.role}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={processing} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              {processing ? 'Menyimpan...' : 'Tambah Pegawai'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
