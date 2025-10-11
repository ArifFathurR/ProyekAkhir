import { useState } from 'react';
import { router } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import FlashPopup from '@/Components/FlashPopup';

export default function DataDokumentasi({ dokumentasis, filters = {}, totalUndangan, totalFoto }) {
  const [search, setSearch] = useState(filters.search || '');
  const [createdAt, setCreatedAt] = useState(filters.created_at || '');

  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('dokumentasisupervisor.index'), {
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
    router.get(route('dokumentasisupervisor.index'));
  };

  return (
    <div className="flex justify-start">
      <SidebarSupervisor />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />

        <main className="pt-28 px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Dokumentasi</h1>
              <p className="text-gray-600 mt-1">Kelola dokumentasi kegiatan</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Dokumentasi</p>
                    <p className="text-2xl font-bold">{dokumentasis?.total || 0}</p>
                  </div>
                  <div className="bg-blue-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Kegiatan</p>
                    <p className="text-2xl font-bold">{totalUndangan || 0}</p>
                  </div>
                  <div className="bg-green-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Total Foto</p>
                    <p className="text-2xl font-bold">{totalFoto || 0}</p>
                  </div>
                  <div className="bg-purple-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
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
                    <h2 className="text-lg font-semibold text-gray-900">Data Dokumentasi Kegiatan</h2>
                    <p className="text-sm text-gray-500 mt-1">Daftar seluruh dokumentasi kegiatan</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => router.get(route('dokumentasisupervisor.create'))}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Tambah Dokumentasi
                    </button>
                  </div>
                </div>

                {/* Filter Form */}
                <form onSubmit={handleFilter} className="mt-4">
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
                        placeholder="Cari nama kegiatan..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                      />
                    </div>

                    {/* Date Filter */}
                    <div className="flex-shrink-0 w-full lg:w-48">
                      <input
                        type="date"
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        type="submit"
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
                </form>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
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
                          <td className="px-6 py-4 whitespace-nowrap">{item.kegiatan?.nama_kegiatan || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{item.undangan?.judul || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.link_zoom ? (
                              <a href={item.link_zoom} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Zoom</a>
                            ) : <span className="text-gray-400 text-sm">-</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.link_materi ? (
                              <a href={item.link_materi} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">Materi</a>
                            ) : <span className="text-gray-400 text-sm">-</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.foto_dokumentasi?.length > 0 ? (
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
                              <span className="text-gray-400 text-sm">Tidak ada foto</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center justify-center space-x-3">
                              <button
                                onClick={() => router.get(route('dokumentasisupervisor.edit', item.id))}
                                className="inline-flex items-center px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs font-medium rounded-md transition-colors duration-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Apakah Anda yakin ingin menghapus dokumentasi ini?')) {
                                    router.delete(route('dokumentasisupervisor.destroy', item.id));
                                  }
                                }}
                                className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors duration-200"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">Tidak ada data ditemukan.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {dokumentasis?.links && dokumentasis.links.length > 3 && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Menampilkan <span className="font-medium">{dokumentasis.from || 0}</span> sampai{' '}
                      <span className="font-medium">{dokumentasis.to || 0}</span> dari{' '}
                      <span className="font-medium">{dokumentasis.total || 0}</span> data
                    </div>
                    <nav className="flex space-x-2">
                      {dokumentasis.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
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
