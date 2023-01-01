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
import TextField from '../../Components/TextField'
import Button from '../../Components/Button'

//Constant
import { Color } from "../../Constants/Colors";
import ImageIcon from '../../asset/icons/Image';
import { isValidEmail } from '../../Utils';
import { useAuthStyles } from '../../Styles/AuthStyles';
import ImagesUploader from '../../Components/ImagesUploader';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [fotoProfil, setFotoProfil] = useState('');
    const [errors, setError] = useState({});
    const [msg, setMsg] = useState('')
    const reader = new FileReader()

    const history = useHistory();
    const classes = useAuthStyles();

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

    const handleChangeFotoProfil = (e) => {
        setFotoProfil(e.target.files[0])
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

        const data = {
            fotoProfil: fotoProfil,
            name: name,
            email: email,
            password: password,
            password2: confPassword,
            roles: 'users',
            isActive: true,
            logs: [],
            lastActive: moment()
        }

        resetErrorMsg()
        validationErrorMessage()

        if (validateForm(errors)) {
            try {
                await axios.post('http://localhost:5000/user/register', data);
                history.push("/daftar-sekolah");
            } catch (error) {
                if (error.response) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.modal}>
                <div className={classes.paper} style={{ width: 600 }}>
                    <Typography className={classes.title}>
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container style={{ paddingBottom: 8 }}>
                            <Grid item container xs={7} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                                {/* <ImagesUploader handleChange={handleChangeFotoProfil} /> */}
                            </Grid>
                            <Grid item container xs={5} style={{ paddingLeft: 32 }}>
                                <Grid container>
                                    <Typography className={classes.textBody} >
                                        Nama Lengkap
                                    </Typography>
                                    <TextField
                                        id="nama"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Nama Lengkap"
                                        type="text"
                                        page="auth"
                                        onChange={handleNameChange}
                                    />
                                    {errors.name &&
                                        <Grid item xs={12}>
                                            <Typography className={classes.textBodyError} >
                                                {errors.name}
                                            </Typography>
                                        </Grid>
                                    }
                                </Grid>
                                <Grid container style={{ paddingTop: 16 }}>
                                    <Typography className={classes.textBody}>
                                        Email
                                    </Typography>
                                    <TextField
                                        id="email"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Email Address"
                                        type="email"
                                        page="auth"
                                        onChange={handleEmailChange}
                                    />
                                    {errors.email &&
                                        <Grid item xs={12}>
                                            <Typography className={classes.textBodyError} >
                                                {errors.email}
                                            </Typography>
                                        </Grid>
                                    }
                                </Grid>
                                <Grid container>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Password
                                    </Typography>
                                    <TextField
                                        id="password1"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        page="auth"
                                        onChange={handlePasswordChange}
                                    />
                                    {errors.password &&
                                        <Grid item xs={12}>
                                            <Typography className={classes.textBodyError} style={{ alignSelf: 'flex-end' }} >
                                                {errors.password}
                                            </Typography>
                                        </Grid>
                                    }
                                </Grid>
                                <Grid container>
                                    <Typography className={classes.textBody} style={{ paddingTop: 8 }}>
                                        Konfirmasi Password
                                    </Typography>
                                    <TextField
                                        id="password2"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        page="auth"
                                        onChange={handleConfPassChange}
                                    />
                                    {errors.confPassword &&
                                        <Grid item xs={12}>
                                            <Typography className={classes.textBodyError} >
                                                {errors.confPassword}
                                            </Typography>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            buttonText={"Sign Up"}
                        />
                        <Grid container style={{ display: "flex", paddingTop: 8 }} >
                            <Typography className={classes.link}>
                                {"Sudah mempunyai akun? "}
                                <Link href="/" className={classes.link} style={{ color: Color.primary[300] }}>
                                    {"Sign In"}
                                </Link>
                            </Typography>
                        </Grid>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Register