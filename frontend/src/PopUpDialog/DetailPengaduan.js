import React, { useEffect, useState } from 'react'
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton, Grid } from '@material-ui/core'

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
        width: '540px'
    },
    dialogTitle: {
        textAlign: 'left',
        paddingBottom: 0
    },
    dialogContent: { paddingBottom: 24 },
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

const DetailPengaduan = (props) => {
    const { title, open, handleClose, kerusakan } = props;
    const classes = useStyles()

    const image = kerusakan.bukti.fileName != '' ? require(`../../../backend/public/images/${kerusakan.bukti.fileName}`) : null

    return (
        <Dialog open={open} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 20, color: '#525252', paddingBottom: 8 }}>
                    {title}
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
                        {image != null ?
                            <img src={image} alt={'email'} style={{ width: '100%', height: '100%' }} /> :
                            <ImageIcon fill={'#EFEFEF'} style={{ width: '4vw', height: '4vw', padding: "0px 32px" }} />
                        }
                    </Grid>
                    <Grid item container xs={8} style={{ paddingLeft: 16 }}>
                        <Grid item xs={12}>
                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ paddingRight: 64 }}>
                                    <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                        Nama Sekolah
                                    </Typography>
                                </div>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: '#A1A1A1' }}>
                                    {kerusakan.namaSekolah}
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 12 }}>
                                <div style={{ paddingRight: 66 }}>
                                    <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                        Nama Ruangan
                                    </Typography>
                                </div>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: '#A1A1A1' }}>
                                    {kerusakan.namaPrasarana}
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 12 }}>
                                <div style={{ paddingRight: 12 }}>
                                    <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                        Nama Barang
                                    </Typography>
                                </div>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: '#A1A1A1' }}>
                                    {kerusakan.namaSarana != '' ? kerusakan.namaSarana : '-'}
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center', paddingTop: 12 }}>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: Color.neutral[400] }}>
                                    Deskripsi
                                </Typography>
                            </Grid>
                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_SEMI_BOLD, fontSize: 12, color: '#A1A1A1' }}>
                                    {kerusakan.deskripsi != 'null' ? kerusakan.deskripsi : '-'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog >
    )
}

export default DetailPengaduan
