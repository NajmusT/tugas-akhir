import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const CreateSaranaGudang = () => {
    return (
        <EditCreateSarana
            isEditMode={false}
            sekolah={'SD'}
            ruangan={'Gudang'}
        />
    )
}

export default CreateSaranaGudang
