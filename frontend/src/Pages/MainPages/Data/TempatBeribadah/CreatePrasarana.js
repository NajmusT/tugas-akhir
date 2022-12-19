import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const CreatePrasaranaTempatBeribadah = () => {
    return (
        <EditCreatePrasarana
            isEditMode={false}
            sekolah={'SD'}
            tipe={'Tempat Beribadah'}
        />
    )
}

export default CreatePrasaranaTempatBeribadah
