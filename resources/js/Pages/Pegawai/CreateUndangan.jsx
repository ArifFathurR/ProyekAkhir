import { useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import Header from '@/Components/Header';
import SidebarPegawai from '@/Layouts/SidebarPegawai';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';

// Belum ada filter buat undangan untuk setiap pengawai pertim
export default function CreateUndangan({ kegiatans = [], tims = [], pegawaiList = [], anggotaTim = [] }) {
  const { data, setData, post, processing, errors } = useForm({
    kegiatan_id: '',
    nomor_surat: '',
    sifat: '',
    hari: '',
    tanggal: '',
    waktu: '',
    waktu_selesai: '',
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
              <div className="space-y-2">
                <Label>Kegiatan Utama</Label>
                <Select
                  value={String(data.kegiatan_id)}
                  onValueChange={(value) => setData('kegiatan_id', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kegiatan Utama" />
                  </SelectTrigger>
                  <SelectContent>
                    {kegiatans.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.nama_kegiatan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.kegiatan_id && <div className="text-red-500 text-sm mt-1">{errors.kegiatan_id}</div>}
              </div>

              {/* Nomor & Sifat */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <Label>Nomor Surat</Label>
                  <Input
                    type="text"
                    value={data.nomor_surat}
                    onChange={(e) => setData('nomor_surat', e.target.value)}
                  />
                  {errors.nomor_surat && <div className="text-red-500 text-sm mt-1">{errors.nomor_surat}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Sifat</Label>
                  <Input
                    type="text"
                    value={data.sifat}
                    onChange={(e) => setData('sifat', e.target.value)}
                  />
                  {errors.sifat && <div className="text-red-500 text-sm mt-1">{errors.sifat}</div>}
                </div>
              </div>

              {/* Hari / Tanggal / Waktu */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <Label>Hari</Label>
                  <Input
                    type="text"
                    value={data.hari}
                    onChange={(e) => setData('hari', e.target.value)}
                  />
                  {errors.hari && <div className="text-red-500 text-sm mt-1">{errors.hari}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Input
                    type="date"
                    value={data.tanggal}
                    onChange={(e) => setData('tanggal', e.target.value)}
                  />
                  {errors.tanggal && <div className="text-red-500 text-sm mt-1">{errors.tanggal}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Waktu Mulai</Label>
                  <Input
                    type="time"
                    value={data.waktu}
                    onChange={(e) => setData('waktu', e.target.value)}
                  />
                  {errors.waktu && <div className="text-red-500 text-sm mt-1">{errors.waktu}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Waktu Selesai</Label>
                  <Input
                    type="time"
                    value={data.waktu_selesai}
                    onChange={(e) => setData('waktu_selesai', e.target.value)}
                  />
                  {errors.waktu_selesai && <div className="text-red-500 text-sm mt-1">{errors.waktu_selesai}</div>}
                </div>
              </div>

              {/* Tempat & Agenda */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="space-y-2">
                  <Label>Tempat</Label>
                  <Input
                    type="text"
                    value={data.tempat}
                    onChange={(e) => setData('tempat', e.target.value)}
                  />
                  {errors.tempat && <div className="text-red-500 text-sm mt-1">{errors.tempat}</div>}
                </div>
                <div className="space-y-2">
                  <Label>Agenda</Label>
                  <Input
                    type="text"
                    value={data.agenda}
                    onChange={(e) => setData('agenda', e.target.value)}
                  />
                  {errors.agenda && <div className="text-red-500 text-sm mt-1">{errors.agenda}</div>}
                </div>
              </div>

              {/* Judul */}
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input
                  type="text"
                  value={data.judul}
                  onChange={(e) => setData('judul', e.target.value)}
                />
                {errors.judul && <div className="text-red-500 text-sm mt-1">{errors.judul}</div>}
              </div>

              {/* Jenis Kegiatan (Deskripsi) */}
              <div className="space-y-2">
                <Label>Jenis Kegiatan</Label>
                <Select
                  value={data.deskripsi}
                  onValueChange={(value) => setData('deskripsi', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Jenis Kegiatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rapat">Rapat</SelectItem>
                    <SelectItem value="paparan">Paparan</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
                {errors.deskripsi && <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>}
              </div>

              {/* Tim */}
              <div className="space-y-2">
                <Label>Pilih Tim (opsional)</Label>
                <Select
                  value={String(data.tim_id)}
                  onValueChange={(value) => setData('tim_id', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Tim" />
                  </SelectTrigger>
                  <SelectContent>
                    {tims.map((tim) => (
                      <SelectItem key={tim.id} value={String(tim.id)}>
                        {tim.nama_tim}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Penerima */}
              <div className="space-y-2">
                <Label>Pilih Penerima (User)</Label>
                <ReactSelect
                  isMulti
                  options={pegawaiOptions}
                  value={selectedPegawai}
                  onChange={setSelectedPegawai}
                  placeholder="Cari & pilih pegawai..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
                {errors.user_ids && <div className="text-red-500 text-sm mt-1">{errors.user_ids}</div>}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-[#0B2E74] hover:bg-blue-800"
              >
                {processing ? 'Menyimpan...' : 'AJUKAN'}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
