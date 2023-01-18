import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment'
import { v1 } from 'uuid'

//Material UI
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Components
import TextField from '../../Components/ReusableComponent/TextField'
import Button from '../../Components/ReusableComponent/Button'

//Constant
import { Color } from "../../Constants/Colors";
import { useAuthStyles } from '../../Styles/AuthStyles';
import { getCurrentUser } from '../../Utils';
import LoadingScreen from '../LoadingScreen';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [email, setEmail] = useState(null)
    const [errors, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const tokenId = useParams()

    const classes = useAuthStyles()
    const history = useHistory();

    const isAuthenticated = JSON.parse(localStorage.getItem('user'))?.payload != null
    const location = history.location.pathname.split('/')

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPassword = {
            password: password,
            password2: confPassword
        }

        axios.post(`http://localhost:5000/user/reset-password/${tokenId.userId}/${tokenId.token}`, newPassword)
            .then(response => {
                if (response.data.message === 'Password telah terupdate') {
                    setSuccess(true)
                } else {
                    setError("Password gagal diupdate")
                }
            })
            .catch(error => { console.log(error.data) })
    }

    useEffect(() => {
        console.log(tokenId)
    }, [])

    return (
        <React.Fragment>
            <div className={classes.root}>
                {!isAuthenticated ?
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
                    </div > : <LoadingScreen />}
            </div>
        </React.Fragment>
    )
}

export default ResetPassword