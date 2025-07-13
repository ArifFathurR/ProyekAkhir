import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function ToggleStatus({ id, defaultStatus = 'berhalangan', routeName }) {
  const [status, setStatus] = useState(defaultStatus);
  const isTerima = status === 'terima';

  const handleToggle = () => {
    const newStatus = isTerima ? 'berhalangan' : 'terima';
    setStatus(newStatus);

    router.post(route(routeName, id), {
      status_penerima: newStatus,
    }, {
      preserveScroll: true,
      only: ['kegiatan'],
    });
  };

  return (
    <label className="relative inline-block w-40 h-10">
      <input
        type="checkbox"
        className="sr-only"
        checked={isTerima}
        onChange={handleToggle}
      />
      <div
        className={`absolute w-full h-full rounded-full transition-colors duration-300 
        ${isTerima ? 'bg-sky-500' : 'bg-red-600'}`}
      ></div>

      {/* Label dynamic */}
      <span
        className="absolute left-12 py-2 text-white font-semibold text-sm pointer-events-none transition-all duration-300"
      >
        {isTerima ? 'Terima' : 'Berhalangan'}
      </span>

      {/* Bulatan */}
      <div
        className={`absolute top-0.5 w-9 h-9 bg-white rounded-full shadow-md transition-transform duration-300
        ${isTerima ? 'right-0.5' : 'left-0.5'}`}
      />
    </label>
  );
}
