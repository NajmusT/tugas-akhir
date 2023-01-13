import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../ReusableComponent/Breadcrumb'
import CustomTextField from '../ReusableComponent/TextField'
import CustomSelect from '../ReusableComponent/Select'
import Button from '../ReusableComponent/Button'
import ImagesUploader from '../ReusableComponent/ImagesUploader'
import axios from 'axios'
import { getCurrentUser } from '../../Utils'

const EditCreatePrasarana = (props) => {
    const { isEditMode, sekolah, prasarana, tipe } = props

    const history = useHistory()
    const user = getCurrentUser()

    const fotoPrasarana = isEditMode ? require(`../../../../backend/public/images/${prasarana.foto.fileName}`) : null

    const [name, setName] = useState(isEditMode ? prasarana.nama : null)
    const [kondisi, setKondisi] = useState(isEditMode ? prasarana.kondisi : null)
    const [schools, setSchools] = useState(isEditMode ? sekolah : null)
    const [file, setFile] = useState(isEditMode ? fotoPrasarana : null)
    const [url, setUrl] = useState(isEditMode ? prasarana.foto.url : null)

    const useInput = () => {
        const handleChange = (newUrlValue, newFileValue) => {
            setUrl(newUrlValue)
            setFile(newFileValue)
        }

        return {
            urlValue: url,
            fileValue: file,
            handleChange: handleChange
        }
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeKondisi = (e) => {
        setKondisi(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()



    }

    useEffect(() => {
        axios.get('http://localhost:5000/sekolah').then(res => { setSchools(res.data.filter((item => item.createdBy === user._id))[0]) })
    }, [])

    return (
        <React.Fragment>
            <Breadcrumb
                title={isEditMode ? 'Edit Prasarana Pendidikan' : 'Create Prasarana Pendidikan'}
                subsubtitle={schools?.nama}
            />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400] }}>
                        {schools?.nama}
                    </Typography>
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <div style={{
                        width: '100vw',
                        backgroundColor: Color.neutral[0],
                        borderRadius: 12
                    }}>
                        <Grid container style={{ padding: '36px' }}>
                            <Grid item container xs={5} style={{ borderRadius: 12 }}>
                                <ImagesUploader useInput={useInput} width={'39vw'} height={'288px'} />
                            </Grid>
                            <Grid item container xs={7} style={{ paddingLeft: 40 }}>
                                <Grid item xs={12}>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '12vw', alignSelf: 'center' }}>
                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                Nama Ruangan
                                            </Typography>
                                        </div>
                                        <CustomTextField
                                            id="nama-ruangan"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            label="Nama Ruangan"
                                            type="text"
                                            page="main"
                                            value={name}
                                            onChange={handleChangeName}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '12vw' }}>
                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                Nama Sekolah
                                            </Typography>
                                        </div>
                                        <CustomTextField
                                            id="nama-sekolah"
                                            fullWidth
                                            disable={true}
                                            variant="outlined"
                                            margin="dense"
                                            label="Nama Sekolah"
                                            type="text"
                                            page="main"
                                            value={schools?.nama}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '12vw' }}>
                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                Tipe
                                            </Typography>
                                        </div>
                                        <CustomTextField
                                            id="tipe-prasarana"
                                            fullWidth
                                            disable={true}
                                            variant="outlined"
                                            margin="dense"
                                            label="Tipe Prasarana"
                                            type="text"
                                            page="main"
                                            value={tipe}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '12vw' }}>
                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                Kondisi
                                            </Typography>
                                        </div>
                                        <CustomSelect
                                            id={"kondisi"}
                                            margin={"dense"}
                                            fullWidth
                                            label={"Kondisi"}
                                            variant={"outlined"}
                                            page={"main"}
                                            value={kondisi}
                                            onChange={handleChangeKondisi}
                                            option={['Baik', 'Rusak Ringan', 'Rusak Sedang', 'Rusak Berat']}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', paddingTop: 44, justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="contained"
                                            buttonText={"Save"}
                                            page='main'
                                            buttonType='primary'
                                            onClick={handleSubmit}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid >
        </React.Fragment >
    )
}

export default EditCreatePrasarana