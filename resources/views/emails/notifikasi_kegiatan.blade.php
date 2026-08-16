@component('mail::message')
# Pengingat Kegiatan {{ !empty($labelReminder) ? "($labelReminder)" : '' }}: {{ $undangan->judul }}

Yth. Bapak/Ibu,

@if(!empty($labelReminder))
Ini adalah pengingat bahwa kegiatan **{{ $undangan->judul }}** akan dilaksanakan dalam **{{ $labelReminder }}** (pada tanggal **{{ $tanggalFormatted }}** pukul **{{ $undangan->waktu }} WIB**). Mohon dipersiapkan kehadirannya.
@else
Ini adalah pengingat bahwa kegiatan **{{ $undangan->judul }}** dijadwalkan pada saat ini. Mohon kehadirannya untuk mengikuti kegiatan terkait {{ $undangan->deskripsi }}.
@endif

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
