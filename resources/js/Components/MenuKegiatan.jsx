import React, { useState, useEffect } from 'react';
import { FaListUl, FaCalendarAlt } from 'react-icons/fa';
import { router, usePage } from '@inertiajs/react';

const MenuKegiatan = () => {
  const { url, props } = usePage();
  const { user_undangans = [] } = props;
  const currentRoute = route().current();

  const [seenIds, setSeenIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('seen_undangans') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        setSeenIds(JSON.parse(localStorage.getItem('seen_undangans') || '[]'));
      } catch {}
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('seen_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('seen_updated', handleStorageChange);
    };
  }, []);

  const getUnreadCount = (tabValue) => {
    if (tabValue === 'kalender') return 0;
    return user_undangans.filter(
      item => item.tab === tabValue && !seenIds.includes(item.id)
    ).length;
  };

  const tabs = [
    {
      label: 'Acara akan datang',
      icon: <FaListUl />,
      value: 'saya',
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
      route: 'pegawai.kalender',
    },
  ];

  const handleSelect = (tab) => {
    router.get(route(tab.route));
  };

  return (
    <div className="flex justify-start gap-3 mb-6 mt-2 overflow-x-auto pb-2 whitespace-nowrap scrollbar-none">
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.route;
        const unreadCount = getUnreadCount(tab.value);
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
            {tab.icon} 
            <span>{tab.label}</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MenuKegiatan;
