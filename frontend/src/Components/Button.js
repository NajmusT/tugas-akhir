import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ButtonStyles } from '../Styles/ButtonStyles';
import MaterialUIButton from '@material-ui/core/Button';

class Button extends Component {
    render() {
        const { classes, page, disabled, type, fullWidth, variant, buttonText, onClick, buttonType } = this.props

        return (
            <React.Fragment>
                {fullWidth ?
                    <MaterialUIButton
                        type={type}
                        fullWidth
                        variant={variant}
                        className={page === "main" ? (buttonType === 'primary' ? classes.mainPrimary : buttonType === 'success' ? classes.mainSuccess : buttonType === 'danger' ? classes.mainDanger : classes.mainWarning) : classes.begin}
                        onClick={onClick}
                    >
                        {buttonText}
                    </MaterialUIButton> :
                    <MaterialUIButton
                        type={type}
                        variant={variant}
                        className={page === "main" ? (buttonType === 'primary' ? classes.mainPrimary : buttonType === 'success' ? classes.mainSuccess : buttonType === 'danger' ? classes.mainDanger : classes.mainWarning) : classes.begin}
                        onClick={onClick}
                    >
                        {buttonText}
                    </MaterialUIButton>}
            </React.Fragment>
        )
    }
}

export default withStyles(ButtonStyles, { withTheme: true })(Button)