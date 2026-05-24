import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { router, usePage } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons using standard CSS classes (foolproof & supports Tailwind animations)
const officeIcon = L.divIcon({
  html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 9999px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  className: 'custom-office-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const userIcon = L.divIcon({
  html: `
    <div style="position: relative; width: 16px; height: 16px;">
      <div class="animate-ping" style="position: absolute; background-color: #ef4444; opacity: 0.75; width: 16px; height: 16px; border-radius: 9999px;"></div>
      <div style="position: relative; background-color: #ef4444; width: 16px; height: 16px; border-radius: 9999px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
    </div>
  `,
  className: 'custom-user-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Helper component to update map view when coordinates change
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, 17);
    }
  }, [center]);
  return null;
}

export default function InputTtd({ penerimaId, onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(300);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth - 20;
        setCanvasWidth(width > 0 ? width : 300);
      }
    };
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const { props } = usePage();
  const { absensi_config } = props;
  const officeLat = absensi_config?.office_latitude || 0.568721;
  const officeLon = absensi_config?.office_longitude || 101.4264105;
  const radius = absensi_config?.radius_meters || 75;

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

  // Coordinates to show on initial load (defaults to office location before user takes location)
  const mapCenter = coords.latitude && coords.longitude
    ? [parseFloat(coords.latitude), parseFloat(coords.longitude)]
    : [officeLat, officeLon];

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
            <div ref={containerRef} className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50">
              <SignatureCanvas
                ref={canvasRef}
                penColor="black"
                canvasProps={{
                  width: canvasWidth,
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
                className={`w-full px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200 ${loadingLocation
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                disabled={loadingLocation}
              >
                {loadingLocation ? '⏳ Mengambil lokasi...' : '📍 Ambil Lokasi'}
              </button>

              {/* Leaflet Map rendering */}
              <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden border border-gray-300 z-10">
                <MapContainer
                  center={mapCenter}
                  zoom={16}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ChangeView center={mapCenter} />

                  {/* Office acuan marker and radius circle */}
                  <Marker position={[officeLat, officeLon]} icon={officeIcon}>
                    <Popup>Kantor Acuan</Popup>
                  </Marker>
                  <Circle
                    center={[officeLat, officeLon]}
                    radius={radius}
                    pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.15 }}
                  />

                  {/* User marker if taken */}
                  {coords.latitude && coords.longitude && (
                    <Marker position={[parseFloat(coords.latitude), parseFloat(coords.longitude)]} icon={userIcon}>
                      <Popup>Lokasi Anda</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
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
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${loading
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
