@component('mail::message')
# Pengingat Kegiatan: {{ $undangan->judul }}

Yth. Bapak/Ibu,

Ini adalah pengingat bahwa kegiatan **{{ $undangan->judul }}** dijadwalkan pada saat ini. Mohon kehadirannya untuk mengikuti kegiatan terkait {{ $undangan->deskripsi }}.

---

**Hari/Tanggal** : {{ $tanggalFormatted }}<br>
**Pukul** : {{ $undangan->waktu }} WIB<br>
**Tempat** : {{ $undangan->tempat }}<br>
**Agenda** : {{ $undangan->agenda }}

---

Demikian untuk dipedomani. Atas perhatian dan kerjasamanya diucapkan terima kasih.

@component('mail::button', ['url' => url('https://cloudslabs.my.id/')])
Buka Sistem
@endcomponent

Hormat kami,
**BADAN PUSAT STATISTIK PROVINSI RIAU**

{{ config('app.name') }}
@endcomponent
