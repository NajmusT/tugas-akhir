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
import UploadButtons from '../Components/ImagesUploader';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            email: '',
            password1: '',
            password2: '',
            urlPict: '',
            havePicture: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.havePicture)
    }

    render() {
        const { classes } = this.props
        const { nama, email, password1, password2, havePicture } = this.state

        return (
            <div className={classes.root}>
                <div className={classes.modal}>
                    <div className={classes.paper}>
                        <Typography className={classes.title}>
                            Sign up
                        </Typography>
                        <form className={classes.form} onSubmit={console.log("Submited")}>
                            <Grid container>
                                <Grid item container xs={5} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12, height: '16vw' }}>
                                    <UploadButtons />
                                </Grid>
                                <Grid item container xs={1} />
                                <Grid item container xs={6} styl>
                                    <Grid item container>
                                        <Typography className={classes.textBody} style={{ paddingTop: 20 }}>
                                            Nama Lengkap
                                        </Typography>
                                        <TextField
                                            id="nama"
                                            variant="standard"
                                            margin="normal"
                                            fullWidth
                                            label="Nama Lengkap"
                                            type="text"
                                            page="begin"
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Typography className={classes.textBody} style={{ paddingTop: 20 }}>
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
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item container>
                                    <Grid container>
                                        <Typography className={classes.textBody} style={{ paddingTop: 16 }}>
                                            Password
                                        </Typography>
                                        <TextField
                                            id="password1"
                                            variant="standard"
                                            margin="normal"
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            page="begin"
                                        />
                                    </Grid>
                                    <Grid container>
                                        <Typography className={classes.textBody} style={{ paddingTop: 16 }}>
                                            Konfirmasi Password
                                        </Typography>
                                        <TextField
                                            id="password2"
                                            variant="standard"
                                            margin="normal"
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            page="begin"
                                        />
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
                            <Grid container style={{ display: "flex" }} >
                                <Typography className={classes.link}>
                                    {"Sudah mempunyai akun? "}
                                    <Link href="/sign-in" className={classes.link} style={{ color: Color.primary[300] }}>
                                        {"Sign In"}
                                    </Link>
                                </Typography>
                            </Grid>
                        </form>
                    </div>
                </div >
            </div>
        )
    }
}

export default withStyles(BeginStyles, { withTheme: true })(SignUp)