import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FlashPopup from '@/Components/FlashPopup';
export default function DataKegiatan({ kegiatans, filters, tims }) {
  const { props } = usePage();
  const [flashMessage, setFlashMessage] = useState('');
  const [search, setSearch] = useState(filters.search || '');
  const [timId, setTimId] = useState(filters.tim_id || '');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('kegiatan.index'), { search, tim_id: timId }, { preserveState: true });
  };

  useEffect(() => {
    if (props.flash?.success) {
      setFlashMessage(props.flash.success);

      // Hilangkan pesan setelah beberapa detik
      const timer = setTimeout(() => setFlashMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [props.flash]);

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      router.delete(route('kegiatan.destroy', id));
    }
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Data Kegiatan</h2>

            <form onSubmit={handleSearch} className="flex justify mb-4 gap-2">
              <input
                type="text"
                placeholder="Cari nama pegawai..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-1/4"
              />

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cari
              </button>
              <button
                onClick={() => router.get(route('kegiatan.create'))}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition ml-auto"
              >
                Tambah
              </button>
            </form>
            <select
              value={timId}
              onChange={(e) => setTimId(e.target.value)}
              className="border rounded  py-1 text-sm w-fit"
            >
              <option value="">Semua Tim</option>
              {tims.map((tim) => (
                <option key={tim.id} value={tim.id}>{tim.nama_tim}</option>
              ))}
            </select>
            <div className="mb-4 text-right">

            </div>

            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="p-2 border">No</th>
                    <th className="p-2 border">Nama Kegiatan</th>
                    <th className="p-2 border">Deskripsi</th>
                    <th className="p-2 border">Tim</th>
                    <th className="p-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kegiatans.data.map((kegiatan, idx) => (
                    <tr key={kegiatan.id} className="text-center border-t">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2">{kegiatan.nama_kegiatan}</td>
                      <td className="p-2">
                        {kegiatan.deskripsi.length > 100 ? `${kegiatan.deskripsi.slice(0, 70)}...` : kegiatan.deskripsi}
                      </td>
                      <td className="p-2">{kegiatan.tim?.nama_tim ?? '-'}</td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => router.get(route('kegiatan.edit', kegiatan.id))}
                          className="bg-sky-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(kegiatan.id)}
                          className="bg-orange-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {kegiatans.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center p-4 text-gray-500">
                        Belum ada data kegiatan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4 flex justify-center">
                <nav>
                  <ul className="flex space-x-2">
                    {kegiatans.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          className={`px-3 py-1 border rounded ${link.active ? 'bg-sky-500 text-white' : 'bg-white text-sky-500'}`}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
