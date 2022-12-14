import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from 'moment'
import { v1 } from 'uuid'

//Material UI
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Components
import TextField from '../Components/TextField'
import Button from '../Components/Button'

//Constant
import { Color } from "../Constants/Colors";
import ImageIcon from '../asset/icons/Image';
import { isValidEmail } from '../Utils';
import { useAuthStyles } from '../Styles/AuthStyles';

const EditDaftarSekolah = (props) => {
    const { isEditMode } = props

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errors, setError] = useState({});
    const [msg, setMsg] = useState('')
    const history = useHistory();
    const classes = useAuthStyles()

    const validationErrorMessage = () => {
        let error = {};

        if (name === '' || email === '' || password === '' || confPassword === '') {
            if (name === '') {
                error.name = 'Nama tidak boleh kosong'
            };

            if (email === '') {
                error.email = 'Email tidak boleh kosong'
            } else if (!isValidEmail(email)) {
                error.email = 'Email tidak valid'
            }

            if (password === '') {
                error.password = 'Password tidak boleh kosong'
            }

            if (confPassword === '') {
                error.confPassword = 'Konfirmasi password tidak boleh kosong'
            }

            setError(error)
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfPassChange = (e) => {
        setConfPassword(e.target.value)
    }

    const validateForm = (errors) => {
        let valid = true;
        Object.entries(errors).forEach(item => {
            item && item[1].length > 0 && (valid = false)
        })
        return valid;
    }

    const resetErrorMsg = () => {
        let error = {};

        error.name = ''
        error.email = ''
        error.password = ''
        error.confPassword = ''

        setError(error)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        resetErrorMsg()
        validationErrorMessage()

        if (validateForm(errors)) {
            try {
                await axios.post('http://localhost:5000/user/register', {
                    _id: v1(),
                    name: name,
                    email: email,
                    password1: password,
                    password2: confPassword,
                    createdAt: moment()
                });
                history.push("/");
            } catch (error) {
                if (error.response) {
                    setMsg(error.response);
                    console.log(msg)
                }
            }
        }
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
                                        page="begin"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item container xs={6}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Tipe Sekolah
                                    </Typography>
                                    <TextField
                                        id="tipe-sekolah"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Tipe Sekolah"
                                        type="text"
                                        page="begin"
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
                                        page="begin"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item container xs={6}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Akreditasi
                                    </Typography>
                                    <TextField
                                        id="akreditasi"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Akreditasi"
                                        type="text"
                                        page="begin"
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
                                        page="begin"
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
                                        page="begin"
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
                                        page="begin"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{ paddingTop: 12 }}>
                        <Grid item container xs={6}>
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
                                page="begin"
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
                                page="begin"
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
                                page="begin"
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
                                page="begin"
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
                                page="begin"
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
                                page="begin"
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
                                page="begin"
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
                                page="begin"
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
                                page="begin"
                            />
                        </Grid>
                        <Grid item container xs={6} style={{ paddingLeft: 12 }}>
                            <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                Jenis Bantuan Pendanaan
                            </Typography>
                            <TextField
                                id="tanggal-ijin-operasional"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Tanggal Ijin Operasional"
                                type="text"
                                page="begin"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        buttonText={"Sign Up"}
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