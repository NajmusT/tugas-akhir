import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from 'moment'

//Material UI
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import WaitIcon from '@material-ui/icons/AvTimer';

//Components
import TextField from '../../Components/ReusableComponent/TextField'
import Button from '../../Components/ReusableComponent/Button'
import ImagesUploader from '../../Components/ReusableComponent/ImagesUploader';
import ConfirmationDialog from '../../Components/ReusableComponent/ConfirmationDialog';

//Constant
import { Color } from "../../Constants/Colors";
import { getCurrentUser } from '../../Utils';

import { useAuthStyles } from '../../Styles/AuthStyles';
import LoadingScreen from '../LoadingScreen';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errors, setError] = useState({});
    const [urlFotoProfil, setUrlFotoProfil] = useState(null);
    const [fileFotoProfil, setFileFotoProfil] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const isAuthenticated = JSON.parse(localStorage.getItem('user'))?.payload != null

    const history = useHistory();
    const classes = useAuthStyles();

    const handleNameChange = (e) => {
        resetErrorMsg()
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        resetErrorMsg()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        resetErrorMsg()
        setPassword(e.target.value)
    }

    const handleConfPassChange = (e) => {
        resetErrorMsg()
        setConfPassword(e.target.value)
    }

    const useInput = () => {
        const handleChange = (newUrlValue, newFileValue) => {
            setUrlFotoProfil(newUrlValue)
            setFileFotoProfil(newFileValue)
        }

        return {
            urlValue: urlFotoProfil,
            fileValue: fileFotoProfil,
            handleChange: handleChange
        }
    }

    const resetErrorMsg = () => {
        let error = {};

        error.name = ''
        error.email = ''
        error.password = ''
        error.confPassword = ''

        setError(error)
    }

    const NotifModal = () => {
        return (
            <ConfirmationDialog
                title={'Mohon Tunggu'}
                subtitle={'Sistem akan mengirim informasi mengenai aktivasi\nakun anda melalui email'}
                open={openModal}
                handleClose={() => {
                    setOpenModal(false)
                    history.push('/')
                }}
                icon={
                    <WaitIcon style={{ color: '#F5973F', fontSize: '8rem' }} />
                }
            />
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()

        formData.append("file", fileFotoProfil)
        formData.append("name", name)
        formData.append("fotoProfil", { urlFotoProfil: urlFotoProfil, fileFotoProfil: fileFotoProfil })
        formData.append("email", email)
        formData.append("password", password)
        formData.append("password2", confPassword)
        formData.append("isActive", false)
        formData.append("createdAt", moment())
        formData.append("lastActive", moment())

        try {
            await axios.post('http://localhost:5000/user/register', formData, { headers: { "Content-Type": "multipart/form-data" } });

            setOpenModal(true)
        } catch (error) {
            setError(error.response.data.errors)
        }
    }

    return (
        <React.Fragment>
            {!isAuthenticated && openModal && NotifModal()}
            <div className={classes.root}>
                {isAuthenticated ? <LoadingScreen /> :
                    <div className={classes.modal}>
                        <div className={classes.paper} style={{ width: 600 }}>
                            <Typography className={classes.title}>
                                Sign Up
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit} encType='multipart/form-data'>
                                <Grid container style={{ paddingBottom: 8 }}>
                                    <Grid item container xs={6} style={{ alignSelf: 'center' }}>
                                        <ImagesUploader useInput={useInput} width={320} height={320} />
                                    </Grid>
                                    <Grid item container xs={6} style={{ paddingLeft: 48, paddingRight: 8 }}>
                                        <Grid container>
                                            <Typography className={classes.textBody} >
                                                Nama Lengkap
                                            </Typography>
                                            <TextField
                                                id="name"
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                label="Nama Lengkap"
                                                type="text"
                                                page="auth"
                                                onChange={handleNameChange}
                                            />
                                            {errors?.name &&
                                                <Grid item xs={12}>
                                                    <Typography className={classes.textBodyError} >
                                                        {errors?.name}
                                                    </Typography>
                                                </Grid>
                                            }
                                        </Grid>
                                        <Grid container style={{ paddingTop: 4 }}>
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
                                            {errors?.email &&
                                                <Grid item xs={12}>
                                                    <Typography className={classes.textBodyError} >
                                                        {errors?.email}
                                                    </Typography>
                                                </Grid>
                                            }
                                        </Grid>
                                        <Grid container style={{ paddingTop: 4 }}>
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
                                            {errors?.password &&
                                                <Grid item xs={12}>
                                                    <Typography className={classes.textBodyError} style={{ alignSelf: 'flex-end' }} >
                                                        {errors?.password}
                                                    </Typography>
                                                </Grid>
                                            }
                                        </Grid>
                                        <Grid container style={{ paddingTop: 4 }}>
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
                                            {errors?.password2 &&
                                                <Grid item xs={12}>
                                                    <Typography className={classes.textBodyError} >
                                                        {errors?.password2}
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
                }
            </div >
        </React.Fragment>
    )
}

export default Register