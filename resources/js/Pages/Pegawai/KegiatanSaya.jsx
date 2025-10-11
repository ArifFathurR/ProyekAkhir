import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { FaFilePdf } from 'react-icons/fa';
import MenuKegiatan from '@/Components/MenuKegiatan';
import { router } from '@inertiajs/react';
import ToggleStatus from '@/Components/ToggleStatus';
import FlashPopup from '@/Components/FlashPopup';
import StatsCard from '@/Components/StatsCard';
import TableCard from '@/Components/TableCard';

export default function KegiatanSaya({ kegiatan = [] }) {
  // Stats data
  const statsData = [
    {
      title: 'Total Kegiatan',
      value: kegiatan?.length || 0,
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      iconBgColor: 'blue-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: 'Terkonfirmasi',
      value: kegiatan?.filter(item => item.status_penerima === 'confirmed').length || 0,
      gradientFrom: 'green-500',
      gradientTo: 'green-600',
      iconBgColor: 'green-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      )
    },
    {
      title: 'Menunggu',
      value: kegiatan?.filter(item => item.status_penerima !== 'confirmed').length || 0,
      gradientFrom: 'yellow-500',
      gradientTo: 'orange-600',
      iconBgColor: 'yellow-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
        </svg>
      )
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Kegiatan Saya</h1>
              <p className="text-gray-600 mt-1">Daftar kegiatan yang ditugaskan kepada Anda</p>
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
              description="Kegiatan yang ditugaskan dan perlu konfirmasi"
              filterForm={<MenuKegiatan />}
            >
              <table className="w-full">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Nama Kegiatan</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Sub-Kegiatan</th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Undangan</th>
                    <th className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider">Konfirmasi</th>
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
                          <div className="flex justify-center items-center">
                            <ToggleStatus
                              id={item.id}
                              defaultStatus={item.status_penerima}
                              routeName="pegawai.konfirmasi.toggle"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">Tidak ada kegiatan</h3>
                          <p className="text-sm text-gray-500">Saat ini tidak ada kegiatan yang ditugaskan kepada Anda.</p>
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