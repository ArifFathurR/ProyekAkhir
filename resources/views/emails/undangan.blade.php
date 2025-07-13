@component('mail::message')
# Undangan Kegiatan

Yth. Bapak/Ibu,

{!! nl2br(e($pesan)) !!}

@component('mail::button', ['url' => url('/')])
Buka Sistem
@endcomponent

Terima kasih,  
{{ config('app.name') }}
@endcomponent
