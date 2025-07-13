import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { useForm } from '@inertiajs/react';

export default function CreateKegiatan({ tims }) {
  const { data, setData, post, processing, errors } = useForm({
    nama_kegiatan: '',
    deskripsi: '',
    tanggal: '',
    tim_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('kegiatan.store'));
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Formulir Tambah Kegiatan</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kegiatan</label>
                <input
                  type="text"
                  value={data.nama_kegiatan}
                  onChange={(e) => setData('nama_kegiatan', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.nama_kegiatan && (
                  <p className="text-red-500 text-sm">{errors.nama_kegiatan}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  value={data.deskripsi}
                  onChange={(e) => setData('deskripsi', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.deskripsi && (
                  <p className="text-red-500 text-sm">{errors.deskripsi}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input
                  type="date"
                  value={data.tanggal}
                  onChange={(e) => setData('tanggal', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.tanggal && (
                  <p className="text-red-500 text-sm">{errors.tanggal}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tim</label>
                <select
                  value={data.tim_id}
                  onChange={(e) => setData('tim_id', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">-- Pilih Tim --</option>
                  {tims.map((tim) => (
                    <option key={tim.id} value={tim.id}>
                      {tim.nama_tim}
                    </option>
                  ))}
                </select>
                {errors.tim_id && (
                  <p className="text-red-500 text-sm">{errors.tim_id}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition"
              >
                {processing ? 'Menyimpan...' : 'SIMPAN KEGIATAN'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
