import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { SchoolListStyles } from '../../Styles/ExerciseCRUD/SchoolListStyles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';

class SchoolList extends Component {
  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {"Exercise CRUD"}
            </Typography>
            <Link href="/sign-in">
              <Button style={{backgroun}}>Login</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

export default withStyles(SchoolListStyles, { withTheme: true })(SchoolList)