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
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))(MuiDialogActions);

const FormDialog = (props) => {
  const { open, handleClose, handleClick, inputForm, title, contentText, labelTextfield, buttonText } = props

  return (
    <div style={{ borderRadius: 20 }}>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent >
          <Typography style={{ fontFamily: FontFamily.OPEN_SANS_REGULAR, fontSize: 16, color: Color.neutral[700], paddingBottom: 8 }}>
            {contentText}
          </Typography>
          {inputForm}
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            buttonText={buttonText}
            onClick={handleClick}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormDialog.defaultProps = {
  title: "Modal Title",
  contentText: 'Content Text',
  labelTextfield: 'Label Text Field',
  buttonText: 'Button',
  inputForm: <TextField
    id={'textfield'}
    margin={'dense'}
    fullWidth
    label={'Input Form'}
    // value={}
    variant={'standard'}
    page={'auth'}
  />
}

export default FormDialog