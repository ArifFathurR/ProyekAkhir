import { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import FlashPopup from '@/Components/FlashPopup';

export default function DataDokumentasi({ dokumentasis, filters = {} }) {
  const [search, setSearch] = useState(filters.search || '');
  const [createdAt, setCreatedAt] = useState(filters.created_at || '');

  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('dokumentasi_kegiatan.index'), {
      search,
      created_at: createdAt,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <div className="flex justify-start">
      <SidebarPegawai />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-9">Data Dokumentasi Kegiatan</h2>
            <div className="flex justify-between mb-6">
              {/* Filter Form */}
              <form onSubmit={handleFilter} className='flex flex-wrap gap-4' >
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama kegiatan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-3 py-2 rounded w-64"
                />
                <input
                  type="date"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  className="border px-3 py-2 rounded w-56"
                />
                <button
                  type="submit"
                  className="bg-sky-500 text-white px-4 py-2 rounded"
                >
                  Filter
                </button>
              </form>
              <button
                onClick={() => router.get(route('dokumentasi_kegiatan.create'))}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                + Tambah Dokumentasi
              </button>
            </div>
            {/* Tabel */}
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-[#0B2E74] text-white">
                  <tr className="text-center">
                    <th className="p-2 border">No</th>
                    <th className="p-2 border">Nama Kegiatan</th>
                    <th className="p-2 border">Judul Undangan</th>
                    <th className="p-2 border">Link Zoom</th>
                    <th className="p-2 border">Link Materi</th>
                    <th className="p-2 border">Foto</th>
                    <th className="p-2 border">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {dokumentasis.data.length > 0 ? (
                    dokumentasis.data.map((item, index) => (
                      <tr key={item.id} className="text-center border-t">
                        <td className="p-2">{index + 1 + (dokumentasis.current_page - 1) * dokumentasis.per_page}</td>
                        <td className="p-2">{item.kegiatan?.nama_kegiatan || '-'}</td>
                        <td className="p-2">{item.undangan?.judul || '-'}</td>
                        <td className="p-2">
                          {item.link_zoom ? (
                            <a href={item.link_zoom} target="_blank" className="text-blue-600 underline">Zoom</a>
                          ) : '-'}
                        </td>
                        <td className="p-2">
                          {item.link_materi ? (
                            <a href={item.link_materi} target="_blank" className="text-blue-600 underline">Materi</a>
                          ) : '-'}
                        </td>
                        <td className="p-2">
                          {item.foto_dokumentasi && item.foto_dokumentasi.length > 0 ? (
                            <img
                              src={`/storage/${item.foto_dokumentasi[0].foto}`}
                              alt="Foto Dokumentasi"
                              className="w-16 h-16 object-cover mx-auto rounded"
                            />
                          ) : 'Tidak ada foto'}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => router.get(`/dokumentasi_kegiatan/${item.id}`)}
                            className="bg-sky-600 text-white px-3 py-1 rounded"
                          >
                            Lihat
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center p-4 text-gray-500">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <nav>
                <ul className="flex space-x-2">
                  {dokumentasis.links.map((link, index) => (
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
        </main>
      </div>
    </div>
  );
}
