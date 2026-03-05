import { useState } from 'react';
import Header from '@/Components/Header';
import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import MenuKegiatanSupervisor from '@/Components/MenuKegiatanSupervisor';
import StatsCard from '@/Components/StatsCard';
import TableCard from '@/Components/TableCard';
import ModalDetailUndangan from '@/Components/ModalDetailUndangan';

export default function KalenderKegiatan({ kegiatan = [] }) {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoveredEvents, setHoveredEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);

  // ✅ Mapping kegiatan ke format FullCalendar events (dengan waktu dan rincian di extendedProps)
  const events = kegiatan.map(item => {
    // If we have time (waktu), combine with date for proper timeGrid format, otherwise just date
    let startDateTime = item.date;
    if (item.waktu) {
      // Assuming waktu is in HH:mm or HH:mm:ss format
      // Create a full ISO string for the start time
      startDateTime = `${item.date}T${item.waktu}`;
    }

    return {
      title: item.title,
      start: startDateTime,
      extendedProps: {
        waktu: item.waktu,
        nama_kegiatan: item.nama_kegiatan,
        sub_kegiatan: item.sub_kegiatan,
        tanggal_lengkap: item.tanggal_lengkap,
        tempat: item.tempat,
        agenda: item.agenda,
        file_undangan: item.file_undangan,
      }
    };
  });

  const handleEventClick = (clickInfo) => {
    setSelectedEventData({
      nama_kegiatan: clickInfo.event.extendedProps.nama_kegiatan,
      sub_kegiatan: clickInfo.event.extendedProps.sub_kegiatan,
      tanggal: clickInfo.event.startStr,
      tanggal_lengkap: clickInfo.event.extendedProps.tanggal_lengkap,
      waktu: clickInfo.event.extendedProps.waktu,
      tempat: clickInfo.event.extendedProps.tempat,
      agenda: clickInfo.event.extendedProps.agenda,
      file_undangan: clickInfo.event.extendedProps.file_undangan,
    });
    setIsModalOpen(true);
  };

  // ✅ Group kegiatan per tanggal untuk tooltip
  const kegiatanPerTanggal = kegiatan.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push({ title: item.title, waktu: item.waktu });
    return acc;
  }, {});

  // Hitung statistik kegiatan
  const totalKegiatan = kegiatan.length || 0;
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const kegiatanBulanIni = kegiatan.filter(item => {
    const eventDate = new Date(item.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  }).length || 0;

  const kegiatanMendatang = kegiatan.filter(item => {
    const eventDate = new Date(item.date);
    return eventDate > currentDate;
  }).length || 0;

  const tanggalAktif = Object.keys(kegiatanPerTanggal).length || 0;

  // Stats data
  const statsData = [
    {
      title: 'Total Kegiatan',
      value: totalKegiatan,
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      iconBgColor: 'blue-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Kegiatan Bulan Ini',
      value: kegiatanBulanIni,
      gradientFrom: 'green-500',
      gradientTo: 'green-600',
      iconBgColor: 'green-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm8 7a1 1 0 100-2 1 1 0 000 2zm-3-1a1 1 0 11-2 0 1 1 0 012 0zm-4 1a1 1 0 100-2 1 1 0 000 2zm8 3a1 1 0 100 2h.01a1 1 0 100-2H15zm-4 1a1 1 0 11-2 0 1 1 0 012 0zm-4 1a1 1 0 100-2 1 1 0 000 2zm8 3a1 1 0 100-2 1 1 0 000 2zm-3-1a1 1 0 11-2 0 1 1 0 012 0zm-4 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: 'Kegiatan Mendatang',
      value: kegiatanMendatang,
      gradientFrom: 'yellow-500',
      gradientTo: 'yellow-600',
      iconBgColor: 'yellow-400',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  // ✅ Render isi event dengan waktu di tooltip
  const renderEventContent = (eventInfo) => {
    const dateStr = eventInfo.event.startStr.split('T')[0];
    const listKegiatan = kegiatanPerTanggal[dateStr] || [];

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

        <main className="pt-28 px-4">
          <div className="w-full">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Kalender Kegiatan</h1>
              <p className="text-gray-600 mt-1">Lihat jadwal kegiatan dalam tampilan kalender</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Calendar Card */}
            <TableCard
              title="Kalender Kegiatan"
              description="Tampilan kalender untuk semua kegiatan yang dijadwalkan"
              filterForm={<MenuKegiatanSupervisor />}
            >
              <div className="p-6">
                <style dangerouslySetInnerHTML={{
                  __html: `
                  .fc .fc-button-primary {
                    background-color: #1e3a8a !important;
                    border-color: #1e3a8a !important;
                    color: white !important;
                    border-radius: 4px;
                    text-transform: capitalize;
                    font-weight: 500;
                  }
                  .fc .fc-button-primary:hover {
                    background-color: #1e40af !important;
                    border-color: #1e40af !important;
                  }
                  .fc .fc-button-primary:not(:disabled).fc-button-active,
                  .fc .fc-button-primary:not(:disabled):active {
                    background-color: #172554 !important;
                    border-color: #172554 !important;
                    box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.2) !important;
                  }
                  
                  /* Custom Header / Nama Hari styling (Bisa diubah warnanya disini) */
                  .fc-theme-standard th {
                    background-color: #eff6ff !important; /* warna background header (slate-50) */
                    border-bottom: 2px solid #e2e8f0 !important; /* warna garis bawah */
                  }
                  .fc-col-header-cell-cushion {
                    color: #475569 !important; /* warna teks nama hari (slate-600) */
                    font-weight: 600 !important;
                    padding: 12px 0 !important;
                  }

                  /* Custom Hari Ini (Today) styling */
                  .fc-theme-standard .fc-day-today {
                    background-color: #e0f2fe !important; /* light blue background */
                  }
                  .fc-day-today .fc-daygrid-day-number {
                    color: #0284c7 !important; /* blue text for number */
                    font-weight: bold;
                  }
                `}} />
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  eventContent={renderEventContent}
                  eventClick={handleEventClick}
                  height="auto"
                  allDaySlot={false}
                  slotMinTime="08:00:00"
                  slotMaxTime="18:00:00"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,timeGridDay'
                  }}
                  locale="id"
                  buttonText={{
                    today: 'Hari Ini',
                    month: 'Bulan',
                    week: 'Minggu',
                    day: 'Hari'
                  }}
                />
              </div>
            </TableCard>


          </div>
        </main>
      </div>

      <ModalDetailUndangan
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedEventData}
      />
    </div>
  );
}
