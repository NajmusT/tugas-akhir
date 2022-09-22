import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ButtonStyles } from '../Styles/ButtonStyles';
import MaterialUIButton from '@material-ui/core/Button';

class Button extends Component {
    render() {
        const { classes, size, page, disabled, type, fullWidth, variant, buttonText, onClick } = this.props

        return (
            <React.Fragment>
                {fullWidth ?
                    <MaterialUIButton
                        type={type}
                        fullWidth
                        variant={variant}
                        className={page === "main" ? "" : classes.begin}
                        onClick={onClick}
                    >
                        {buttonText}
                    </MaterialUIButton> :
                    <MaterialUIButton
                        type={type}
                        variant={variant}
                        className={page === "main" ? "" : classes.begin}
                        onClick={onClick}
                    >
                        {buttonText}
                    </MaterialUIButton>}
            </React.Fragment>
        )
    }
}

export default withStyles(ButtonStyles, { withTheme: true })(Button)