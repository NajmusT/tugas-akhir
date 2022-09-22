import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import { TextFieldStyles } from '../Styles/TextFieldStyles'

class CustomTextField extends Component {
    render() {
        const { classes, page, margin, fullWidth, type, id, name, label, variant } = this.props

        return (
            <React.Fragment>
                {fullWidth ?
                    <TextField
                        id={id}
                        variant={variant}
                        margin={margin}
                        fullWidth
                        label={label}
                        type={type}
                        className={page === "main" ? "" : classes.begin}
                    /> :
                    <TextField
                        id={id}
                        variant={variant}
                        margin={margin}
                        label={label}
                        type={type}
                        className={page === "main" ? "" : classes.begin} />
                }

            </React.Fragment>
        )
    }
}

export default withStyles(TextFieldStyles, { withTheme: true })(CustomTextField)