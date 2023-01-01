import React from 'react'
import { useHistory } from 'react-router-dom'

//Material UI
import { Grid, Typography } from '@material-ui/core'
import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Button from '../Button'
import Breadcrumb from '../Breadcrumb'
import CustomDataTable from '../DataTable'
import CustomTextField from '../TextField'
import CustomIconButton from '../IconButton'

import SearchIcon from '@material-ui/icons/Search';
import ImageIcon from '../../asset/icons/Image';

const ViewListPrasarana = (props) => {
    const { sekolah, jenis } = props

    const columns = [
        { id: 'id', label: 'ID', minWidth: 32 },
        { id: 'nama-ruangan', label: 'Nama Ruangan', minWidth: 120 },
        {
            id: 'sekolah',
            label: 'Sekolah',
            minWidth: 120
        },
        {
            id: 'jenis',
            label: 'Jenis Infrastruktur',
            minWidth: 120,
        },
        {
            id: 'kondisi',
            label: 'Kondisi',
            minWidth: 120
        },
        {
            id: 'aksi',
            label: 'Aksi',
            minWidth: 120
        }
    ]

    const rows = []

    const history = useHistory()

    return (
        <React.Fragment>
            <Breadcrumb
                title={'Data Prasarana Pendidikan'}
                subsubtitle={sekolah.nama}
            />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{
                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                    }}>
                        {sekolah.nama}
                    </Typography>
                </Grid>
                <Grid item container xs={4} />
                <Grid item container xs={2} style={{ padding: '2vw 2vw 0vw 2vw', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        buttonText={"EDIT SEKOLAH"}
                        page='main'
                        buttonType='primary'
                    />
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <div style={{
                        width: '100vw',
                        backgroundColor: Color.neutral[0],
                        borderRadius: 12
                    }}>
                        <Grid container style={{ padding: '36px' }}>
                            {sekolah.fotoSekolah === '' ?
                                <Grid item container xs={6} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                    <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                                </Grid> : <Grid item container xs={6} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                    <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                                </Grid>
                            }
                            <Grid item container xs={6} style={{ paddingLeft: 64 }}>
                                <Grid item xs={12}>
                                    <div style={{ display: 'flex' }}>
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
                                                {sekolah.nama}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                NPSN
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.npsn}
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
                                                {sekolah.jenis}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Alamat
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.alamat.jalan + ' ,' + sekolah.alamat.kodePos}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Luas Tanah
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.lahan.luas + 'm2'}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Status Kepemilikan
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.lahan.kepemilikan}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Kepala Sekolah
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.kepalaSekolah}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Ketua Komite Sekolah
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.ketuaKomite}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Akreditasi
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.akreditasi.nilaiHuruf + ' (' + sekolah.akreditasi.noSK + ') '}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Tanggal Pendirian
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.pendirian.tanggal}
                                            </Typography>
                                        </div>

                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                SK Pendirian
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.pendirian.noSurat}
                                            </Typography>
                                        </div>

                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                SK Ijin Operasional
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.izinOperasional.noSurat}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>

                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Bantuan Pendanaan
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.bantuanPendanaan ? sekolah.bantuanPendanaan : 'Tidak Ada'}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Rombongan Belajar
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sekolah.rombonganBelajar.length}
                                            </Typography>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw', justifyContent: 'flex-end' }}>
                    <div style={{ paddingRight: 8 }}>
                        <CustomTextField
                            id="search"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            label="Search"
                            type="text"
                            page="main"
                        />
                    </div>
                    <div style={{ paddingRight: 8 }}>
                        <CustomIconButton
                            icon={<SearchIcon />}
                        />
                    </div>
                    <Button
                        variant="contained"
                        buttonText={"CREATE"}
                        page='main'
                        buttonType='primary'
                        onClick={() => { history.push('/data/prasarana/create') }}
                    />
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <CustomDataTable columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ViewListPrasarana