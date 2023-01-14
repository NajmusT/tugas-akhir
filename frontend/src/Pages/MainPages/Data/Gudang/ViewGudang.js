import React from 'react'
import ViewPrasarana from '../../../../Components/CustomComponents/ViewPrasarana'

const ViewGudang = () => {
    const prasarana = {
        id: 'uvwe-type-jhed',
        nama: 'Ruang Kelas 1B',
        foto: '',
        jenis: 'Ruang Kelas',
        kondisi: 'Rusak Ringan',
        idSekolah: 'uvwe-type-jhed'
    }

    return (
        <ViewPrasarana prasarana={prasarana} />
    )
}

export default ViewGudang