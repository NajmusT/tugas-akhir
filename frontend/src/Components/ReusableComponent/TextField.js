import React, { Component } from 'react'

import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import { TextFieldStyles } from '../../Styles/TextFieldStyles'

class CustomTextField extends Component {
    render() {
        const { classes, page, disable, margin, row, fullWidth, value, type, variant, id, label, onChange } = this.props

        return (
            <React.Fragment>
                {fullWidth ? (disable ?
                    <TextField
                        id={id}
                        margin={margin}
                        fullWidth
                        disabled
                        // multiline
                        // rows={row ? 1 : row}
                        placeholder={label}
                        type={type}
                        variant={variant}
                        value={value}
                        className={page === "main" ? classes.main : classes.begin}
                        onChange={onChange}
                    /> : <TextField
                        id={id}
                        margin={margin}
                        fullWidth
                        // multiline
                        // rows={row === undefined ? 1 : row}
                        placeholder={label}
                        type={type}
                        variant={variant}
                        value={value}
                        className={page === "main" ? classes.main : classes.begin}
                        onChange={onChange}
                    />) : (disable ?
                        <TextField
                            id={id}
                            margin={margin}
                            placeholder={label}
                            // multiline
                            // rows={row ? 1 : row}
                            type={type}
                            variant={variant}
                            value={value}
                            className={page === "main" ? classes.main : classes.begin}
                            onChange={onChange}
                        /> : <TextField
                            id={id}
                            disabled
                            margin={margin}
                            placeholder={label}
                            // multiline
                            // rows={row ? 1 : row}
                            type={type}
                            variant={variant}
                            value={value}
                            className={page === "main" ? classes.main : classes.begin}
                            onChange={onChange}
                        />)
                }
            </React.Fragment>
        )
    }
}

export default withStyles(TextFieldStyles, { withTheme: true })(CustomTextField)