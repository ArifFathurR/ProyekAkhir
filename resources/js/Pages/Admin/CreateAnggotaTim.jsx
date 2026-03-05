import { useForm, router, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import FlashPopup from '@/Components/FlashPopup';

import SuccessToast from '@/Components/SuccesToast'; // pastikan nama file dan path-nya sesuai
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select';

export default function CreateAnggotaTim({ users, tims }) {
  const { props } = usePage();
  const successMessage = props?.flash?.success;

  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    tim_id: '',
    role: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('anggota_tim.store'));
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        <main className="pt-28 px-6">
          <div className="w-full bg-white border border-sky-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-2">
              Formulir Tambah Anggota Tim
            </h2>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Lengkapi data anggota tim di bawah ini, lalu klik tombol simpan.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user_id">Nama Pegawai</Label>
                <Select
                  value={data.user_id ? data.user_id.toString() : ""}
                  onValueChange={(value) => setData('user_id', value)}
                >
                  <SelectTrigger id="user_id" className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1">
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
                {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tim_id">Nama Tim</Label>
                <Select
                  value={data.tim_id ? data.tim_id.toString() : ""}
                  onValueChange={(value) => setData('tim_id', value)}
                >
                  <SelectTrigger id="tim_id" className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1">
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
                {errors.tim_id && <p className="text-red-500 text-sm">{errors.tim_id}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role / Jabatan</Label>
                <Select
                  value={data.role}
                  onValueChange={(value) => setData('role', value)}
                >
                  <SelectTrigger id="role" className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1">
                    <SelectValue placeholder="-- Pilih Role / Jabatan --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ketua Tim">Ketua Tim</SelectItem>
                    <SelectItem value="Anggota">Anggota</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.get(route('anggota_tim.index'))}
                  className="w-full sm:w-1/2"
                >
                  BATAL
                </Button>
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full sm:w-1/2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-transform duration-200 hover:scale-[1.02]"
                >
                  {processing ? 'Menyimpan...' : 'SIMPAN ANGGOTA'}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
