import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const EditSaranaRuangKelas = () => {
    return (
        <EditCreateSarana
            isEditMode={true}
            sekolah={'SD'}
            ruangan={'Ruang Kelas'}
        />
    )
}

export default EditSaranaRuangKelas
