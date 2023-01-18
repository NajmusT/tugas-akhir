import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

//Material UI
import { Grid, Modal, Typography } from '@material-ui/core'
import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Button from '../ReusableComponent/Button'
import Breadcrumb from '../ReusableComponent/Breadcrumb'
import CustomDataTable from '../ReusableComponent/DataTable'
import Search from '../ReusableComponent/Search';
import EditDaftarSekolah from '../../PopUpDialog/EditDaftarSekolah'
import LoadingScreen from '../../Pages/LoadingScreen'
import ConfirmDialog from '../ReusableComponent/ConfirmationDialog'
import Wrapper from '../Wrapper'

import ImageIcon from '../../asset/icons/Image';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';

const ViewListPrasarana = (props) => {
    const { jenis } = props
    const sekolahId = useParams()

    const [location, setLocation] = useState(null)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))?.payload)
    const [openDialog, setOpenDialog] = useState(false)
    const [sekolah, setSekolah] = useState(null)
    const [allPrasarana, setAllPrasarana] = useState(null)
    const [rows, setRows] = useState(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [openHapusData, setOpenHapusData] = useState(false)
    const [openHapusDataNotif, setOpenHapusDataNotif] = useState(false)

    const createData = (id, nama, sekolah, jenis, kondisi, aksi) => {
        return { id, nama, sekolah, jenis, kondisi, aksi }
    }

    const handleDelete = (e) => {
        e.preventDefault()

        axios.delete(`http://localhost:5000/prasarana/delete/${data._id}`).then(res => console.log(res.data))

        setOpenHapusData(false)
        setOpenHapusDataNotif(true)
    }

    const HapusData = () => {
        return (
            <ConfirmDialog
                title={"Dialog Konfirmasi Hapus"}
                subtitle={`Apakah anda yakin ingin menghapus data prasarana ${data.nama}?`}
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
                title={'Hapus Data Prasarana Berhasil'}
                subtitle={'Sistem telah memperbaharui data prasarana dalam database'}
                open={openHapusDataNotif}
                handleClose={() => {
                    setOpenHapusDataNotif(false)
                    window.location.reload(false)
                }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}

            />
        )
    }

    const columns = [
        { id: 'id', label: 'ID', minWidth: 32, align: 'center' },
        { id: 'nama', label: 'Nama Ruangan', minWidth: 120, align: 'center' },
        { id: 'sekolah', label: 'Sekolah', minWidth: 120, align: 'center' },
        { id: 'jenis', label: 'Jenis Infrastruktur', minWidth: 120, align: 'center' },
        { id: 'kondisi', label: 'Kondisi', minWidth: 120, align: 'center' },
        { id: 'aksi', label: 'Aksi', minWidth: 120, align: 'center' }
    ]

    const history = useHistory()
    const fotoSekolah = sekolah != null ? (sekolah.fotoSekolah.fileName != "" ? require(`../../../../backend/public/images/${sekolah.fotoSekolah.fileName}`) : null) : null

    useEffect(() => {
        axios.get(`http://localhost:5000/sekolah/${sekolahId.id}`).then(res => { setSekolah(res.data) })
        axios.get(`http://localhost:5000/prasarana`).then(res => { setAllPrasarana(res.data) })

        let location = history.location.pathname
        setLocation(location.split('/'))

        setTimeout(() => setLoading(false), 2000)
    }, [])

    useEffect(() => {

    }, [sekolah, setSekolah])

    useEffect(() => {
        if (allPrasarana != null) {
            setRows(allPrasarana?.filter(item => item.idSekolah === sekolahId.id && item.jenis === jenis)?.map(prasarana =>
                createData(
                    prasarana._id,
                    prasarana.nama,
                    sekolah?.nama,
                    prasarana.jenis,
                    prasarana.kondisi,
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
                                            history.push(`/data/prasarana/${location[location.length - 2]}/${prasarana._id}`)
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
                                            history.push(`/data/${location[location.length - 2]}/prasarana/edit/${prasarana._id}`)
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
                                            setData(prasarana)
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
                                            history.push(`/data/prasarana/${location[location.length - 2]}/${prasarana._id}`)
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )
                )
            ))
        }
    }, [allPrasarana, setAllPrasarana])

    const EditDataSekolah = () => {
        return (
            <Modal open={openDialog}>
                <EditDaftarSekolah isEditMode={true} dataSekolah={sekolah} handleClose={() => setOpenDialog(false)} />
            </Modal>
        )
    }

    return (
        <React.Fragment >
            {((user.roles === 'admin-sekolah' || user.roles === 'staff-dinas') && !loading) ?
                <Wrapper children={
                    <React.Fragment>
                        {openHapusData && HapusData()}
                        {openHapusDataNotif && HapusDataBerhasilNotif()}
                        {openDialog && EditDataSekolah()}
                        <React.Fragment>
                            <Breadcrumb
                                title={'Data Prasarana Pendidikan'}
                                subsubtitle={sekolah?.nama}
                            />
                            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                                <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                                    <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400] }}>
                                        {sekolah?.nama}
                                    </Typography>
                                </Grid>
                                {user.roles === 'admin-sekolah' ?
                                    <React.Fragment>
                                        <Grid item container xs={4} />
                                        <Grid item container xs={2} style={{ padding: '2vw 2vw 0vw 2vw', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="contained"
                                                buttonText={"EDIT SEKOLAH"}
                                                page='main'
                                                buttonType='primary'
                                                onClick={() => setOpenDialog(true)}
                                            />
                                        </Grid>
                                    </React.Fragment> : <Grid item container xs={6} />
                                }

                                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                                    <div style={{
                                        width: '100vw',
                                        backgroundColor: Color.neutral[0],
                                        borderRadius: 12
                                    }}>
                                        <Grid container style={{ padding: '36px' }}>
                                            {fotoSekolah === null ?
                                                <Grid item container xs={6} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                                    <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                                                </Grid> : <Grid item container xs={6} style={{ alignContent: 'center', justifyContent: 'center', borderRadius: 12 }}>
                                                    <img src={fotoSekolah} alt={'email'} style={{ width: '100%', height: 400 }} />
                                                </Grid>
                                            }
                                            <Grid item container xs={6} style={{ paddingLeft: 64 }}>
                                                <Grid item xs={12}>
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Nama Sekolah
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.nama}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                NPSN
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.npsn}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Tipe
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.jenis}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Alamat
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.alamat.jalan + ' ,' + sekolah?.alamat.kodePos}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Luas Tanah
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.lahan.luas + ' m2'}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Status Kepemilikan
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.lahan.kepemilikan}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Kepala Sekolah
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.kepalaSekolah}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Ketua Komite Sekolah
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.ketuaKomite}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Akreditasi
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.akreditasi.nilaiHuruf + ' (' + sekolah?.akreditasi.noSK + ') '}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Tanggal Pendirian
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {moment(sekolah?.pendirian.tanggal).format("DD MMMM YYYY")}
                                                            </Typography>
                                                        </div>

                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                SK Pendirian
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.pendirian.noSurat}
                                                            </Typography>
                                                        </div>

                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                SK Ijin Operasional
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.izinOperasional.noSurat}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>

                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Bantuan Pendanaan
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.bantuanPendanaan ? sekolah?.bantuanPendanaan : 'Tidak Ada'}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                                        <div style={{ width: '14vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400] }}>
                                                                Rombongan Belajar
                                                            </Typography>
                                                        </div>
                                                        <div style={{ width: '32vw' }}>
                                                            <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2' }}>
                                                                {sekolah?.rombonganBelajar}
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
                                                onClick={() => { history.push(`/data/${location[location.length - 2]}/prasarana/create`) }}
                                            />
                                        </div>
                                    }
                                </Grid>
                                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                                    <CustomDataTable columns={columns} rows={rows} />
                                </Grid>
                            </Grid >
                        </React.Fragment >
                    </React.Fragment>} /> : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default ViewListPrasarana