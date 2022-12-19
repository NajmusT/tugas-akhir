import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const CreateSaranaRuangPimpinan = () => {
    return (
        <EditCreateSarana
            isEditMode={false}
            sekolah={'SD'}
            ruangan={'Ruang Pimpinan'}
        />
    )
}

export default CreateSaranaRuangPimpinan
