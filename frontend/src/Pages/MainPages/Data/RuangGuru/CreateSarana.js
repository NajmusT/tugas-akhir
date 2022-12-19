import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const CreateSaranaRuangGuru = () => {
    return (
        <EditCreateSarana
            isEditMode={false}
            sekolah={'SD'}
            ruangan={'Ruang Guru'}
        />
    )
}

export default CreateSaranaRuangGuru
