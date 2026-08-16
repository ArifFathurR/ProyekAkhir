import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";

export default function EditPegawai({ show, onClose, pegawai, roles = ['admin', 'pegawai', 'supervisor', 'pemantau'] }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: '',
    email: '',
    no_hp: '',
    role: [],
  });

  useEffect(() => {
    if (pegawai) {
      setData({
        name: pegawai.name || '',
        email: pegawai.email || '',
        no_hp: pegawai.no_hp || '',
        role: pegawai.role ? pegawai.role.split(',').map(r => r.trim()) : [],
      });
    }
  }, [pegawai]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pegawai?.id) return;

    Swal.fire({
      title: 'Update Pegawai?',
      text: 'Apakah Anda yakin ingin menyimpan perubahan data pegawai ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Update',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        put(route('admin.pegawai.update', pegawai.id), {
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
        <h2 className="text-xl font-bold text-sky-700 mb-1">Edit Data Pegawai</h2>
        <p className="text-gray-500 text-xs mb-5">Perbarui informasi pegawai di bawah ini.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="edit_name">Nama <span className="text-red-500">*</span></Label>
            <Input
              id="edit_name"
              type="text"
              placeholder="Masukkan nama pegawai..."
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit_email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="edit_email"
              type="email"
              placeholder="Masukkan email..."
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit_no_hp">No HP <span className="text-red-500">*</span></Label>
            <Input
              id="edit_no_hp"
              type="text"
              placeholder="Masukkan nomor HP..."
              value={data.no_hp}
              onChange={(e) => setData('no_hp', e.target.value)}
              required
            />
            {errors.no_hp && <p className="text-red-500 text-xs mt-0.5">{errors.no_hp}</p>}
          </div>

          <div className="space-y-1">
            <Label>Role <span className="text-red-500">*</span></Label>
            <div className="flex flex-col gap-2 mt-1">
              {roles.map((r) => (
                <label key={r} className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    value={r}
                    checked={data.role.includes(r)}
                    onChange={(e) => {
                      const value = e.target.value;
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setData('role', [...data.role, value]);
                      } else {
                        setData('role', data.role.filter((role) => role !== value));
                      }
                    }}
                    className="rounded border-gray-300 text-sky-600 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                  />
                  <span className="text-gray-700 capitalize text-sm">{r}</span>
                </label>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-0.5">{errors.role}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={processing} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold">
              {processing ? 'Menyimpan...' : 'Update Data'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
