import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

export default function CustomCalendar({ events = [], onEventClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Nama Bulan dalam Bahasa Indonesia
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const daysOfWeek = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];

  // Navigasi Bulan
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Logika Matriks Hari Kalender
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonthCells = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    prevMonthCells.push({
      dayNumber: daysInPrevMonth - i,
      isCurrentMonth: false,
      dateString: null,
    });
  }

  const currentMonthCells = [];
  const todayObj = new Date();
  const isThisMonth = todayObj.getFullYear() === year && todayObj.getMonth() === month;

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    // Format YYYY-MM-DD
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;

    const isToday = isThisMonth && todayObj.getDate() === day;

    currentMonthCells.push({
      dayNumber: day,
      isCurrentMonth: true,
      isToday,
      dateString,
    });
  }

  const totalGridCells = 35; // Standard 5 minggu grid
  const totalUsedCells = prevMonthCells.length + currentMonthCells.length;
  const remainingCellsCount = totalUsedCells > 35 ? 42 - totalUsedCells : 35 - totalUsedCells;

  const nextMonthCells = [];
  for (let day = 1; day <= remainingCellsCount; day++) {
    nextMonthCells.push({
      dayNumber: day,
      isCurrentMonth: false,
      dateString: null,
    });
  }

  const allGridCells = [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];

  // Mapping Event per Tanggal
  const eventsByDate = events.reduce((acc, item) => {
    if (item.date) {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
    }
    return acc;
  }, {});

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 transition-all duration-300">
      {/* Calendar Header Navigasi */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              {monthNames[month]} {year}
            </h2>
            <p className="text-xs text-gray-500 font-medium">Jadwal Acara & Undangan Kegiatan</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToday}
            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-all"
          >
            Hari Ini
          </button>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded-md transition-all"
              title="Bulan Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded-md transition-all"
              title="Bulan Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Days of Week Bar */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center">
        {daysOfWeek.map((day, idx) => (
          <div
            key={idx}
            className={`py-2 text-[11px] font-bold uppercase tracking-wider ${
              idx === 0 || idx === 6 ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid Tanggal Kalender */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {allGridCells.map((cell, idx) => {
          const dayEvents = cell.dateString ? eventsByDate[cell.dateString] || [] : [];
          const maxVisibleEvents = 2;
          const overflowCount = dayEvents.length - maxVisibleEvents;

          return (
            <div
              key={idx}
              className={`min-h-[90px] md:min-h-[105px] p-1.5 md:p-2 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                !cell.isCurrentMonth
                  ? 'bg-gray-50/40 border-transparent text-gray-300 pointer-events-none'
                  : cell.isToday
                  ? 'bg-blue-50/40 border-blue-500/40 shadow-sm'
                  : 'bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50/20'
              }`}
            >
              {/* Top Cell: Number Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center justify-center text-xs font-semibold w-6 h-6 rounded-full transition-all ${
                    cell.isToday
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30 ring-2 ring-blue-200'
                      : cell.isCurrentMonth
                      ? 'text-gray-700'
                      : 'text-gray-300'
                  }`}
                >
                  {cell.dayNumber}
                </span>

                {dayEvents.length > 0 && cell.isCurrentMonth && (
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                )}
              </div>

              {/* Middle Cell: Event Pills List */}
              <div className="flex-1 my-1 space-y-1 overflow-hidden">
                {dayEvents.slice(0, maxVisibleEvents).map((evt, eIdx) => (
                  <button
                    key={eIdx}
                    onClick={() => onEventClick && onEventClick(evt)}
                    className="w-full text-left px-2 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/60 rounded-md text-[10px] md:text-xs font-medium text-blue-900 truncate transition-all shadow-2xs group flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="truncate group-hover:text-blue-700">{evt.title}</span>
                  </button>
                ))}

                {overflowCount > 0 && (
                  <span className="block text-[10px] font-semibold text-blue-600 bg-blue-50/80 px-1.5 py-0.5 rounded text-center">
                    +{overflowCount} kegiatan lagi
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
