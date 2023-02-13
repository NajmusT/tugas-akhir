import React, { useState, useEffect, createContext } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

//Material UI
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';

//Components
import TextField from '../../Components/ReusableComponent/TextField'
import Button from '../../Components/ReusableComponent/Button'

//Constant
import { Color } from "../../Constants/Colors";

import { isValidEmail } from '../../Utils';
import { useAuthStyles } from '../../Styles/AuthStyles';
import ForgetPassword from '../../PopUpDialog/ForgetPassword';
import LoadingScreen from '../LoadingScreen';
import ConfirmDialog from '../../Components/ReusableComponent/ConfirmationDialog';

export const LoginContext = createContext({})

const Login = () => {
    const classes = useAuthStyles()
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setError] = useState({})
    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const isAuthenticated = JSON.parse(localStorage.getItem('user'))?.payload != null

    const LoginValue = {
        openSuccessModal,
        setOpenSuccessModal
    }

    const SuccessNotifModal = () => {
        return (
            <ConfirmDialog
                title={'Kirim Link Reset Password Berhasil'}
                subtitle={'Kami telah mengirimkan link untuk mereset password ke alamat email anda.Harap cek email anda'}
                open={openSuccessModal}
                handleClose={() => {
                    setOpenSuccessModal(false)
                    history.push('/')
                }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleEmailChange = (e) => {
        resetErrorMsg()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        resetErrorMsg()
        setPassword(e.target.value)
    }

    const validateForm = (errors) => {
        let valid = true;
        Object.entries(errors).forEach(item => {
            item && item[1].length > 0 && (valid = false)
        })
        return valid;
    }

    const validationErrorMessage = () => {
        let error = {};

        if (email === '' || password === '') {
            if (email === '') {
                error.email = 'Email tidak boleh kosong'
            } else if (!isValidEmail(email)) {
                error.email = 'Email tidak valid'
            }

            if (password === '') {
                error.password = 'Password tidak boleh kosong'
            }

            setError(error)
        }
    }

    const resetErrorMsg = () => {
        let error = {}

        error.email = ''
        error.password = ''

        setError(error)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        validationErrorMessage()

        if (validateForm(errors)) {
            try {
                const response = await axios.post('http://localhost:5000/user/login', data)
                localStorage.setItem('user', JSON.stringify(response.data))

                const user = JSON.parse(localStorage.getItem('user'))?.payload

                if (user.roles === 'operator') { history.push("/manajemen-user"); }
                else if (user.roles === 'staff-dinas') { history.push("/beranda") }
                else {
                    const jumlahSekolah = (await axios.get('http://localhost:5000/sekolah')).data.filter(item => item.createdBy === user._id).length
                    if (jumlahSekolah === 0) { history.push("/daftar-sekolah") }
                    else { history.push("/beranda") }
                }

            } catch (error) {
                if (error.response) {
                    let err = {}

                    if (error.response.data.password === 'Password tidak sesuai') {
                        err.password = 'Password salah'
                    } if (error.response.data.email === 'User tidak ditemukan!') {
                        err.email = "Email tidak terdaftar di dalam sistem"
                    }

                    setError(err)
                }
            }
        }
    }

    return (
        <LoginContext.Provider value={LoginValue}>
            {isAuthenticated ? <LoadingScreen /> :
                <React.Fragment>
                    {openSuccessModal && SuccessNotifModal()}
                    <div className={classes.root}>
                        <div className={classes.modal}>
                            <div className={classes.paper} style={{ width: 320 }}>
                                <Typography className={classes.title}>
                                    Sign In
                                </Typography>
                                <form className={classes.form} onSubmit={handleSubmit}>
                                    <Grid container style={{ paddingBottom: 8 }}>
                                        <Typography className={classes.textBody}>
                                            Email
                                        </Typography>
                                        <TextField
                                            id="email"
                                            variant="standard"
                                            margin="normal"
                                            fullWidth
                                            label="Alamat Email"
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
                                    <Grid container >
                                        <Typography className={classes.textBody} style={{ paddingTop: 16 }}>
                                            Password
                                        </Typography>
                                        <TextField
                                            id="password"
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
                                                <Typography className={classes.textBodyError} >
                                                    {errors.password}
                                                </Typography>
                                            </Grid>
                                        }
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className={classes.submit}
                                        buttonText={"Sign In"}
                                    />
                                    <Grid container style={{ display: "flex", paddingTop: 8 }} >
                                        <Grid item xs style={{ paddingRight: 16 }}>
                                            <Typography className={classes.link}>
                                                {"Tidak mempunyai akun? "}
                                                <Link href="/sign-up" className={classes.link} style={{ color: Color.primary[300] }}>
                                                    {"Daftar"}
                                                </Link>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.link} onClick={() => { setOpenDialog(true) }}>
                                                {"Lupa Password?"}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <ForgetPassword open={openDialog} handleClose={handleCloseDialog} />
                                </form>
                            </div>
                        </div >
                    </div>
                </React.Fragment>
            }
        </LoginContext.Provider>
    )
}

export default Login