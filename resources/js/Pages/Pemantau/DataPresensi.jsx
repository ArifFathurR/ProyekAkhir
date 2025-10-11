import { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarSupervisor from '@/Layouts/SidebarPemantau';
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

  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('penerima.index'), {
      search,
      undangan_id: undanganId,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleClearFilter = () => {
    setSearch('');
    setUndanganId('');
    router.get(route('penerima.index'));
  };

  // Calculate stats
  const totalPresensi = penerimas?.total || 0;
  const hadirCount = penerimas?.data?.filter(item => item.status_kehadiran === 'Hadir').length || 0;
  const tidakHadirCount = penerimas?.data?.filter(item => item.status_kehadiran === 'Tidak Hadir').length || 0;

  return (
    <div className="flex justify-start">
      <SidebarSupervisor />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup message={flashMessage} />

        <main className="pt-28 px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Data Presensi Kegiatan</h1>
              <p className="text-gray-600 mt-1">Kelola kehadiran pegawai dalam kegiatan</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Presensi</p>
                    <p className="text-2xl font-bold">{totalPresensi}</p>
                  </div>
                  <div className="bg-blue-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Hadir</p>
                    <p className="text-2xl font-bold">{hadirCount}</p>
                  </div>
                  <div className="bg-green-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Tidak Hadir</p>
                    <p className="text-2xl font-bold">{tidakHadirCount}</p>
                  </div>
                  <div className="bg-red-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Card Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Presensi Pegawai</h2>
                    <p className="text-sm text-gray-500 mt-1">Daftar kehadiran seluruh pegawai</p>
                  </div>
                </div>

                {/* Filter Form */}
                <div className="mt-4">
                  <div className="flex flex-col lg:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama pegawai..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                      />
                    </div>

                    {/* Select Filter */}
                    <div className="flex-shrink-0 w-full lg:w-64">
                      <select
                        value={undanganId}
                        onChange={(e) => setUndanganId(e.target.value)}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                      >
                        <option value="">Semua Undangan</option>
                        {undangans.map((undangan) => (
                          <option key={undangan.id} value={undangan.id}>
                            {undangan.judul}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleFilter}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
                      >
                        Filter
                      </button>
                      {(search || undanganId) && (
                        <button
                          type="button"
                          onClick={handleClearFilter}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0B2E74] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Pegawai</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Undangan</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tim</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Status Kehadiran</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">TTD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {penerimas.data.length > 0 ? (
                      penerimas.data.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {index + 1 + (penerimas.current_page - 1) * penerimas.per_page}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.user?.name || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.undangan?.judul || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.tim?.nama_tim || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.status_kehadiran === 'Hadir' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Hadir
                              </span>
                            )}
                            {item.status_kehadiran === 'Tidak Hadir' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Tidak Hadir
                              </span>
                            )}
                            {item.status_kehadiran === 'Izin' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Izin
                              </span>
                            )}
                            {!item.status_kehadiran && '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.ttd ? (
                              <img
                                src={item.ttd}
                                alt="Tanda Tangan"
                                className="w-16 h-16 object-contain rounded-lg shadow-sm"
                              />
                            ) : (
                              <span className="text-gray-400 text-sm">Tidak ada TTD</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">Tidak ada data ditemukan.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {penerimas?.links && penerimas.links.length > 3 && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Menampilkan <span className="font-medium">{penerimas.from || 0}</span> sampai{' '}
                      <span className="font-medium">{penerimas.to || 0}</span> dari{' '}
                      <span className="font-medium">{penerimas.total || 0}</span> data
                    </div>
                    <nav className="flex space-x-2">
                      {penerimas.links.map((link, index) => (
                        <button
                          key={index}
                          onClick={() => link.url && router.get(link.url)}
                          disabled={!link.url}
                          className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            link.active
                              ? 'bg-blue-600 text-white shadow-sm'
                              : link.url
                              ? 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      ))}
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}