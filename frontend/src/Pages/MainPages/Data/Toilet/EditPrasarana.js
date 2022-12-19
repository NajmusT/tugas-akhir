import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const EditPrasaranaToilet = () => {
    return (
        <EditCreatePrasarana
            isEditMode={true}
            sekolah={'SD'}
            tipe={'Toilet'}
        />
    )
}

export default EditPrasaranaToilet
