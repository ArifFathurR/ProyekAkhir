import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
  const { url } = usePage();

  // ✅ Update hanya bagian ini:
  const baseUrl = import.meta.env.VITE_APP_URL || '';
  const isActive = (path) => {
    const currentPath = url.replace(baseUrl, ''); // Hilangkan base url (misal /laravel)
    return currentPath.startsWith(path);
  };

  return (
    <>
      {/* Mobile Toggle Header */}
      <div className="md:hidden bg-white p-4 shadow flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h2 className="font-bold text-lg">Dashboard Pegawai</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl transition-all duration-200"
        >
          ☰
        </button>
      </div>

      {/* Sidebar Overlay on Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white w-64 h-screen shadow-lg p-4 fixed top-20 left-0 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:block`}
      >
        <div className="mb-6">
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
                Kelola Kegiatan
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
