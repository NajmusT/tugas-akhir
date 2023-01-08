import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import FormDialog from '../Components/CustomComponents/FormDialog'
import Select from '../Components/Select'

const PilihSekolah = (props) => {
    const { open, handleClose } = props
    const [sekolah, setSekolah] = useState('')

    const params = useParams()

    const handleChangeSekolah = (e) => {
        e.preventDefault()
        setSekolah(e.target.value)
    }

    return (
        <FormDialog
            open={open}
            handleClose={handleClose}
            title="Pilih Sekolah"
            contentText="Pilih sekolah yang hendak anda lihat sarana prasarananya."
            buttonText="Submit"
            inputForm={
                <Select
                    id='sekolah'
                    margin='normal'
                    fullWidth
                    variant='standard'
                    page='auth'
                    value={sekolah}
                    onChange={handleChangeSekolah}
                    option={[]}
                />
            }
        />
    )
}

export default PilihSekolah