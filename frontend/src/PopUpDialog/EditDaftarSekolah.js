import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

//Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//Components
import TextField from '../Components/ReusableComponent/TextField'
import Button from '../Components/ReusableComponent/Button'
import CustomSelect from '../Components/ReusableComponent/Select'
import ImagesUploader from '../Components/ReusableComponent/ImagesUploader';

//Constant
import { Color } from "../Constants/Colors";

import ImageIcon from '../asset/icons/Image';

import { useAuthStyles } from '../Styles/AuthStyles';

import { getCurrentUser } from '../Utils';

const EditDaftarSekolah = (props) => {
    const { isEditMode, dataSekolah } = props

    const history = useHistory();
    const classes = useAuthStyles()
    const userId = getCurrentUser()?._id

    const [alamat, setAlamat] = useState(isEditMode ? dataSekolah.alamat : null)
    const [kepsek, setKepsek] = useState(isEditMode ? dataSekolah.kepsek : null)
    const [fotoSekolah, setFotoSekolah] = useState(isEditMode ? dataSekolah.fotoSekolah : null)
    const [alamatJalan, setAlamatJalan] = useState(isEditMode ? alamat.jalan : null)
    const [kecamatan, setKecamatan] = useState(isEditMode ? alamat.kecamatan : null)
    const [kelurahan, setKelurahan] = useState(isEditMode ? alamat.kelurahan : null)
    const [komite, setKomite] = useState(isEditMode ? dataSekolah.ketuaKomite : null)
    const [sekolah, setSekolah] = useState(isEditMode ? dataSekolah : null)
    const [skAkre, setSkakre] = useState(isEditMode ? dataSekolah.akreditasi.noSK : null)
    const [npsn, setNpsn] = useState(isEditMode ? dataSekolah.npsn : null)
    const [akreditasi, setAkreditasi] = useState(isEditMode ? dataSekolah.akreditasi.nilaiHuruf : null)
    const [tipe, setTipe] = useState(isEditMode ? dataSekolah.jenis : null)
    const [noSuratPendirian, setNoSuratPendirian] = useState(isEditMode ? dataSekolah.pendirian.noSurat : null)
    const [tanggalPendirian, setTanggalPendirian] = useState(null)
    const [noSuratIzin, setNoSuratIzin] = useState(null)
    const [tanggalIzinOperasional, setTanggalIzinOperasional] = useState(null)
    const [rombonganBelajar, setRombonganBelajar] = useState(null)
    const [kepemilikan, setKepemilikan] = useState(null)
    const [jumlahGuru, setJumlahGuru] = useState(null)
    const [apbd, setApbd] = useState(false)
    const [apbn, setApbn] = useState(false)
    const [bos, setBos] = useState(false)
    const [bantuanPengadaan, setBantuanPengadaan] = useState(false)
    const [file, setFile] = useState(null)
    const [url, setUrl] = useState(null)

    const useInput = () => {
        const handleChange = (newUrlValue, newFileValue) => {
            setUrl(newUrlValue)
            setFile(newFileValue)
        }

        return {
            urlValue: url,
            fileValue: file,
            handleChange: handleChange
        }
    }

    const handleChangeKepsek = (e) => {
        setKepsek(e.target.value)
    }

    const handleChangeNoSuratPendirian = (e) => {
        setNoSuratPendirian(e.target.value)
    }

    const handleChangeTanggalPendirian = (e) => {
        setTanggalPendirian(e.target.value)
    }

    const handleChangeNoSuratIzin = (e) => {
        setNoSuratIzin(e.target.value)
    }

    const handleChangeTanggalIzinOperasional = (e) => {
        setTanggalIzinOperasional(e.target.value)
    }

    const handleChangeRombonganBelajar = (e) => {
        setRombonganBelajar(e.target.value)
    }

    const handleChangeJumlahGuru = (e) => {
        setJumlahGuru(e.target.value)
    }

    const handleChangeKelurahan = (e) => {
        setKelurahan(e.target.value)
    }

    const handleChangeKecamatan = (e) => {
        setKecamatan(e.target.value)
    }

    const handleChangeAlamatJalan = (e) => {
        setAlamatJalan(e.target.value)
    }

    const handleChangeKomite = (e) => {
        setKomite(e.target.value)
    }

    const handleChangeSkakre = (e) => {
        setSkakre(e.target.value)
    }

    const handleChangeNpsn = (e) => {
        setNpsn(e.target.value)
    }

    const handleChangeAkreditasi = (e) => {
        setAkreditasi(e.target.value)
    }

    const handleChangeTipe = (e) => {
        setTipe(e.target.value)
    }

    const handleChangeKepemilikan = (e) => {
        setKepemilikan(e.target.value)
    }

    const handleChangeSekolah = (e) => {
        setSekolah(e.target.value)
    }

    const handleChangeBantuan = (e) => {
        if (e.target.name === 'apbn') {
            setApbn(e.target.checked)
        } else if (e.target.name === 'apbd') {
            setApbd(e.target.checked)
        } else {
            setBos(e.target.checked)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()

        const data = {
            npsn: npsn,
            nama: sekolah,
            jenis: tipe,
            fotoSekolah: { url: url, fileName: file },
            alamat: {
                jalan: alamatJalan,
                kodePos: (alamat.filter(item => item.kecamatan === kecamatan && item.desaKelurahan === kelurahan).map(dt => dt.kodePos))[0]
            },
            kepalaSekolah: kepsek,
            ketuaKomite: komite,
            akreditasi: {
                noSK: skAkre,
                nilaiHuruf: akreditasi
            },
            pendirian: {
                noSurat: noSuratPendirian,
                tanggal: tanggalPendirian
            },
            izinOperasional: {
                noSurat: noSuratIzin,
                tanggal: tanggalIzinOperasional
            },
            lahan: {
                kepemilikan: kepemilikan
            },
            bantuanPengadaan: bantuanPengadaan,
            rombonganBelajar: rombonganBelajar,
            jumlahGuru: jumlahGuru,
            createdBy: userId,
            updatedBy: userId,
            updatedAt: moment(),
            createdAt: moment()
        }

        formData.append("file", file)
        formData.append("nama", sekolah)
        formData.append("npsn", npsn)
        formData.append("jenis", tipe)
        formData.append("fotoSekolah", JSON.stringify(data.fotoSekolah))
        formData.append("alamat", JSON.stringify(data.alamat))
        formData.append("kepalaSekolah", kepsek)
        formData.append("ketuaKomite", komite)
        formData.append("akreditasi", JSON.stringify(data.akreditasi))
        formData.append("pendirian", JSON.stringify(data.pendirian))
        formData.append("izinOperasional", JSON.stringify(data.izinOperasional))
        formData.append("lahan", JSON.stringify(data.lahan))
        formData.append("bantuanPengadaan", bantuanPengadaan)
        formData.append("rombonganBelajar", rombonganBelajar)
        formData.append("jumlahGuru", jumlahGuru)
        formData.append("createdBy", userId)
        formData.append("createdAt", moment())
        formData.append("updatedBy", userId)
        formData.append("updatedAt", moment())

        try {
            await axios.post('http://localhost:5000/sekolah/new', formData);
            history.push('/beranda')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/alamat').then(res => {
            setAlamat(res.data)
        })
    }, [])

    useEffect(() => {
        let bantuan = 'Tidak ada'

        if (apbn) {
            if (apbd) {
                if (bos) {
                    bantuan = 'APBN, APBD, Bos Khusus'
                } else {
                    bantuan = 'APBN, APBD'
                }
            } else {
                if (bos) {
                    bantuan = 'APBN, Bos Khusus'
                } else {
                    bantuan = 'APBN'
                }
            }
        } else {
            if (apbd) {
                if (bos) {
                    bantuan = 'APBD, Bos Khusus'
                } else {
                    bantuan = 'APBD'
                }
            } else {
                if (bos) {
                    bantuan = 'BOS Khusus'
                }
            }
        }

        setBantuanPengadaan(bantuan)
    }, [apbn, apbd, bos])

    useEffect(() => {
        console.log(userId)
    }, [userId])

    return (
        <div className={classes.modal}>
            <div className={classes.paper} style={{ width: 800 }}>
                <Typography className={classes.title}>
                    {isEditMode ? 'Edit Sekolah' : 'Daftar Sekolah'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item container xs={6} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                            <ImagesUploader useInput={useInput} />
                        </Grid>
                        <Grid item container xs={6} style={{ paddingLeft: 24 }}>
                            <Grid container>
                                <Grid item container xs={12}>
                                    <Typography className={classes.textBody}>
                                        Nama Sekolah
                                    </Typography>
                                    <TextField
                                        id="nama-sekolah"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Nama Sekolah"
                                        type="text"
                                        page="auth"
                                        value={sekolah}
                                        onChange={handleChangeSekolah}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item container xs={6}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Tipe Sekolah
                                    </Typography>
                                    <CustomSelect
                                        id={"tipe-sekolah"}
                                        margin={"normal"}
                                        fullWidth
                                        label={"Tipe Sekolah"}
                                        variant={"standard"}
                                        page={"auth"}
                                        value={tipe}
                                        onChange={handleChangeTipe}
                                        option={['Negeri', 'Swasta']}
                                    />
                                </Grid>
                                <Grid item container xs={6} style={{ paddingLeft: 16 }}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        NPSN
                                    </Typography>
                                    <TextField
                                        id="npsn"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="NPSN"
                                        type="text"
                                        page="auth"
                                        value={npsn}
                                        onChange={handleChangeNpsn}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item container xs={6}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Akreditasi
                                    </Typography>
                                    <CustomSelect
                                        id={"akreditasi"}
                                        margin={"normal"}
                                        fullWidth
                                        label={"Akreditasi"}
                                        variant={"standard"}
                                        page={"auth"}
                                        value={akreditasi}
                                        onChange={handleChangeAkreditasi}
                                        option={['A', 'B', 'C', 'D', 'E']}
                                    />
                                </Grid>
                                <Grid item container xs={6} style={{ paddingLeft: 16 }}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        SK Akreditasi
                                    </Typography>
                                    <TextField
                                        id="sk-akreditasi"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="SK Akreditasi"
                                        type="text"
                                        page="auth"
                                        value={skAkre}
                                        onChange={handleChangeSkakre}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item container xs={12}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Nama Kepala Sekolah
                                    </Typography>
                                    <TextField
                                        id="nama-kepala-sekolah"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Nama Kepala Sekolah"
                                        type="text"
                                        page="auth"
                                        value={kepsek}
                                        onChange={handleChangeKepsek}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item container xs={12}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Nama Komite Sekolah
                                    </Typography>
                                    <TextField
                                        id="nama-komite-sekolah"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Nama Komite Sekolah"
                                        type="text"
                                        page="auth"
                                        value={komite}
                                        onChange={handleChangeKomite}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: 12 }}>
                        <Grid item container xs={3}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Alamat Jalan
                            </Typography>
                            <TextField
                                id="alamat-jalan"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Alamat Jalan"
                                type="text"
                                page="auth"
                                value={alamatJalan}
                                onChange={handleChangeAlamatJalan}
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Kecamatan
                            </Typography>
                            <CustomSelect
                                id={"kecamatan"}
                                margin={"normal"}
                                fullWidth
                                label={"Kecamatan"}
                                variant={"standard"}
                                page={"auth"}
                                value={kecamatan}
                                onChange={handleChangeKecamatan}
                                option={alamat !== null ? alamat.filter((item, index) => item.kecamatan != item[index - 1].kecamatan).map(i => i.kecamatan) : []}
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Kelurahan
                            </Typography>
                            <CustomSelect
                                id={"kelurahan"}
                                margin={"normal"}
                                fullWidth
                                label={"Kelurahan"}
                                variant={"standard"}
                                page={"auth"}
                                value={kelurahan}
                                onChange={handleChangeKelurahan}
                                option={alamat !== null ? alamat.filter(item => item.kecamatan === kecamatan).map(kelurahan => kelurahan.desaKelurahan) : []}
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Kepemilikan Lahan
                            </Typography>
                            <CustomSelect
                                id={"statusKepemilikan"}
                                margin={"normal"}
                                fullWidth
                                label={"Status Kepemilikan"}
                                variant={"standard"}
                                page={"auth"}
                                value={kepemilikan}
                                onChange={handleChangeKepemilikan}
                                option={['Milik Sendiri', 'Milik Pemerintah', 'Tidak diketahui']}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: 12 }}>
                        <Grid item container xs={3}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Nomor Pendirian
                            </Typography>
                            <TextField
                                id="nomor-pendirian"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Nomor Pendirian"
                                type="text"
                                page="auth"
                                value={noSuratPendirian}
                                onChange={handleChangeNoSuratPendirian}
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Tanggal Berdiri
                            </Typography>
                            <TextField
                                id="tanggal-berdiri"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Tanggal Berdiri"
                                type="date"
                                page="auth"
                                value={tanggalPendirian}
                                onChange={handleChangeTanggalPendirian}
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Nomor Ijin Operasional
                            </Typography>
                            <TextField
                                id="nomor-ijin-operasional"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Nomor Ijin Operasional"
                                type="text"
                                page="auth"
                                value={noSuratIzin}
                                onChange={handleChangeNoSuratIzin}
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Tanggal Ijin Operasional
                            </Typography>
                            <TextField
                                id="tanggal-ijin-operasional"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Tanggal Ijin Operasional"
                                type="date"
                                page="auth"
                                value={tanggalIzinOperasional}
                                onChange={handleChangeTanggalIzinOperasional}
                            />
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: 12 }}>
                        <Grid item container xs={3}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Jumlah Rombongan Belajar
                            </Typography>
                            <TextField
                                id="jumlah-rombel"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Jumlah Rombongan Belajar"
                                type="number"
                                page="auth"
                                value={rombonganBelajar}
                                onChange={handleChangeRombonganBelajar}
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Jumlah Guru
                            </Typography>
                            <TextField
                                id="jumlah-guru"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Jumlah Guru"
                                type="number"
                                page="auth"
                                value={jumlahGuru}
                                onChange={handleChangeJumlahGuru}
                            />
                        </Grid>
                        <Grid item container xs={6} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Jenis Bantuan Pendanaan
                            </Typography>
                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel control={<Checkbox checked={apbn} onChange={handleChangeBantuan} name="apbn" style={{ color: apbn ? Color.primary[300] : '#000000' }} />} label="APBN" />
                                    <FormControlLabel control={<Checkbox checked={apbd} onChange={handleChangeBantuan} name="apbd" style={{ color: apbd ? Color.primary[300] : '#000000' }} />} label="APBD" />
                                    <FormControlLabel control={<Checkbox checked={bos} onChange={handleChangeBantuan} name="bos" style={{ color: bos ? Color.primary[300] : '#000000' }} />} label="Bos Khusus" />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        buttonText={"Daftar Sekolah"}
                    />
                </form>
            </div>
        </div >
    )
}

EditDaftarSekolah.defaultProps = {
    isEditMode: false
}

export default EditDaftarSekolah