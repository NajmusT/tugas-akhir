import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const CreatePrasaranaToilet = () => {
    return (
        <EditCreatePrasarana
            isEditMode={false}
            sekolah={'SD'}
            tipe={'Toilet'}
        />
    )
}

export default CreatePrasaranaToilet
