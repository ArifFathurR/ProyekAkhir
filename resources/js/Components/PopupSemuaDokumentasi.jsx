import React, { useState } from 'react';
import PopupDokumentasi from '@/Components/PopupDokumentasi';

export default function PopupSemuaDokumentasi({ show, onClose, semuaDokumentasi }) {
    const [selectedDokumentasi, setSelectedDokumentasi] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    if (!show) return null;

    const handleShowDetail = (dok) => {
        setSelectedDokumentasi(dok);
        setShowDetail(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[50]">
            <div className="bg-white p-6 rounded-xl shadow-lg relative w-full max-w-5xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Semua Dokumentasi Kegiatan</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="overflow-x-auto flex-1 h-full max-h-[calc(90vh-[100px])] pr-2">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 shadow-sm z-10">
                            <tr>
                                <th scope="col" className="px-6 py-3">No</th>
                                <th scope="col" className="px-6 py-3">Nama Pengunggah</th>
                                <th scope="col" className="px-6 py-3">Link Zoom</th>
                                <th scope="col" className="px-6 py-3">Link Materi</th>
                                <th scope="col" className="px-6 py-3 text-center">Foto</th>
                                <th scope="col" className="px-6 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {semuaDokumentasi && semuaDokumentasi.length > 0 ? (
                                semuaDokumentasi.map((dok, index) => (
                                    <tr key={dok.id} className="bg-white border-b hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{dok.nama}</td>
                                        <td className="px-6 py-4">
                                            {dok.link_zoom ? (
                                                <a href={dok.link_zoom} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Zoom
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {dok.link_materi ? (
                                                <a href={dok.link_materi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Materi
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {dok.foto && dok.foto.length > 0 ? (
                                                <div className="flex items-center justify-center">
                                                    <img src={`/storage/${dok.foto[0].file_foto}`} alt="Foto" className="w-10 h-10 object-cover rounded-lg shadow-sm" />
                                                    {dok.foto.length > 1 && (
                                                        <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full border">
                                                            +{dok.foto.length - 1}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mx-auto">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleShowDetail(dok)}
                                                className="inline-flex items-center px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-medium rounded-md transition-colors duration-200 shadow-sm"
                                            >
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-500">
                                            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <p>Tidak ada dokumentasi yang ditemukan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PopupDokumentasi
                show={showDetail}
                onClose={() => setShowDetail(false)}
                dokumentasi={selectedDokumentasi}
            />
        </div>
    );
}
