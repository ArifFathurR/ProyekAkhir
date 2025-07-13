import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FlashPopup from '@/Components/FlashPopup';

export default function DataTim({ tims, filters }) {
  const [search, setSearch] = useState(filters.search || '');
  const { props } = usePage();
  const [flashMessage, setFlashMessage] = useState('');

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
      router.delete(route('tim.destroy', id));
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('tim.index'), { search }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
  <div className="flex justify-start">
        <Sidebar />
        <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
          <Header />
          <FlashPopup  />
          <main className="pt-28 px-6">
            <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Data Tim</h2>
            <form onSubmit={handleSearch} className="flex justify-between mb-4 items-center">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau email..."
                  className="border px-3 py-2 rounded w-64"
                />
                <button
                  type="submit"
                  className="bg-sky-500 text-white px-4 py-2 rounded"
                >
                  Cari
                </button>
              </div>
              <button
                type="button"
                onClick={() => router.get(route('tim.create'))}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Tambah
              </button>
            </form>
            <FlashPopup message={flashMessage} />

            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="p-2 border">No</th>
                    <th className="p-2 border">Nama Tim</th>
                    <th className="p-2 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {tims.data.map((tim, idx) => (
                    <tr key={tim.id} className="text-center border-t">
                      <td className="p-2">{idx + 1 + (tims.current_page - 1) * tims.per_page}</td>
                      <td className="p-2">{tim.nama_tim}</td>
                      <td className="p-2 space-x-2">
                        <button
                          onClick={() => router.get(route('tim.edit', tim.id))}
                          className="bg-sky-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tim.id)}
                          className="bg-orange-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {tims.data.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center p-4 text-gray-500">
                        Belum ada data tim.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4 mb-2 flex justify-center">
                <nav>
                  <ul className="flex space-x-2">
                    {tims.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          className={`px-3 py-1 border rounded ${link.active ? 'bg-sky-500 text-white' : 'bg-white text-sky-500'
                            }`}
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
