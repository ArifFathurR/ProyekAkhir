@component('mail::message')
# Konfirmasi Undangan Baru: {{ $undangan->judul }}

Yth. Bapak/Ibu Supervisor,

Terdapat pengajuan undangan kegiatan baru dari anggota tim Anda yang memerlukan konfirmasi persetujuan dari Anda:

---

**Nama Pengaju** : {{ $undangan->user->name ?? '-' }}<br>
**Kegiatan** : {{ $undangan->kegiatan->nama_kegiatan ?? '-' }}<br>
**Judul Undangan** : {{ $undangan->judul }}<br>
**Deskripsi** : {{ $undangan->deskripsi }}<br>
**Hari/Tanggal** : {{ $tanggalFormatted }}<br>
**Pukul** : {{ $undangan->waktu }} WIB<br>
**Tempat** : {{ $undangan->tempat }}<br>
**Agenda** : {{ $undangan->agenda }}

---

Mohon untuk segera masuk ke sistem dan melakukan konfirmasi terhadap undangan kegiatan ini.

@component('mail::button', ['url' => url('https://cloudslabs.my.id/supervisor')])
Buka Sistem Konfirmasi
@endcomponent

Demikian disampaikan. Atas perhatian dan kerjasamanya diucapkan terima kasih.

Hormat kami,
**BADAN PUSAT STATISTIK PROVINSI RIAU**

{{ config('app.name') }}
@endcomponent
