import React, { Component } from 'react'

import { withStyles } from '@material-ui/styles'

import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';

import { TextFieldStyles } from '../../Styles/TextFieldStyles'

class CustomSelect extends Component {
    render() {
        const { classes, page, value, margin, option, variant, fullWidth, id, label, onChange } = this.props

        console.log(option)

        return (
            <React.Fragment>
                {fullWidth ?
                    <TextField
                        id={id}
                        select
                        margin={margin}
                        fullWidth
                        value={value}
                        variant={variant}
                        className={page === "main" ? classes.main : classes.begin}
                        onChange={onChange}
                    >
                        {option.map((opt) => (
                            <MenuItem value={opt} className={classes.option}>
                                {opt}
                            </MenuItem>
                        ))}
                    </TextField> :
                    <TextField
                        id={id}
                        select
                        margin={margin}
                        value={value}
                        variant={variant}
                        className={page === "main" ? classes.main : classes.begin}
                        onChange={onChange}
                    >
                        {option.map((opt) => (
                            <MenuItem value={opt.id} className={classes.option}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                }

            </React.Fragment>
        )
    }
}

export default withStyles(TextFieldStyles, { withTheme: true })(CustomSelect)
