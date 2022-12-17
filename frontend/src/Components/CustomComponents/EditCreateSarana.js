import React from 'react'
import { useHistory } from 'react-router-dom'

import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../Breadcrumb'
import CustomTextField from '../TextField'
import CustomSelect from '../Select'
import Button from '../Button'

import ImageIcon from '../../asset/icons/Image';

const EditCreateSarana = () => {
    const history = useHistory()

    return (
        <React.Fragment>
            <Breadcrumb
                title={'Create Sarana Pendidikan'}
                subsubtitle={'Ruang Perpustakaan'}
            />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{
                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                    }}>
                        {'SD Adiarsa Barat I'}
                    </Typography>
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <div style={{
                        width: '100vw',
                        backgroundColor: Color.neutral[0],
                        borderRadius: 12
                    }}>
                        <Grid container style={{ padding: '2vw' }}>
                            <Grid item container xs={6} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                            </Grid>
                            <Grid item container xs={6} style={{ paddingLeft: 32 }}>
                                <Grid item xs={12}>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '172px', alignSelf: 'center' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Nama Benda
                                            </Typography>
                                        </div>
                                        <CustomTextField
                                            id="nama-benda"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            label="Nama Ruangan"
                                            type="text"
                                            page="main"
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '172px' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
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
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '172px' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Ruangan
                                            </Typography>
                                        </div>
                                        <CustomTextField
                                            id="ruangan"
                                            fullWidth
                                            disable={true}
                                            variant="outlined"
                                            margin="dense"
                                            label="Ruangan"
                                            type="text"
                                            page="main"
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '172px' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Kondisi
                                            </Typography>
                                        </div>
                                        <CustomSelect
                                            id={"kondisi"}
                                            margin={"dense"}
                                            fullWidth
                                            label={"Kondisi"}
                                            variant={"outlined"}
                                            page={"main"}
                                            // value={tipe}
                                            // onChange={handleChangeTipe}
                                            option={['Baik', 'Rusak Ringan', 'Rusak Sedang', 'Rusak Berat']}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '400px' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Jumlah Barang
                                            </Typography>
                                        </div>
                                        <CustomTextField
                                            id="jumlah-barang"
                                            fullWidth
                                            variant="outlined"
                                            margin="dense"
                                            label="Jumlah Barang"
                                            type="text"
                                            page="main"
                                        />
                                        <Typography style={{
                                            fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, paddingLeft: 20, paddingRight: 16, color: Color.neutral[400]
                                        }}>
                                            Satuan
                                        </Typography>
                                        <CustomSelect
                                            id={"kondisi"}
                                            margin={"dense"}
                                            fullWidth
                                            label={"Kondisi"}
                                            variant={"outlined"}
                                            page={"main"}
                                            // value={tipe}
                                            // onChange={handleChangeTipe}
                                            option={['Buah', 'Liter', 'Mililiter', 'Pasang']}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '172px' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
                                                Jenis Sarana
                                            </Typography>
                                        </div>
                                        <CustomSelect
                                            id={"jenis"}
                                            margin={"dense"}
                                            fullWidth
                                            label={"Jenis"}
                                            variant={"outlined"}
                                            page={"main"}
                                            // value={tipe}
                                            // onChange={handleChangeTipe}
                                            option={['Perabot', 'Peralatan Pendidikan', 'Sumber dan Buku Ajar', 'Perlengkapan Lainnya', 'Media Pendidikan']}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 4, paddingBottom: 4 }}>
                                        <div style={{ alignSelf: 'center' }}>
                                            <Typography style={{
                                                fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                            }}>
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
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'flex', paddingTop: 44, justifyContent: 'flex-end' }}>
                                        <Button
                                            variant="contained"
                                            buttonText={"Save"}
                                            page='main'
                                            buttonType='primary'
                                            onClick={() => { history.push('/data/sarana/create') }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid >
        </React.Fragment>
    )
}

export default EditCreateSarana
