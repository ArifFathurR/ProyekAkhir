import { useState, useMemo } from 'react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { FaFilePdf } from 'react-icons/fa';
import MenuKegiatan from '@/Components/MenuKegiatan';
import FlashPopup from '@/Components/FlashPopup';
import axios from 'axios';
import PopupDokumentasi from '@/Components/PopupDokumentasi';
import PopupSemuaDokumentasi from '@/Components/PopupSemuaDokumentasi';
import StatsCard from '@/Components/StatsCard';
import TableCard from '@/Components/TableCard';

export default function KegiatanSelesai({ kegiatan = [], auth }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dokumentasi, setDokumentasi] = useState(null);
  const [showSemuaPopup, setShowSemuaPopup] = useState(false);
  const [semuaDokumentasi, setSemuaDokumentasi] = useState([]);
  const [search, setSearch] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('');

  const handleLihatDokumentasi = async (penerimaId) => {
    try {
      const response = await axios.get(`/get-dokumentasi/${penerimaId}`);
      setDokumentasi(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Gagal mengambil dokumentasi:', error);
    }
  };

  const handleLihatSemuaDokumentasi = async (undanganId) => {
    try {
      const response = await axios.get(`/get-all-dokumentasi/${undanganId}`);
      setSemuaDokumentasi(response.data);
      setShowSemuaPopup(true);
    } catch (error) {
      console.error('Gagal mengambil semua dokumentasi:', error);
    }
  };

  // Filter dan urutkan data kegiatan dari yang terbaru (tanggal & id)
  const filteredKegiatan = useMemo(() => {
    if (!kegiatan || !Array.isArray(kegiatan)) return [];

    let result = [...kegiatan];

    if (search.trim() !== '') {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          (item.nama_kegiatan && item.nama_kegiatan.toLowerCase().includes(q)) ||
          (item.sub_kegiatan && item.sub_kegiatan.toLowerCase().includes(q))
      );
    }

    if (filterTanggal) {
      result = result.filter((item) => {
        if (!item.tanggal) return false;
        return item.tanggal.includes(filterTanggal);
      });
    }

    result.sort((a, b) => {
      const dateA = new Date(a.tanggal || 0).getTime();
      const dateB = new Date(b.tanggal || 0).getTime();
      if (dateB !== dateA) {
        return dateB - dateA;
      }
      return (b.id || 0) - (a.id || 0);
    });

    return result;
  }, [kegiatan, search, filterTanggal]);

  // Hitung kegiatan yang memiliki dokumentasi
  const kegiatanDenganDokumentasi = kegiatan?.filter(item => item.has_dokumentasi).length || 0;
  const kegiatanTanpaDokumentasi = (kegiatan?.length || 0) - kegiatanDenganDokumentasi;

  // Stats data
  const statsData = [
    {
      title: 'Total Kegiatan Selesai',
      value: kegiatan?.length || 0,
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      iconBgColor: 'blue-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Dengan Dokumentasi',
      value: kegiatanDenganDokumentasi,
      gradientFrom: 'green-500',
      gradientTo: 'green-600',
      iconBgColor: 'green-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Tanpa Dokumentasi',
      value: kegiatanTanpaDokumentasi,
      gradientFrom: 'yellow-500',
      gradientTo: 'yellow-600',
      iconBgColor: 'yellow-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  const filterForm = (
    <div className="space-y-4">
      <MenuKegiatan />

      <div className="flex flex-col md:flex-row gap-3 items-center">
        {/* Input Pencarian */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama kegiatan atau sub-kegiatan..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
          />
        </div>

        {/* Filter Tanggal */}
        <div className="w-full md:w-48">
          <input
            type="date"
            value={filterTanggal}
            onChange={(e) => setFilterTanggal(e.target.value)}
            className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
          />
        </div>

        {/* Reset Filter Button */}
        {(search || filterTanggal) && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setFilterTanggal('');
            }}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            Reset Filter
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex justify-start min-h-screen w-full overflow-x-hidden">
      <SidebarPegawai />
      <div className="flex-1 min-w-0 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />

        <main className="pt-20 md:pt-28 px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Kegiatan Selesai</h1>
              <p className="text-gray-600 mt-1">Daftar kegiatan yang telah selesai dilaksanakan</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Main Content Card */}
            <TableCard
              title="Pusat Informasi Kegiatan"
              description="Kegiatan yang telah selesai dan dokumentasinya"
              filterForm={filterForm}
            >
              <table className="w-full">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Kegiatan</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Sub-Kegiatan</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Undangan</th>
                    {/* <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Dokumentasi</th> */}
                    <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredKegiatan?.length > 0 ? (
                    filteredKegiatan.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.nama_kegiatan}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.sub_kegiatan}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.tanggal}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <a
                            href={item.file_undangan}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors duration-200"
                          >
                            <FaFilePdf className="w-3 h-3 mr-1" />
                            PDF
                          </a>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleLihatDokumentasi(item.id)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200 shadow-sm"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Lihat Dokumentasi
                          </button>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleLihatSemuaDokumentasi(item.undangan_id)}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-xs font-medium rounded-md transition-colors duration-200 shadow-sm"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                            Lihat Semua Dokumentasi
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada kegiatan ditemukan</h3>
                          <p className="text-sm text-gray-500">
                            {search || filterTanggal
                              ? 'Tidak ada kegiatan yang sesuai dengan filter pencarian Anda.'
                              : 'Saat ini belum ada kegiatan yang telah selesai.'}
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

      {/* Komponen Pop-up */}
      <PopupDokumentasi
        show={showPopup}
        onClose={() => setShowPopup(false)}
        dokumentasi={dokumentasi}
      />

      <PopupSemuaDokumentasi
        show={showSemuaPopup}
        onClose={() => setShowSemuaPopup(false)}
        semuaDokumentasi={semuaDokumentasi}
      />
    </div>
  );
}