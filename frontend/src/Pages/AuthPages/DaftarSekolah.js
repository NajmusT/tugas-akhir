import React, { useState } from 'react'

//Constant
import { useAuthStyles } from '../../Styles/AuthStyles';
import EditDaftarSekolah from '../../PopUpDialog/EditDaftarSekolah';

const DaftarSekolah = () => {
    const classes = useAuthStyles()

    return (
        <div className={classes.root}>
            <EditDaftarSekolah isEditMode={false} />
        </div >
    )
}

export default DaftarSekolah