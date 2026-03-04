import React from 'react';
import { FaFilePdf, FaTimes } from 'react-icons/fa';

export default function ModalDetailUndangan({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <div className="flex justify-end p-4 absolute top-0 right-0">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-center mb-8">Detail Kegiatan</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[#3b82f6] font-medium mb-2">Nama Kegiatan</h3>
                            <div className="text-gray-800 border-b border-gray-300 border-dashed pb-1">
                                {data.nama_kegiatan}
                            </div>
                            <div className="border-b border-gray-300 border-dashed pt-4"></div>
                        </div>

                        <div>
                            <h3 className="text-[#3b82f6] font-medium mb-2">Judul Acara</h3>
                            <div className="text-gray-800 border-b border-gray-300 border-dashed pb-1">
                                {data.sub_kegiatan || '-'}
                            </div>
                            <div className="border-b border-gray-300 border-dashed pt-4"></div>
                        </div>

                        <div>
                            <h3 className="text-[#3b82f6] font-medium mb-2">Keterangan</h3>
                            <div className="text-gray-800 border-b border-gray-300 border-dashed pb-1">
                                Hari/Tanggal : {data.tanggal_lengkap || data.tanggal}<br />
                                Pukul &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.waktu} WIB<br />
                                Tempat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {data.tempat}<br />
                                Agenda &nbsp;&nbsp;&nbsp;: {data.agenda}
                            </div>
                            <div className="border-b border-gray-300 border-dashed pt-4"></div>
                            <div className="border-b border-gray-300 border-dashed pt-4"></div>
                        </div>

                        <div>
                            <h3 className="text-[#3b82f6] font-medium mb-2">File Undangan</h3>
                            <a
                                href={data.file_undangan}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors duration-200"
                            >
                                <FaFilePdf className="w-4 h-4 mr-2" />
                                PDF
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
