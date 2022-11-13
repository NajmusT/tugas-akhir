import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ImageIcon from '../asset/icons/Image';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButtons() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-image"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <ImageIcon fill={'#EFEFEF'} style={{ width: '7vw', height: '7vw', padding: "0px 32px" }} />
                {/* <div style={{ color: '#EFEFEF', textAlign: 'center' }}> */}
                {/* Klik untuk unggah gambar */}
                {/* </div> */}
            </label>
            <input accept="image/*" className={classes.input} id="image-upload" type="file" />
        </div>
    );
}