import { useState } from 'react';
import Header from '@/Components/Header';
import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import MenuKegiatanSupervisor from '@/Components/MenuKegiatanSupervisor';

export default function KalenderKegiatan({ kegiatan = [] }) {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredEvents, setHoveredEvents] = useState([]);

  // ✅ Mapping kegiatan ke format FullCalendar events (dengan waktu di extendedProps)
  const events = kegiatan.map(item => ({
    title: item.title,
    date: item.date,
    extendedProps: {
      waktu: item.waktu
    }
  }));

  // ✅ Group kegiatan per tanggal untuk tooltip
  const kegiatanPerTanggal = kegiatan.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push({ title: item.title, waktu: item.waktu });
    return acc;
  }, {});

  // ✅ Render isi event dengan waktu di tooltip
  const renderEventContent = (eventInfo) => {
    const date = eventInfo.event.startStr;
    const listKegiatan = kegiatanPerTanggal[date];

    return (
      <Tippy
        content={
          <ul className="text-sm">
            {listKegiatan.map((k, idx) => (
              <li key={idx}>
                {k.title} <span className="text-white">({k.waktu ?? '-'})</span>
              </li>
            ))}
          </ul>
        }
        placement="top"
      >
        <div className="text-xs px-1 py-0.5 rounded bg-sky-200 text-sky-800">
          {eventInfo.event.title}
        </div>
      </Tippy>
    );
  };

  return (
    <div className="flex justify-start">
      <SidebarSupervisor />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
            
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Kalender Kegiatan</h2>
            <MenuKegiatanSupervisor />
            <div className="w-full mt-6">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventContent={renderEventContent}
                height="auto"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
