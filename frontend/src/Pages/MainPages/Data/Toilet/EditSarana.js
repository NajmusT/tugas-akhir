import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const EditSaranaToilet = () => {
    return (
        <EditCreateSarana
            isEditMode={true}
            sekolah={'SD'}
            ruangan={'Toilet'}
        />
    )
}

export default EditSaranaToilet
