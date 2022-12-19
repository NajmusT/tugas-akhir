import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const EditPrasaranaRuangGuru = () => {
    return (
        <EditCreatePrasarana
            isEditMode={true}
            sekolah={'SD'}
            tipe={'Ruang Guru'}
        />
    )
}

export default EditPrasaranaRuangGuru
