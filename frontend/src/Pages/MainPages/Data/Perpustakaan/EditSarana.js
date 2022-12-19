import React from 'react'
import EditCreateSarana from '../../../../Components/CustomComponents/EditCreateSarana'

const EditSaranaPerpustakaan = () => {
    return (
        <EditCreateSarana
            isEditMode={true}
            sekolah={'SD'}
            ruangan={'Perpustakaan'}
        />
    )
}

export default EditSaranaPerpustakaan
