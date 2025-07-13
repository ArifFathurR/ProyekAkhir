import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { useForm } from '@inertiajs/react';

export default function CreateTim() {
  const { data, setData, post, processing, errors } = useForm({
    nama_tim: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('tim.store')); // pastikan route('tim.store') sudah tersedia di routes/web.php
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Formulir Tambah Tim</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Tim</label>
                <input
                  type="text"
                  value={data.nama_tim}
                  onChange={(e) => setData('nama_tim', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.nama_tim && (
                  <p className="text-red-500 text-sm">{errors.nama_tim}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition"
              >
                {processing ? 'Menyimpan...' : 'SIMPAN TIM'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
