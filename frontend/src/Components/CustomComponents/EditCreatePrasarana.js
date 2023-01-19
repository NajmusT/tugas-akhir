import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { Grid, Typography } from '@material-ui/core'
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../ReusableComponent/Breadcrumb'
import CustomTextField from '../ReusableComponent/TextField'
import CustomSelect from '../ReusableComponent/Select'
import Button from '../ReusableComponent/Button'
import ImagesUploader from '../ReusableComponent/ImagesUploader'
import ConfirmDialog from '../ReusableComponent/ConfirmationDialog'
import LoadingScreen from '../../Pages/LoadingScreen';
import Wrapper from '../Wrapper';

const EditCreatePrasarana = (props) => {
    const { isEditMode } = props

    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('user'))?.payload
    const isAdminSekolah = user.roles === 'admin-sekolah'
    var fotoPrasarana

    const prasaranaId = useParams()

    const [prasarana, setPrasarana] = useState(null)
    const [name, setName] = useState(null)
    const [kondisi, setKondisi] = useState(null)
    const [schools, setSchools] = useState(null)
    const [file, setFile] = useState(null)
    const [jenis, setJenis] = useState(null)
    const [url, setUrl] = useState(null)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [openFailedDialog, setOpenFailedDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [errors, setError] = useState('')

    const kategori = [
        { id: "Baik", label: 'Baik' },
        { id: "Rusak Ringan", label: 'Rusak Ringan' },
        { id: "Rusak Sedang", label: 'Rusak Sedang' },
        { id: "Rusak Berat", label: 'Rusak Berat' }
    ]

    const handleEdit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        if (name != null || kondisi != null) {
            formData.append("file", file)
            formData.append("nama", name)
            formData.append("jenis", jenis)
            formData.append("kondisi", kondisi)
            formData.append("idSekolah", schools?._id)
            formData.append("createdBy", user._id)
            formData.append("createdAt", moment())
            formData.append("updatedBy", user._id)
            formData.append("updatedAt", moment())

            try {
                await axios.put(`http://localhost:5000/prasarana/update/${prasaranaId.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
                setOpenSuccessDialog(true)
            } catch (error) {
                setError(error.response.data.errors)
                setOpenFailedDialog(true)
            }
        } else {
            setOpenEditDialog(true)
        }
    }

    const SuccessDialog = () => {
        return (
            <ConfirmDialog
                title={isEditMode ? "Edit Prasarana Berhasil" : "Create Prasarana Berhasil"}
                subtitle={isEditMode ? "Sistem telah memperbarui data prasarana di dalam database" : "Sistem telah memasukkan data prasarana ke dalam database"}
                open={openSuccessDialog}
                handleClose={() => { setOpenSuccessDialog(false); history.goBack() }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const FailedDialog = () => {
        return (
            <ConfirmDialog
                title={isEditMode ? "Edit Prasarana Gagal" : "Daftar Prasarana Gagal"}
                subtitle={isEditMode ? "Sistem gagal memperbarui data prasarana di dalam database" : "Sistem gagal memasukkan data prasarana ke dalam database"}
                open={openFailedDialog}
                handleClose={() => { setOpenFailedDialog(false); }}
                icon={<WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
            />
        )
    }

    const EditModal = () => {
        return (
            <ConfirmDialog
                title={'Dialog Konfirmasi Edit'}
                subtitle={`Apakah anda yakin ingin mengedit data ${name} ini?`}
                open={openEditDialog}
                handleClose={() => { setOpenEditDialog(false) }}
                icon={<WarningIcon style={{ color: '#FD7716', fontSize: '8rem' }} />}
                dialogAction={
                    <div style={{ display: 'flex' }}>
                        <div >
                            <Button
                                variant="contained"
                                buttonText={"Ya"}
                                page='main'
                                buttonType='primary'
                                onClick={handleEdit}
                            />
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                            <Button
                                variant="contained"
                                buttonText={"Tidak"}
                                page='main'
                                buttonType='danger'
                                onClick={() => { setOpenEditDialog(false) }}
                            />
                        </div>
                    </div>
                }
            />
        )
    }

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
            formData.append("jenis", jenis)
            formData.append("kondisi", kondisi)
            formData.append("idSekolah", schools?._id)
            formData.append("createdBy", user._id)
            formData.append("createdAt", moment())
            formData.append("updatedBy", user._id)
            formData.append("updatedAt", moment())

            if (!isEditMode) {
                try {
                    await axios.post('http://localhost:5000/prasarana/new', formData, { headers: { "Content-Type": "multipart/form-data" } });
                    setOpenSuccessDialog(true)
                } catch (error) {
                    setError(error.response.data.errors)
                    setOpenFailedDialog(true)
                }
            } else {
                setOpenEditDialog(true)
            }
        } else {
            setOpenFailedDialog(true)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/sekolah').then(res => { setSchools(res.data.filter((item => item.createdBy === user._id))[0]) })

        if (isEditMode) { axios.get(`http://localhost:5000/prasarana/${prasaranaId.id}`).then(res => { setPrasarana(res.data) }) }
    }, [])

    useEffect(() => {
        if (prasarana != null && prasarana.foto.fileName != "") { fotoPrasarana = require(`../../../../backend/public/images/${prasarana.foto.fileName}`) }
        else { fotoPrasarana = null }

        if (prasarana != null && isEditMode) {
            setName(prasarana.nama)
            setJenis(prasarana.jenis)
            setKondisi(prasarana.kondisi)
        }
    }, [prasarana, setPrasarana])

    useEffect(() => {
        if (prasaranaId.location === 'tempat-bermain-dan-berolahraga') {
            setJenis("Tempat Bermain dan Berolahraga")
        } else if (prasaranaId.location === 'ruang-kelas') {
            setJenis("Ruang Kelas")
        } else if (prasaranaId.location === 'laboratorium-IPA') {
            setJenis("Laboratorium IPA")
        } else if (prasaranaId.location === 'ruang-guru') {
            setJenis("Ruang Guru")
        } else if (prasaranaId.location === 'ruang-pimpinan') {
            setJenis("Ruang Pimpinan")
        } else if (prasaranaId.location === 'toilet') {
            setJenis("Toilet")
        } else if (prasaranaId.location === 'UKS') {
            setJenis("Unit Kesehatan Siswa")
        } else if (prasaranaId.location === 'tempat-beribadah') {
            setJenis("Tempat Beribadah")
        } else if (prasaranaId.location === 'gudang') {
            setJenis("Gudang")
        } else if (prasaranaId.location === 'ruang-perpustakaan') {
            setJenis("Ruang Perpustakaan")
        }
    }, [prasaranaId.location])

    return (
        <React.Fragment>
            {isAdminSekolah ?
                <Wrapper children={
                    <React.Fragment>
                        {openFailedDialog && FailedDialog()}
                        {openSuccessDialog && SuccessDialog()}
                        {openEditDialog && EditModal()}
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
                                                            value={jenis}
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
                                                            option={kategori}
                                                        />
                                                    </Grid>
                                                    <Grid style={{ display: 'flex', paddingTop: 44, justifyContent: 'flex-end' }}>
                                                        <Button
                                                            variant="contained"
                                                            buttonText={isEditMode ? "Save Changes" : "Save"}
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
                    </React.Fragment>} /> : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default EditCreatePrasarana