import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
  const { url } = usePage();

  const isActive = (path) => url.startsWith(path);

  return (
    <>
      {/* Mobile Toggle Header */}
      <div className="md:hidden bg-white p-4 shadow flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h2 className="font-bold text-lg">Dashboard Supervisor</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl transition-all duration-200"
        >
          ☰
        </button>
      </div>

      {/* Overlay Mobile */}
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
        {/* Header */}
        <div className="mb-6">
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
                Semua Kegiatan
              </Link>
            </li>
            <li>
              <Link
                href="/kegiatan-saya-supervisor"
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/kegiatan-saya-supervisor')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <ClipboardList size={18} />
                Kegiatan Saya
              </Link>
            </li>
            <li>
              <Link
                href={route('supervisor.index')}
                className={`flex items-center gap-2 p-2 rounded ${
                  isActive('/supervisor')
                    ? 'bg-blue-100 text-black font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <MailCheck size={18} />
                Konfirmasi Undangan
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
            <li>
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
            </li>
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
