import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const CreatePrasaranaRuangGuru = () => {
    return (
        <EditCreatePrasarana
            isEditMode={false}
            sekolah={'SD'}
            tipe={'Ruang Guru'}
        />
    )
}

export default CreatePrasaranaRuangGuru
