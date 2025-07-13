import { useForm, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';

export default function EditAnggotaTim({ anggota_tim, users, tims }) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: anggota_tim.user_id || '',
    tim_id: anggota_tim.tim_id || '',
    role: anggota_tim.role || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('anggota_tim.update', anggota_tim.id));
  };

  return (
<div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Formulir Update Anggota Tim</h2>
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
