import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles, IconButton } from '@material-ui/core'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import CloseIcon from '@material-ui/icons/Close';
import { FontFamily } from '../Constants/FontFamily';

const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: 15,
        padding: 12,
        transform: 'translate(-50%, -50%)'
    },
    dialogTitle: {
        textAlign: 'center',
        paddingBottom: 0
    },
    dialogContent: {
        textAlign: 'center',
        paddingTop: 0
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogAction: {
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 8
    },
    titleIcon: {
        '& .MuiSvgIcon-root': {
            fontSize: '6rem',
        }
    }
}))

const ConfirmDialog = (props) => {
    const { title, subtitle, dialogAction, open, handleClose, icon } = props;
    const classes = useStyles()

    return (
        <Dialog open={open} classes={{ paper: classes.dialog }}>
            <DialogTitle className={classes.dialogTitle}>
                {handleClose ? (
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <div className={classes.titleIcon}>
                    {icon}
                </div>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 20, color: '#525252', paddingBottom: 8 }}>
                    {title}
                </Typography>
                <Typography style={{ fontFamily: FontFamily.OPEN_SANS_REGULAR, fontSize: 12, color: '#828282', paddingBottom: dialogAction ? 4 : 8 }}>
                    {subtitle}
                </Typography>
            </DialogContent>
            {dialogAction &&
                <DialogActions className={classes.dialogAction}>
                    {dialogAction}
                </DialogActions>
            }
        </Dialog>
    )
}

export default ConfirmDialog
