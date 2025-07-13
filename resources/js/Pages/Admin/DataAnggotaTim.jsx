import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FlashPopup from '@/Components/FlashPopup';

export default function Dataanggota_tim({ anggota_tims, filters = {}, tims = [] }) {
  const { props } = usePage();
  const [search, setSearch] = useState(filters.search || '');
  const [selectedTim, setSelectedTim] = useState(filters.tim || '');
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    if (props.flash?.success) {
      setFlashMessage(props.flash.success);
      const timer = setTimeout(() => setFlashMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [props.flash]);

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      router.delete(route('anggota_tim.destroy', id));
    }
  };

  const handleFilter = () => {
    // Mengirimkan parameter search dan tim ke server melalui query string
    router.get(route('anggota_tim.index'), {
      search: search,
      tim: selectedTim,
    });
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup message={flashMessage} />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Data Anggota Tim</h2>

            <div className="flex justify mb-4 gap-2">
              <input
                type="text"
                placeholder="Cari nama pegawai..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-1/4"
              />

              <button
                onClick={handleFilter}
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
              >
                Cari
              </button>
              <button
                onClick={() => router.get(route('anggota_tim.create'))}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-auto"
              >
                Tambah
              </button>
            </div>
            <div className="flex justify-between mb-4 gap-2">
              <select
                value={selectedTim}
                onChange={(e) => setSelectedTim(e.target.value)}
                className="border px-3 py-2 rounded w-40"
              >
                <option value="">Semua Tim</option>
                {tims.map((tim) => (
                  <option key={tim.id} value={tim.id}>{tim.nama_tim}</option>
                ))}
              </select>

            </div>


            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="p-2 border">No</th>
                    <th className="p-2 border">Nama Pegawai</th>
                    <th className="p-2 border">Role</th>
                    <th className="p-2 border">Tim</th>
                    <th className="p-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {anggota_tims.data.map((anggota_tim, idx) => (
                    <tr key={anggota_tim.id} className="text-center border-t">
                      <td className="p-2">{idx + 1 + (anggota_tims.current_page - 1) * anggota_tims.per_page}</td>
                      <td className="p-2">{anggota_tim.user?.name}</td>
                      <td className="p-2">{anggota_tim.role}</td>
                      <td className="p-2">{anggota_tim.tim?.nama_tim ?? '-'}</td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => router.get(route('anggota_tim.edit', anggota_tim.id))}
                          className="bg-sky-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(anggota_tim.id)}
                          className="bg-orange-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {anggota_tims.data.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center p-4 text-gray-500">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center">
              {anggota_tims.links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => router.get(link.url)}
                  disabled={!link.url}
                  className={`px-3 py-1 rounded border ${link.active ? 'bg-sky-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
