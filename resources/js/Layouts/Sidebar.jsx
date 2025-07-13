import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url } = usePage(); // Mendapatkan URL saat ini

  const isActive = (path) => url.startsWith(path);

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
                href="/dashboard-admin"
                className={`flex items-center p-2 rounded ${isActive('/dashboard-admin') ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
              >
                👥 Kelola Pegawai
              </Link>
            </li>
            <li>
              <Link
                href={route('tim.index')}
                className={`flex items-center p-2 rounded ${isActive('/tim') ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
              >
                📋 Kelola Tim
              </Link>
            </li>
            <li>
              <Link
                href={route('anggota_tim.index')}
                className={`flex items-center p-2 rounded ${isActive('/anggota_tim') ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
              >
                👥 Kelola Anggota Tim
              </Link>
            </li>
            <li>
              <Link
                href={route('kegiatan.index')}
                className={`flex items-center p-2 rounded ${isActive('/kegiatan') ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
              >
                ✏️ Kelola Kegiatan
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-20 border-t pt-4 ">
          <p className="text-sm text-gray-400">Pusat Akun</p>
          <ul className="space-y-2 mt-2">
            <li>
              <Link
                href="/profile"
                className={`flex items-center p-2 rounded ${isActive('/profile') ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
              >
                ⚙️ Akun
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                method="post"
                as="button"
                className="flex items-center p-2 hover:bg-gray-100 rounded"
              >
                🚪 Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
