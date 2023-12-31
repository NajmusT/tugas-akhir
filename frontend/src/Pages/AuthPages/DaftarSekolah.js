import React, { useEffect, useState } from 'react'

import EditDaftarSekolah from '../../PopUpDialog/EditDaftarSekolah';

import image from "../../asset/images/Auth.png"
import LoadingScreen from '../LoadingScreen';
import axios from 'axios';

const DaftarSekolah = () => {
    const user = JSON.parse(localStorage.getItem('user'))?.payload

    const isAdminSekolah = user?.roles === 'admin-sekolah'
    const [jumlahSekolah, setJumlahSekolah] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkJumlahSekolah = async () => {
        await axios.get('http://localhost:5000/sekolah').then((res) => setJumlahSekolah(res.data.filter(item => item.createdBy === user._id).length))
    }

    useEffect(() => {
        checkJumlahSekolah()
    }, [])

    useEffect(() => {
        if (isAdminSekolah && jumlahSekolah === 0) { setTimeout(() => setLoading(false), 2000) }
        else { setLoading(true) }
    }, [jumlahSekolah])

    return (
        <React.Fragment>
            {
                !loading ?
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
                    </div > :
                    <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default DaftarSekolah