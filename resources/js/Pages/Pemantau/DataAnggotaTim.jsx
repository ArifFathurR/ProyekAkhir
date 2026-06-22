import Header from '@/Components/Header';
import Sidebar from '@/Layouts/SidebarPemantau';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FlashPopup from '@/Components/FlashPopup';
import TableCard from '@/Components/TableCard';
import Pagination from '@/Components/Pagination';

export default function DataAnggotaTim({ anggota_tims, filters = {}, tims = [] }) {
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
    router.get(route('anggota_tim.index'), {
      search: search,
      tim: selectedTim,
    });
  };

  const handleClearFilter = () => {
    setSearch('');
    setSelectedTim('');
    router.get(route('anggota_tim.index'));
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        
        <main className="pt-28 px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Anggota Tim</h1>
              <p className="text-gray-600 mt-1">Kelola anggota tim perusahaan</p>
            </div>

            {/* Main Content Card */}
            <TableCard
              title="Data Anggota Tim"
              description="Daftar seluruh anggota tim perusahaan"
              filterForm={
                <div className="flex flex-col lg:flex-row gap-3 mt-4 space-y-4 lg:space-y-0">
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

                  {/* Team Filter */}
                  <div className="flex-shrink-0 w-full lg:w-48">
                    <select
                      value={selectedTim}
                      onChange={(e) => setSelectedTim(e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                    >
                      <option value="">Semua Tim</option>
                      {tims.map((tim) => (
                        <option key={tim.id} value={tim.id}>{tim.nama_tim}</option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleFilter}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
                    >
                      Filter
                    </button>
                    {(search || selectedTim) && (
                      <button
                        onClick={handleClearFilter}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              }
              pagination={<Pagination data={anggota_tims} />}
            >
              <table className="w-full">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Pegawai</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {anggota_tims?.data?.length > 0 ? (
                    anggota_tims.data.map((anggota_tim, idx) => (
                      <tr key={anggota_tim.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {idx + 1 + (anggota_tims.current_page - 1) * anggota_tims.per_page}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{anggota_tim.user?.name || '-'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            anggota_tim.role === 'leader' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : anggota_tim.role === 'member'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {anggota_tim.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{anggota_tim.tim?.nama_tim || '-'}</div>
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada data anggota tim</h3>
                          <p className="text-sm text-gray-500">
                            {search || selectedTim ? 'Tidak ditemukan anggota tim yang sesuai dengan filter.' : 'Belum ada anggota tim yang terdaftar.'}
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