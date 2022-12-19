import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const CreateSaranaTempatBeribadah = () => {
    return (
        <EditCreateSarana
            isEditMode={false}
            sekolah={'SD'}
            ruangan={'Tempat Beribadah'}
        />
    )
}

export default CreateSaranaTempatBeribadah
