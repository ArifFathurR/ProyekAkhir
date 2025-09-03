import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { router } from '@inertiajs/react';

export default function InputTtd({ penerimaId, onClose }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (canvasRef.current.isEmpty()) {
      alert('Silakan tanda tangani terlebih dahulu.');
      return;
    }

    const signature = canvasRef.current.getCanvas().toDataURL('image/png');
    setLoading(true);

    router.post('/ttd/store', {
      penerima_id: penerimaId,
      ttd: signature,
    }, {
      onSuccess: () => {
        setLoading(false);
        if (onClose) onClose(); // ✅ langsung tutup pop-up
        router.reload();
      },
      onError: () => {
        setLoading(false);
        alert('❌ Gagal menyimpan tanda tangan.');
      }
    });
  };

  const handleClear = () => canvasRef.current.clear();

  return (
    <div className="bg-white shadow p-6 rounded max-w-md w-full relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-xl text-red-500 font-bold"
      >
        ×
      </button>

      <h2 className="text-lg font-semibold mb-4 text-center">Tanda Tangan</h2>

      <SignatureCanvas
        ref={canvasRef}
        penColor="black"
        canvasProps={{ width: 400, height: 200, className: 'border mx-auto block' }}
      />

      <div className="mt-3 flex justify-between">
        <button onClick={handleClear} className="text-sm text-red-600 underline">Bersihkan</button>
      </div>

      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan TTD'}
        </button>
      </div>
    </div>
  );
}
