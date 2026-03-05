import { useForm } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Modal from '@/Components/Modal';

export default function CreateTim({ show, onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nama_tim: '',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    post(route('tim.store'), {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  return (
    <Modal show={show} onClose={onClose} maxWidth="md">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Penambahan Tim Baru</h2>
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Nama Tim</Label>
            <Input
              type="text"
              value={data.nama_tim}
              onChange={(e) => setData('nama_tim', e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.nama_tim && (
              <p className="text-red-500 text-sm">{errors.nama_tim}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-4 py-2"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={processing}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-2 rounded-md transition-transform duration-200"
            >
              {processing ? 'Menyimpan...' : 'Tambah Tim'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
