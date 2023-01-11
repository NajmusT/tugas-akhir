import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

//Material UI
import { Grid, Typography } from '@material-ui/core'
import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Button from '../ReusableComponent/Button'
import Breadcrumb from '../ReusableComponent/Breadcrumb'
import CustomDataTable from '../ReusableComponent/DataTable'
import Search from '../ReusableComponent/Search'

import ImageIcon from '../../asset/icons/Image';
import { getCurrentUser } from '../../Utils'

const ViewPrasarana = (props) => {
    const { prasarana } = props
    const [user, setUser] = useState(getCurrentUser())

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
                <Grid item container xs={12} style={{ display: 'flex', paddingTop: 32, paddingRight: '2vw', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Search />
                    {user?.roles === 'admin-sekolah' &&
                        <div style={{ paddingLeft: 8 }}>
                            <Button
                                variant="contained"
                                buttonText={"CREATE"}
                                page='main'
                                buttonType='primary'
                                onClick={() => { history.push(`${history.location.pathname}/sarana/create`) }}
                            />
                        </div>
                    }
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <CustomDataTable columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ViewPrasarana