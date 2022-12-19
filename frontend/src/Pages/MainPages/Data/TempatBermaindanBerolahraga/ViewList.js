import React from 'react'
import ViewListPrasarana from '../../../../Components/CustomComponents/ViewListPrasarana'

const ViewListTempatOlahraga = () => {
    const sekolah = {
        id: 'uvwd-ashd-thej',
        nama: 'SD Adiarsa Barat I',
        npsn: '140192302302',
        jenis: 'Negeri',
        fotoSekolah: '',
        alamat: {
            jalan: 'Jalan dimana mana hatiku senang No. 12',
            kodePos: '14561'
        },
        kepalaSekolah: 'Drs. Lusiana Angkur, S.Pd, M.Pd',
        ketuaKomite: 'Drs. Antonia Deidre, S.Pd, M.Pd',
        akreditasi: {
            nilaiHuruf: 'A',
            tanggal: '01 Juli 1956',
            noSK: '421.2/Kep.422-Huk/2015'
        },
        pendirian: {
            tanggal: '01 Juli 1956',
            noSurat: '421.2/Kep.422-Huk/2015'
        },
        izinOperasional: {
            tanggal: '01 Juli 1956',
            noSurat: '421.2/Kep.422-Huk/2015'
        },
        lahan: {
            luas: '100',
            kepemilikan: 'Milik Pemerintah',
        },
        bantuanPendanaan: 'BOS, APBN, APBD',
        rombonganBelajar: [
            {
                nama: 'Pimpinan 1B',
                tingkat: 1,
                jumlahMurid: 16,
            },
            {
                nama: 'Pimpinan 2A',
                tingkat: 2,
                jumlahMurid: 20,
            },
            {
                nama: 'Pimpinan 3A',
                tingkat: 3,
                jumlahMurid: 18,
            }
        ]
    }

    return (
        <ViewListPrasarana
            sekolah={sekolah}
            jenis={'Tempat Bermain dan Berolahraga'}
        />
    )
}

export default ViewListTempatOlahraga