import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

// 🔹 Import komponen dari Shadcn UI
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

export default function CreatePegawai({ roles }) {
  const { data, setData, post, processing, errors } = useForm({
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
        post(route('admin.pegawai.store'));
      }
    });
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          {/* Card Form */}
          <div className="w-full bg-white border border-sky-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-2">
              Formulir Tambah Pegawai
            </h2>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Lengkapi data pegawai di bawah ini, lalu klik tombol simpan.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama */}
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama pegawai..."
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email..."
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* No HP */}
              <div className="space-y-2">
                <Label htmlFor="no_hp">No HP</Label>
                <Input
                  id="no_hp"
                  type="text"
                  placeholder="Masukkan nomor handphone..."
                  value={data.no_hp}
                  onChange={(e) => setData('no_hp', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                  required
                />
                {errors.no_hp && (
                  <p className="text-red-500 text-sm mt-1">{errors.no_hp}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password..."
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={(value) => setData('role', value)}
                  value={data.role || ""}
                >
                  <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 capitalize">
                    <SelectValue placeholder="-- Pilih Role --" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles && roles.map((r) => (
                      <SelectItem key={r} value={r} className="capitalize">
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>

              {/* Tombol Simpan */}
              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-transform duration-200 hover:scale-[1.02]"
              >
                {processing ? 'Menyimpan...' : 'TAMBAH DATA'}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
