import { useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import Header from '@/Components/Header';
import SidebarPemantau from '@/Layouts/SidebarPemantau';
import FlashPopup from '@/Components/FlashPopup';
import TableCard from '@/Components/TableCard';
import MenuKegiatan from '@/Components/MenuKegiatan';
import { FaFilePdf } from 'react-icons/fa';
import PopupDokumentasi from '@/Components/PopupDokumentasi';
import PopupSemuaDokumentasi from '@/Components/PopupSemuaDokumentasi';
import StatsCard from '@/Components/StatsCard';

export default function DataDokumentasi({ kegiatan_data = {}, total_foto = 0, filters = {} }) {
  const [search, setSearch] = useState(filters.search || '');
  const [createdAt, setCreatedAt] = useState(filters.created_at || '');

  const [showPopup, setShowPopup] = useState(false);
  const [dokumentasi, setDokumentasi] = useState(null);
  const [showSemuaPopup, setShowSemuaPopup] = useState(false);
  const [semuaDokumentasi, setSemuaDokumentasi] = useState([]);

  const handleLihatDokumentasi = async (penerimaId) => {
    if (!penerimaId) {
      alert("ID Penerima tidak ditemukan untuk dokumentasi ini.");
      return;
    }
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

  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('pemantau.dokumentasi'), {
      search,
      created_at: createdAt,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <div className="flex justify-start">
      <SidebarPemantau />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />

        <main className="pt-28 px-4 sm:px-6 pb-8">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Data Dokumentasi</h1>
              <p className="text-gray-600 mt-1">Daftar seluruh dokumentasi kegiatan yang tersedia</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatsCard 
                title="Total Kegiatan Terdokumentasi"
                value={kegiatan_data.total || 0}
                gradientFrom="blue-500"
                gradientTo="blue-600"
                iconBgColor="blue-400"
                icon={
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                }
              />
              <StatsCard 
                title="Total Foto Dokumentasi"
                value={total_foto}
                gradientFrom="yellow-500"
                gradientTo="yellow-600"
                iconBgColor="yellow-400"
                icon={
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>

            {/* Main Content Card */}
            <TableCard
              title="Pusat Informasi Dokumentasi"
              description="Kelola dan lihat dokumentasi kegiatan"
              filterForm={
                <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama kegiatan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-sm w-64"
                  />
                  <input
                    type="date"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm text-sm w-48"
                  />
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm shadow-sm transition-colors"
                  >
                    Filter
                  </button>
                </form>
              }
              pagination={
                <div className="border-t border-gray-200 px-6 py-4">
                  <nav className="flex items-center justify-center">
                    <ul className="flex space-x-1">
                      {kegiatan_data.links?.map((link, index) => (
                        <li key={index}>
                          {link.url ? (
                            <a
                              href={link.url}
                              className={`px-3 py-1.5 border rounded-md text-sm font-medium transition-colors ${
                                link.active 
                                  ? 'bg-sky-500 border-sky-500 text-white' 
                                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                          ) : (
                            <span
                              className="px-3 py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-400 bg-gray-50 cursor-not-allowed"
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              }
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
                    <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Dokumentasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {kegiatan_data.data?.length > 0 ? (
                    kegiatan_data.data.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {index + 1 + (kegiatan_data.current_page - 1) * kegiatan_data.per_page}
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
                            onClick={() => handleLihatDokumentasi(item.penerima_id)}
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
                          <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada dokumentasi</h3>
                          <p className="text-sm text-gray-500">Saat ini belum ada dokumentasi yang tersedia.</p>
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
