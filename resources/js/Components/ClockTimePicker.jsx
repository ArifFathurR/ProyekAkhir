import { useState, useEffect, useRef } from 'react';

export default function ClockTimePicker({ value, onChange, placeholder = 'Pilih Waktu', align = 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('hours'); // 'hours' or 'minutes'
  
  // Ambil nilai awal jam dan menit, default ke '12' dan '00' jika kosong
  const initialTime = value ? value.split(':') : ['12', '00'];
  const [selectedHour, setSelectedHour] = useState(initialTime[0] ? String(initialTime[0]).padStart(2, '0') : '12');
  const [selectedMinute, setSelectedMinute] = useState(initialTime[1] ? String(initialTime[1]).padStart(2, '0') : '00');
  
  const containerRef = useRef(null);

  // Sinkronisasi state internal ketika props value berubah
  useEffect(() => {
    if (value) {
      const parts = value.split(':');
      if (parts[0]) setSelectedHour(String(parts[0]).padStart(2, '0'));
      if (parts[1]) setSelectedMinute(String(parts[1]).padStart(2, '0'));
    }
  }, [value]);

  // Deteksi klik di luar modal untuk menutup picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    const timeString = `${selectedHour}:${selectedMinute}`;
    onChange(timeString);
    setIsOpen(false);
  };

  // Posisi angka untuk jam bulat (ukuran ringkas)
  // Ring Dalam (0 - 11): radius 38px
  // Ring Luar (12 - 23): radius 65px
  const getHourPosition = (h) => {
    let radius = 65; // Ring luar
    let angleVal = h;

    if (h < 12) {
      radius = 38; // Ring dalam
      angleVal = h;
    } else {
      angleVal = h - 12;
    }

    // Sudut dalam radian, kurangi 3 agar indeks 0 (atau 12) berada di posisi jam 12 (atas)
    const angle = (angleVal - 3) * (30 * Math.PI / 180);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return { x, y, radius };
  };

  // Posisi angka untuk menit (kelipatan 5): radius 65px
  const getMinutePosition = (m) => {
    const radius = 65;
    const angleVal = m / 5;
    const angle = (angleVal - 3) * (30 * Math.PI / 180);
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return { x, y, radius };
  };

  // Hitung sudut rotasi dan panjang jarum penunjuk
  let handAngle = 0;
  let handLength = 65;

  if (activeMode === 'hours') {
    const h = parseInt(selectedHour);
    const { radius } = getHourPosition(h);
    handLength = radius;
    
    const angleVal = h < 12 ? h : h - 12;
    handAngle = (angleVal - 3) * 30; // 30 derajat per jam
  } else {
    const m = parseInt(selectedMinute);
    handLength = 65;
    const angleVal = m / 5;
    handAngle = (angleVal - 3) * 30; // 30 derajat per kelipatan 5 menit
  }

  // Generate opsi jam (0 - 23) dan menit kelipatan 5 (00 - 55)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Tombol Input Trigger */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveMode('hours');
        }}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
      >
        <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>
          {value ? `${selectedHour}:${selectedMinute}` : placeholder}
        </span>
        <span className="text-gray-400">🕒</span>
      </div>

      {/* Popover Dial Jam Bulat Ringkas */}
      {isOpen && (
        <div
          className={`absolute mt-1.5 z-[999] bg-white border border-gray-200 rounded-xl shadow-2xl w-56 overflow-hidden transform transition-all duration-200 ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {/* Header Biru Ringkas */}
          <div className="bg-sky-500 px-3 py-3 text-white text-center flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveMode('hours')}
              className={`text-2xl font-bold transition-all duration-200 ${
                activeMode === 'hours' ? 'text-white opacity-100 scale-105' : 'text-sky-200 opacity-70 hover:opacity-90'
              }`}
            >
              {selectedHour}
            </button>
            <span className="text-2xl font-bold text-sky-200 opacity-70">:</span>
            <button
              type="button"
              onClick={() => setActiveMode('minutes')}
              className={`text-2xl font-bold transition-all duration-200 ${
                activeMode === 'minutes' ? 'text-white opacity-100 scale-105' : 'text-sky-200 opacity-70 hover:opacity-90'
              }`}
            >
              {selectedMinute}
            </button>
          </div>

          {/* Body Dial Lingkaran Ringkas */}
          <div className="py-3 px-2 bg-white flex flex-col items-center">
            {/* Jam Bulat (Clock Face) */}
            <div className="w-44 h-44 relative bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 select-none">
              {/* Titik Tengah */}
              <div className="w-2 h-2 bg-sky-500 rounded-full z-10"></div>

              {/* Jarum Penunjuk */}
              <div
                className="absolute bg-sky-500 origin-left z-0 transition-all duration-150"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${handLength}px`,
                  height: '2px',
                  transform: `rotate(${handAngle}deg) translateY(-50%)`,
                }}
              />

              {/* Tampilkan Angka Jam */}
              {activeMode === 'hours' &&
                hours.map((h) => {
                  const { x, y } = getHourPosition(h);
                  const isSelected = parseInt(selectedHour) === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => {
                        setSelectedHour(String(h).padStart(2, '0'));
                        // Otomatis pindah ke pemilihan menit setelah memilih jam
                        setTimeout(() => setActiveMode('minutes'), 250);
                      }}
                      className={`absolute w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-all duration-150 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none ${
                        isSelected
                          ? 'bg-sky-500 text-white font-bold z-10 shadow-sm scale-110'
                          : h < 12
                          ? 'text-gray-400 text-[9px] hover:bg-sky-50 hover:text-sky-500'
                          : 'text-gray-700 hover:bg-sky-50 hover:text-sky-500'
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                    >
                      {h}
                    </button>
                  );
                })}

              {/* Tampilkan Angka Menit */}
              {activeMode === 'minutes' &&
                minutes.map((m) => {
                  const { x, y } = getMinutePosition(m);
                  const isSelected = parseInt(selectedMinute) === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setSelectedMinute(String(m).padStart(2, '0'));
                      }}
                      className={`absolute w-6 h-6 rounded-full text-[11px] font-semibold flex items-center justify-center transition-all duration-150 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none ${
                        isSelected
                          ? 'bg-sky-500 text-white font-bold z-10 shadow-sm scale-110'
                          : 'text-gray-700 hover:bg-sky-50 hover:text-sky-500'
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                    >
                      {String(m).padStart(2, '0')}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Footer Tombol Aksi */}
          <div className="flex justify-end items-center gap-3 px-3 py-2 bg-gray-50 border-t border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-150 focus:outline-none"
            >
              BATAL
            </button>
            <button
              type="button"
              onClick={handleOk}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors duration-150 focus:outline-none"
            >
              OKE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
