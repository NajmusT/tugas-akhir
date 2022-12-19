import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const CreateSaranaToilet = () => {
    return (
        <EditCreateSarana
            isEditMode={false}
            sekolah={'SD'}
            ruangan={'Toilet'}
        />
    )
}

export default CreateSaranaToilet
