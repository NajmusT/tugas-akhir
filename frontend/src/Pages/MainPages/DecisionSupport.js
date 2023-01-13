import React, { useState } from 'react'

import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../../Components/ReusableComponent/Breadcrumb'
import CustomSelect from '../../Components/ReusableComponent/Select'
import Button from '../../Components/ReusableComponent/Button'
import CustomDataTable from '../../Components/ReusableComponent/DataTable'

const DecisionSupport = () => {
    const kriteria = [
        {
            id: 'C1',
            nama: 'Ketersediaan sarana prasarana pendidikan',
            rootId: null,
            penilaianSkalaKepentingan: [
                { id: 'C1', skala: 1 },
                { id: 'C2', skala: 1 },
                { id: 'C3', skala: 9 },
                { id: 'C4', skala: 7 },
                { id: 'C5', skala: 7 }
            ]
        },
        {
            id: 'C2',
            nama: 'Kerusakan sarana prasarana pendidikan',
            rootId: null,
            penilaianSkalaKepentingan: [
                { id: 'C1', skala: 1 },
                { id: 'C2', skala: 1 },
                { id: 'C3', skala: 9 },
                { id: 'C4', skala: 7 },
                { id: 'C5', skala: 7 }
            ]
        },
        {
            id: 'C3',
            nama: 'Administrasi sekolah',
            rootId: null,
            penilaianSkalaKepentingan: [
                { id: 'C1', skala: 1 / 9 },
                { id: 'C2', skala: 1 / 9 },
                { id: 'C3', skala: 1 },
                { id: 'C4', skala: 1 / 5 },
                { id: 'C5', skala: 1 / 3 }
            ]
        },
        {
            id: 'C4',
            nama: 'Bantuan pengadaan sarana prasarana pendidikan',
            rootId: null,
            penilaianSkalaKepentingan: [
                { id: 'C1', skala: 1 / 7 },
                { id: 'C2', skala: 1 / 7 },
                { id: 'C3', skala: 5 },
                { id: 'C4', skala: 1 },
                { id: 'C5', skala: 3 }
            ]
        },
        {
            id: 'C5',
            nama: 'Administrasi sekolah',
            rootId: null,
            penilaianSkalaKepentingan: [
                { id: 'C1', skala: 1 / 7 },
                { id: 'C2', skala: 1 / 7 },
                { id: 'C3', skala: 3 },
                { id: 'C4', skala: 1 / 3 },
                { id: 'C5', skala: 1 }
            ]
        },
        {
            id: 'C11',
            nama: 'Ketersediaan sarana pendidikan',
            rootId: 'C1',
            penilaianSkalaKepentingan: [
                { id: 'C11', skala: 1 },
                { id: 'C12', skala: 1 / 7 }
            ]
        },
        {
            id: 'C12',
            nama: 'Ketersediaan prasarana pendidikan',
            rootId: 'C1',
            penilaianSkalaKepentingan: [
                { id: 'C11', skala: 7 },
                { id: 'C12', skala: 1 }
            ]
        },
        {
            id: 'C21',
            nama: 'Kerusakan sarana pendidikan',
            rootId: 'C2',
            penilaianSkalaKepentingan: [
                { id: 'C21', skala: 1 },
                { id: 'C22', skala: 1 / 7 }
            ]
        },
        {
            id: 'C22',
            nama: 'Kerusakan prasarana pendidikan',
            rootId: 'C2',
            penilaianSkalaKepentingan: [
                { id: 'C21', skala: 7 },
                { id: 'C22', skala: 1 }
            ]
        },
        {
            id: 'C31',
            nama: 'Sekolah mempunyai NPSN',
            rootId: 'C3',
            penilaianSkalaKepentingan: [
                { id: 'C31', skala: 1 },
                { id: 'C32', skala: 3 },
                { id: 'C33', skala: 7 },
                { id: 'C34', skala: 7 }
            ]
        },
        {
            id: 'C32',
            nama: 'Sekolah mempunyai kepala sekolah',
            rootId: 'C3',
            penilaianSkalaKepentingan: [
                { id: 'C31', skala: 1 / 3 },
                { id: 'C32', skala: 1 },
                { id: 'C33', skala: 5 },
                { id: 'C34', skala: 5 }
            ]
        },
        {
            id: 'C33',
            nama: 'Sekolah mempunyai komite sekolah',
            rootId: 'C3',
            penilaianSkalaKepentingan: [
                { id: 'C31', skala: 1 / 7 },
                { id: 'C32', skala: 1 / 5 },
                { id: 'C33', skala: 1 },
                { id: 'C34', skala: 3 }
            ]
        },
        {
            id: 'C34',
            nama: 'Sekolah mempunyai sekurang-kurangnya 6 rombongan belajar',
            rootId: 'C3',
            penilaianSkalaKepentingan: [
                { id: 'C31', skala: 1 / 7 },
                { id: 'C32', skala: 1 / 5 },
                { id: 'C33', skala: 1 / 3 },
                { id: 'C34', skala: 1 }
            ]
        },
        {
            id: 'C41',
            nama: 'Sekolah menerima bantuan BOS khusus',
            rootId: 'C4',
            penilaianSkalaKepentingan: [
                { id: 'C41', skala: 1 },
                { id: 'C42', skala: 9 }
            ]
        },
        {
            id: 'C42',
            nama: 'Sekolah menerima bantuan APBN atau APBD',
            rootId: 'C4',
            penilaianSkalaKepentingan: [
                { id: 'C41', skala: 1 / 9 },
                { id: 'C42', skala: 1 }
            ]
        },
        {
            id: 'C51',
            nama: 'Sekolah tidak berada pada daerah bersengketa atau bermasalah',
            rootId: 'C5',
            penilaianSkalaKepentingan: [
                { id: 'C51', skala: 1 },
                { id: 'C52', skala: 9 }
            ]
        },
        {
            id: 'C52',
            nama: 'Sekolah berada pada daerah tertinggal, terluar, atau desa berkembang',
            rootId: 'C5',
            penilaianSkalaKepentingan: [
                { id: 'C51', skala: 1 / 9 },
                { id: 'C52', skala: 1 }
            ]
        }
    ]

    const [jenis, setJenis] = useState(null)
    const [submit, setSubmit] = useState(false)

    const handleChangeJenis = (e) => {
        setJenis(e.target.value)
    }

    const handleSubmit = () => {
        if (jenis !== null) {
            setSubmit(true)
        }
    }

    const columns = [
        { id: 'rank', label: 'Rank', minWidth: 32 },
        { id: 'nama-sd', label: 'Nama Sekolah Dasar', minWidth: 120 },
        { id: 'nama-ruangan', label: 'Nama Ruangan', minWidth: 120 },
        { id: 'jenis', label: 'Jenis Infrastruktur', minWidth: 120 },
        { id: 'bobot', label: 'Bobot', minWidth: 120 }
    ]

    const rows = []

    return (
        <React.Fragment>
            <Breadcrumb
                subsubtitle={'Decision Support System'}
            />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{
                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                    }}>
                        {'Kabupaten Karawang'}
                    </Typography>
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <div style={{
                        width: '100vw',
                        backgroundColor: Color.neutral[0],
                        borderRadius: 12
                    }}>
                        <Grid container style={{ padding: '36px' }}>
                            <Grid item container xs={8}>
                                <Grid item xs={12}>
                                    <Typography style={{
                                        fontFamily: FontFamily.ROBOTO_MEDIUM, fontSize: 16, color: Color.neutral[400]
                                    }}>
                                        {'Semester Ganjil 2022/2023'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: 16 }}>
                                    <Typography style={{
                                        fontFamily: FontFamily.ROBOTO_REGULER, fontSize: 14, color: '#808080'
                                    }}>
                                        {'Silahkan pilih jenis infrastruktur pendidikan yang ingin dibangun.'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography style={{
                                        fontFamily: FontFamily.ROBOTO_REGULER, fontSize: 14, color: '#808080'
                                    }}>
                                        {'Rekomendasi SD prioritas ditampilkan pada tabel mulai dari prioritas tertinggi hingga terendah.'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: 16 }}>
                                    <Grid xs={6}>
                                        <CustomSelect
                                            id={"jenis"}
                                            margin={"dense"}
                                            fullWidth
                                            label={"Pilih Sarana Prasarana"}
                                            variant={"outlined"}
                                            page={"main"}
                                            value={jenis}
                                            onChange={handleChangeJenis}
                                            option={['Ruang Kelas', 'Perpustakaan', 'Ruang Guru', 'Laboratorium IPA', 'Ruang Pimpinan', 'UKS', 'Toilet', 'Ruang Beribadah', 'Tempat Bermain dan Berolahraga']}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} >
                                    <Grid xs={6}>
                                        <Button
                                            variant="contained"
                                            buttonText={"Submit"}
                                            fullWidth
                                            page='main'
                                            buttonType='dss-primary'
                                            onClick={handleSubmit}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container xs={4}>

                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                {
                    submit &&
                    <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                        <CustomDataTable columns={columns} rows={rows} />
                    </Grid>
                }
            </Grid >
        </React.Fragment>
    )
}

export default DecisionSupport
