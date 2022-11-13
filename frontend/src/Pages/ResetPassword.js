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

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password1: '',
            password2: ''
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
                            Reset Password
                        </Typography>
                        <form className={classes.form} onSubmit={console.log("Submited")}>
                            <Grid container xs={12}>
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
                                    page="begin"
                                />
                            </Grid>
                            <Grid container xs={12}>
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
                                    page="begin"
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
}

export default withStyles(BeginStyles, { withTheme: true })(ResetPassword)