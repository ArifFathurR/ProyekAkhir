import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';

export default function ModalKirimUndangan({ isOpen, onClose, onSubmit, pegawaiList = [] }) {
    const modalRef = useRef();
    const [subjek, setSubjek] = useState('');
    const [pesan, setPesan] = useState('');
    const [selectedPegawai, setSelectedPegawai] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setSubjek('');
            setPesan('');
            setSelectedPegawai([]);
            setFile(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleSubmit = () => {
        if (!subjek || !pesan || selectedPegawai.length === 0 || !file) {
            alert('Semua field wajib diisi.');
            return;
        }

        const formData = new FormData();
        formData.append('subjek', subjek);
        formData.append('pesan', pesan);
        formData.append('file', file);
        formData.append('pegawai', JSON.stringify(selectedPegawai.map(p => p.value)));

        onSubmit(formData);
    };

    const pegawaiOptions = pegawaiList.map((pegawai) => ({
        value: pegawai.email,
        label: `${pegawai.name} (${pegawai.email})`,
    }));

    return (
        <div onClick={handleClickOutside} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg space-y-4">
                <h2 className="text-xl font-semibold text-center">Kirim Undangan</h2>

                <div>
                    <label className="block text-sm font-medium">Subjek</label>
                    <input type="text" className="w-full border rounded px-3 py-2"
                        value={subjek} onChange={(e) => setSubjek(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium">Pesan</label>
                    <textarea className="w-full border rounded px-3 py-2"
                        value={pesan} onChange={(e) => setPesan(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium">Pilih Pegawai</label>
                    <Select
                        isMulti
                        options={pegawaiOptions}
                        value={selectedPegawai}
                        onChange={setSelectedPegawai}
                        placeholder="Cari & pilih pegawai..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Undangan</label>
                    <input type="file" className="w-full border rounded px-3 py-2"
                        onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded shadow"
                >
                    KIRIM DAN GENERATE LINK
                </button>
            </div>
        </div>
    );
}
