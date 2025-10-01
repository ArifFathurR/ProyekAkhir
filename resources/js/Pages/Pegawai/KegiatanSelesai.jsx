import { useState } from 'react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { FaFilePdf } from 'react-icons/fa';
import MenuKegiatan from '@/Components/MenuKegiatan';
import FlashPopup from '@/Components/FlashPopup';
import axios from 'axios';
import PopupDokumentasi from '@/Components/PopupDokumentasi';

export default function KegiatanSelesai({ kegiatan = [], auth }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dokumentasi, setDokumentasi] = useState(null);

  const handleLihatDokumentasi = async (penerimaId) => {
    try {
      const response = await axios.get(`/get-dokumentasi/${penerimaId}`);
      setDokumentasi(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Gagal mengambil dokumentasi:', error);
    }
  };

  return (
    <div className="flex justify-start">
      <SidebarPegawai />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        
        <main className="pt-28 px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Kegiatan Selesai</h1>
              <p className="text-gray-600 mt-1">Daftar kegiatan yang telah selesai dilaksanakan</p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Card Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Pusat Informasi Kegiatan</h2>
                    <p className="text-sm text-gray-500 mt-1">Kegiatan yang telah selesai dan dokumentasinya</p>
                  </div>
                </div>

                {/* Menu Kegiatan */}
                <div className="mt-4">
                  <MenuKegiatan />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0B2E74] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Kegiatan</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Sub-Kegiatan</th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tanggal</th>
                      <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Undangan</th>
                      <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Dokumentasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {kegiatan?.length > 0 ? (
                      kegiatan.map((item, index) => (
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
                          <td className="px-6 py-4 whitespace-nowrap text-center">
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
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada kegiatan selesai</h3>
                            <p className="text-sm text-gray-500">Saat ini belum ada kegiatan yang telah selesai.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Komponen Pop-up */}
      <PopupDokumentasi
        show={showPopup}
        onClose={() => setShowPopup(false)}
        dokumentasi={dokumentasi}
      />
    </div>
  );
}