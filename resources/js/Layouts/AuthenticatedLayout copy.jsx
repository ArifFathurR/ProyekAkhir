import Header from '@/Components/Header';
import Sidebar from '@/Layouts/Sidebar';

export default function DataPegawai() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#F5F7FA] min-h-screen">
        <Header />
        <main className="p-6">
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-xl font-semibold text-center mb-4">Data Pegawai</h2>
            <div className="mb-4">
              <button className="bg-sky-500 text-white px-4 py-2 rounded">Tambah</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-[#0B2E74] text-white">
                  <tr>
                    <th className="p-2">No</th>
                    <th className="p-2">Nama Pegawai</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Nomor Hp</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Contoh dummy data */}
                  {[1, 2, 3].map((item, idx) => (
                    <tr key={idx} className="text-center border-t">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2">Nama {idx + 1}</td>
                      <td className="p-2">email{idx + 1}@bps.go.id</td>
                      <td className="p-2">08123456789</td>
                      <td className="p-2">Admin</td>
                      <td className="p-2 space-x-2">
                        <button className="bg-sky-500 text-white px-2 py-1 rounded">Edit</button>
                        <button className="bg-orange-500 text-white px-2 py-1 rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
