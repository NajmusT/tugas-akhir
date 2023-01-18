import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment'
import { v1 } from 'uuid'

//Material UI
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';

//Components
import TextField from '../../Components/ReusableComponent/TextField'
import Button from '../../Components/ReusableComponent/Button'
import LoadingScreen from '../LoadingScreen';
import ConfirmDialog from '../../Components/ReusableComponent/ConfirmationDialog';

//Constant
import { useAuthStyles } from '../../Styles/AuthStyles';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [errors, setError] = useState(null)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
    const [openFailedDialog, setOpenFailedDialog] = useState(false)
    const tokenId = useParams()

    const classes = useAuthStyles()
    const history = useHistory();

    const isAuthenticated = JSON.parse(localStorage.getItem('user'))?.payload != null

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPassword = {
            password: password,
            password2: confPassword
        }

        if (confPassword != password) {
            setOpenFailedDialog(true)
        } else {
            axios.post(`http://localhost:5000/user/reset-password/${tokenId.userId}/${tokenId.token}`, newPassword)
                .then(response => {
                    if (response.data.message === 'Password telah terupdate') {
                        setOpenSuccessDialog(true)
                    } else {
                        setOpenFailedDialog(true)
                    }
                })
                .catch(error => { setOpenFailedDialog(true) })
        }

    }

    const SuccessDialog = () => {
        return (
            <ConfirmDialog
                title={'Reset Password Berhasil'}
                subtitle={'Sistem akan membuka halaman login'}
                open={openSuccessDialog}
                handleClose={() => {
                    setOpenSuccessDialog(false)
                    history.push("/")
                }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const FailedDialog = () => {
        return (
            <ConfirmDialog
                title={'Reset Password Gagal'}
                subtitle={'Gagal merubah password, harap coba lagi'}
                open={openFailedDialog}
                handleClose={() => {
                    setOpenFailedDialog(false)
                }}
                icon={<WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
            />
        )
    }

    return (
        <React.Fragment>
            {!isAuthenticated ?
                <div className={classes.root}>
                    {openSuccessDialog && SuccessDialog()}
                    {openFailedDialog && FailedDialog()}
                    <div className={classes.modal}>
                        <div className={classes.paper}>
                            <Typography className={classes.title}>
                                Reset Password
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <Grid container >
                                    <Typography className={classes.textBody}>
                                        Password Baru
                                    </Typography>
                                    <TextField
                                        id="password1"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Password Baru"
                                        type="password"
                                        page="auth"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Grid>
                                <Grid container style={{ paddingBottom: 8 }}>
                                    <Typography className={classes.textBody} style={{ paddingTop: 16 }}>
                                        Konfirmasi Password Baru
                                    </Typography>
                                    <TextField
                                        id="password2"
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        label="Konfirmasi Password Baru"
                                        type="password"
                                        page="auth"
                                        onChange={(e) => { setConfPassword(e.target.value) }}
                                    />
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.submit}
                                    buttonText={"Reset Password"}
                                />
                            </form>
                        </div>
                    </div >
                </div>
                : <LoadingScreen />}
        </React.Fragment>
    )
}

export default ResetPassword