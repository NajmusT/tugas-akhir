import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

//Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//Components
import TextField from '../Components/TextField'
import Button from '../Components/Button'
import CustomSelect from '../Components/Select'

//Constant
import { Color } from "../Constants/Colors";
import ImageIcon from '../asset/icons/Image';
import { useAuthStyles } from '../Styles/AuthStyles';

const EditDaftarSekolah = (props) => {
    const { isEditMode } = props

    const history = useHistory();
    const classes = useAuthStyles()

    const [akreditasi, setAkreditasi] = useState(null)
    const [tipe, setTipe] = useState(null)
    const [kepemilikan, setKepemilikan] = useState(null)
    const [apbd, setApbd] = useState(false)
    const [apbn, setApbn] = useState(false)
    const [bos, setBos] = useState(false)

    const handleChangeAkreditasi = (e) => {
        setAkreditasi(e.target.value)
    }

    const handleChangeTipe = (e) => {
        setTipe(e.target.value)
    }

    const handleChangeKepemilikan = (e) => {
        setKepemilikan(e.target.value)
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

    const handleSubmit = () => {
        console.log('Submited')
    }

    return (
        <div className={classes.modal}>
            <div className={classes.paper}>
                <Typography className={classes.title}>
                    {isEditMode ? 'Edit Sekolah' : 'Daftar Sekolah'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item container xs={7} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                            <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                        </Grid>
                        <Grid item container xs={5} style={{ paddingLeft: 24 }}>
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
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Kecamatan
                            </Typography>
                            <TextField
                                id="kecamatan"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Kecamatan"
                                type="text"
                                page="auth"
                            />
                        </Grid>
                        <Grid item container xs={3} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Kelurahan
                            </Typography>
                            <TextField
                                id="kelurahan"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Kelurahan"
                                type="text"
                                page="auth"
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