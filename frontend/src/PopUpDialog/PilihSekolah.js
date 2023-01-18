import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import FormDialog from '../Components/CustomComponents/FormDialog'
import Select from '../Components/ReusableComponent/Select'

const PilihSekolah = (props) => {
    const { open, handleClose, location } = props
    const history = useHistory()

    const [sekolah, setSekolah] = useState(null)
    const [selectedSekolah, setSelectedSekolah] = useState('')
    const [test, setTest] = useState([])

    const handleChangeSekolah = (e) => {
        e.preventDefault()
        setSelectedSekolah(e.target.value)
    }

    useEffect(() => { axios.get('http://localhost:5000/sekolah').then(res => { setSekolah(res.data) }) }, [])

    useEffect(() => { console.log(selectedSekolah) }, [selectedSekolah])

    useEffect(() => {
        if (sekolah != null) {
            setTest(sekolah.map(item => ({ id: item._id, label: item.nama })))
        }
    }, [sekolah, setSekolah])

    useEffect(() => {
        console.log("Test: ", test)
    }, [test, setTest])

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
                    value={selectedSekolah}
                    onChange={handleChangeSekolah}
                    option={test != null ? test : { id: '', label: '' }}
                />
            }
            handleClick={() => {
                history.push(`/data/list-prasarana/${location}/${selectedSekolah}`)
                handleClose()
                window.location.reload(false)
            }}
        />
    )
}

export default PilihSekolah