import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

//Material UI
import { Grid, Typography } from '@material-ui/core'
import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Button from '../ReusableComponent/Button'
import Breadcrumb from '../ReusableComponent/Breadcrumb'
import CustomDataTable from '../ReusableComponent/DataTable'
import Search from '../ReusableComponent/Search'
import LoadingScreen from '../../Pages/LoadingScreen'
import ConfirmDialog from '../ReusableComponent/ConfirmationDialog'
import Wrapper from '../Wrapper'

import ImageIcon from '../../asset/icons/Image';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';

const ViewPrasarana = () => {
    const prasaranaId = useParams()

    const user = JSON.parse(localStorage.getItem('user'))?.payload
    const isAllowed = user.roles === "staff-dinas" || user.roles === 'admin-sekolah'

    const [location, setLocation] = useState(null)
    const [rows, setRows] = useState(null)
    const [prasarana, setPrasarana] = useState(null)
    const [sekolah, setSekolah] = useState(null)
    const [allSarana, setAllSarana] = useState(null)
    const [fotoPrasarana, setFotoPrasarana] = useState(prasarana != null ? (prasarana.foto.fileName != '' ? require(`../../../../backend/public/images/${prasarana.foto.fileName}`) : null) : null)
    const [data, setData] = useState(null)
    const [openHapusData, setOpenHapusData] = useState(false)
    const [openHapusDataNotif, setOpenHapusDataNotif] = useState(false)

    const createData = (id, nama, jumlah, kondisi, jenis, deskripsi, aksi) => {
        return { id, nama, jumlah, kondisi, jenis, deskripsi, aksi }
    }

    const handleDelete = (e) => {
        e.preventDefault()

        axios.delete(`http://localhost:5000/sarana/delete/${data._id}`).then(res => console.log(res.data))

        setOpenHapusData(false)
        setOpenHapusDataNotif(true)
    }

    const columns = [
        { id: 'id', label: 'ID', minWidth: 32, align: 'center' },
        { id: 'nama', label: 'Nama Barang', minWidth: 120, align: 'center' },
        { id: 'jumlah', label: 'Jumlah Barang', minWidth: 120, align: 'center' },
        { id: 'kondisi', label: 'Kondisi', minWidth: 120, align: 'center' },
        { id: 'jenis', label: 'Jenis', minWidth: 120, align: 'center' },
        { id: 'deskripsi', label: 'Deskripsi', minWidth: 240, align: 'center' },
        { id: 'aksi', label: 'Aksi', minWidth: 120, align: 'center' }
    ]

    const history = useHistory()

    const HapusData = () => {
        return (
            <ConfirmDialog
                title={"Dialog Konfirmasi Hapus"}
                subtitle={`Apakah anda yakin ingin menghapus data sarana ${data.nama}?`}
                open={openHapusData}
                handleClose={() => setOpenHapusData(false)}
                icon={<WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
                dialogAction={
                    <div style={{ display: 'flex' }}>
                        <div >
                            <Button
                                variant="contained"
                                buttonText={"Ya"}
                                page='main'
                                buttonType='primary'
                                onClick={handleDelete}
                            />
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                            <Button
                                variant="contained"
                                buttonText={"Tidak"}
                                page='main'
                                buttonType='danger'
                                onClick={() => { setOpenHapusData(false) }}
                            />
                        </div>
                    </div>
                }
            />
        )
    }

    const HapusDataBerhasilNotif = () => {
        return (
            <ConfirmDialog
                title={'Hapus Data Sarana Berhasil'}
                subtitle={'Sistem telah memperbaharui data sarana dalam database'}
                open={openHapusDataNotif}
                handleClose={() => {
                    setOpenHapusDataNotif(false)
                    window.location.reload(false)
                }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}

            />
        )
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/prasarana/${prasaranaId.id}`).then(res => { setPrasarana(res.data) })
        axios.get(`http://localhost:5000/sarana`).then(res => { setAllSarana(res.data) })
    }, [])

    useEffect(() => {
        if (prasarana != null) {
            axios.get(`http://localhost:5000/sekolah/${prasarana.idSekolah}`).then(res => { setSekolah(res.data) })

            let location = history.location.pathname
            setLocation(location.split('/'))

            if (prasarana.foto.fileName != "") { setFotoPrasarana(require(`../../../../backend/public/images/${prasarana.foto.fileName}`)) }
            else { setFotoPrasarana(null) }
        }
    }, [prasarana, setPrasarana])

    useEffect(() => {
        if (allSarana != null) {
            setRows(allSarana?.filter(item => item).map(sarana =>
                createData(sarana._id, sarana.nama, sarana.jumlah.kuantitas + " " + sarana.jumlah.satuan, sarana.kondisi, sarana.jenis, sarana.deskripsi,
                    (user.roles === 'admin-sekolah' ?
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div >
                                    <Button
                                        variant="contained"
                                        buttonText={"Lihat"}
                                        page='main'
                                        buttonType='success'
                                        onClick={() => {
                                            history.push(`/data/sarana/${prasaranaId.location}/${prasaranaId.id}/${sarana._id}`)
                                        }}
                                    />
                                </div>
                                <div style={{ paddingLeft: 8 }}>
                                    <Button
                                        variant="contained"
                                        buttonText={"Edit"}
                                        page='main'
                                        buttonType='warning'
                                        onClick={() => {
                                            history.push(`/data/${prasaranaId.location}/${prasaranaId.id}/sarana/edit/${sarana._id}`)
                                        }}
                                    />
                                </div>
                                <div style={{ paddingLeft: 8 }}>
                                    <Button
                                        variant="contained"
                                        buttonText={"Hapus"}
                                        page='main'
                                        buttonType='danger'
                                        onClick={() => {
                                            setData(sarana)
                                            setOpenHapusData(true)
                                        }}
                                    />
                                </div>
                            </div>
                        </> :
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div >
                                    <Button
                                        variant="contained"
                                        buttonText={"Lihat"}
                                        page='main'
                                        buttonType='success'
                                        onClick={() => {
                                            history.push(`/data/sarana/${prasaranaId.location}/${prasaranaId.id}/${sarana._id}`)
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )
                )
            ))
        }
    }, [allSarana, setAllSarana])

    return (
        <React.Fragment>
            {isAllowed ?
                <Wrapper children={
                    <React.Fragment>
                        {openHapusData && HapusData()}
                        {openHapusDataNotif && HapusDataBerhasilNotif()}
                        <React.Fragment>
                            <Breadcrumb
                                title={'Data Prasarana Pendidikan'}
                                subtitle={prasarana?.jenis}
                                subsubtitle={prasarana?.nama}
                            />
                            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                                <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                                    <Typography style={{
                                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                                    }}>
                                        {prasarana?.nama}
                                    </Typography>
                                </Grid>
                                <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw', justifyContent: 'flex-end' }}>
                                    {user?.roles === 'admin-sekolah' &&
                                        <Button
                                            variant="contained"
                                            buttonText={"EDIT"}
                                            page='main'
                                            buttonType='primary'
                                            onClick={() => { history.push(`/data/${prasaranaId.location}/prasarana/edit/${prasaranaId.id}`) }}
                                        />
                                    }
                                </Grid>
                                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                                    <div style={{
                                        width: '100vw',
                                        backgroundColor: Color.neutral[0],
                                        borderRadius: 12
                                    }}>
                                        <Grid container style={{ padding: '36px' }}>
                                            {fotoPrasarana != null ?
                                                <Grid item container xs={5} style={{ alignContent: 'center', height: '240px', borderRadius: 12 }}>
                                                    <img src={fotoPrasarana} alt={'fotoPrasarana'} style={{ width: '100%', height: '100%' }} />
                                                </Grid> : <Grid item container xs={5} style={{ alignContent: 'center', height: '240px', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                                    <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                                                </Grid>

                                            }
                                            <Grid item container xs={7} style={{ paddingLeft: 64 }}>
                                                <Grid item xs={12}>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                            }}>
                                                                Nama Ruangan
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                                            }}>
                                                                {prasarana?.nama}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                            }}>
                                                                Nama Sekolah
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                                            }}>
                                                                {sekolah?.nama}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                            }}>
                                                                Tipe
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                                            }}>
                                                                {prasarana?.jenis}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                            }}>
                                                                Kondisi
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{
                                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                                            }}>
                                                                {prasarana?.kondisi}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item container xs={12} style={{ display: 'flex', paddingTop: 32, paddingRight: '2vw', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <Search />
                                    {user?.roles === 'admin-sekolah' &&
                                        <div style={{ paddingLeft: 8 }}>
                                            <Button
                                                variant="contained"
                                                buttonText={"CREATE"}
                                                page='main'
                                                buttonType='primary'
                                                onClick={() => { history.push(`/data/${prasaranaId.location}/${prasaranaId.id}/sarana/create`) }}
                                            />
                                        </div>
                                    }
                                </Grid>
                                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                                    <CustomDataTable columns={columns} rows={rows} />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </React.Fragment>} /> : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default ViewPrasarana