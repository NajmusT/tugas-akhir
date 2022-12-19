import React from 'react'
import ViewPrasarana from '../../../../Components/CustomComponents/ViewPrasarana'

const ViewUKS = () => {
    const prasarana = {
        id: 'uvwe-type-jhed',
        nama: 'UKS',
        foto: '',
        jenis: 'UKS',
        kondisi: 'Rusak Ringan',
        idSekolah: 'uvwe-type-jhed'
    }

    return (
        <ViewPrasarana
            prasarana={prasarana}
        />
    )
}

export default ViewUKS