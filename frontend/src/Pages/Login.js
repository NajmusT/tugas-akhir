import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { BeginStyles } from '../Styles/BeginStyles';
import { Color } from "../Constants/Colors";
import TextField from '../Components/TextField'
import Button from '../Components/Button'

class Login extends Component {
    render() {
        const { classes } = this.props

        return (
            <Grid container component="main" className={classes.root}>
                <Grid item xs={12} component={Paper} elevation={8} square style={{ borderRadius: 30, marginLeft: '100vh', marginRight: '-30vh' }}>
                    <div className={classes.paper} style={{ padding: "32vh 16vh" }}>
                        <Grid container>
                            <Typography className={classes.title}>
                                {"Sign in"}
                            </Typography>
                        </Grid>
                        <form className={classes.form} onSubmit={console.log("Submited")}>
                            <TextField
                                id="email"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Email Address"
                                type="email"
                                page="begin"
                            />
                            <TextField
                                id="password"
                                variant="standard"
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                page="begin"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                buttonText={"Sign In"}
                            />
                            <Grid container style={{ display: "flex" }} >
                                <Grid item xs >
                                    <Typography className={classes.textBody}>
                                        {"Tidak mempunyai akun? "}
                                        <Link href="/register" className={classes.textBody} style={{ color: Color.primary[200] }}>
                                            {"Daftar"}
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link href="/reset-password" className={classes.textBody}>
                                        {"Lupa password?"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container style={{ padding: '16px 0px', alignItem: "center", justifyContent: "center" }}>
                                <Typography className={classes.textBody} align="center">
                                    {'Copyright © '}
                                    <Link color="inherit" href="/">
                                        Dinas Pendidikan Karawang
                                    </Link>{' '}
                                    {new Date().getFullYear()}
                                </Typography>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(BeginStyles, { withTheme: true })(Login)