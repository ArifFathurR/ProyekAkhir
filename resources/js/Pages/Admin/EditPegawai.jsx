import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { useForm } from '@inertiajs/react';
export default function EditPegawai({ pegawai, roles }) {
  const { data, setData, put, processing, errors } = useForm({
    name: pegawai.name || '',
    email: pegawai.email || '',
    no_hp: pegawai.no_hp || '',
    role: pegawai.role || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // gunakan route yang sesuai dengan resource name di web.php
    put(route('admin.pegawai.update', pegawai.id));
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Formulir Edit Pegawai</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
                <input
                  type="text"
                  value={data.no_hp}
                  onChange={(e) => setData('no_hp', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.no_hp && <p className="text-red-500 text-sm">{errors.no_hp}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Pilih Role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition"
              >
                {processing ? 'Menyimpan...' : 'UPDATE DATA'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
