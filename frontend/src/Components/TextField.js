import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React, { Component } from 'react'
import { TextFieldStyles } from '../Styles/TextFieldStyles'

class CustomTextField extends Component {
    render() {
        const { classes, page, margin, fullWidth, type, id, label, onChange } = this.props

        return (
            <React.Fragment>
                {fullWidth ?
                    <TextField
                        id={id}
                        margin={margin}
                        fullWidth
                        placeholder={label}
                        type={type}
                        className={page === "main" ? "" : classes.begin}
                        onChange={onChange}
                    /> :
                    <TextField
                        id={id}
                        margin={margin}
                        placeholder={label}
                        type={type}
                        className={page === "main" ? "" : classes.begin}
                        onChange={onChange}
                    />
                }

            </React.Fragment>
        )
    }
}

export default withStyles(TextFieldStyles, { withTheme: true })(CustomTextField)