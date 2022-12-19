import React from 'react'
import ViewPrasarana from '../../../../Components/CustomComponents/ViewPrasarana'

const ViewRuangPimpinan = () => {
    const prasarana = {
        id: 'uvwe-type-jhed',
        nama: 'Ruang Pimpinan',
        foto: '',
        jenis: 'Ruang Pimpinan',
        kondisi: 'Rusak Ringan',
        idSekolah: 'uvwe-type-jhed'
    }

    return (
        <ViewPrasarana
            prasarana={prasarana}
        />
    )
}

export default ViewRuangPimpinan