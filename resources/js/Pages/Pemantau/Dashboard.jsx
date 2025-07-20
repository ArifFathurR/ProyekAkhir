import SidebarPemantau from '@/Layouts/SidebarPemantau';
import Header from '@/Components/Header';
import FlashPopup from '@/Components/FlashPopup';
import { useEffect, useState } from 'react';
import { FaChartBar, FaCheckDouble } from 'react-icons/fa';
import { MdOutlineAccessTime } from 'react-icons/md';
import { HiOutlineCalendar, HiOutlineArrowRight } from 'react-icons/hi';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Dashboard({ statistik = {}, kegiatan = [] }) {
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
      label: 'Sedang Berlangsung',
    },
    {
      icon: <FaCheckDouble size={32} className="text-sky-500" />,
      value: statistik.selesai ?? 0,
      label: 'Selesai',
    },
  ];

  const getStatusColor = (status) => {
    if (status === 'Selesai') return 'bg-green-500 text-white';
    if (status === 'Belum Dilaksanakan' || status === 'Akan Datang') return 'bg-yellow-400 text-black';
    return 'bg-gray-300';
  };

  const eventsByMonth = {};
  kegiatan.forEach(item => {
    const date = dayjs(item.date);
    const month = date.month(); // 0-indexed
    const day = date.date();
    if (!eventsByMonth[month]) eventsByMonth[month] = {};
    if (!eventsByMonth[month][day]) eventsByMonth[month][day] = [];
    eventsByMonth[month][day].push(item);
  });

  const renderMonth = (monthIndex) => {
    const start = dayjs().month(monthIndex).date(1);
    const daysInMonth = start.daysInMonth();
    const startDay = start.day(); // 0: Sunday

    const cells = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(<td key={`empty-${i}`} className="h-16 border p-1"></td>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const events = eventsByMonth[monthIndex]?.[d] || [];
      cells.push(
        <td key={`day-${d}`} className="h-16 border p-1 align-top text-xs">
          <div>{d}</div>
          {events.map((evt, idx) => (
            <div
              key={idx}
              className={`mt-1 rounded px-1 text-[10px] truncate ${getStatusColor(evt.status)}`}
              title={evt.title}
            >
              {evt.title}
            </div>
          ))}
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
          <tbody className='bg-white'>
            {rows}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex justify-start">
      <SidebarPemantau />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        <main className="pt-28 px-6">
          <h2 className="text-xl font-semibold text-center mb-6">Dashboard</h2>

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
    </div>
  );
}
