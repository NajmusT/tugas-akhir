import React from 'react'
import ViewPrasarana from '../../../../Components/CustomComponents/ViewPrasarana'

const ViewToilet = () => {
    const prasarana = {
        id: 'uvwe-type-jhed',
        nama: 'Toilet',
        foto: '',
        jenis: 'Toilet',
        kondisi: 'Rusak Ringan',
        idSekolah: 'uvwe-type-jhed'
    }

    return (
        <ViewPrasarana
            prasarana={prasarana}
        />
    )
}

export default ViewToilet