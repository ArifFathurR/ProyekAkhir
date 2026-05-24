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
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="width: 80px; padding: 0; vertical-align: top;">Nomor</td>
                    <td style="width: 15px; padding: 0; vertical-align: top;">:</td>
                    <td style="padding: 0; vertical-align: top;">{{ $undangan->nomor_surat ?? '123/XXX/2024' }}</td>
                    <td style="text-align: right; width: 40%; padding: 0; vertical-align: top;">
                        Pekanbaru, {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0; vertical-align: top;">Sifat</td>
                    <td style="padding: 0; vertical-align: top;">:</td>
                    <td style="padding: 0; vertical-align: top;">{{ $undangan->sifat ?? 'Biasa' }}</td>
                </tr>
                <tr>
                    <td style="padding: 0; vertical-align: top;">Lampiran</td>
                    <td style="padding: 0; vertical-align: top;">:</td>
                    <td style="padding: 0; vertical-align: top;">1 (satu) lembar</td>
                </tr>
                <tr>
                    <td style="padding: 0; vertical-align: top;">Hal</td>
                    <td style="padding: 0; vertical-align: top;">:</td>
                    <td style="padding: 0; vertical-align: top;">Undangan {{ $undangan->judul }}</td>
                </tr>
            </table>
        </div>

        <p>Yth. Daftar Undangan Terlampir<br>di -<br><span class="ml">Tempat</span></p>

        <p>
            Dalam rangka kegiatan {{ $undangan->judul }}, Bapak/Ibu diundang untuk mengikuti {{ $undangan->deskripsi }} yang akan dilaksanakan pada:
        </p>

        <table style="border-collapse: collapse; margin-left: 40px; margin-bottom: 15px;">
            <tr>
                <td style="width: 100px; padding: 2px 0; vertical-align: top;">Hari/Tanggal</td>
                <td style="width: 15px; padding: 2px 0; vertical-align: top;">:</td>
                <td style="padding: 2px 0; vertical-align: top;">{{ $undangan->hari }}, {{ \Carbon\Carbon::parse($undangan->tanggal)->translatedFormat('d F Y') }}</td>
            </tr>
            <tr>
                <td style="padding: 2px 0; vertical-align: top;">Pukul</td>
                <td style="padding: 2px 0; vertical-align: top;">:</td>
                <td style="padding: 2px 0; vertical-align: top;">{{ $undangan->waktu }} WIB</td>
            </tr>
            <tr>
                <td style="padding: 2px 0; vertical-align: top;">Tempat</td>
                <td style="padding: 2px 0; vertical-align: top;">:</td>
                <td style="padding: 2px 0; vertical-align: top;">{{ $undangan->tempat }}</td>
            </tr>
            <tr>
                <td style="padding: 2px 0; vertical-align: top;">Agenda</td>
                <td style="padding: 2px 0; vertical-align: top;">:</td>
                <td style="padding: 2px 0; vertical-align: top;">{{ $undangan->agenda }}</td>
            </tr>
        </table>

        <p>Demikian untuk dipedomani. Atas perhatian dan kerjasamanya diucapkan terima kasih.</p>

        <!-- TTD -->
        <div class="footer">
            <p>Kepala</p>
            <div class="ttd">
                <p>{{ $undangan->pejabat ?? 'Asep Riyadi, S.Si., M.M' }}</p>
            </div>
        </div>
    </div>

    <!-- Halaman Lampiran -->
    <div style="page-break-before: always; margin: 30px;">
        <h3 style="margin-bottom: 20px; font-size: 14px; font-weight: normal;">Daftar Peserta :</h3>
        @if(isset($undangan->penerimaUndangan) && count($undangan->penerimaUndangan) > 0)
            <ol style="margin-left: 0; padding-left: 20px; font-size: 13px;">
                @foreach($undangan->penerimaUndangan as $penerima)
                    @if(isset($penerima->user))
                        <li style="margin-bottom: 5px; padding-left: 5px;">{{ $penerima->user->name }}{{ isset($penerima->user->gelar) ? ', ' . $penerima->user->gelar : '' }}</li>
                    @endif
                @endforeach
            </ol>
        @else
            <p style="font-style: italic;">Tidak ada peserta yang terdaftar.</p>
        @endif
    </div>
</body>
</html>
