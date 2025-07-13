import { useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
// Belum ada filter buat undangan untuk setiap pengawai pertim
export default function CreateUndangan({ kegiatans = [], tims = [], pegawaiList = [], anggotaTim = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    kegiatan_id: '',
    nomor_surat: '',
    sifat: '',
    hari: '',
    tanggal: '',
    waktu: '',
    tempat: '',
    agenda: '',
    status: 'Menunggu',
    status_pelaksanaan: 'Belum Dilaksanakan',
    komentar: '',
    judul: '',
    deskripsi: '',
    tim_id: '',
    user_ids: [],
  });

  const [selectedPegawai, setSelectedPegawai] = useState([]);

  const pegawaiOptions = useMemo(() =>
    pegawaiList.map(p => ({
      value: String(p.id),
      label: `${p.name} (${p.email})`
    })), [pegawaiList]);

  useEffect(() => {
    setData('user_ids', selectedPegawai.map(p => p.value));
  }, [selectedPegawai]);

  useEffect(() => {
    if (data.tim_id) {
      const anggota = anggotaTim
        .filter(a => a.tim_id == data.tim_id)
        .map(a => String(a.user_id));
      const matched = pegawaiOptions.filter(p => anggota.includes(p.value));
      setSelectedPegawai(matched);
    }
  }, [data.tim_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('undangan_kegiatan.store'));
  };

  return (
    <div className="flex justify-start">
      <SidebarPegawai />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <div className="bg-white shadow rounded p-8 mx-auto">
            <h2 className="text-xl font-semibold text-center mb-8">Buat Undangan Kegiatan</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Kegiatan */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Kegiatan Utama</label>
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

              {/* Nomor & Sifat */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Nomor Surat</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={data.nomor_surat}
                    onChange={(e) => setData('nomor_surat', e.target.value)}
                  />
                  {errors.nomor_surat && <div className="text-red-500 text-sm">{errors.nomor_surat}</div>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sifat</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={data.sifat}
                    onChange={(e) => setData('sifat', e.target.value)}
                  />
                  {errors.sifat && <div className="text-red-500 text-sm">{errors.sifat}</div>}
                </div>
              </div>

              {/* Hari / Tanggal / Waktu */}
              <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Hari</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={data.hari}
                    onChange={(e) => setData('hari', e.target.value)}
                  />
                  {errors.hari && <div className="text-red-500 text-sm">{errors.hari}</div>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tanggal</label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    value={data.tanggal}
                    onChange={(e) => setData('tanggal', e.target.value)}
                  />
                  {errors.tanggal && <div className="text-red-500 text-sm">{errors.tanggal}</div>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Waktu</label>
                  <input
                    type="time"
                    className="w-full border rounded px-3 py-2"
                    value={data.waktu}
                    onChange={(e) => setData('waktu', e.target.value)}
                  />
                  {errors.waktu && <div className="text-red-500 text-sm">{errors.waktu}</div>}
                </div>
              </div>

              {/* Tempat & Agenda */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tempat</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={data.tempat}
                    onChange={(e) => setData('tempat', e.target.value)}
                  />
                  {errors.tempat && <div className="text-red-500 text-sm">{errors.tempat}</div>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Agenda</label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={data.agenda}
                    onChange={(e) => setData('agenda', e.target.value)}
                  />
                  {errors.agenda && <div className="text-red-500 text-sm">{errors.agenda}</div>}
                </div>
              </div>

              {/* Judul */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Judul</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={data.judul}
                  onChange={(e) => setData('judul', e.target.value)}
                />
                {errors.judul && <div className="text-red-500 text-sm">{errors.judul}</div>}
              </div>

              {/* Deskripsi */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Deskripsi</label>
                <textarea
                  className="w-full border rounded px-3 py-2 h-28"
                  value={data.deskripsi}
                  onChange={(e) => setData('deskripsi', e.target.value)}
                />
                {errors.deskripsi && <div className="text-red-500 text-sm">{errors.deskripsi}</div>}
              </div>

              {/* Tim */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Pilih Tim (opsional)</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={data.tim_id}
                  onChange={(e) => setData('tim_id', e.target.value)}
                >
                  <option value="">Pilih Tim</option>
                  {tims.map((tim) => (
                    <option key={tim.id} value={tim.id}>{tim.nama_tim}</option>
                  ))}
                </select>
              </div>

              {/* Penerima */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Pilih Penerima (User)</label>
                <Select
                  isMulti
                  options={pegawaiOptions}
                  value={selectedPegawai}
                  onChange={setSelectedPegawai}
                  placeholder="Cari & pilih pegawai..."
                />
                {errors.user_ids && <div className="text-red-500 text-sm mt-1">{errors.user_ids}</div>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {processing ? 'Menyimpan...' : 'AJUKAN'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
