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

const Register = () => {
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
        <div className={classes.root}>
            <div className={classes.modal}>
                <div className={classes.paper}>
                    <Typography className={classes.title}>
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item container xs={5} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                                <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                                {/* <div style={{ color: '#EFEFEF', textAlign: 'center' }}> */}
                                {/* Klik untuk unggah gambar */}
                                {/* </div> */}
                            </Grid>
                            <Grid item container xs={1} />
                            <Grid item container xs={6}>
                                <Grid container>
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
                                        page="begin"
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
                                        page="begin"
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
                                        page="begin"
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
                        <Grid container>
                            <Grid item container>
                                <Grid item container>
                                    <Typography className={classes.textBody} style={{ paddingTop: 16 }}>
                                        Nama Lengkap
                                    </Typography>
                                    <TextField
                                        id="nama"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Nama Lengkap"
                                        type="text"
                                        page="begin"
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
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                            buttonText={"Sign Up"}
                        />
                        <Grid container style={{ display: "flex" }} >
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