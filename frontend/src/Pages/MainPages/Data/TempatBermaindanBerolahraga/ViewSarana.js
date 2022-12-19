import React from 'react'
import ViewSarana from '../../../../Components/CustomComponents/ViewSarana'

const ViewSaranaTempatOlahraga = () => {
    const sarana = {
        id: 'uvwd-ashd-thej',
        idPrasarana: 'uvwd-ashd-thej',
        nama: 'Meja Baca',
        foto: '',
        jenis: 'Perabot',
        kondisi: 'Rusak Ringan',
        jumlah: {
            kuantitas: 20,
            satuan: 'buah'
        },
        deskripsi: 'Terbuat dari kayu pilihan, kokoh, ukuran 320 x 300 x 300 cm, merk olymplast'
    }

    return (
        <ViewSarana
            sarana={sarana}
        />
    )
}

export default ViewSaranaTempatOlahraga