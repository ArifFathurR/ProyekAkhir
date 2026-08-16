import { useState } from 'react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import FlashPopup from '@/Components/FlashPopup';
import StatsCard from '@/Components/StatsCard';
import InputTtd from '@/Components/InputTtd';
import ModalDetailUndangan from '@/Components/ModalDetailUndangan';
import CustomCalendar from '@/Components/CustomCalendar';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle, AlertCircle, PlayCircle, FileText } from 'lucide-react';

export default function Dashboard({ stats = {}, kegiatanKalender = [], tabData = {}, auth }) {
  const [activeTab, setActiveTab] = useState('akanDatang');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [showPresensiModal, setShowPresensiModal] = useState(false);
  const [presensiData, setPresensiData] = useState({});

  const handleEventClickCustom = (evt) => {
    setSelectedEventData({
      nama_kegiatan: evt.nama_kegiatan,
      sub_kegiatan: evt.sub_kegiatan,
      tanggal: evt.date,
      tanggal_lengkap: evt.tanggal_lengkap,
      waktu: evt.waktu,
      tempat: evt.tempat,
      agenda: evt.agenda,
      file_undangan: evt.file_undangan,
    });
    setIsDetailModalOpen(true);
  };

  const handleOpenPresensi = (item) => {
    setPresensiData({
      penerimaId: item.penerima_id || item.id,
      userId: auth?.user?.id,
      timId: item.tim_id,
      undanganId: item.undangan_id,
    });
    setShowPresensiModal(true);
  };

  // Data statistik 4 kartu
  const statsCardsData = [
    {
      title: 'Total Acara Bulan Ini',
      value: stats.totalAcaraBulanIni || 0,
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      iconBgColor: 'blue-400',
      icon: <CalendarIcon className="w-6 h-6 text-white" />,
    },
    {
      title: 'Total Akan Datang',
      value: stats.totalAkanDatang || 0,
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      iconBgColor: 'blue-400',
      icon: <AlertCircle className="w-6 h-6 text-white" />,
    },
    {
      title: 'Sedang Dilaksanakan',
      value: stats.totalSedang || 0,
      gradientFrom: 'yellow-500',
      gradientTo: 'yellow-600',
      iconBgColor: 'yellow-400',
      icon: <PlayCircle className="w-6 h-6 text-white" />,
    },
    {
      title: 'Total Selesai',
      value: stats.totalSelesai || 0,
      gradientFrom: 'green-500',
      gradientTo: 'green-600',
      iconBgColor: 'green-400',
      icon: <CheckCircle className="w-6 h-6 text-white" />,
    },
  ];

  const currentTabList = tabData[activeTab] || [];

  return (
    <div className="flex justify-start min-h-screen w-full overflow-x-hidden">
      <SidebarPegawai />
      <div className="flex-1 min-w-0 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />

        <main className="pt-20 md:pt-28 px-4 pb-12">
          <div className="w-full">
            {/* Title Page */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Pegawai</h1>
              <p className="text-gray-600 mt-1">Ringkasan statistik, kalender bulanan, dan jadwal undangan kegiatan Anda</p>
            </div>

            {/* 4 Cards Statistik */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              {statsCardsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Card List Kegiatan Sedang Berlangsung (Full Width Solid Card, Tampil Jika Ada) */}
            {tabData.sedang && tabData.sedang.length > 0 && (
              <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                    </span>
                    <h2 className="text-base font-bold text-gray-900">Kegiatan Sedang Berlangsung</h2>
                    <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 font-semibold px-2.5 py-0.5 rounded-full">
                      {tabData.sedang.length} Kegiatan Memerlukan Presensi
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tabData.sedang.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-4 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {item.judul_undangan}
                        </h3>
                        <span className="text-xs text-gray-500 block truncate mt-0.5 font-normal">
                          {item.judul_kegiatan}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3 text-blue-500" />
                            {item.tanggal}
                          </span>
                          {item.waktu && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              {item.waktu}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">
                          {item.waktu_presensi ? (
                            <span className="text-green-600 font-semibold">Sudah Presensi</span>
                          ) : (
                            <span className="text-yellow-600 font-semibold">Belum Presensi</span>
                          )}
                        </span>
                        <button
                          onClick={() => handleOpenPresensi(item)}
                          className="inline-flex items-center px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-xs rounded-lg shadow-sm transition-all transform hover:scale-105"
                        >
                          <FileText className="w-3.5 h-3.5 mr-1" />
                          Isi Presensi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Grid: Kalender Bulanan & Undangan Kegiatan (Rasio 7 : 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column: Kalender Bulanan Modern Custom (7/10) */}
              <div className="lg:col-span-7">
                <CustomCalendar
                  events={kegiatanKalender}
                  onEventClick={handleEventClickCustom}
                />
              </div>

              {/* Right Column: Card List Undangan Kegiatan ber-Tab (3/10) */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Undangan Kegiatan</h2>
                  <p className="text-xs text-gray-500">Pilih tab untuk melihat daftar undangan</p>
                </div>

                {/* Tabs Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-xl mb-4 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('akanDatang')}
                    className={`flex-1 py-2 rounded-lg text-center transition-all ${
                      activeTab === 'akanDatang'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Akan Datang ({tabData.akanDatang?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab('sedang')}
                    className={`flex-1 py-2 rounded-lg text-center transition-all ${
                      activeTab === 'sedang'
                        ? 'bg-white text-yellow-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sedang ({tabData.sedang?.length || 0})
                  </button>
                  <button
                    onClick={() => setActiveTab('selesai')}
                    className={`flex-1 py-2 rounded-lg text-center transition-all ${
                      activeTab === 'selesai'
                        ? 'bg-white text-green-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Selesai ({tabData.selesai?.length || 0})
                  </button>
                </div>

                {/* Card List Container */}
                <div className="flex-1 overflow-y-auto max-h-[480px] pr-1 space-y-3">
                  {currentTabList.length > 0 ? (
                    currentTabList.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all duration-200 hover:shadow-md flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          {/* Judul Undangan */}
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {item.judul_undangan}
                          </h3>
                          {/* Judul Kegiatan (Huruf kecil di bawah judul undangan) */}
                          <span className="text-xs text-gray-500 block truncate mt-0.5 font-normal">
                            {item.judul_kegiatan}
                          </span>

                          {/* Info Tanggal & Waktu */}
                          <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="w-3 h-3 text-blue-500" />
                              {item.tanggal}
                            </span>
                            {item.waktu && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                {item.waktu}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex-shrink-0">
                          {activeTab === 'sedang' ? (
                            <button
                              onClick={() => handleOpenPresensi(item)}
                              className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-xs rounded-lg shadow-sm transition-all transform hover:scale-105"
                            >
                              <FileText className="w-3.5 h-3.5 mr-1" />
                              Presensi
                            </button>
                          ) : (
                            <a
                              href={item.file_undangan}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium text-xs rounded-lg shadow-sm transition-all transform hover:scale-105"
                            >
                              <FileText className="w-3.5 h-3.5 mr-1" />
                              Detail
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <CalendarIcon className="w-10 h-10 mb-2 stroke-1" />
                      <p className="text-xs font-medium">Tidak ada kegiatan pada tab ini.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Detail Kegiatan ketika Event Kalender diklik */}
      <ModalDetailUndangan
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={selectedEventData}
      />

      {/* Modal Presensi TTD */}
      {showPresensiModal && (
        <InputTtd
          penerimaId={presensiData.penerimaId}
          onClose={() => setShowPresensiModal(false)}
        />
      )}
    </div>
  );
}
