export default function Header() {
  return (
    <header className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-[#0B2E74] text-white justify-between items-center px-4 md:px-6 py-5 shadow">
      <div className="flex items-center gap-2">
        <img src="/storage/logo_bps.png" alt="Logo" className="w-15 h-10" />
        <div className="text-sm md:text-lg font-bold">
          BADAN PUSAT STATISTIK PROVINSI RIAU
        </div>
      </div>
      <div className="flex items-center gap-3 text-md">
        <button title="Notifikasi">🔔</button>
        <span>Pegawai</span>
        <img src="/storage/profil.png" alt="Admin" className="w-12 h-12 rounded-full bg-white" />
      </div>
    </header>
  );
}
