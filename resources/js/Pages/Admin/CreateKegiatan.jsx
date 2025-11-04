import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { useForm } from '@inertiajs/react';

// 🔹 Import komponen dari Shadcn UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateKegiatan({ tims }) {
  const { data, setData, post, processing, errors } = useForm({
    nama_kegiatan: '',
    deskripsi: '',
    tanggal: '',
    tim_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('kegiatan.store'));
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          {/* Card Form */}
          <div className="w-full bg-white border border-sky-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-2">
              Formulir Tambah Kegiatan
            </h2>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Lengkapi data kegiatan di bawah ini, lalu klik tombol simpan.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama Kegiatan */}
              <div className="space-y-2">
                <Label htmlFor="nama_kegiatan">Nama Kegiatan</Label>
                <Input
                  id="nama_kegiatan"
                  type="text"
                  placeholder="Masukkan nama kegiatan..."
                  value={data.nama_kegiatan}
                  onChange={(e) => setData('nama_kegiatan', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                />
                {errors.nama_kegiatan && (
                  <p className="text-red-500 text-sm">{errors.nama_kegiatan}</p>
                )}
              </div>

              {/* Deskripsi */}
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  placeholder="Tulis deskripsi kegiatan..."
                  value={data.deskripsi}
                  onChange={(e) => setData('deskripsi', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                />
                {errors.deskripsi && (
                  <p className="text-red-500 text-sm">{errors.deskripsi}</p>
                )}
              </div>

              {/* Tanggal */}
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <Input
                  id="tanggal"
                  type="date"
                  value={data.tanggal}
                  onChange={(e) => setData('tanggal', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                />
                {errors.tanggal && (
                  <p className="text-red-500 text-sm">{errors.tanggal}</p>
                )}
              </div>

              {/* Tim */}
              <div className="space-y-2">
                <Label htmlFor="tim_id">Pilih Tim</Label>
                <Select
                  onValueChange={(value) => setData('tim_id', value)}
                  value={data.tim_id || ""}
                >
                  <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1">
                    <SelectValue placeholder="-- Pilih Tim --" />
                  </SelectTrigger>
                  <SelectContent>
                    {tims.map((tim) => (
                      <SelectItem key={tim.id} value={tim.id.toString()}>
                        {tim.nama_tim}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tim_id && (
                  <p className="text-red-500 text-sm">{errors.tim_id}</p>
                )}
              </div>

              {/* Tombol Simpan */}
              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-transform duration-200 hover:scale-[1.02]"
              >
                {processing ? 'Menyimpan...' : 'SIMPAN KEGIATAN'}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
