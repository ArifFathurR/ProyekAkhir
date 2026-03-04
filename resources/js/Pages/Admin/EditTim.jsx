import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Modal from '@/Components/Modal';

export default function EditTim({ show, onClose, tim }) {
  const { data, setData, put, processing, errors, reset } = useForm({
    nama_tim: tim?.nama_tim || '',
  });

  // Sinkronisasi data form saat tim berubah (misal ketika klik tombol Edit di baris yang berbeda)
  useEffect(() => {
    setData('nama_tim', tim?.nama_tim || '');
  }, [tim]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tim) {
      put(route('tim.update', tim.id), {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Update Tim</h2>
        <p className="text-gray-500 text-sm mb-6">Silakan ubah nama tim di bawah ini.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="nama_tim" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Tim
            </Label>
            <Input
              id="nama_tim"
              type="text"
              placeholder="Masukkan nama tim..."
              value={data.nama_tim}
              onChange={(e) => setData('nama_tim', e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500 focus-visible:ring-offset-1"
            />
            {errors.nama_tim && (
              <p className="text-red-500 text-sm">{errors.nama_tim}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={processing}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-md transition-transform duration-200"
            >
              {processing ? 'Menyimpan...' : 'Update Tim'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
