// File: resources/js/Components/PresensiPopup.jsx

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { router } from '@inertiajs/react';

export default function PresensiPopup({ isOpen, onClose, penerimaId, userId, timId, undanganId }) {
  const sigCanvas = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    const signature = sigCanvas.current.getCanvas().toDataURL('image/png');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;

        router.post('/presensi/store', {
          penerima_id: penerimaId,
          user_id: userId,
          tim_id: timId,
          undangan_id: undanganId,
          status_penerima: 'terima',           // ⬅️ WAJIB ADA untuk validasi backend
          status_kehadiran: 'hadir',
          ttd: signature,                      // ⬅️ dikirim dalam bentuk base64
          koordinat: coords,
          waktu_presensi: new Date().toISOString(),
        }, {
          onFinish: () => {
            setLoading(false);
            onClose();
          },
        });
      },
      (err) => {
        alert('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
        setLoading(false);
      }
    );
  };

  const handleClear = () => sigCanvas.current.clear();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Presensi Kehadiran</h2>

        <p className="text-sm mb-2">Silakan tanda tangan di bawah ini:</p>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{ width: 500, height: 200, className: 'border' }}
        />

        <div className="mt-3 flex justify-between">
          <button onClick={handleClear} className="text-sm text-red-600 underline">Bersihkan</button>
        </div>

        <div className="mt-4 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Presensi'}
          </button>
        </div>
      </div>
    </div>
  );
}
