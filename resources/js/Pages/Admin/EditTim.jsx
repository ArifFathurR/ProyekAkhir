import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';
import { useForm } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditTim({ tim }) {
  const { data, setData, put, processing, errors } = useForm({
    nama_tim: tim?.nama_tim || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('tim.update', tim.id));
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen md:ml-64">
        <Header />
        <main className="pt-28 px-6">
          <div className="w-1/2 bg-white border border-sky-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
            {/* Judul */}
            <h2 className="text-3xl font-bold text-center text-sky-700 mb-2">
              Formulir Update Tim
            </h2>
            <p className="text-gray-500 text-center mb-8 text-sm">
              Ubah data tim sesuai kebutuhan, lalu klik tombol di bawah.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="nama_tim"
                  className="text-gray-700 font-medium"
                >
                  Nama Tim
                </Label>
                <Input
                  id="nama_tim"
                  type="text"
                  placeholder="Masukkan nama tim..."
                  value={data.nama_tim}
                  onChange={(e) => setData('nama_tim', e.target.value)}
                  className="focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                />
                {errors.nama_tim && (
                  <p className="text-red-500 text-sm">{errors.nama_tim}</p>
                )}
              </div>

              {/* Tombol */}
              <Button
                type="submit"
                disabled={processing}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-transform duration-200 hover:scale-[1.02]"
              >
                {processing ? 'Menyimpan...' : 'UPDATE TIM'}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
