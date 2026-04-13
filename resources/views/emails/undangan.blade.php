@component('mail::message')
# Undangan {{ $undangan->judul }}

Yth. Bapak/Ibu,

Dalam rangka kegiatan **{{ $undangan->judul }}**, Bapak/Ibu diundang untuk mengikuti {{ $undangan->deskripsi }} yang akan dilaksanakan pada:

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
