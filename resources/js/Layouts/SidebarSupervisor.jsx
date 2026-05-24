import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  FolderKanban,
  ClipboardList,
  MailCheck,
  CheckSquare,
  FileText,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url, props } = usePage();
  const { user_undangans = [], pending_approvals = 0 } = props;

  const [seenIds, setSeenIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('seen_undangans') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let currentTab = null;
    if (url.startsWith('/kegiatan-saya-supervisor')) {
      currentTab = 'saya';
    } else if (url.startsWith('/kegiatan-SedangBerlangsung-supervisor')) {
      currentTab = 'sedang';
    } else if (url.startsWith('/kegiatan-Selesai-supervisor')) {
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

  // Auto close on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [url]);

  const isActive = (path) => url.startsWith(path);

  // Hitung jumlah undangan belum dibaca
  const unreadItems = user_undangans.filter(item => !seenIds.includes(item.id));
  const totalUnread = unreadItems.length;

  return (
    <>
      {/* Overlay Mobile */}
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
          <h2 className="font-bold text-lg hidden md:block">Dashboard Supervisor</h2>
          <p className="text-sm text-gray-500 hidden md:block">Menu</p>
        </div>

        {/* Menu Navigasi */}
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href={route('dokumentasisupervisor.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/dokumentasisupervisor')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <FolderKanban size={18} />
                <span className="flex-1">Semua Kegiatan</span>
              </Link>
            </li>
            <li>
              <Link
                href={route('supervisor.show')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/kegiatan-saya-supervisor')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <ClipboardList size={18} />
                <span className="flex-1">Kegiatan Saya</span>
                {totalUnread > 0 && (
                  <span className="flex-shrink-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold min-w-[20px] text-center animate-pulse">
                    {totalUnread}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href={route('supervisor.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/supervisor') && !url.includes('/kegiatan-saya-supervisor') && !url.includes('/kegiatan-SedangBerlangsung-supervisor') && !url.includes('/kegiatan-Selesai-supervisor')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <MailCheck size={18} />
                <span className="flex-1">Konfirmasi Undangan</span>
                {pending_approvals > 0 && (
                  <span className="flex-shrink-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold min-w-[20px] text-center animate-pulse">
                    {pending_approvals}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href={route('penerima.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/penerima')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <CheckSquare size={18} />
                Lihat Presensi
              </Link>
            </li>
            {/* <li>
              <Link
                href={route('undangan_kegiatan.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/undangan_kegiatan')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <FileText size={18} />
                Status Pelaksanaan
              </Link>
            </li> */}
            <li>
              <Link
                href={route('supervisor.anggota_tim')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/anggota-tim')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Users size={18} />
                Anggota Tim
              </Link>
            </li>
          </ul>
        </nav>

        {/* Akun */}
        <div className="mt-20 border-t pt-4">
          <p className="text-sm text-gray-400">Pusat Akun</p>
          <ul className="space-y-2 mt-2">
            <li>
              <Link
                href="/profile"
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/profile')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Settings size={18} />
                Akun
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                method="post"
                as="button"
                className="flex items-center gap-2 p-2 hover:bg-gray-100 text-red-600 rounded"
              >
                <LogOut size={18} />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
