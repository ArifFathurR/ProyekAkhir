export default function TestComponent({ isOpen, isClose, data }) {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">

                        <h2 className="text-xl font-bold mb-4">
                            Data Mahasiswa
                        </h2>

                        <div className="mb-4">
                            {data.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <h1>Nama: {item.nama}</h1>
                                    <h1>Kelas: {item.kelas}</h1>
                                    <h1>NIM: {item.nim}</h1>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={isClose}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Tutup
                        </button>

                    </div>
                </div>
            )}
        </>
    );
}