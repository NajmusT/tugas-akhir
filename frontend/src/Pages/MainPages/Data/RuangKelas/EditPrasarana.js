import React from 'react'
import EditCreatePrasarana from '../../../../Components/CustomComponents/EditCreatePrasarana'

const EditPrasaranaRuangKelas = () => {
    return (
        <EditCreatePrasarana
            isEditMode={true}
            sekolah={'SD'}
            tipe={'Ruang Kelas'}
        />
    )
}

export default EditPrasaranaRuangKelas
