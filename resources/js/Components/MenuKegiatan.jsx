import React from 'react';
import { FaListUl, FaCalendarAlt } from 'react-icons/fa';
import { router, usePage } from '@inertiajs/react';

const MenuKegiatan = () => {
  const { url } = usePage();
  const currentRoute = route().current();

  const tabs = [
    {
      label: 'Acara akan datang',
      icon: <FaListUl />,
      value: 'akan',
      route: 'pegawai.show',
    },
    {
      label: 'Acara sedang Berlangsung',
      icon: <FaListUl />,
      value: 'sedang',
      route: 'pegawai.sedang',
    },
    {
      label: 'Acara sudah selesai',
      icon: <FaListUl />,
      value: 'selesai',
      route: 'pegawai.selesai',
    },
    {
      label: 'Kalender',
      icon: <FaCalendarAlt />,
      value: 'kalender',
      route: 'pegawai.kegiatan.kalender',
    },
  ];

  const handleSelect = (tab) => {
    router.get(route(tab.route));
  };

  return (
    <div className="flex justify-start gap-3 mb-6 mt-14">
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.route;
        return (
          <button
            key={tab.value}
            onClick={() => handleSelect(tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded shadow border transition 
              ${isActive
                ? 'bg-blue-100 text-blue-800 shadow-md font-semibold'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {tab.icon} {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default MenuKegiatan;
