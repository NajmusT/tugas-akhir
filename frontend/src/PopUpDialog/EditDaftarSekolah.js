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
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';

//Components
import TextField from '../Components/ReusableComponent/TextField'
import Button from '../Components/ReusableComponent/Button'
import CustomSelect from '../Components/ReusableComponent/Select'
import ImagesUploader from '../Components/ReusableComponent/ImagesUploader';
import ConfirmDialog from '../Components/ReusableComponent/ConfirmationDialog';

//Constant
import { Color } from "../Constants/Colors";
import { useAuthStyles } from '../Styles/AuthStyles';

const EditDaftarSekolah = (props) => {
    const { isEditMode, dataSekolah, handleClose } = props

    const fotoSekolah = isEditMode ? (dataSekolah.fotoSekolah.fileName != "" ? require(`../../../backend/public/images/${dataSekolah.fotoSekolah.fileName}`) : null) : null

    const dapatAPBD = isEditMode ? (dataSekolah.bantuanPengadaan.includes("APBD") ? true : false) : false
    const dapatAPBN = isEditMode ? (dataSekolah.bantuanPengadaan.includes("APBN") ? true : false) : false
    const dapatBOS = isEditMode ? (dataSekolah.bantuanPengadaan.includes("BOS") ? true : false) : false

    const history = useHistory();
    const classes = useAuthStyles()
    const userId = JSON.parse(localStorage.getItem('user'))?.payload._id

    const [alamat, setAlamat] = useState(null)
    const [kepsek, setKepsek] = useState(isEditMode ? dataSekolah.kepalaSekolah : null)
    const [alamatJalan, setAlamatJalan] = useState(isEditMode ? dataSekolah.alamat.jalan : null)
    const [luasLahan, setLuasLahan] = useState(isEditMode ? dataSekolah.lahan.luas : null)
    const [kelurahan, setKelurahan] = useState(null)
    const [komite, setKomite] = useState(isEditMode ? dataSekolah.ketuaKomite : null)
    const [sekolah, setSekolah] = useState(isEditMode ? dataSekolah.nama : null)
    const [skAkre, setSkakre] = useState(isEditMode ? dataSekolah.akreditasi.noSK : null)
    const [npsn, setNpsn] = useState(isEditMode ? dataSekolah.npsn : null)
    const [akreditasi, setAkreditasi] = useState(isEditMode ? dataSekolah.akreditasi.nilaiHuruf : null)
    const [tipe, setTipe] = useState(isEditMode ? dataSekolah.jenis : null)
    const [noSuratPendirian, setNoSuratPendirian] = useState(isEditMode ? dataSekolah.pendirian.noSurat : null)
    const [tanggalPendirian, setTanggalPendirian] = useState(isEditMode ? dataSekolah.pendirian.tanggal : null)
    const [noSuratIzin, setNoSuratIzin] = useState(isEditMode ? dataSekolah.izinOperasional.noSurat : null)
    const [tanggalIzinOperasional, setTanggalIzinOperasional] = useState(isEditMode ? dataSekolah.izinOperasional.tanggal : null)
    const [rombonganBelajar, setRombonganBelajar] = useState(isEditMode ? dataSekolah.rombonganBelajar : null)
    const [kepemilikan, setKepemilikan] = useState(isEditMode ? dataSekolah.lahan.kepemilikan : null)
    const [jumlahGuru, setJumlahGuru] = useState(isEditMode ? dataSekolah.jumlahGuru : null)
    const [apbd, setApbd] = useState(dapatAPBD)
    const [apbn, setApbn] = useState(dapatAPBN)
    const [bos, setBos] = useState(dapatBOS)
    const [bantuanPengadaan, setBantuanPengadaan] = useState(false)
    const [file, setFile] = useState(isEditMode ? fotoSekolah : null)
    const [url, setUrl] = useState(isEditMode ? null : null)

    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [openFailedDialog, setOpenFailedDialog] = useState(false)
    const [error, setError] = useState(null)

    const SuccessDialog = () => {
        return (
            <ConfirmDialog
                title={isEditMode ? "Edit Sekolah Berhasil" : "Daftar Sekolah Berhasil"}
                subtitle={isEditMode ? "Sistem telah memperbarui data akun di dalam database" : "Sistem telah memasukkan data akun ke dalam database"}
                open={openSuccessDialog}
                handleClose={() => { setOpenSuccessDialog(false); history.push('/beranda') }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const FailedDialog = () => {
        return (
            <ConfirmDialog
                title={isEditMode ? "Edit Sekolah Gagal" : "Daftar Sekolah Gagal"}
                subtitle={isEditMode ? "Sistem gagal memperbarui data akun di dalam database" : "Sistem gagal memasukkan data akun ke dalam database"}
                open={openFailedDialog}
                handleClose={() => { setOpenFailedDialog(false); }}
                icon={<WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
            />
        )
    }

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

    const handleChangeKepsek = (e) => { setKepsek(e.target.value) }
    const handleChangeNoSuratPendirian = (e) => { setNoSuratPendirian(e.target.value) }
    const handleChangeTanggalPendirian = (e) => { setTanggalPendirian(e.target.value) }
    const handleChangeNoSuratIzin = (e) => { setNoSuratIzin(e.target.value) }
    const handleChangeTanggalIzinOperasional = (e) => { setTanggalIzinOperasional(e.target.value) }
    const handleChangeRombonganBelajar = (e) => { setRombonganBelajar(e.target.value) }
    const handleChangeJumlahGuru = (e) => { setJumlahGuru(e.target.value) }
    const handleChangeKelurahan = (e) => { setKelurahan(e.target.value) }
    const handleChangeLuasLahan = (e) => { setLuasLahan(e.target.value) }
    const handleChangeAlamatJalan = (e) => { setAlamatJalan(e.target.value) }
    const handleChangeKomite = (e) => { setKomite(e.target.value) }
    const handleChangeSkakre = (e) => { setSkakre(e.target.value) }
    const handleChangeNpsn = (e) => { setNpsn(e.target.value) }
    const handleChangeAkreditasi = (e) => { setAkreditasi(e.target.value) }
    const handleChangeTipe = (e) => { setTipe(e.target.value) }
    const handleChangeKepemilikan = (e) => { setKepemilikan(e.target.value) }
    const handleChangeSekolah = (e) => { setSekolah(e.target.value) }

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
            fotoSekolah: { url: url, fileName: file },
            alamat: { jalan: alamatJalan, _id: (alamat.filter(item => item._id === kelurahan).map(i => i._id))[0] },
            akreditasi: { noSK: skAkre, nilaiHuruf: akreditasi },
            pendirian: { noSurat: noSuratPendirian, tanggal: tanggalPendirian },
            izinOperasional: { noSurat: noSuratIzin, tanggal: tanggalIzinOperasional },
            lahan: { luas: luasLahan, kepemilikan: kepemilikan },
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
            setOpenSuccessDialog(true)
        } catch (error) {
            setError(error.response.data.errors)
            setOpenFailedDialog(true)
        }
    }

    useEffect(() => { axios.get('http://localhost:5000/alamat').then(res => { setAlamat(res.data) }) }, [])

    useEffect(() => {
        let bantuan = 'Tidak ada'

        if (apbn) {
            if (apbd) {
                if (bos) { bantuan = 'APBN, APBD, Bos Khusus' }
                else { bantuan = 'APBN, APBD' }
            } else {
                if (bos) { bantuan = 'APBN, Bos Khusus' }
                else { bantuan = 'APBN' }
            }
        } else {
            if (apbd) {
                if (bos) { bantuan = 'APBD, Bos Khusus' }
                else { bantuan = 'APBD' }
            } else {
                if (bos) { bantuan = 'BOS Khusus' }
            }
        }

        setBantuanPengadaan(bantuan)
    }, [apbn, apbd, bos])

    return (
        <React.Fragment>
            {openSuccessDialog && SuccessDialog()}
            {openFailedDialog && FailedDialog()}
            <div className={classes.modal}>
                <div className={classes.paper} style={{ width: 800 }}>
                    <Typography className={classes.title}>
                        {isEditMode ? 'Edit Sekolah' : 'Daftar Sekolah'}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item container xs={6} style={{ alignContent: 'center', justifyContent: 'center', borderRadius: 12 }}>
                                <ImagesUploader useInput={useInput} width={400} height={460} />
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
                                            option={[{ id: 'Negeri', label: 'Negeri' }, { id: 'Swasta', label: 'Swasta' }]}
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
                                            option={[{ id: 'A', label: 'A' }, { id: 'B', label: 'B' }, { id: 'C', label: 'C' }, { id: 'D', label: 'D' }, { id: 'E', label: 'E' }]}
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
                                    option={alamat != null ? alamat.map(kelurahan => ({ id: kelurahan._id, label: kelurahan.desaKelurahan })) : []}
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
                                    option={[{ id: 'Milik Sendiri', label: 'Milik Sendiri' }, { id: 'Milik Pemerintah', label: 'Milik Pemerintah' }, { id: 'Tidak diketahui', label: 'Tidak diketahui' }]}
                                />
                            </Grid>
                            <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                                <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                    Luas Lahan (m2)
                                </Typography>
                                <TextField
                                    id="luas lahan"
                                    variant="standard"
                                    margin="normal"
                                    fullWidth
                                    label="Luas Lahan"
                                    type="number"
                                    page="auth"
                                    value={luasLahan}
                                    onChange={handleChangeLuasLahan}
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
                        <div style={{ display: 'flex', paddingTop: 8, justifyContent: 'flex-end' }}>
                            {
                                isEditMode &&
                                <div style={{ paddingRight: 8 }}>
                                    <Button
                                        variant="contained"
                                        buttonText={"Discard"}
                                        page='main'
                                        buttonType='danger'
                                        onClick={handleClose}
                                    />
                                </div>
                            }
                            <Button
                                type="submit"
                                variant="contained"
                                page='main'
                                buttonType='primary'
                                buttonText={isEditMode ? "Save Changes" : "Submit"}
                            />
                        </div>
                    </form>
                </div>
            </div >
        </React.Fragment>
    )
}

EditDaftarSekolah.defaultProps = {
    isEditMode: false
}

export default EditDaftarSekolah