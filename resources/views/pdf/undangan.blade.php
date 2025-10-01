<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: 'DejaVu Sans', sans-serif; 
            font-size: 12px; 
            line-height: 1.6; 
            margin: 0; 
            padding: 0;
        }
        .kop {
            width: 100%;
            border-bottom: 2px solid black;
            padding-bottom: 5px;
            margin-bottom: 20px;
        }
        .kop td { vertical-align: middle; }
        .kop-logo { width: 100px; text-align: left; }
        .kop-logo img { height: 70px; width: auto; }
        .kop-title { text-align: left; padding-left: 5px; }
        .kop-title h1 {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .kop-title p { margin: 0; font-size: 11px; }

        .content { margin: 10px 30px; }
        .nomor { margin-bottom: 15px; }
        .ml { margin-left: 40px; }
        .footer { margin-top: 50px; text-align: right; }
        .ttd { margin-top: 80px; text-align: right; font-weight: bold; }
    </style>
</head>
<body>
    <!-- Kop Surat -->
    <table class="kop">
        <tr>
            <td class="kop-logo">
                <img src="{{ public_path('storage/logo_bps.png') }}" alt="Logo BPS">
            </td>
            <td class="kop-title">
                <h1>BADAN PUSAT STATISTIK<br>PROVINSI RIAU</h1>
                <p>Jalan Pattimura No. 12, Pekanbaru 28131, Telepon: (0761) 23042</p>
                <p>Laman: riau.bps.go.id, Pos-el: riau@bps.go.id</p>
            </td>
        </tr>
    </table>

    <!-- Isi Surat -->
    <div class="content">
        <div class="nomor">
            <table style="width:100%;">
                <tr>
                    <td style="width:80%;">
                        Nomor&nbsp;&nbsp;: {{ $undangan->nomor_surat ?? '123/XXX/2024' }} <br>
                        Sifat&nbsp;&nbsp;&nbsp;&nbsp;: {{ $undangan->sifat ?? 'Biasa' }} <br>
                        Lampiran: 1 (satu) lembar <br>
                        Hal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Undangan {{ $undangan->judul }}
                    </td>
                    <td style="text-align:right; width:20%;">
                        Pekanbaru, {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}
                    </td>
                </tr>
            </table>
        </div>

        <p>Yth. Daftar Undangan Terlampir<br>di -<br><span class="ml">Tempat</span></p>

        <p>
            Dalam rangka kegiatan {{ $undangan->judul }}, Bapak/Ibu diundang untuk mengikuti rapat yang akan dilaksanakan pada:
        </p>

        <p class="ml">
            Hari/Tanggal : {{ \Carbon\Carbon::parse($undangan->tanggal)->translatedFormat('l, d F Y') }}<br>
            Pukul&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {{ $undangan->waktu_mulai }} - {{ $undangan->waktu_selesai }} WIB<br>
            Tempat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {{ $undangan->tempat }}<br>
            Agenda&nbsp;&nbsp;&nbsp;: {{ $undangan->agenda }}
        </p>

        <p>Demikian untuk dipedomani. Atas perhatian dan kerjasamanya diucapkan terima kasih.</p>

        <!-- TTD -->
        <div class="footer">
            <p>Kepala</p>
            <div class="ttd">
                <p>{{ $undangan->pejabat ?? 'Asep Riyadi, S.Si., M.M' }}</p>
            </div>
        </div>
    </div>
</body>
</html>
