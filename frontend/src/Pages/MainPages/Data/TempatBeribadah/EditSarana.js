import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const EditSaranaTempatBeribadah = () => {
    return (
        <EditCreateSarana
            isEditMode={true}
            sekolah={'SD'}
            ruangan={'Tempat Beribadah'}
        />
    )
}

export default EditSaranaTempatBeribadah
