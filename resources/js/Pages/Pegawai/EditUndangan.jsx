import { useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';

export default function EditUndangan({ undangan, kegiatans = [] }) {
  const { data, setData, put, processing, errors } = useForm({
    kegiatan_id: undangan.kegiatan_id || '',
    nomor_surat: undangan.nomor_surat || '',
    sifat: undangan.sifat || '',
    hari: undangan.hari || '',
    tanggal: undangan.tanggal || '',
    waktu: undangan.waktu || '',
    tempat: undangan.tempat || '',
    agenda: undangan.agenda || '',
    status: undangan.status || 'Menunggu',
    status_pelaksanaan: undangan.status_pelaksanaan || 'Belum Dilaksanakan',
    komentar: undangan.komentar || '',
    judul: undangan.judul || '',
    deskripsi: undangan.deskripsi || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('undangan_kegiatan.update', undangan.id));
  };

  return (
    <div className="flex justify-start">
          <SidebarPegawai />
          <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
            <Header />
            <main className="pt-28 px-6">
              <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">Edit Undangan Kegiatan</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700">Kegiatan Utama</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={data.kegiatan_id}
                  onChange={(e) => setData('kegiatan_id', e.target.value)}
                >
                  <option value="">Pilih Kegiatan Utama</option>
                  {kegiatans.map((item) => (
                    <option key={item.id} value={item.id}>{item.nama_kegiatan}</option>
                  ))}
                </select>
                {errors.kegiatan_id && <div className="text-red-500 text-sm">{errors.kegiatan_id}</div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nomor Surat</label>
                  <input type="text" placeholder="Nomor Surat"
                    className="w-full border rounded px-3 py-2"
                    value={data.nomor_surat}
                    onChange={(e) => setData('nomor_surat', e.target.value)}
                  />
                  {errors.nomor_surat && <div className="text-red-500 text-sm">{errors.nomor_surat}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Sifat</label>
                  <input type="text" placeholder="Sifat"
                    className="w-full border rounded px-3 py-2"
                    value={data.sifat}
                    onChange={(e) => setData('sifat', e.target.value)}
                  />
                  {errors.sifat && <div className="text-red-500 text-sm">{errors.sifat}</div>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Hari</label>
                  <input type="text" placeholder="Hari"
                    className="w-full border rounded px-3 py-2"
                    value={data.hari}
                    onChange={(e) => setData('hari', e.target.value)}
                  />
                  {errors.hari && <div className="text-red-500 text-sm">{errors.hari}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Tanggal</label>
                  <input type="date"
                    className="w-full border rounded px-3 py-2"
                    value={data.tanggal}
                    onChange={(e) => setData('tanggal', e.target.value)}
                  />
                  {errors.tanggal && <div className="text-red-500 text-sm">{errors.tanggal}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Waktu</label>
                  <input type="time"
                    className="w-full border rounded px-3 py-2"
                    value={data.waktu}
                    onChange={(e) => setData('waktu', e.target.value)}
                  />
                  {errors.waktu && <div className="text-red-500 text-sm">{errors.waktu}</div>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Tempat</label>
                  <input type="text" placeholder="Tempat"
                    className="w-full border rounded px-3 py-2"
                    value={data.tempat}
                    onChange={(e) => setData('tempat', e.target.value)}
                  />
                  {errors.tempat && <div className="text-red-500 text-sm">{errors.tempat}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Agenda</label>
                  <input type="text" placeholder="Agenda"
                    className="w-full border rounded px-3 py-2"
                    value={data.agenda}
                    onChange={(e) => setData('agenda', e.target.value)}
                  />
                  {errors.agenda && <div className="text-red-500 text-sm">{errors.agenda}</div>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Judul</label>
                <input type="text" placeholder="Judul"
                  className="w-full border rounded px-3 py-2"
                  value={data.judul}
                  onChange={(e) => setData('judul', e.target.value)}
                />
                {errors.judul && <div className="text-red-500 text-sm">{errors.judul}</div>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea placeholder="Deskripsi"
                  className="w-full border rounded px-3 py-2 h-24"
                  value={data.deskripsi}
                  onChange={(e) => setData('deskripsi', e.target.value)}
                />
                {errors.deskripsi && <div className="text-red-500 text-sm">{errors.deskripsi}</div>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Komentar (opsional)</label>
                <textarea placeholder="Komentar (opsional)"
                  className="w-full border rounded px-3 py-2 h-20"
                  value={data.komentar}
                  onChange={(e) => setData('komentar', e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {processing ? 'Menyimpan...' : 'SIMPAN PERUBAHAN'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
