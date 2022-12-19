import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const EditPrasaranaPerpustakaan = () => {
    return (
        <EditCreatePrasarana
            isEditMode={true}
            sekolah={'SD'}
            tipe={'Perpustakaan'}
        />
    )
}

export default EditPrasaranaPerpustakaan
