import React, { useEffect, useState } from 'react';
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
import { useAuthStyles } from '../../Styles/AuthStyles';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [email, setEmail] = useState(null)
    const [errors, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const classes = useAuthStyles()
    const history = useHistory();

    const location = history.location.pathname.split('/')

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPassword = {
            email: email,
            password: password,
            password2: confPassword
        }

        axios.put('http://localhost:5000/user/updatePassword', newPassword)
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
        console.log(location[location.length - 1])

        axios.get('http://localhost:5000/user/reset', {
            params: { resetPasswordToken: location[location.length - 1] }
        })
            .then(response => {
                console.log(response)
                if (response.data.message === 'Link reset password OK') {
                    setEmail(response.data.email)
                } else {
                    setError('Link reset password telah expired')
                }
            })
            .catch(error => {
                console.log()
            })
    }, [])

    useEffect(() => {
        console.log(email)
    }, [email])

    return (
        <div className={classes.root}>
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
    )
}

export default ResetPassword