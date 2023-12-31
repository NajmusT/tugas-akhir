import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

//Material UI
import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Button from '../ReusableComponent/Button'
import Breadcrumb from '../ReusableComponent/Breadcrumb'

import ImageIcon from '../../asset/icons/Image';
import LoadingScreen from '../../Pages/LoadingScreen'
import Wrapper from '../Wrapper'
import axios from 'axios'

const ViewSarana = () => {
    const saranaId = useParams()
    const history = useHistory()

    const [sarana, setSarana] = useState(null)
    const [sekolah, setSekolah] = useState(null)
    const [prasarana, setPrasarana] = useState(null)
    const [fotoSarana, setFotoSarana] = useState(sarana != null ? (sarana.foto.fileName != '' ? require(`../../../../backend/public/images/${sarana.foto.fileName}`) : null) : null)

    const user = JSON.parse(localStorage.getItem('user'))?.payload
    const isAllowed = user.roles === 'admin-sekolah' || user.roles === 'staff-dinas'

    useEffect(() => {
        axios.get(`http://localhost:5000/sarana/${saranaId.id}`).then(res => { setSarana(res.data) })
        axios.get(`http://localhost:5000/sekolah`).then(res => setSekolah(res.data))
    }, [])

    useEffect(() => {
        console.log(saranaId)
        axios.get(`http://localhost:5000/prasarana/${saranaId.prasaranaId}`).then(res => setPrasarana(res.data))
    }, [saranaId])

    useEffect(() => {
        if (sarana != null) {
            if (sarana.foto.fileName != "") { setFotoSarana(require(`../../../../backend/public/images/${sarana.foto.fileName}`)) }
            else { setFotoSarana(null) }
        }
    }, [sarana, setSarana])

    return (
        <React.Fragment>
            {isAllowed ?
                <Wrapper children={
                    <React.Fragment>
                        <Breadcrumb
                            title={'Data Prasarana Pendidikan'}
                            title2={saranaId?.location.replaceAll("-", " ")}
                            subtitle={'Sarana'}
                            subsubtitle={sarana?.nama}
                        />
                        <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                            <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                                <Typography style={{
                                    fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                                }}>
                                    {sarana?.nama}
                                </Typography>
                            </Grid>
                            <Grid item container xs={6} style={{ padding: '2vw 2vw 0vw 2vw', justifyContent: 'flex-end' }}>
                                {user?.roles === 'admin-sekolah' &&
                                    <Button
                                        variant="contained"
                                        buttonText={"EDIT"}
                                        page='main'
                                        buttonType='primary'
                                        onClick={() => { history.push(`/data/${saranaId.location}/${saranaId.prasaranaId}/sarana/edit/${saranaId.id}`) }}
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
                                        {
                                            fotoSarana != null ?
                                                <Grid item container xs={5} style={{ alignContent: 'center', height: '320px', borderRadius: 12 }}>
                                                    <img src={fotoSarana} alt={'fotoSarana'} style={{ width: '100%', height: 320 }} />
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
                                                            {sarana?.nama}
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
                                                            {sarana?.jenis}
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
                                                            {sekolah != null && prasarana != null ? sekolah.filter(item => item._id === prasarana.idSekolah).map(item => item.nama) : null}
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
                                                            {prasarana?.nama}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', paddingTop: 8 }}>
                                                    <div style={{ width: '14vw' }}>
                                                        <Typography style={{
                                                            fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 14, color: Color.neutral[400]
                                                        }}>
                                                            Jumlah Barang
                                                        </Typography>
                                                    </div>
                                                    <div style={{ width: '32vw' }}>
                                                        <Typography style={{
                                                            fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 14, color: '#8388A2'
                                                        }}>
                                                            {sarana?.jumlah.kuantitas + " " + sarana?.jumlah.satuan}
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
                                                            {sarana?.kondisi}
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
                                                            {sarana?.deskripsi === "null" ? "" : `${sarana?.deskripsi}`}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </React.Fragment>} /> : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default ViewSarana