import { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import FlashPopup from '@/Components/FlashPopup';
import StatsCard from '@/Components/StatsCard';
import TableCard from '@/Components/TableCard';
import Pagination from '@/Components/Pagination';

export default function DataDokumentasi({ dokumentasis, filters = {}, totalUndangan, totalFoto }) {
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

  const handleClearFilter = () => {
    setSearch('');
    setCreatedAt('');
    router.get(route('dokumentasi_kegiatan.index'));
  };

  // Stats data
  const statsData = [
    {
      title: 'Total Dokumentasi',
      value: dokumentasis?.total || 0,
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      iconBgColor: 'blue-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: 'Total Kegiatan',
      value: totalUndangan || 0,
      gradientFrom: 'green-500',
      gradientTo: 'green-600',
      iconBgColor: 'green-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: 'Total Foto',
      value: totalFoto || 0,
      gradientFrom: 'purple-500',
      gradientTo: 'purple-600',
      iconBgColor: 'purple-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
        </svg>
      )
    }
  ];

  // Header actions
  const headerActions = (
    <button
      type="button"
      onClick={() => router.get(route('dokumentasi_kegiatan.create'))}
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Tambah Dokumentasi
    </button>
  );

  // Filter form
  const filterForm = (
    <div onSubmit={handleFilter}>
      <div className="flex flex-col lg:flex-row gap-3">
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
            placeholder="Cari nama kegiatan..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
          />
        </div>

        <div className="flex-shrink-0 w-full lg:w-48">
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleFilter}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
          >
            Filter
          </button>
          {(search || createdAt) && (
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
  );

  return (
    <div className="flex justify-start">
      <SidebarPegawai />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        
        <main className="pt-28 px-4">
          <div className="w-full">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Dokumentasi</h1>
              <p className="text-gray-600 mt-1">Kelola dokumentasi kegiatan Saya</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <TableCard
              title="Data Dokumentasi Kegiatan"
              description="Daftar seluruh dokumentasi kegiatan"
              headerActions={headerActions}
              filterForm={filterForm}
              pagination={<Pagination data={dokumentasis} />}
            >
              <table className="w-full">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Kegiatan</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Judul Undangan</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Link Zoom</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Link Materi</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Foto</th>
                    <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dokumentasis?.data?.length > 0 ? (
                    dokumentasis.data.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {index + 1 + (dokumentasis.current_page - 1) * dokumentasis.per_page}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.kegiatan?.nama_kegiatan || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.undangan?.judul || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.link_zoom ? (
                            <a 
                              href={item.link_zoom} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Zoom
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.link_materi ? (
                            <a 
                              href={item.link_materi} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Materi
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.foto_dokumentasi && item.foto_dokumentasi.length > 0 ? (
                            <div className="flex items-center">
                              <img
                                src={`/storage/${item.foto_dokumentasi[0].foto}`}
                                alt="Foto Dokumentasi"
                                className="w-12 h-12 object-cover rounded-lg shadow-sm"
                              />
                              {item.foto_dokumentasi.length > 1 && (
                                <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  +{item.foto_dokumentasi.length - 1}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center space-x-3">
                            <button
                              onClick={() => router.get(route('dokumentasi_kegiatan.edit', item.id))}
                              className="inline-flex items-center px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs font-medium rounded-md transition-colors duration-200"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Apakah Anda yakin ingin menghapus dokumentasi ini?')) {
                                  router.delete(route('dokumentasi_kegiatan.destroy', item.id));
                                }
                              }}
                              className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors duration-200"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada dokumentasi</h3>
                          <p className="text-sm text-gray-500">
                            {search || createdAt ? 'Tidak ditemukan dokumentasi yang sesuai dengan filter.' : 'Belum ada dokumentasi yang terdaftar.'}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </TableCard>
          </div>
        </main>
      </div>
    </div>
  );
}