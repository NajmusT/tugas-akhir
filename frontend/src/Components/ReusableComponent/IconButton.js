import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { ButtonStyles } from '../Styles/ButtonStyles';

import { IconButton } from '@material-ui/core'

class CustomIconButton extends Component {
    render() {
        const { classes, onClick, icon } = this.props

        return (
            <React.Fragment>
                <IconButton className={classes.iconButton}>
                    {icon}
                </IconButton>
            </React.Fragment>
        )
    }
}

export default withStyles(ButtonStyles, { withTheme: true })(CustomIconButton)