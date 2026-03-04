import { usePage, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { FaUserEdit, FaSyncAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  const { auth } = usePage().props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-[#0B2E74] text-white justify-between items-center px-4 md:px-6 py-5 shadow">
      <div className="flex items-center gap-2">
        <img src="/storage/logo_bps.png" alt="Logo" className="w-15 h-10" />
        <div className="text-sm md:text-lg font-bold">
          BADAN PUSAT STATISTIK PROVINSI RIAU
        </div>
      </div>
      <div className="flex items-center gap-4 text-md">
        <button title="Notifikasi" className="hover:text-gray-300 transition">🔔</button>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition"
          >
            <span className="font-medium hidden sm:block">{auth?.user?.name || 'User'}</span>
            <img src="/storage/profil.png" alt="Admin" className="w-10 h-10 rounded-full bg-white object-cover border-2 border-transparent hover:border-blue-300 transition" />
            <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 text-gray-700">
              <Link
                href={route('profile.edit')}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaUserEdit className="text-gray-500" />
                Edit Profile
              </Link>

              <Link
                href={route('role.select')}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition"
                onClick={() => setIsDropdownOpen(false)}
              >
                <FaSyncAlt className="text-gray-500" />
                Switch Role
              </Link>

              <div className="border-t border-gray-100 my-1"></div>

              <Link
                href={route('logout')}
                method="post"
                as="button"
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <FaSignOutAlt />
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
