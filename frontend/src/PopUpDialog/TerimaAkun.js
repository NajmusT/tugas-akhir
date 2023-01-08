import React, { useEffect, useState } from 'react'
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton, Grid } from '@material-ui/core'

import Button from '../Components/Button';
import Select from '../Components/Select';

import ImageIcon from '../asset/icons/Image';

import { FontFamily } from '../Constants/FontFamily';
import { Color } from '../Constants/Colors';

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: 15,
        padding: 12,
        transform: 'translate(-50%, -50%)',
        width: '480px'
    },
    dialogTitle: {
        textAlign: 'left',
        paddingBottom: 0
    },
    dialogContent: { textAlign: 'center' },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
        color: theme.palette.grey[500],
    },
    dialogAction: {
        justifyContent: 'flex-end',
        paddingBottom: 8,
        paddingRight: theme.spacing(2)
    },
    titleIcon: {
        '& .MuiSvgIcon-root': {
            fontSize: '6rem',
        }
    }
}))

const TerimaAkun = (props) => {
    const { title, subtitle, open, handleClose, user, dialogAction, inputControl } = props;
    const classes = useStyles()

    return (
        <Dialog open={open} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 20, color: '#525252', paddingBottom: 8 }}>
                    {title}
                </Typography>
                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_REGULAR, fontSize: 12, color: '#828282', paddingBottom: 8 }}>
                    {subtitle}
                </Typography>
                {handleClose ? (
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Grid container style={{}}>
                    <Grid item container xs={4} style={{ alignContent: 'center', justifyContent: 'center', backgroundColor: "#D3D1D1", borderRadius: 12 }}>
                        {user.fotoProfil != null ?
                            <img src={user.fotoProfil} alt={'email'} style={{ width: '20px', height: '16px', padding: 2 }} /> :
                            <ImageIcon fill={'#EFEFEF'} style={{ width: '4vw', height: '4vw', padding: "0px 32px" }} />
                        }
                    </Grid>
                    <Grid item container xs={8} style={{ paddingLeft: 16, paddingTop: 12 }}>
                        <Grid item xs={12}>
                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ paddingRight: 64 }}>
                                    <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                        Nama
                                    </Typography>
                                </div>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: '#A1A1A1' }}>
                                    {user.name}
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 12 }}>
                                <div style={{ paddingRight: 66 }}>
                                    <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                        Email
                                    </Typography>
                                </div>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: '#A1A1A1' }}>
                                    {user.email}
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 12 }}>
                                <div style={{ paddingRight: 12 }}>
                                    <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                        Tanggal Daftar
                                    </Typography>
                                </div>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: '#A1A1A1' }}>
                                    {moment(user.createdAt).format("D MMMM YYYY, hh:mm a")}
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 4 }}>
                                <div style={{ paddingRight: 72 }}>
                                    <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                        Role
                                    </Typography>
                                </div>
                                {inputControl}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                {dialogAction}
            </DialogActions>
        </Dialog >
    )
}

export default TerimaAkun
