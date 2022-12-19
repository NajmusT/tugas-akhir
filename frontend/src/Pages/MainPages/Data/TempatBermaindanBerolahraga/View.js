import React from 'react'
import ViewPrasarana from '../../../../Components/CustomComponents/ViewPrasarana'

const ViewTempatOlahraga = () => {
    const prasarana = {
        id: 'uvwe-type-jhed',
        nama: 'Tempat Bermain dan Berolahraga',
        foto: '',
        jenis: 'Tempat Bermain dan Berolahraga',
        kondisi: 'Rusak Ringan',
        idSekolah: 'uvwe-type-jhed'
    }

    return (
        <ViewPrasarana
            prasarana={prasarana}
        />
    )
}

export default ViewTempatOlahraga