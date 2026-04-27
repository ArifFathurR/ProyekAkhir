@component('mail::message')
# Pengingat Kegiatan: {{ $undangan->judul }}

Yth. Bapak/Ibu,

Ini adalah pengingat bahwa kegiatan **{{ $undangan->judul }}** dijadwalkan pada saat ini. Mohon kehadirannya untuk mengikuti kegiatan terkait {{ $undangan->deskripsi }}.

---

**Hari/Tanggal** : {{ $tanggalFormatted }}
**Pukul** : {{ $undangan->waktu }} WIB
**Tempat** : {{ $undangan->tempat }}
**Agenda** : {{ $undangan->agenda }}

---

Demikian untuk dipedomani. Atas perhatian dan kerjasamanya diucapkan terima kasih.

@component('mail::button', ['url' => url('/')])
Buka Sistem
@endcomponent

Hormat kami,
**BADAN PUSAT STATISTIK PROVINSI RIAU**

{{ config('app.name') }}
@endcomponent
