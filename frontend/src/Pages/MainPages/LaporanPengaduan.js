import React, { useEffect, useState } from 'react'

import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../../Components/ReusableComponent/Breadcrumb'
import CustomDataTable from '../../Components/ReusableComponent/DataTable'
import Search from '../../Components/ReusableComponent/Search'
import LoadingScreen from '../LoadingScreen'
import Wrapper from '../../Components/Wrapper'
import axios from 'axios'
import Button from '../../Components/ReusableComponent/Button'
import DetailPengaduan from '../../PopUpDialog/DetailPengaduan'

const LaporanPengaduan = () => {
    const user = JSON.parse(localStorage.getItem('user'))?.payload
    const isStaff = user.roles === 'staff-dinas'

    const [laporan, setLaporan] = useState(null)
    const [rows, setRows] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [data, setData] = useState(null)

    const createData = (id, namaSD, namaRuangan, namaBarang, deskripsi, aksi) => {
        return { id, namaSD, namaRuangan, namaBarang, deskripsi, aksi }
    }

    const getNamaSekolah = async (sekolahId) => {
        var namaSekolah;

        axios.get(`http://localhost:5000/sekolah/${sekolahId}`).then(res => namaSekolah = res.da)

        return namaSekolah
    }

    const getNamaRuangan = async (ruanganId) => {
        let namaRuangan = null;

        await axios.get(`http://localhost:5000/prasarana/${ruanganId}`.then(res => {
            console.log(res.data)
        }))

        return namaRuangan
    }

    const getNamaBarang = async (saranaId) => {
        let namaSarana = null;

        await axios.get(`http://localhost:5000/sarana/${saranaId}`.then(res => {
            console.log(res.data)
        }))

        return namaSarana
    }

    const DetailModal = () => {
        return (
            <DetailPengaduan
                title={'Detail Pengaduan Kerusakan'}
                open={openDialog}
                handleClose={() => { setOpenDialog(false) }}
                kerusakan={data}
            />
        )
    }

    const columns = [
        { id: 'id', label: 'ID', minWidth: 32, align: 'center' },
        { id: 'namaSD', label: 'Nama Sekolah Dasar', minWidth: 120, align: 'center' },
        { id: 'namaRuangan', label: 'Nama Ruangan', minWidth: 120, align: 'center' },
        { id: 'namaBarang', label: 'Nama Barang', minWidth: 120, align: 'center' },
        { id: 'deskripsi', label: 'Deskripsi', minWidth: 200, align: 'center' },
        { id: 'aksi', label: 'Aksi', minWidth: 120, align: 'center' }
    ]

    useEffect(() => {
        axios.get('http://localhost:5000/kerusakan').then(res => { setLaporan(res.data) })
    }, [])

    useEffect(() => {
        if (laporan != null) {
            setRows(laporan?.map(item =>
                createData(item._id, item.idSekolah, item.idPrasarana, item.idSarana === 'null' ? '' : item.idSarana, item.deskripsi,
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div >
                                <Button
                                    variant="contained"
                                    buttonText={"Lihat"}
                                    page='main'
                                    buttonType='success'
                                    onClick={() => {
                                        setData(item)
                                        setOpenDialog(true)
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )
            ))
        }
    }, [laporan, setLaporan])

    return (
        <React.Fragment>
            {isStaff ?
                <Wrapper children={
                    <React.Fragment>
                        {openDialog && DetailModal()}
                        <React.Fragment>
                            <Breadcrumb subsubtitle={'Laporan Pengaduan'} />
                            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                                <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                                    <Typography style={{
                                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                                    }}>
                                        {'Kabupaten Karawang'}
                                    </Typography>
                                </Grid>
                                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw', justifyContent: 'flex-end' }}>
                                    <Search />
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

export default LaporanPengaduan