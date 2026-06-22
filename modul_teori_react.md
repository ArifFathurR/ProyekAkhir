# Modul Teori React pada Proyek Ini

Dokumen ini berisi modul pembelajaran untuk teori-teori React yang secara aktif digunakan di dalam proyek ini (berbasis Laravel, Inertia.js, dan React). Setiap modul disertai dengan penjelasan konsep dan cuplikan kode (snippet) asli dari `resources/js/` sebagai contoh kasus.

---

## Modul 1: Komponen Fungsional (Functional Components) & Props

### Teori Dasar
Dalam React modern, antarmuka pengguna (UI) dibangun menggunakan **Komponen Fungsional**. Komponen ini pada dasarnya adalah fungsi JavaScript biasa yang mengembalikan (me-return) elemen React (biasanya ditulis dengan sintaks JSX). 

**Props** (kependekan dari *properties*) adalah cara React untuk mengirimkan data dari komponen induk (parent) ke komponen anak (child). Props bersifat *read-only* (hanya bisa dibaca oleh komponen penerima).

### Contoh di Proyek
Pada file `resources/js/Pages/Pegawai/KegiatanSadangBerlangsung.jsx`, halaman tersebut dibuat sebagai sebuah Komponen Fungsional yang menerima data dari controller Laravel menggunakan **props** (`kegiatan` dan `auth`). Selain itu, halaman tersebut memanggil komponen anak seperti `<Header />` dan `<StatsCard />`.

```jsx
// resources/js/Pages/Pegawai/KegiatanSadangBerlangsung.jsx
import Header from '@/Components/Header';
import StatsCard from '@/Components/StatsCard';

// Ini adalah Komponen Fungsional yang menerima Props: `kegiatan` dan `auth`
export default function KegiatanSedangBerlangsung({ kegiatan = [], auth }) {
  
  // Data statis yang dikirimkan ke komponen anak via props
  const statsData = [
    {
      title: 'Total Kegiatan',
      value: kegiatan?.length || 0,
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      // ...
    }
  ];

  return (
    <div>
       {/* Memanggil komponen anak */}
       <Header />
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         {/* Mengirimkan data via props ke komponen StatsCard */}
         {statsData.map((stat, index) => (
           <StatsCard key={index} {...stat} />
         ))}
       </div>
    </div>
  );
}
```

---

## Modul 2: State Management (Hook `useState`)

### Teori Dasar
Dalam React, **State** adalah data internal dalam suatu komponen yang dapat berubah seiring waktu (misalnya saat user menekan tombol, mengetik, dll). Jika state berubah, komponen React akan secara otomatis di-render ulang (re-render) agar UI menampilkan data terbaru.

Pada komponen fungsional, state dibuat menggunakan hook **`useState`**. Hook ini mengembalikan sebuah array berisi dua hal:
1. Variabel state saat ini (misal `showPopup`).
2. Fungsi untuk mengubah state tersebut (misal `setShowPopup`).

### Contoh di Proyek
Pada halaman `KegiatanSadangBerlangsung.jsx`, `useState` digunakan untuk mengontrol kapan Pop-Up tanda tangan (presensi) atau modal detail ditampilkan.

```jsx
// resources/js/Pages/Pegawai/KegiatanSadangBerlangsung.jsx
import { useState } from 'react';
import InputTtd from '@/Components/InputTtd';

export default function KegiatanSedangBerlangsung({ kegiatan = [], auth }) {
  // Deklarasi State
  // showPopup bernilai awal `false`
  const [showPopup, setShowPopup] = useState(false);
  const [dataPresensi, setDataPresensi] = useState({});

  return (
    <div>
      <button
        onClick={() => {
           // Mengubah state ketika tombol ditekan
           setDataPresensi({
             penerimaId: item.id,
             userId: auth.user.id,
           });
           setShowPopup(true); // Membuka popup
        }}
      >
        Isi Presensi
      </button>

      {/* Conditional rendering: Jika showPopup bernilai `true`, render <InputTtd /> */}
      {showPopup && (
        <InputTtd
          penerimaId={dataPresensi.penerimaId}
          onClose={() => setShowPopup(false)} // Menutup popup
        />
      )}
    </div>
  );
}
```

---

## Modul 3: Lifecycle & Side Effects (Hook `useEffect`)

### Teori Dasar
Dalam React, proses seperti mengambil data dari API, mengatur timer, atau secara manual memanipulasi DOM disebut sebagai **Side Effects**. Kita menggunakan hook **`useEffect`** untuk menangani efek samping tersebut.

`useEffect` berjalan setelah komponen berhasil di-render di layar. Hook ini bisa diatur untuk berjalan:
- **Setiap kali komponen re-render** (tanpa dependency array).
- **Hanya sekali saat komponen pertama kali dimuat** (array dependency kosong `[]`).
- **Ketika salah satu dependency yang dipantau berubah** (ada nilai di dalam array `[dependency]`).

### Contoh di Proyek
Di proyek ini, `useEffect` sering ditemukan di komponen seperti Sidebar (`SidebarSupervisor.jsx`, dll) untuk menangani *event listener* saat ukuran layar (window) diubah (resize), serta membersihkan (cleanup) event listener tersebut saat komponen dihancurkan (unmounted).

```jsx
// resources/js/Layouts/SidebarSupervisor.jsx
import { useState, useEffect } from 'react';

export default function SidebarSupervisor() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi yang akan dijalankan sebagai efek
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Mendaftarkan event listener
    window.addEventListener('resize', handleResize);
    handleResize(); // Pemanggilan pertama kali

    // Cleanup function: berjalan sebelum komponen unmount 
    // Mencegah kebocoran memori (memory leak)
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Array kosong berarti ini hanya dijalankan sekali (saat komponen mount)

  return (
    // ... UI Sidebar
    <div></div>
  );
}
```

---

## Modul 4: Ekosistem Inertia.js (Hook `useForm`, `usePage`)

### Teori Dasar
Proyek ini menggunakan **Inertia.js** yang bertindak sebagai "lem" antara backend Laravel dan frontend React. Inertia menyediakan beberapa hooks khusus React:
- **`useForm`**: Membantu mengelola data form (pengisian input, pengiriman data post/put, tracking proses loading, dan menampilkan error validasi dari Laravel).
- **`usePage`**: Digunakan untuk mengambil *shared data* (props global) yang dikirimkan oleh Laravel pada semua halaman (seperti `auth.user` atau `flash message`).

### Contoh di Proyek
`useForm` digunakan secara luas untuk fitur registrasi, login, dan form pengisian data kegiatan. Berikut contoh potongan dari `CreateUndangan.jsx` dan `Login.jsx`.

```jsx
// resources/js/Pages/Auth/Login.jsx
import { useForm } from '@inertiajs/react';

export default function Login() {
  // Inisialisasi useForm dengan nilai default
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    // Mengirim request POST ke rute '/login' laravel
    post(route('login'));
  };

  return (
    <form onSubmit={submit}>
      <input 
        type="email"
        value={data.email}
        // Mengubah nilai state Inertia
        onChange={(e) => setData('email', e.target.value)} 
      />
      {/* Menampilkan error validasi dari Laravel (jika ada) */}
      {errors.email && <div className="text-red-500">{errors.email}</div>}
      
      <button type="submit" disabled={processing}>
        {processing ? 'Loading...' : 'Log in'}
      </button>
    </form>
  );
}
```

> **Catatan:** Dengan Inertia.js, kita bisa berpindah antar halaman React (SPA) dan mengirim form secara asinkron (Ajax), tetapi kodenya masih sangat mirip dengan pengembangan controller Laravel tradisional.
