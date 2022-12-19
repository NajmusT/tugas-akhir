import React from 'react'
import ViewPrasarana from '../../../../Components/CustomComponents/ViewPrasarana'

const ViewTempatBeribadah = () => {
    const prasarana = {
        id: 'uvwe-type-jhed',
        nama: 'Tempat Beribadah',
        foto: '',
        jenis: 'Tempat Beribadah',
        kondisi: 'Rusak Ringan',
        idSekolah: 'uvwe-type-jhed'
    }

    return (
        <ViewPrasarana
            prasarana={prasarana}
        />
    )
}

export default ViewTempatBeribadah