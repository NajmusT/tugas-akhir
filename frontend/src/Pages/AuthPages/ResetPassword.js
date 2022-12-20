import React, { useState } from 'react';
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

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [errors, setError] = useState({})

    const classes = useAuthStyles()
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPassword = {
            password1: password,
            password2: confPassword
        }
    }

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
                        <Grid container style={{paddingBottom: 8}}>
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