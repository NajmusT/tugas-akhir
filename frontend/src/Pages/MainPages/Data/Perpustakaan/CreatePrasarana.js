import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const CreatePrasaranaRuangGuru = () => {
    return (
        <EditCreatePrasarana
            isEditMode={false}
            sekolah={'SD'}
            tipe={'Perpustakaan'}
        />
    )
}

export default CreatePrasaranaRuangGuru
