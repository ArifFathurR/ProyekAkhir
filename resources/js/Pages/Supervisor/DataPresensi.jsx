import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import FlashPopup from '@/Components/FlashPopup';

export default function DataPresensi({ penerimas, filters = {}, undangans = [] }) {
  const { props } = usePage();
  const [search, setSearch] = useState(filters.search || '');
  const [undanganId, setUndanganId] = useState(filters.undangan_id || '');
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    if (props.flash?.success) {
      setFlashMessage(props.flash.success);
      const timer = setTimeout(() => setFlashMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [props.flash]);

  const handleFilter = () => {
    router.get(route('penerima.index'), {
      search,
      undangan_id: undanganId,
    });
  };

  return (
    <div className="flex justify-start">
      <SidebarSupervisor />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup message={flashMessage} />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Data Presensi Kegiatan</h2>

            <div className="flex flex-wrap gap-4 mb-4">
              <input
                type="text"
                placeholder="Cari nama pegawai..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-64"
              />
              <select
                value={undanganId}
                onChange={(e) => setUndanganId(e.target.value)}
                className="border px-3 py-2 rounded w-64"
              >
                <option value="">Semua Undangan</option>
                {undangans.map((undangan) => (
                  <option key={undangan.id} value={undangan.id}>
                    {undangan.judul}
                  </option>
                ))}
              </select>
              <button
                onClick={handleFilter}
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
              >
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-[#0B2E74] text-white">
                  <tr className="text-center">
                    <th className="p-2 border">No</th>
                    <th className="p-2 border">Nama Pegawai</th>
                    <th className="p-2 border">Nama Undangan</th>
                    <th className="p-2 border">Tim</th>
                    <th className="p-2 border">Status Kehadiran</th>
                    <th className="p-2 border">TTD</th>
                  </tr>
                </thead>
                <tbody>
                  {penerimas.data.length > 0 ? (
                    penerimas.data.map((item, index) => (
                      <tr key={item.id} className="text-center border-t p-2">
                        <td className="p-4">
                          {index + 1 + (penerimas.current_page - 1) * penerimas.per_page}
                        </td>
                        <td className="p-4">{item.user?.name || '-'}</td>
                        <td className="p-4">{item.undangan?.judul || '-'}</td>
                        <td className="p-4">{item.tim?.nama_tim || '-'}</td>
                        <td className="p-4">{item.status_kehadiran || '-'}</td>
                        <td className="p-4">
                          {item.ttd ? (
                            <img
                              src={item.ttd}
                              alt="Tanda Tangan"
                              className="w-20 h-20 object-contain mx-auto"
                            />
                          ) : (
                            'Tidak Ada TTD'
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4 text-gray-500">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center">
              {penerimas.links.map((link, index) => (
                <button
                  key={index}
                  onClick={() => link.url && router.get(link.url)}
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
