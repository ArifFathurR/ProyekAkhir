import React from 'react';

export default function PopupDokumentasi({ show, onClose, dokumentasi }) {
  if (!show || !dokumentasi) return null;

  const handleDownloadAll = () => {
    if (dokumentasi.foto && dokumentasi.foto.length > 0) {
      dokumentasi.foto.forEach((foto, index) => {
        const fileUrl = `/storage/${foto.file_foto}`;
        const fileName = `foto_dokumentasi_${index + 1}.jpg`;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-red-500 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">Dokumentasi Kegiatan</h2>

        <div className="mb-2">
          <strong>Notulensi:</strong>
          <p className="text-sm">{dokumentasi.notulensi || '-'}</p>
        </div>

        <div className="mb-2">
          <strong>Link Zoom:</strong>
          {dokumentasi.link_zoom ? (
            <a href={dokumentasi.link_zoom} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
              {dokumentasi.link_zoom}
            </a>
          ) : (
            <span className="text-sm text-gray-500 ml-1">-</span>
          )}
        </div>

        <div className="mb-2">
          <strong>Link Materi:</strong>
          {dokumentasi.link_materi ? (
            <a href={dokumentasi.link_materi} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
              {dokumentasi.link_materi}
            </a>
          ) : (
            <span className="text-sm text-gray-500 ml-1">-</span>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <strong>Foto Dokumentasi:</strong>
            {dokumentasi.foto && dokumentasi.foto.length > 0 && (
              <button
                onClick={handleDownloadAll}
                className="text-sm text-blue-600 hover:underline"
              >
                Download Semua Foto
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {dokumentasi.foto && dokumentasi.foto.length > 0 ? (
              dokumentasi.foto.map((foto, index) => (
                <img
                  key={index}
                  src={`/storage/${foto.file_foto}`}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-auto rounded border"
                />
              ))
            ) : (
              <p className="text-gray-500">Tidak ada foto tersedia.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
