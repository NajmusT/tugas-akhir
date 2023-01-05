import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

//Custom Component
import Button from '../Button'
import TextField from '../TextField'

import { FontFamily } from '../../Constants/FontFamily';
import { Color } from '../../Constants/Colors';
import { Grid } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
    width: 540,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  dialogContainer: {
    margin: '32px',
    position: 'relative',
    overflowY: 'auto',
    borderRadius: 15,
    padding: 16
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[600] }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))(MuiDialogActions);

const FormDialog = withStyles(styles)((props) => {
  const { open, classes, handleClose, handleClick, message, inputForm, title, contentText, link, buttonText } = props

  return (
    <div >
      <Dialog
        onClose={handleClose}
        open={open}
        PaperProps={{ classes: { root: classes.dialogContainer } }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent >
          <Typography style={{ fontFamily: FontFamily.OPEN_SANS_REGULAR, fontSize: 16, color: Color.neutral[700], paddingBottom: 8 }}>
            {contentText}
          </Typography>
          {inputForm}
          {message}
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item container xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                buttonText={buttonText}
                onClick={handleClick}
                page={'main'}
                buttonType={'dss-primary'}
              />
            </Grid>
            {link &&
              <Grid item container xs={12} style={{ paddingTop: 12 }}>
                {link}
              </Grid>
            }
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default FormDialog