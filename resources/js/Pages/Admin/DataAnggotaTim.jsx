import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import FlashPopup from '@/Components/FlashPopup';
import CreateAnggotaTim from './CreateAnggotaTim';
import EditAnggotaTim from './EditAnggotaTim';
import Swal from 'sweetalert2';

export default function DataAnggotaTim({ anggota_tims, filters = {}, tims = [], users = [] }) {
  const { props } = usePage();
  const [search, setSearch] = useState(filters.search || '');
  const [selectedTim, setSelectedTim] = useState(filters.tim || '');
  const [flashMessage, setFlashMessage] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAnggotaTim, setSelectedAnggotaTim] = useState(null);

  useEffect(() => {
    if (props.flash?.success) {
      setFlashMessage(props.flash.success);
      const timer = setTimeout(() => setFlashMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [props.flash]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Hapus Anggota Tim?',
      text: "Data anggota tim yang terhapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route('anggota_tim.destroy', id), {
          onSuccess: () => {
            Swal.fire({
              title: 'Terhapus!',
              text: 'Data anggota tim telah berhasil dihapus.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        });
      }
    });
  };

  const handleFilter = () => {
    router.get(
      route('anggota_tim.index'),
      { search, tim: selectedTim },
      { preserveState: true }
    );
  };

  const handleReset = () => {
    setSearch('');
    setSelectedTim('');
    router.get(route('anggota_tim.index'));
  };

  const handleOpenEdit = (item) => {
    setSelectedAnggotaTim(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />

        <main className="pt-28 px-4">
          <div className="w-full">
            {/* Title Page */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Anggota Tim</h1>
              <p className="text-gray-600 mt-1">Kelola daftar penugasan pegawai ke dalam tim</p>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Header Card & Filter */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Data Anggota Tim</h2>
                    <p className="text-sm text-gray-500 mt-1">Daftar seluruh anggota tim kerja</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(true)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Tambah Anggota Tim
                    </button>
                  </div>
                </div>

                {/* Form Filter & Search */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFilter();
                  }}
                  className="mt-4"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama pegawai..."
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="w-full sm:w-64">
                      <select
                        value={selectedTim}
                        onChange={(e) => setSelectedTim(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Semua Tim</option>
                        {tims?.map((tim) => (
                          <option key={tim.id} value={tim.id}>
                            {tim.nama_tim}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm"
                      >
                        Cari
                      </button>
                      {(search || selectedTim) && (
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">No</th>
                      <th className="px-6 py-3">Nama Pegawai</th>
                      <th className="px-6 py-3">Nama Tim</th>
                      <th className="px-6 py-3">Role / Jabatan</th>
                      <th className="px-6 py-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {anggota_tims?.data?.length > 0 ? (
                      anggota_tims.data.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {idx + 1 + (anggota_tims.current_page - 1) * anggota_tims.per_page}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {item.user?.name || '-'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                              {item.tim?.nama_tim || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700 font-medium">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                              item.role?.toLowerCase().includes('ketua')
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {item.role || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="inline-flex items-center px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium rounded-md transition-colors"
                              >
                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="inline-flex items-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors"
                              >
                                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                          Tidak ada data anggota tim.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {anggota_tims?.links && anggota_tims.links.length > 3 && (
                <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Menampilkan {anggota_tims.from || 0} - {anggota_tims.to || 0} dari {anggota_tims.total || 0} data
                  </div>
                  <nav className="flex space-x-2">
                    {anggota_tims.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${link.active ? 'bg-blue-600 text-white' : link.url ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal Tambah Anggota Tim */}
      <CreateAnggotaTim
        show={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        users={users}
        tims={tims}
      />

      {/* Modal Edit Anggota Tim */}
      <EditAnggotaTim
        show={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAnggotaTim(null);
        }}
        anggota_tim={selectedAnggotaTim}
        users={users}
        tims={tims}
      />
    </div>
  );
}