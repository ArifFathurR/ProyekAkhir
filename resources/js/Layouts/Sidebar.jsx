import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  ClipboardList,
  FileEdit,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url, props } = usePage();
  const { pending_approvals = 0 } = props;

  // Toggle sidebar via global window event from Header
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

  // ✅ Update hanya bagian ini:
  const baseUrl = import.meta.env.VITE_APP_URL || '';
  const isActive = (path) => {
    const currentPath = url.replace(baseUrl, ''); // Hilangkan base url (misal /laravel)
    return currentPath.startsWith(path);
  };

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
        <div className="mb-6 mt-2 md:mt-0">
          <h2 className="font-bold text-lg hidden md:block">Dashboard Admin</h2>
          <p className="text-sm text-gray-500 hidden md:block">menu</p>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href={route('admin.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/dashboard-admin')
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Users size={18} />
                Kelola Pegawai
              </Link>
            </li>
            <li>
              <Link
                href={route('tim.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/tim')
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                <ClipboardList size={18} />
                Kelola Tim
              </Link>
            </li>
            <li>
              <Link
                href={route('anggota_tim.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/anggota_tim')
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                <UserPlus size={18} />
                Kelola Anggota Tim
              </Link>
            </li>
            <li>
              <Link
                href={route('kegiatan.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/kegiatan')
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                <FileEdit size={18} />
                <span className="flex-1">Kelola Kegiatan</span>
                {pending_approvals > 0 && (
                  <span className="flex-shrink-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold min-w-[20px] text-center animate-pulse">
                    {pending_approvals}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Pusat Akun */}
        <div className="mt-20 border-t pt-4">
          <p className="text-sm text-gray-400">Pusat Akun</p>
          <ul className="space-y-2 mt-2">
            <li>
              <Link
                href="/profile"
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/profile')
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-100'
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
