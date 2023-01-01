import React, { useState } from 'react'

import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../../Components/Breadcrumb'
import CustomSelect from '../../Components/Select'
import Button from '../../Components/Button'
import CustomDataTable from '../../Components/DataTable'

const DecisionSupport = () => {
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
        {
            id: 'nama-ruangan',
            label: 'Nama Ruangan',
            minWidth: 120,
        },
        {
            id: 'jenis',
            label: 'Jenis Infrastruktur',
            minWidth: 120
        },
        {
            id: 'bobot',
            label: 'Bobot',
            minWidth: 120
        }
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
                                            page='auth'
                                            buttonType='primary'
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
