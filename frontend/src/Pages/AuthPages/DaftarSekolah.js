import React, { useState } from 'react'

import EditDaftarSekolah from '../../PopUpDialog/EditDaftarSekolah';

import image from "../../asset/images/sawah.png"

const DaftarSekolah = () => {

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '136%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
            <EditDaftarSekolah isEditMode={false} />
        </div >
    )
}

export default DaftarSekolah