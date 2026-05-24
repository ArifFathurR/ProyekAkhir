import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  FileText,
  Info,
  PlusSquare,
  Clock,
  Settings,
  LogOut,
  History,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url, props } = usePage();
  const { user_undangans = [] } = props;

  const [seenIds, setSeenIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('seen_undangans') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let currentTab = null;
    if (url.startsWith('/kegiatan-saya')) {
      currentTab = 'saya';
    } else if (url.startsWith('/kegiatan-SedangBerlangsung')) {
      currentTab = 'sedang';
    } else if (url.startsWith('/kegiatan-Selesai')) {
      currentTab = 'selesai';
    }

    if (currentTab) {
      const tabIds = user_undangans
        .filter(item => item.tab === currentTab)
        .map(item => item.id);

      if (tabIds.length > 0) {
        const hasUnseen = tabIds.some(id => !seenIds.includes(id));
        if (hasUnseen) {
          const newSeenIds = Array.from(new Set([...seenIds, ...tabIds]));
          localStorage.setItem('seen_undangans', JSON.stringify(newSeenIds));
          setSeenIds(newSeenIds);
          window.dispatchEvent(new Event('seen_updated'));
        }
      }
    }
  }, [url, user_undangans]);

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

  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsOpen(prev => !prev);
    };
    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, []);

  // Tutup sidebar otomatis ketika berpindah halaman di mobile
  useEffect(() => {
    setIsOpen(false);
  }, [url]);

  const isActive = (path) => url.startsWith(path);

  // Hitung jumlah undangan belum dibaca
  const unreadItems = user_undangans.filter(item => !seenIds.includes(item.id));
  const totalUnread = unreadItems.length;

  const menuItems = [
    {
      href: route('dokumentasi_kegiatan.index'),
      icon: <FileText className="w-5 h-5" />,
      label: 'Dokumentasi Kegiatan Saya',
      active: isActive('/dokumentasi_kegiatan'),
    },
    {
      href: route('pegawai.show'),
      icon: <Info className="w-5 h-5" />,
      label: 'Kegiatan Saya',
      active: isActive('/kegiatan-saya'),
    },
    {
      href: route('undangan_kegiatan.create'),
      icon: <PlusSquare className="w-5 h-5" />,
      label: 'Buat Undangan Kegiatan',
      active: isActive('/undangan_kegiatan/create'),
    },
    {
      href: route('undangan_kegiatan.index'),
      icon: <Clock className="w-5 h-5" />,
      label: 'Status Pengajuan Undangan',
      active: isActive('/undangan_kegiatan') && !url.includes('/create'),
    },
    {
      href: route('pegawai.riwayat-presensi'),
      icon: <History className="w-5 h-5" />,
      label: 'Riwayat Presensi',
      active: isActive('/riwayat-presensi'),
    },
  ];

  return (
    <>
      {/* Sidebar Overlay on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white w-64 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-5rem)] shadow-lg p-4 fixed top-14 md:top-20 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:block`}
      >
        {/* Header */}
        <div className="mb-6 mt-2 md:mt-0">
          <h2 className="font-bold text-lg hidden md:block">Dashboard Pegawai</h2>
          <p className="text-sm text-gray-500 hidden md:block">Menu</p>
        </div>

        {/* Main Menu */}
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded-lg transition ${
                    item.active
                      ? 'bg-blue-100 text-black-700 font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.label === 'Kegiatan Saya' && totalUnread > 0 && (
                    <span className="flex-shrink-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold min-w-[20px] text-center animate-pulse">
                      {totalUnread}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account Section */}
        <div className="mt-10 border-t pt-4">
          <p className="text-sm text-gray-400 mb-2">Pusat Akun</p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/profile"
                className={`flex items-center gap-3 p-2 rounded-lg transition ${
                  isActive('/profile')
                    ? 'bg-emerald-100 text-emerald-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Pengaturan Akun</span>
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                method="post"
                as="button"
                className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
