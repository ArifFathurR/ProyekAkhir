import { useState } from 'react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { FaFilePdf } from 'react-icons/fa';
import MenuKegiatan from '@/Components/MenuKegiatan';
import FlashPopup from '@/Components/FlashPopup';
import InputTtd from '@/Components/InputTtd';

export default function KegiatanSedangBerlangsung({ kegiatan = [], auth }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dataPresensi, setDataPresensi] = useState({});

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
              <h1 className="text-2xl font-bold text-gray-900">Kegiatan Sedang Berlangsung</h1>
              <p className="text-gray-600 mt-1">Daftar kegiatan yang sedang berjalan</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Kegiatan</p>
                    <p className="text-2xl font-bold">{kegiatan?.length || 0}</p>
                  </div>
                  <div className="bg-blue-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Sedang Berlangsung</p>
                    <p className="text-2xl font-bold">{kegiatan?.length || 0}</p>
                  </div>
                  <div className="bg-orange-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Perlu Presensi</p>
                    <p className="text-2xl font-bold">{kegiatan?.length || 0}</p>
                  </div>
                  <div className="bg-green-400 bg-opacity-50 rounded-full p-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
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
                    <h2 className="text-lg font-semibold text-gray-900">Pusat Informasi Kegiatan</h2>
                    <p className="text-sm text-gray-500 mt-1">Kegiatan yang sedang berlangsung dan memerlukan presensi</p>
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
                      <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Presensi</th>
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
                              onClick={() => {
                                setDataPresensi({
                                  penerimaId: item.id,
                                  userId: auth.user.id,
                                  timId: item.tim_id,
                                  undanganId: item.undangan_id
                                });
                                setShowPopup(true);
                              }}
                              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors duration-200 shadow-sm"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Isi Presensi
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada kegiatan berlangsung</h3>
                            <p className="text-sm text-gray-500">Saat ini tidak ada kegiatan yang sedang berlangsung.</p>
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

      {/* Pop-up untuk Input TTD */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl relative w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Input Presensi</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <InputTtd
                penerimaId={dataPresensi.penerimaId}
                onClose={() => setShowPopup(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}