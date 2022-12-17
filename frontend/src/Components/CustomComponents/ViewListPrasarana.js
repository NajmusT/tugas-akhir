import React from 'react'
import Breadcrumb from '../Breadcrumb'

//Material UI
import { Grid, Typography } from '@material-ui/core'
import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Button from '../Button'

import ImageIcon from '../../asset/icons/Image';

const ViewListPrasarana = () => {
    const sekolah = {
        id: 'uvwd-ashd-thej',
        nama: 'SD Adiarsa Barat I',
        npsn: '140192302302',
        jenis: 'Negeri',
        fotoSekolah: '',
        alamat: {
            jalan: 'Jalan dimana mana hatiku senang No. 12',
            kodePos: '14561'
        },
        kepalaSekolah: 'Drs. Lusiana Angkur, S.Pd, M.Pd',
        ketuaKomite: 'Drs. Antonia Deidre, S.Pd, M.Pd',
        akreditasi: {
            nilaiHuruf: 'A',
            tanggal: '01 Juli 1956',
            noSK: '421.2/Kep.422-Huk/2015'
        },
        pendirian: {
            tanggal: '01 Juli 1956',
            noSurat: '421.2/Kep.422-Huk/2015'
        },
        izinOperasional: {
            tanggal: '01 Juli 1956',
            noSurat: '421.2/Kep.422-Huk/2015'
        },
        lahan: {
            luas: '100',
            kepemilikan: 'Milik Pemerintah',
        },
        bantuanPendanaan: 'BOS, APBN, APBD',
        rombonganBelajar: [
            {
                nama: 'Kelas 1B',
                tingkat: 1,
                jumlahMurid: 16,
            },
            {
                nama: 'Kelas 2A',
                tingkat: 2,
                jumlahMurid: 20,
            },
            {
                nama: 'Kelas 3A',
                tingkat: 3,
                jumlahMurid: 18,
            }
        ]
    }

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
                        <Grid container style={{ padding: '2vw' }}>
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
                    <Button
                        variant="contained"
                        buttonText={"CREATE"}
                        page='main'
                        buttonType='primary'
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ViewListPrasarana