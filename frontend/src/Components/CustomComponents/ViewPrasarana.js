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

const ViewPrasarana = (props) => {
    const { prasarana } = props

    const columns = [
        { id: 'id', label: 'ID', minWidth: 32 },
        { id: 'nama-barang', label: 'Nama Barang', minWidth: 120 },
        {
            id: 'jumlah-barang',
            label: 'Jumlah Barang',
            minWidth: 120,
        },
        {
            id: 'kondisi',
            label: 'Kondisi',
            minWidth: 120
        },
        {
            id: 'jenis',
            label: 'Jenis',
            minWidth: 120
        },
        {
            id: 'deskripsi',
            label: 'Deskripsi',
            minWidth: 240
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
                subtitle={prasarana.jenis}
                subsubtitle={prasarana.nama}
            />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{
                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                    }}>
                        {prasarana.nama}
                    </Typography>
                </Grid>
                <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        buttonText={"EDIT"}
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
                            {prasarana.foto === '' ?
                                <Grid item container xs={5} style={{ alignContent: 'center', height: '240px', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                    <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
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
                                                {prasarana.nama}
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
                                                {prasarana.namaSekolah}
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
                                                {prasarana.jenis}
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
                                                {prasarana.kondisi}
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
                    <div style={{ width: '36px', height: '40px', paddingTop: 4 }} onClick={() => { }}>
                        <div style={{
                            backgroundColor: '#0088cc',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyItems: 'center',
                            color: '#ffffff'
                        }}>
                            <SearchIcon style={{ alignSelf: 'center', display: 'flex', padding: 4, fontSize: '1.75rem' }} />
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        buttonText={"CREATE"}
                        page='main'
                        buttonType='primary'
                        onClick={() => { history.push(``) }}
                    />
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <CustomDataTable columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ViewPrasarana