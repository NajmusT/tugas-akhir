import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const CreatePrasaranaGudang = () => {
    return (
        <EditCreatePrasarana
            isEditMode={false}
            sekolah={'SD'}
            tipe={'Gudang'}
        />
    )
}

export default CreatePrasaranaGudang
