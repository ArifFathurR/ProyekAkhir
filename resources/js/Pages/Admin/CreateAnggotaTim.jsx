import { useForm, router, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import FlashPopup from '@/Components/FlashPopup';

import SuccessToast from '@/Components/SuccesToast'; // pastikan nama file dan path-nya sesuai

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
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Tambah Anggota Tim</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Nama Pegawai</label>
                <select
                  value={data.user_id}
                  onChange={(e) => setData('user_id', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">-- Pilih Pegawai --</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {errors.user_id && <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Nama Tim</label>
                <select
                  value={data.tim_id}
                  onChange={(e) => setData('tim_id', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">-- Pilih Tim --</option>
                  {tims.map((tim) => (
                    <option key={tim.id} value={tim.id}>
                      {tim.nama_tim}
                    </option>
                  ))}
                </select>
                {errors.tim_id && <div className="text-red-500 text-sm mt-1">{errors.tim_id}</div>}
              </div>

              <div>
                <label className="block mb-1 font-medium">Role / Jabatan</label>
                <input
                  type="text"
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Contoh: Ketua Tim, Anggota, dll"
                />
                {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => router.get(route('anggota_tim.index'))}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
