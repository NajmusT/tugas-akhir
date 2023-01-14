import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import EditCreateSarana from '../../../Components/CustomComponents/EditCreateSarana'

const EditSarana = () => {
    const saranaId = useParams()
    const [sarana, setSarana] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:5000/sarana/${saranaId.id}`).then(res => { setSarana(res.data) })
    }, [])

    return (
        <EditCreateSarana isEditMode={true} sarana={sarana} />
    )
}

export default EditSarana
