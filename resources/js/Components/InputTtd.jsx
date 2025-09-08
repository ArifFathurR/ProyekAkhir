import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { router } from '@inertiajs/react';

export default function InputTtd({ penerimaId, onClose }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Ambil lokasi user
  const handleAmbilLokasi = () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setLoadingLocation(false);
        },
        (err) => {
          alert("❌ Gagal ambil lokasi: " + err.message);
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Browser tidak mendukung geolocation.");
    }
  };

  // Submit tanda tangan + lokasi
  const handleSubmit = () => {
    if (canvasRef.current.isEmpty()) {
      alert('Silakan tanda tangani terlebih dahulu.');
      return;
    }
    if (!coords.latitude || !coords.longitude) {
      alert('Lokasi belum diambil. Klik tombol "Ambil Lokasi" terlebih dahulu.');
      return;
    }

    const signature = canvasRef.current.getCanvas().toDataURL('image/png');
    setLoading(true);

    router.post(
      '/ttd/store',
      {
        penerima_id: penerimaId,
        ttd: signature,
        latitude: coords.latitude,   // ✅ sama dengan field
        longitude: coords.longitude, // ✅ sama dengan field
      },
      {
        onSuccess: () => {
          setLoading(false);
          if (onClose) onClose();
          router.reload();
        },
        onError: () => {
          setLoading(false);
          alert('❌ Gagal menyimpan tanda tangan.');
        },
      }
    );
  };

  // Hapus tanda tangan di canvas
  const handleClear = () => canvasRef.current.clear();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Tanda Tangan</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            type="button"
          >
            <svg
              className="w-5 h-5 text-gray-500 hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Area Tanda Tangan */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area Tanda Tangan
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50">
              <SignatureCanvas
                ref={canvasRef}
                penColor="black"
                canvasProps={{
                  width: 360,
                  height: 180,
                  className: 'bg-white rounded border mx-auto block'
                }}
              />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleClear}
                className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors duration-200"
                type="button"
              >
                Bersihkan
              </button>
            </div>
          </div>

          {/* Informasi Lokasi */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Informasi Lokasi</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Latitude</label>
                <input
                  type="text"
                  value={coords.latitude}
                  readOnly
                  placeholder="Belum diambil"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Longitude</label>
                <input
                  type="text"
                  value={coords.longitude}
                  readOnly
                  placeholder="Belum diambil"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAmbilLokasi}
                className={`w-full px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200 ${
                  loadingLocation
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={loadingLocation}
              >
                {loadingLocation ? '⏳ Mengambil lokasi...' : '📍 Ambil Lokasi'}
              </button>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm font-medium"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : '✓ Simpan TTD'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
