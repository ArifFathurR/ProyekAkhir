import Header from '@/Components/Header';
import SidebarPemantau from '@/Layouts/SidebarPemantau';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FlashPopup from '@/Components/FlashPopup';
import TableCard from '@/Components/TableCard';
import Pagination from '@/Components/Pagination';

export default function DataTim({ tims, filters }) {
  const [search, setSearch] = useState(filters.search || '');
  const { props } = usePage();
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    if (props.flash?.success) {
      setFlashMessage(props.flash.success);
      const timer = setTimeout(() => setFlashMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [props.flash]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('pemantau.datatim'), { search }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleClearFilter = () => {
    setSearch('');
    router.get(route('pemantau.datatim'));
  };

  return (
    <div className="flex justify-start">
      <SidebarPemantau />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup message={flashMessage} />
        
        <main className="pt-28 px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Data Tim</h1>
              <p className="text-gray-600 mt-1">Kelola data tim</p>
            </div>

            {/* Main Content Card */}
            <TableCard
              title="Daftar Tim"
              description="Daftar seluruh tim"
              filterForm={
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
                        placeholder="Cari nama tim..."
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
                      >
                        Cari
                      </button>
                      {search && (
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
              }
              pagination={<Pagination data={tims} />}
            >
              <table className="w-full">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Tim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tims.data.length > 0 ? (
                    tims.data.map((tim, idx) => (
                      <tr key={tim.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {idx + 1 + (tims.current_page - 1) * tims.per_page}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{tim.nama_tim}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-6 py-12 text-center text-gray-500">
                        Belum ada data tim.
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