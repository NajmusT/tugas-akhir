import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const CreatePrasaranaRuangPimpinan = () => {
    return (
        <EditCreatePrasarana
            isEditMode={false}
            sekolah={'SD'}
            tipe={'Ruang Pimpinan'}
        />
    )
}

export default CreatePrasaranaRuangPimpinan
