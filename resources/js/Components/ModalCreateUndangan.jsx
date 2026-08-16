import { useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import ReactSelect from 'react-select';
import Modal from '@/Components/Modal';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import ClockTimePicker from '@/Components/ClockTimePicker';
import { X } from 'lucide-react';

export default function ModalCreateUndangan({
  show = false,
  onClose = () => {},
  kegiatans = [],
  tims = [],
  pegawaiList = [],
  anggotaTim = []
}) {
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
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
    tim_ids: [],
    user_ids: [],
  });

  const [selectedPegawai, setSelectedPegawai] = useState([]);
  const [selectedTims, setSelectedTims] = useState([]);

  // Controlled value for combined datetime-local input
  const dateTimeValue = useMemo(() => {
    if (data.tanggal && data.waktu) {
      return `${data.tanggal}T${data.waktu}`;
    }
    if (data.tanggal) {
      return `${data.tanggal}T00:00`;
    }
    return '';
  }, [data.tanggal, data.waktu]);

  const timOptions = useMemo(() => {
    const baseOptions = tims.map(t => ({
      value: String(t.id),
      label: t.nama_tim
    }));
    if (baseOptions.length > 0) {
      return [{ value: 'all', label: 'Semua Tim' }, ...baseOptions];
    }
    return baseOptions;
  }, [tims]);

  const pegawaiOptions = useMemo(() =>
    pegawaiList.map(p => ({
      value: String(p.id),
      label: `${p.name} (${p.email})`
    })), [pegawaiList]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!show) {
      reset();
      clearErrors();
      setSelectedPegawai([]);
      setSelectedTims([]);
    }
  }, [show]);

  const getHariName = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
  };

  const handleDateTimeChange = (e) => {
    const val = e.target.value; // format: "YYYY-MM-DDTHH:mm"
    if (!val) {
      setData(prev => ({
        ...prev,
        tanggal: '',
        waktu: '',
        hari: ''
      }));
      return;
    }

    const [datePart, timePart] = val.split('T');
    const dayName = getHariName(datePart);

    setData(prev => ({
      ...prev,
      tanggal: datePart || '',
      waktu: timePart || '',
      hari: dayName || ''
    }));
  };

  const selectedKegiatanObj = useMemo(() => {
    return kegiatans.find((k) => String(k.id) === String(data.kegiatan_id));
  }, [kegiatans, data.kegiatan_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedKegiatanObj && data.tanggal) {
      const min = selectedKegiatanObj.tanggal;
      const max = selectedKegiatanObj.tanggal_selesai || selectedKegiatanObj.tanggal;
      if (data.tanggal < min || data.tanggal > max) {
        const rangeText = selectedKegiatanObj.tanggal_selesai 
          ? `${selectedKegiatanObj.tanggal} s/d ${selectedKegiatanObj.tanggal_selesai}`
          : selectedKegiatanObj.tanggal;
        alert(`Tanggal undangan harus berada dalam rentang tanggal kegiatan (${rangeText}).`);
        return;
      }
    }

    post(route('undangan_kegiatan.store'), {
      onSuccess: () => {
        reset();
        setSelectedPegawai([]);
        setSelectedTims([]);
        onClose();
      }
    });
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="xl">
      <div className="p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Buat Undangan Kegiatan</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Judul Kegiatan (Paling Atas) */}
          <div className="space-y-1.5">
            <Label className="font-semibold text-gray-800 text-sm">Judul Kegiatan <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              placeholder="Masukkan judul kegiatan..."
              value={data.judul}
              onChange={(e) => setData('judul', e.target.value)}
            />
            {errors.judul && <div className="text-red-500 text-xs mt-0.5">{errors.judul}</div>}
          </div>

          {/* Kegiatan Utama & Jenis Kegiatan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Kegiatan Utama <span className="text-red-500">*</span></Label>
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
              {errors.kegiatan_id && <div className="text-red-500 text-xs mt-0.5">{errors.kegiatan_id}</div>}
              {kegiatans.find((k) => String(k.id) === String(data.kegiatan_id)) && (
                <p className="text-xs text-blue-600 font-medium mt-1">
                  📅 Tanggal Kegiatan: <span className="font-bold">{kegiatans.find((k) => String(k.id) === String(data.kegiatan_id)).tanggal}</span>
                  {kegiatans.find((k) => String(k.id) === String(data.kegiatan_id)).tanggal_selesai
                    ? ` s/d ${kegiatans.find((k) => String(k.id) === String(data.kegiatan_id)).tanggal_selesai}`
                    : ''}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm">Jenis Kegiatan <span className="text-red-500">*</span></Label>
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
              {errors.deskripsi && <div className="text-red-500 text-xs mt-0.5">{errors.deskripsi}</div>}
            </div>
          </div>

          {/* Nomor Surat & Sifat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Nomor Surat <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                placeholder="Nomor surat..."
                value={data.nomor_surat}
                onChange={(e) => setData('nomor_surat', e.target.value)}
              />
              {errors.nomor_surat && <div className="text-red-500 text-xs mt-0.5">{errors.nomor_surat}</div>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Sifat <span className="text-red-500">*</span></Label>
              <Select
                value={data.sifat}
                onValueChange={(value) => setData('sifat', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Sifat Surat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Biasa">Biasa</SelectItem>
                  <SelectItem value="Terbatas">Terbatas</SelectItem>
                  <SelectItem value="Rahasia">Rahasia</SelectItem>
                </SelectContent>
              </Select>
              {errors.sifat && <div className="text-red-500 text-xs mt-0.5">{errors.sifat}</div>}
            </div>
          </div>

          {/* Tanggal & Waktu Pelaksanaan */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <Label className="font-semibold text-gray-800 text-sm">Waktu Pelaksanaan Kegiatan <span className="text-red-500">*</span></Label>
              {data.hari && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-semibold">
                  Hari: {data.hari}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tanggal & Waktu Mulai */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-600 font-medium">Tanggal & Waktu Mulai <span className="text-red-500">*</span></Label>
                <Input
                  type="datetime-local"
                  value={dateTimeValue}
                  onChange={handleDateTimeChange}
                  min={selectedKegiatanObj?.tanggal ? `${selectedKegiatanObj.tanggal}T00:00` : undefined}
                  max={selectedKegiatanObj?.tanggal ? `${selectedKegiatanObj.tanggal_selesai || selectedKegiatanObj.tanggal}T23:59` : undefined}
                  className="bg-white w-full"
                  required
                />
                {errors.tanggal && <div className="text-red-500 text-xs mt-0.5">{errors.tanggal}</div>}
                {errors.waktu && <div className="text-red-500 text-xs mt-0.5">{errors.waktu}</div>}
              </div>

              {/* Waktu Selesai */}
              <div className="space-y-1">
                <Label className="text-xs text-gray-600 font-medium">Waktu Selesai</Label>
                <ClockTimePicker
                  value={data.waktu_selesai}
                  onChange={(val) => setData('waktu_selesai', val)}
                  placeholder="Pilih Waktu Selesai"
                  align="right"
                />
                {errors.waktu_selesai && <div className="text-red-500 text-xs mt-0.5">{errors.waktu_selesai}</div>}
              </div>
            </div>
          </div>

          {/* Tempat & Agenda */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm">Tempat <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                placeholder="Lokasi / tempat kegiatan..."
                value={data.tempat}
                onChange={(e) => setData('tempat', e.target.value)}
              />
              {errors.tempat && <div className="text-red-500 text-xs mt-0.5">{errors.tempat}</div>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Agenda <span className="text-red-500">*</span></Label>
              <Input
                type="text"
                placeholder="Agenda acara..."
                value={data.agenda}
                onChange={(e) => setData('agenda', e.target.value)}
              />
              {errors.agenda && <div className="text-red-500 text-xs mt-0.5">{errors.agenda}</div>}
            </div>
          </div>

          {/* Tim */}
          <div className="space-y-2">
            <Label>Pilih Tim (opsional)</Label>
            <ReactSelect
              isMulti
              options={timOptions}
              value={selectedTims}
              onChange={(val) => {
                const hasAll = val && val.some(v => v.value === 'all');
                let newSelectedTims = [];
                if (hasAll) {
                  newSelectedTims = tims.map(t => ({
                    value: String(t.id),
                    label: t.nama_tim
                  }));
                } else {
                  newSelectedTims = val || [];
                }
                
                setSelectedTims(newSelectedTims);
                const newTimIds = newSelectedTims.map(v => v.value);
                
                if (newTimIds.length > 0) {
                  const anggota = anggotaTim
                    .filter(a => newTimIds.includes(String(a.tim_id)))
                    .map(a => String(a.user_id));
                  const uniqueUserIds = Array.from(new Set(anggota));
                  const matched = pegawaiOptions.filter(p => uniqueUserIds.includes(p.value));
                  setSelectedPegawai(matched);
                  setData(prev => ({
                    ...prev,
                    tim_ids: newTimIds,
                    user_ids: matched.map(p => p.value)
                  }));
                } else {
                  setSelectedPegawai([]);
                  setData(prev => ({
                    ...prev,
                    tim_ids: newTimIds,
                    user_ids: []
                  }));
                }
              }}
              placeholder="Pilih Tim..."
              className="react-select-container"
              classNamePrefix="react-select"
              menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
              styles={{ menuPortal: base => ({ ...base, zIndex: 99999 }) }}
            />
          </div>

          {/* Penerima */}
          <div className="space-y-2">
            <Label>Pilih Penerima (User) <span className="text-red-500">*</span></Label>
            <ReactSelect
              isMulti
              options={pegawaiOptions}
              value={selectedPegawai}
              onChange={(val) => {
                setSelectedPegawai(val || []);
                setData('user_ids', (val || []).map(p => p.value));
              }}
              placeholder="Cari & pilih pegawai..."
              className="react-select-container"
              classNamePrefix="react-select"
              menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
              styles={{ menuPortal: base => ({ ...base, zIndex: 99999 }) }}
            />
            {errors.user_ids && <div className="text-red-500 text-sm mt-1">{errors.user_ids}</div>}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={processing}
              className="bg-[#0B2E74] hover:bg-blue-800 text-white px-6"
            >
              {processing ? 'Menyimpan...' : 'AJUKAN'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
