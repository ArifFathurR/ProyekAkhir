import { useState, useEffect, useRef } from 'react';

export default function ModalKonfirmasiUndangan({ isOpen, onClose, onSubmit }) {
    const [status, setStatus] = useState('');
    const [komentar, setKomentar] = useState('');
    const modalRef = useRef();

    // Reset form saat modal dibuka
    useEffect(() => {
        if (isOpen) {
            setStatus('');
            setKomentar('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleSubmit = () => {
        if (!status) {
            alert('Status undangan wajib dipilih.');
            return;
        }

        onSubmit({ status, komentar });
    };

    return (
        <div
            onClick={handleClickOutside}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
            <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-center text-lg font-semibold mb-4">Konfirmasi Undangan Kegiatan</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Status undangan</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">pilih status undangan</option>
                        <option value="Diterima">Terima</option>
                        <option value="Ditolak">Revisi</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Komentar</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        placeholder="Input"
                        value={komentar}
                        onChange={(e) => setKomentar(e.target.value)}
                    ></textarea>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded shadow"
                >
                    KONFIRMASI
                </button>
            </div>
        </div>
    );
}
