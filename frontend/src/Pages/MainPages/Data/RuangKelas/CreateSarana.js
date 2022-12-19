import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const CreateSaranaRuangKelas = () => {
    return (
        <EditCreateSarana
            isEditMode={false}
            sekolah={'SD'}
            ruangan={'Ruang Kelas'}
        />
    )
}

export default CreateSaranaRuangKelas
