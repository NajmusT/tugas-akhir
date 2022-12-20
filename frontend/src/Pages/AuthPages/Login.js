import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

//Material UI
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Components
import TextField from '../../Components/TextField'
import Button from '../../Components/Button'
import FormDialog from '../../Components/CustomComponents/FormDialog';

//Constant
import { Color } from "../../Constants/Colors";

import { isValidEmail } from '../../Utils';
import { useAuthStyles } from '../../Styles/AuthStyles';

const Login = () => {
    const classes = useAuthStyles()
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setError] = useState({})
    const [msg, setMsg] = useState('')
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
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

        resetErrorMsg()
        validationErrorMessage()

        if (validateForm(errors)) {
            try {
                await axios.post('http://localhost:5000/user/login', data);
                history.push("/beranda");
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
                <div className={classes.paper} >
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
                                    {"Forget Password?"}
                                </Typography>
                            </Grid>
                        </Grid>

                        <FormDialog open={openDialog} handleClose={handleCloseDialog} />
                    </form>
                </div>
            </div >
        </div>
    )
}

export default Login