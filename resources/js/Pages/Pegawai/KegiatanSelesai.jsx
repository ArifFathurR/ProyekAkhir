import { useState } from 'react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { FaFilePdf } from 'react-icons/fa';
import MenuKegiatan from '@/Components/MenuKegiatan';
import FlashPopup from '@/Components/FlashPopup';
import InputTtd from '@/Components/InputTtd'; 
// Halaman pop up detail belum
export default function KegiatanSelesai({ kegiatan = [], auth }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dataPresensi, setDataPresensi] = useState({});

  return (
    <div className="flex justify-start">
      <SidebarPegawai />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Pusat Informasi Kegiatan</h2>

            <MenuKegiatan />

            <table className="w-full border text-sm mt-6">
              <thead className="bg-[#0B2E74] text-white">
                <tr className="text-center">
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Nama Kegiatan</th>
                  <th className="p-2 border">Sub-Kegiatan</th>
                  <th className="p-2 border">Tanggal</th>
                  <th className="p-2 border">Undangan</th>
                  {/* <th className="p-2 border">Presensi</th> */}
                  <th className='p-2 border'>Dokumentasi</th>
                </tr>
              </thead>
              <tbody>
                {kegiatan.length > 0 ? (
                  kegiatan.map((item, index) => (
                    <tr key={item.id} className="text-center border-t">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{item.nama_kegiatan}</td>
                      <td className="p-2">{item.sub_kegiatan}</td>
                      <td className="p-2">{item.tanggal}</td>
                      <td className="p-2">
                        <a
                          href={item.file_undangan}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-red-600 text-white px-2 py-1 rounded"
                        >
                          <FaFilePdf className="mr-1" /> PDF
                        </a>
                      </td>
                      <td className='p-2'> 
                        <button className='bg-blue-500 px-3 py-1 rounded text-white'>
                          Lihat
                        </button>
                      </td>
                      {/* <td className="py-2 text-center align-middle">
                        <button
                          onClick={() => {
                            setDataPresensi({
                              penerimaId: item.id,
                              userId: auth.user.id,
                              timId: item.tim_id,
                              undanganId: item.undangan_id
                            });
                            setShowPopup(true);
                          }}
                          className='bg-blue-500 text-white w-14 rounded-md shadow-md h-6'>
                          Isi
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      Tidak ada kegiatan ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* ✅ Pop-up untuk Input TTD
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow relative w-full max-w-lg">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-4 text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <InputTtd
              penerimaId={dataPresensi.penerimaId}
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
      )} */}


    </div>
  );
}
