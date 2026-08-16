import Sidebar from '@/Layouts/Sidebar';
import Header from '@/Components/Header';
import FlashPopup from '@/Components/FlashPopup';
import ModalDetailUndangan from '@/Components/ModalDetailUndangan';
import { useState } from 'react';
import { FaChartBar, FaCheckDouble, FaTimes } from 'react-icons/fa';
import { MdOutlineAccessTime } from 'react-icons/md';
import { HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Dashboard({ statistik = {}, kegiatan = [] }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState(null);

  const years = Array.from(new Array(11), (val, index) => currentYear - 5 + index);

  const stats = [
    {
      icon: <FaChartBar size={32} className="text-blue-900" />,
      value: statistik.total ?? 0,
      label: 'Total Kegiatan',
    },
    {
      icon: (
        <div className="text-yellow-400 flex items-center gap-1">
          <HiOutlineCalendar size={28} />
          <HiOutlineArrowRight size={20} />
        </div>
      ),
      value: statistik.akanDatang ?? 0,
      label: 'Akan Datang',
    },
    {
      icon: <MdOutlineAccessTime size={32} className="text-green-500" />,
      value: statistik.berlangsung ?? 0,
      label: 'Sedang Dilaksanakan',
    },
    {
      icon: <FaCheckDouble size={32} className="text-sky-500" />,
      value: statistik.selesai ?? 0,
      label: 'Selesai',
    },
  ];

  const getStatusBadgeStyle = (status) => {
    if (status === 'Selesai') return 'bg-sky-100 text-sky-700 border border-sky-300';
    if (status === 'Belum Dilaksanakan' || status === 'Akan Datang' || status === 'Akan datang')
      return 'bg-red-100 text-red-500';
    if (status === 'Sedang Dilaksanakan') return 'bg-green-100 text-green-700 border border-green-300';
    return 'bg-gray-100 text-gray-600 border border-gray-300';
  };

  const eventsByMonth = {};
  kegiatan.forEach(item => {
    const date = dayjs(item.date);
    if (date.year() === selectedYear) {
      const month = date.month(); 
      const day = date.date();
      if (!eventsByMonth[month]) eventsByMonth[month] = {};
      if (!eventsByMonth[month][day]) eventsByMonth[month][day] = [];
      eventsByMonth[month][day].push(item);
    }
  });

  const handleDateClick = (monthIndex, day, events) => {
    if (!events || events.length === 0) return;
    const dateObj = dayjs().year(selectedYear).month(monthIndex).date(day);
    const dateFormatted = dateObj.locale('id').format('D MMMM YYYY');
    setSelectedDateData({
      dateString: dateFormatted,
      events: events,
    });
    setShowListModal(true);
  };

  const renderMonth = (monthIndex) => {
    const start = dayjs().year(selectedYear).month(monthIndex).date(1);
    const daysInMonth = start.daysInMonth();
    const startDay = start.day(); // 0: Sunday

    const cells = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(<td key={`empty-${i}`} className="h-16 border p-1 bg-gray-50/30"></td>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const events = eventsByMonth[monthIndex]?.[d] || [];
      const hasEvents = events.length > 0;

      cells.push(
        <td
          key={`day-${d}`}
          className={`h-16 border p-1 align-top text-xs relative ${hasEvents ? 'cursor-pointer hover:bg-amber-50/50 transition-colors' : ''}`}
          onClick={() => {
            if (hasEvents) {
              handleDateClick(monthIndex, d, events);
            }
          }}
        >
          <div className="text-right font-medium text-gray-700 pr-0.5">{d}</div>
          {hasEvents && (
            <div
              className="mt-1 bg-[#FFA800] hover:bg-[#e09400] text-white font-semibold rounded px-1.5 py-0.5 text-[10px] text-center shadow-sm transition-colors duration-150 truncate"
              title={`${events.length} Kegiatan`}
            >
              {events.length} Kegiatan
            </div>
          )}
        </td>
      );
    }

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(<tr key={i}>{cells.slice(i, i + 7)}</tr>);
    }

    return (
      <div key={monthIndex} className="w-full mb-6">
        <h3 className="text-sm font-semibold text-center mb-1">{MONTH_NAMES[monthIndex]}</h3>
        <table className="w-full text-[10px] border text-center">
          <thead>
            <tr className="bg-green-500 text-white">
              <th>Minggu</th><th>Senin</th><th>Selasa</th><th>Rabu</th><th>Kamis</th><th>Jumat</th><th>Sabtu</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {rows}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        <main className="pt-28 px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-center">Dashboard Admin</h2>
            <div className="w-40">
              <Select
                value={String(selectedYear)}
                onValueChange={(val) => setSelectedYear(Number(val))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={String(year)}>
                      Tahun {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                <div>{item.icon}</div>
                <div>
                  <div className="text-xl font-semibold">{item.value}</div>
                  <div className="text-sm text-gray-700">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
          </div>
        </main>
      </div>

      {/* Modal List Kegiatan */}
      {showListModal && selectedDateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative border-2 border-sky-400 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-900">
                List Kegiatan {selectedDateData.dateString}
              </h3>
              <button
                onClick={() => setShowListModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto max-h-[60vh] mb-6">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-800 text-gray-900 font-medium">
                    <th scope="col" className="py-2.5 px-3 text-left w-12 font-semibold">No</th>
                    <th scope="col" className="py-2.5 px-3 text-left font-semibold">Nama Kegiatan</th>
                    <th scope="col" className="py-2.5 px-3 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDateData.events.map((evt, idx) => (
                    <tr
                      key={evt.id || idx}
                      className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                    >
                      <td className="py-3 px-3 text-left font-medium text-gray-700">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEvent(evt);
                            setShowDetailModal(true);
                          }}
                          className="text-left font-medium text-gray-900 hover:text-blue-600 hover:underline transition-colors"
                        >
                          {evt.title || evt.nama_kegiatan}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusBadgeStyle(evt.status)}`}>
                          {evt.status === 'Belum Dilaksanakan' ? 'Akan datang' : evt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowListModal(false)}
                className="px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white text-sm font-medium rounded-lg shadow transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Undangan */}
      <ModalDetailUndangan
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedEvent(null);
        }}
        data={selectedEvent}
      />
    </div>
  );
}
