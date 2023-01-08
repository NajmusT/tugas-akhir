import React from 'react'
import TextField from './TextField'

import SearchIcon from '@material-ui/icons/Search';
import { Color } from '../Constants/Colors';
import { makeStyles } from '@material-ui/core';

const useSearchStyles = makeStyles({
    button: {
        backgroundColor: Color.primary[300],
        borderRadius: 20,
        alignItems: 'center',
        justifyItems: 'center',
        color: '#ffffff',

        '&:hover': {
            backgroundColor: Color.primary[400],
            boxShadow: 'none'
        }
    }
});

const Search = () => {
    const classes = useSearchStyles()

    return (
        <React.Fragment>
            <div style={{ paddingRight: 8 }}>
                <TextField
                    id="search"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Search"
                    type="text"
                    page="main"
                />
            </div>
            <div style={{ width: '36px', height: '40px', paddingTop: 4 }} onClick={() => { }}>
                <div className={classes.button}>
                    <SearchIcon style={{ alignSelf: 'center', display: 'flex', padding: 4, fontSize: '1.75rem' }} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search
