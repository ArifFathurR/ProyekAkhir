import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
  FileText,
  Info,
  PlusSquare,
  Clock,
  Settings,
  LogOut,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url } = usePage();

  const isActive = (path) => url.startsWith(path);

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
  ];

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
                  <span>{item.label}</span>
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
