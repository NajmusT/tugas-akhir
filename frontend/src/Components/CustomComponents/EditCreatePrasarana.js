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
import ConfirmDialog from '../ReusableComponent/ConfirmationDialog'

import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';
import moment from 'moment'

const EditCreatePrasarana = (props) => {
    const { isEditMode, sekolah, prasarana, tipe } = props

    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('user'))?.payload

    const fotoPrasarana = isEditMode ? (prasarana.foto.fileName != "" ? require(`../../../../backend/public/images/${prasarana.foto.fileName}`) : null) : null

    const [name, setName] = useState(isEditMode ? prasarana.nama : null)
    const [kondisi, setKondisi] = useState(isEditMode ? prasarana.kondisi : null)
    const [schools, setSchools] = useState(isEditMode ? sekolah : null)
    const [file, setFile] = useState(isEditMode ? fotoPrasarana : null)
    const [url, setUrl] = useState(isEditMode ? prasarana.foto.url : null)
    const [openDialog, setOpenDialog] = useState(false)
    const [errors, setError] = useState('')

    const useInput = () => {
        setError(null)

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
        setError(null)
        setName(e.target.value)
    }

    const handleChangeKondisi = (e) => {
        setError(null)
        setKondisi(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        if (name != null || kondisi != null) {
            formData.append("file", file)
            formData.append("nama", name)
            formData.append("jenis", tipe)
            formData.append("kondisi", kondisi)
            formData.append("idSekolah", schools?._id)
            formData.append("createdBy", user._id)
            formData.append("createdAt", moment())
            formData.append("updatedBy", user._id)
            formData.append("updatedAt", moment())

            try {
                await axios.post('http://localhost:5000/prasarana/new', formData, { headers: { "Content-Type": "multipart/form-data" } });

            } catch (error) {
                setError(error.response.data.errors)

                console.log(error.response.data.errors)
            }
        } else {
            setError("Data tidak boleh kosong")
        }

        setOpenDialog(true)
    }

    useEffect(() => {
        axios.get('http://localhost:5000/sekolah').then(res => { setSchools(res.data.filter((item => item.createdBy === user._id))[0]) })
    }, [])

    useEffect(() => {
        console.log(errors)
    }, [errors, setError])

    const CreateNotifModal = () => {
        return (
            <ConfirmDialog
                title={errors != '' ? 'Create Data Prasarana Gagal' : 'Create Data Prasarana Berhasil'}
                subtitle={errors != '' ? `${errors}` : `Sistem telah menginput data prasarana ${name} ke dalam database`}
                open={openDialog}
                handleClose={() => {
                    setOpenDialog(false)
                    if (errors === null) { history.goBack() }
                }}
                icon={errors === null ? <SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} /> : <WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
            />
        )
    }

    return (
        <React.Fragment>
            {openDialog && CreateNotifModal()}
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
                                                error={errors != null}
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
        </React.Fragment>
    )
}

export default EditCreatePrasarana