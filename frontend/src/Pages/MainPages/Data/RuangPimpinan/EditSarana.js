import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const EditSaranaRuangPimpinan = () => {
    return (
        <EditCreateSarana
            isEditMode={true}
            sekolah={'SD'}
            ruangan={'Ruang Pimpinan'}
        />
    )
}

export default EditSaranaRuangPimpinan
