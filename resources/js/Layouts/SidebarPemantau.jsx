import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ClipboardList,
  CheckSquare,
  FileText,
  Camera,
  LogOut,
  Settings,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url } = usePage();

  const isActive = (path) => url.startsWith(path);

  return (
    <>
      {/* Mobile Toggle Header */}
      <div className="md:hidden bg-white p-4 shadow flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h2 className="font-bold text-lg">Dashboard Pemantau</h2>
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
          <h2 className="font-bold text-lg hidden md:block">Dashboard Pemantau</h2>
          <p className="text-sm text-gray-500 hidden md:block">menu</p>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href={route('pemantau.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/pemantau')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={route('pemantau.datapegawai')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/data-pegawai')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Users size={18} />
                Pegawai
              </Link>
            </li>
            <li>
              <Link
                href={route('pemantau.datatim')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/tim-data') && !url.includes('/create')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <UserCircle size={18} />
                Tim
              </Link>
            </li>
            <li>
              <Link
                href={route('pemantau.anggotatim')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/anggota-tim-data') && !url.includes('/create')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <CheckSquare size={18} />
                Anggota Tim
              </Link>
            </li>
            <li>
              <Link
                href={route('pemantau.datapresensi')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/presensi-kegiatan') && !url.includes('/create')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <ClipboardList size={18} />
                Lihat Presensi
              </Link>
            </li>
            <li>
              <Link
                href={route('pemantau.datadokumentasi')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/dokumentasi-kegiatan') && !url.includes('/create')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Camera size={18} />
                Dokumentasi Kegiatan
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
                    ? 'bg-blue-100 text-blue-600 font-semibold'
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
