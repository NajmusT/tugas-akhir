import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const EditPrasaranaRuangPimpinan = () => {
    return (
        <EditCreatePrasarana
            isEditMode={true}
            sekolah={'SD'}
            tipe={'Ruang Pimpinan'}
        />
    )
}

export default EditPrasaranaRuangPimpinan
