import React, { Component } from 'react';

//Material UI
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { BeginStyles } from '../Styles/BeginStyles';

//Components
import TextField from '../Components/TextField'
import Button from '../Components/Button'

//Constant
import { Color } from "../Constants/Colors";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <div className={classes.modal}>
                    <div className={classes.paper}>
                        <Typography className={classes.title}>
                            Sign In
                        </Typography>
                        <form className={classes.form} onSubmit={console.log("Submited")}>
                            <Grid container xs={12}>
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
                                />
                            </Grid>
                            <Grid container xs={12}>
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
                                    page="begin"
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                buttonText={"Sign In"}
                            />
                            <Grid container style={{ display: "flex" }} >
                                <Grid item xs style={{ paddingRight: 16 }}>
                                    <Typography className={classes.link}>
                                        {"Tidak mempunyai akun? "}
                                        <Link href="/sign-up" className={classes.link} style={{ color: Color.primary[300] }}>
                                            {"Daftar"}
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Link href="/reset-password" className={classes.link}>
                                        {"Lupa password?"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div >
            </div>
        )
    }
}

export default withStyles(BeginStyles, { withTheme: true })(SignIn)