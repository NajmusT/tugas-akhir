import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import MaterialUIButton from '@material-ui/core/Button';

import { ButtonStyles } from '../../Styles/ButtonStyles';

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
                        className={page === "main" ? (buttonType === 'primary' ? classes.mainPrimary : buttonType === 'success' ? classes.mainSuccess : buttonType === 'danger' ? classes.mainDanger : buttonType === 'warning' ? classes.mainWarning : classes.mainDSS) : classes.begin}
                        onClick={onClick}
                    >
                        {buttonText}
                    </MaterialUIButton> :
                    <MaterialUIButton
                        type={type}
                        variant={variant}
                        className={page === "main" ? (buttonType === 'primary' ? classes.mainPrimary : buttonType === 'success' ? classes.mainSuccess : buttonType === 'danger' ? classes.mainDanger : buttonType === 'warning' ? classes.mainWarning : classes.mainDSS) : classes.begin}
                        onClick={onClick}
                    >
                        {buttonText}
                    </MaterialUIButton>}
            </React.Fragment>
        )
    }
}

export default withStyles(ButtonStyles, { withTheme: true })(Button)