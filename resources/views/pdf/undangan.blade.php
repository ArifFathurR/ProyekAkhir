<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 12px; }
        .header { text-align: center; margin-bottom: 5px; }
        .judul { font-weight: bold; text-decoration: underline; margin-bottom: 10px; }
        .content { margin: 2px; }
        .ml {margin-left: 40px}
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('storage/logo_bps.png') }}" width="150" style="float:left;">
        <div style="margin-left: 90px;">
            <h2>BADAN PUSAT STATISTIK PROVINSI RIAU</h2>
            <p>Jalan Pattimura No. 12, Pekanbaru 28131</p>
            <p>Telepon: (0761) 23042 | Email: riau@bps.go.id</p>
        </div>
    </div>

    <hr>

    <div class="content">
        <p>
            Nomor: {{ $undangan->nomor_surat ?? '123/XXX/2024' }}<br>
            Sifat: {{ $undangan->sifat}}<br>
            Lampiran: 1 (satu) lembar<br>
            Hal: Undangan {{ $undangan->judul }}
        </p>
        
        <br>

        <p>Yth. Daftar Undangan Terlampir</p>
        <p>di -</p>
        <p style="margin-left: 30px;">tempat</p>

        <br>

        <p>
            Dalam rangka kegiatan {{ $undangan->judul }}, Bapak/Ibu diundang untuk hadir pada:
        </p>
        <p class ="ml">
            Hari/Tanggal: {{ \Carbon\Carbon::parse($undangan->tanggal)->translatedFormat('l, d F Y') }}<br>
            Pukul: {{ $undangan->waktu_mulai }} - {{ $undangan->waktu_selesai }} WIB<br>
            Tempat: {{ $undangan->tempat }}<br>
            Agenda: {{ $undangan->agenda }}
        </p>

        <br><br>

        <p>Demikian untuk dipedomani. Atas perhatian dan kerja samanya, kami ucapkan terima kasih.</p>

        <br><br><br>

        <p style="text-align:right;">Kepala</p>
        <br><br>
        <p style="text-align:right;">(Nama Kepala BPS)</p>
    </div>
</body>
</html>
