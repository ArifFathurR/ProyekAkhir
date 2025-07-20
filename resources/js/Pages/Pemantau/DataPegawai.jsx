import Header from '@/Components/Header';
import SidebarPemantau from '@/Layouts/SidebarPemantau';
import { router } from '@inertiajs/react';
import TabelPegawaiHeader from '@/Components/TabelPegawaiHeader';
import FlashPopup from '@/Components/FlashPopup';
import { useState } from 'react';

export default function DataPegawai({ users, filters }) {
  const [search, setSearch] = useState(filters.search || '');

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      router.delete(route('admin.pegawai.destroy', id));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('admin.pegawai.index'), { search }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <div className="flex justify-start">
      <SidebarPemantau />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup/>
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Data Pegawai</h2>

            {/* Form Search */}
            <form onSubmit={handleSearch} className="flex justify-between mb-4 items-center">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama atau email..."
                  className="border px-3 py-2 rounded w-64"
                />
                <button
                  type="submit"
                  className="bg-sky-500 text-white px-4 py-2 rounded"
                >
                  Cari
                </button>
              </div>
              {/* <button
                type="button"
                onClick={() => router.get(route('admin.pegawai.create'))}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Tambah
              </button> */}
            </form>

            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <TabelPegawaiHeader />
                <tbody>
                  {users?.data?.length > 0 ? (
                    users.data.map((user, idx) => (
                      <tr key={user.id} className="text-center border-t">
                        <td className="p-2">{idx + 1 + (users.current_page - 1) * users.per_page}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.no_hp}</td>
                        <td className="p-2">{user.role}</td>
                        {/* <td className="p-2 space-x-2">
                          <button
                            onClick={() => router.get(route('admin.pegawai.edit', user.id))}
                            className="bg-sky-500 text-white px-2 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-orange-500 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4 text-gray-500">
                        Tidak ada data pegawai ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <nav>
                <ul className="flex space-x-2">
                  {users.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className={`px-3 py-1 border rounded ${link.active ? 'bg-sky-500 text-white' : 'bg-white text-sky-500'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
