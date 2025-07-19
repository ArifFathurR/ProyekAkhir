import { useState } from 'react';
import Header from '@/Components/Header';
import SidebarSupervisor from '@/Layouts/SidebarSupervisor';
import { FaFilePdf } from 'react-icons/fa';
import MenuKegiatanSupervisor from '@/Components/MenuKegiatanSupervisor';
import FlashPopup from '@/Components/FlashPopup';
import axios from 'axios';
import PopupDokumentasi from '@/Components/PopupDokumentasi';

export default function KegiatanSelesai({ kegiatan = [], auth }) {
  const [showPopup, setShowPopup] = useState(false);
  const [dokumentasi, setDokumentasi] = useState(null);

  const handleLihatDokumentasi = async (penerimaId) => {
    try {
      const response = await axios.get(`/get-dokumentasi/${penerimaId}`);
      setDokumentasi(response.data);
      setShowPopup(true);
    } catch (error) {
      console.error('Gagal mengambil dokumentasi:', error);
    }
  };

  return (
    <div className="flex justify-start">
      <SidebarSupervisor />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <FlashPopup />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Pusat Informasi Kegiatan</h2>
            <MenuKegiatanSupervisor />

            <table className="w-full border text-sm mt-6">
              <thead className="bg-[#0B2E74] text-white">
                <tr className="text-center">
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Nama Kegiatan</th>
                  <th className="p-2 border">Sub-Kegiatan</th>
                  <th className="p-2 border">Tanggal</th>
                  <th className="p-2 border">Undangan</th>
                  <th className="p-2 border">Dokumentasi</th>
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
                      <td className="p-2">
                        <button
                          onClick={() => handleLihatDokumentasi(item.id)}
                          className="bg-blue-500 px-3 py-1 rounded text-white"
                        >
                          Lihat
                        </button>
                      </td>
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

      {/* Komponen Pop-up */}
      <PopupDokumentasi
        show={showPopup}
        onClose={() => setShowPopup(false)}
        dokumentasi={dokumentasi}
      />
    </div>
  );
}
