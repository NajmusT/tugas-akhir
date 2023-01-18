import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid, Typography } from '@material-ui/core'
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../ReusableComponent/Breadcrumb'
import CustomTextField from '../ReusableComponent/TextField'
import CustomSelect from '../ReusableComponent/Select'
import Button from '../ReusableComponent/Button'
import ConfirmDialog from '../ReusableComponent/ConfirmationDialog'
import ImagesUploader from '../ReusableComponent/ImagesUploader'
import LoadingScreen from '../../Pages/LoadingScreen';
import Wrapper from '../Wrapper';
import axios from 'axios';

const BuatPengaduan = () => {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('user'))?.payload
    const isAdminSekolah = user.roles === 'admin-sekolah'

    const [jenisPengaduan, setJenisPengaduan] = useState(null)
    const [ruangan, setRuangan] = useState(null)
    const [sarana, setSarana] = useState(null)
    const [sekolah, setSekolah] = useState('')
    const [kategoriRusak, setKategoriRusak] = useState(null)
    const [deskripsi, setDeskripsi] = useState(null)
    const [schools, setSchools] = useState(null)
    const [prasaranas, setPrasaranas] = useState(null)
    const [saranas, setSaranas] = useState(null)
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [openFailedDialog, setOpenFailedDialog] = useState(false)

    const SuccessDialog = () => {
        return (
            <ConfirmDialog
                title={"Create Pengaduan Berhasil"}
                subtitle={"Sistem telah memasukkan data pengaduan ke dalam database"}
                open={openSuccessDialog}
                handleClose={() => { setOpenSuccessDialog(false); history.goBack() }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const FailedDialog = () => {
        return (
            <ConfirmDialog
                title={"Create Pengaduan Gagal"}
                subtitle={"Sistem gagal memasukkan data pengaduan ke dalam database"}
                open={openFailedDialog}
                handleClose={() => { setOpenFailedDialog(false); }}
                icon={<WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
            />
        )
    }
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

    const handleChangeJenisPengaduan = (e) => { setJenisPengaduan(e.target.value) }
    const handleChangeRuangan = (e) => { setRuangan(e.target.value) }
    const handleChangeSarana = (e) => { setSarana(e.target.value) }
    const handleChangeKategoriRusak = (e) => { setKategoriRusak(e.target.value) }
    const handleChangeDeskripsi = (e) => { setDeskripsi(e.target.value) }

    const handleSubmit = async (e) => {
        e.preventDefault();

        history.push('/beranda')
    }

    useEffect(() => {
        axios.get('http://localhost:5000/sekolah').then(res => { setSchools(res.data.filter((item => item.createdBy === user._id))[0]) })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/prasarana').then(res => { setPrasaranas(res.data.filter((item => item.createdBy === user._id))) })
        axios.get(`http://localhost:5000/sarana`).then(res => { setSaranas(res.data.filter((item => item.createdBy === user._id))) })
    }, [schools, setSchools])

    return (
        <React.Fragment>
            {isAdminSekolah ?
                <Wrapper
                    children={
                        <React.Fragment>
                            {openSuccessDialog && SuccessDialog()}
                            {openFailedDialog && FailedDialog()}
                            <React.Fragment>
                                <Breadcrumb subsubtitle={'Pengaduan Kerusakan'} />
                                <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                                    <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                                        <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400] }}>
                                            {sekolah}
                                        </Typography>
                                    </Grid>
                                    <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                                        <div style={{
                                            width: '100vw',
                                            backgroundColor: Color.neutral[0],
                                            borderRadius: 12
                                        }}>
                                            <Grid container style={{ padding: '36px' }}>
                                                <Grid item container xs={6} style={{ borderRadius: 12 }}>
                                                    <ImagesUploader useInput={useInput} width={'46vw'} height={jenisPengaduan === 'Kerusakan Sarana' ? 438 : 366} />
                                                </Grid>
                                                <Grid item container xs={6} style={{ paddingLeft: 32 }}>
                                                    <Grid item xs={12}>
                                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ width: '172px' }}>
                                                                <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                    Jenis Pengaduan
                                                                </Typography>
                                                            </div>
                                                            <CustomSelect
                                                                id={"jenis"}
                                                                margin={"dense"}
                                                                fullWidth
                                                                label={"Jenis"}
                                                                variant={"outlined"}
                                                                page={"main"}
                                                                value={jenisPengaduan}
                                                                onChange={handleChangeJenisPengaduan}
                                                                option={['Kerusakan Sarana', 'Kerusakan Prasarana']}
                                                            />
                                                        </Grid>
                                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ width: '172px' }}>
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
                                                                value={sekolah}
                                                            />
                                                        </Grid>
                                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ width: '172px' }}>
                                                                <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                    Nama Ruangan
                                                                </Typography>
                                                            </div>
                                                            <CustomSelect
                                                                id="ruangan"
                                                                fullWidth
                                                                variant="outlined"
                                                                margin="dense"
                                                                label="Ruangan"
                                                                page={"main"}
                                                                value={ruangan}
                                                                onChange={handleChangeRuangan}
                                                                option={prasaranas?.map(item => item._id)}
                                                            />
                                                        </Grid>
                                                        {jenisPengaduan === "Kerusakan Sarana" &&
                                                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                                                <div style={{ width: '172px' }}>
                                                                    <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                        Nama Sarana
                                                                    </Typography>
                                                                </div>
                                                                <CustomSelect
                                                                    id="sarana"
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    margin="dense"
                                                                    label="Sarana"
                                                                    page={"main"}
                                                                    value={sarana}
                                                                    onChange={handleChangeSarana}
                                                                    option={saranas?.filter(i => i.idPrasarana === ruangan).map(item => item.nama)}
                                                                />
                                                            </Grid>
                                                        }
                                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ width: '172px' }}>
                                                                <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                    Kategori Rusak
                                                                </Typography>
                                                            </div>
                                                            <CustomSelect
                                                                id={"kondisi"}
                                                                margin={"dense"}
                                                                fullWidth
                                                                label={"Kondisi"}
                                                                variant={"outlined"}
                                                                page={"main"}
                                                                value={kategoriRusak}
                                                                onChange={handleChangeKategoriRusak}
                                                                option={['Rusak Ringan', 'Rusak Sedang', 'Rusak Berat']}
                                                            />
                                                        </Grid>
                                                        <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 4, paddingBottom: 4 }}>
                                                            <div style={{ alignSelf: 'center' }}>
                                                                <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                    Deskripsi
                                                                </Typography>
                                                            </div>
                                                        </Grid>
                                                        <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                                            <CustomTextField
                                                                id="deskripsi"
                                                                fullWidth
                                                                row={3}
                                                                variant="outlined"
                                                                margin="dense"
                                                                label="Deskripsi"
                                                                type="text"
                                                                page="main"
                                                                value={deskripsi}
                                                                onChange={handleChangeDeskripsi}
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
                            </React.Fragment>
                        </React.Fragment>
                    } />
                : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default BuatPengaduan
