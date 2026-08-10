import { useState, useEffect, useMemo } from 'react';
import { router, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarPemantau from '@/Layouts/SidebarPemantau';
import FlashPopup from '@/Components/FlashPopup';
import TableCard from '@/Components/TableCard';
import Pagination from '@/Components/Pagination';
import ReactSelect from 'react-select';

export default function DataPresensi({ penerimas, filters = {}, undangans = [], stats = {} }) {
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

  useEffect(() => {
    setSearch(filters.search || '');
    setUndanganId(filters.undangan_id || '');
  }, [filters.search, filters.undangan_id]);

  useEffect(() => {
    const searchChanged = String(search) !== String(filters.search || '');
    const undanganChanged = String(undanganId) !== String(filters.undangan_id || '');

    if (!searchChanged && !undanganChanged) {
      return;
    }

    const timer = setTimeout(() => {
      router.get(route('pemantau.datapresensi'), {
        search,
        undangan_id: undanganId,
      }, {
        preserveState: true,
        replace: true,
      });
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [search, undanganId, filters]);

  const handleClearFilter = () => {
    setSearch('');
    setUndanganId('');
    router.get(route('pemantau.datapresensi'));
  };

  const undanganOptions = useMemo(() => {
    return undangans.map((u) => ({ value: u.id, label: u.judul }));
  }, [undangans]);

  const selectedUndangan = undanganOptions.find(opt => opt.value === parseInt(undanganId)) || null;

  // Calculate stats based on whether an undangan is filtered or not
  const isFiltered = !!undanganId;
  const dataToShow = isFiltered ? (penerimas?.data || []) : [];

  const totalPresensi = isFiltered ? (stats?.total ?? (penerimas?.total || 0)) : 0;
  const hadirCount = isFiltered ? (stats?.hadir ?? dataToShow.filter(item => item.status_kehadiran?.toLowerCase() === 'hadir').length) : 0;
  const tidakHadirCount = isFiltered ? (stats?.tidakHadir ?? dataToShow.filter(item => item.status_kehadiran === 'Tidak Hadir' || item.status_kehadiran === 'Izin').length) : 0;
  const berhalanganCount = isFiltered ? (stats?.berhalangan ?? dataToShow.filter(item => item.status_penerima === 'berhalangan' || item.status_kehadiran?.toLowerCase() === 'berhalangan' || !!item.alasan_berhalangan).length) : 0;

  const getStatusBadge = (status) => {
    const s = status?.toLowerCase();
    if (s === 'hadir') return 'bg-green-100 text-green-700 border border-green-300';
    if (s === 'tidak hadir') return 'bg-red-100 text-red-700 border border-red-300';
    if (s === 'belum') return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
    if (s === 'terlambat') return 'bg-amber-100 text-amber-700 border border-amber-300';
    return 'bg-gray-100 text-gray-600 border border-gray-300';
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
              <h1 className="text-2xl font-bold text-gray-900">Data Presensi Kegiatan</h1>
              <p className="text-gray-600 mt-1">Kelola kehadiran pegawai dalam kegiatan</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Presensi</p>
                    <p className="text-2xl font-bold">{totalPresensi}</p>
                  </div>
                  <div className="bg-blue-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
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
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100 text-sm font-medium">Berhalangan Hadir</p>
                    <p className="text-2xl font-bold">{berhalanganCount}</p>
                  </div>
                  <div className="bg-amber-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Card */}
            <TableCard
              title="Daftar Presensi Pegawai"
              description="Daftar kehadiran seluruh pegawai"
              filterForm={
                <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center w-full">
                    {/* Select Filter (Undangan) - gets 2/3 space */}
                    <div className="col-span-1 md:col-span-2">
                      <ReactSelect
                        options={undanganOptions}
                        value={selectedUndangan}
                        onChange={(selected) => setUndanganId(selected ? selected.value : '')}
                        isClearable
                        placeholder="Pilih & Cari Undangan Kegiatan..."
                        className="react-select-container shadow-sm"
                        classNamePrefix="react-select"
                        styles={{
                          control: (base) => ({
                            ...base,
                            padding: '4px',
                            borderRadius: '0.5rem',
                          }),
                        }}
                      />
                    </div>

                    {/* Search Input (Nama) - gets 1/3 space */}
                    <div className="relative col-span-1">
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
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 justify-end">
                    {(search || undanganId) && (
                      <button
                        type="button"
                        onClick={handleClearFilter}
                        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                      >
                        Bersihkan
                      </button>
                    )}
                  </div>
                </div>
              }
              pagination={isFiltered ? <Pagination data={penerimas} /> : null}
            >
              <table className="w-full">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Pegawai</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tim</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Status Kehadiran</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Lokasi</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">TTD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {!isFiltered ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500 bg-gray-50/50">
                        <p className="text-lg font-medium text-gray-600 mb-1">Pilih undangan terlebih dahulu</p>
                        <p className="text-sm">Silakan pilih agenda undangan di bagian filter untuk menampilkan data presensi yang sesuai.</p>
                      </td>
                    </tr>
                  ) : dataToShow.length > 0 ? (
                    dataToShow.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {index + 1 + ((penerimas?.current_page || 1) - 1) * (penerimas?.per_page || 10)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{item.user?.name || '-'}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{item.tim?.nama_tim || '-'}</div></td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-start gap-1">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(item.status_kehadiran)}`}>
                              {item.status_kehadiran || '-'}
                            </span>
                            {item.status_penerima === 'berhalangan' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-red-100 text-red-700 border border-red-200">
                                Konfirmasi: Berhalangan
                              </span>
                            )}
                            {item.alasan_berhalangan && (
                              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2.5 py-1 mt-0.5 max-w-xs whitespace-normal italic">
                                <span className="font-semibold not-italic text-red-700">Alasan: </span>
                                {item.alasan_berhalangan}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.latitude && item.longitude ? (
                            <a
                              href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Lihat Peta
                            </a>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.ttd ? (
                            <img
                              src={item.ttd}
                              alt="Tanda Tangan"
                              className="w-16 h-10 object-contain rounded border bg-white"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">Belum ada</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">Tidak ada data peserta ditemukan pada undangan ini.</td>
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