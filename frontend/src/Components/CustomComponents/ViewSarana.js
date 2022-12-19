import React from 'react'

//Material UI
import { Grid, Typography } from '@material-ui/core'
import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Button from '../Button'
import Breadcrumb from '../Breadcrumb'

import ImageIcon from '../../asset/icons/Image';

const ViewSarana = (props) => {
    const { sarana } = props

    const prasarana = sarana.idPrasarana

    return (
        <React.Fragment>
            <Breadcrumb
                title={'Data Prasarana Pendidikan'}
                title2={prasarana}
                subtitle={'Sarana'}
                subsubtitle={sarana.nama}
            />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{
                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                    }}>
                        {sarana.nama}
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
                        <Grid container style={{ padding: '3vw' }}>
                            {
                                sarana.foto === '' ?
                                    <Grid item container xs={5} style={{ alignContent: 'center', height: '320px', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                        <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                                    </Grid> :
                                    <Grid item container xs={5} style={{ alignContent: 'center', height: '320px', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
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
                                                Nama Barang
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sarana.nama}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Jenis
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sarana.jenis}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Sekolah
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sarana.idPrasarana}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Ruangan
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sarana.idPrasarana}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', paddingTop: 8 }}>
                                        <div style={{ width: '14vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Jumlah Ruangan
                                            </Typography>
                                        </div>
                                        <div style={{ width: '32vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sarana.jumlah.kuantitas + " " + sarana.jumlah.satuan}
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
                                                {sarana.kondisi}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: 8 }}>
                                        <div style={{ width: '44vw' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Deskripsi
                                            </Typography>
                                        </div>
                                        <div style={{ width: '44vw', paddingTop: 8 }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                            }}>
                                                {sarana.deskripsi === "" ? "" : `${sarana.deskripsi}.`}
                                            </Typography>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ViewSarana