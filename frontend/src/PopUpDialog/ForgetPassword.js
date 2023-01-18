import { Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import FormDialog from '../Components/CustomComponents/FormDialog'
import TextField from '../Components/ReusableComponent/TextField'

import { FontFamily } from '../Constants/FontFamily'
import ConfirmDialog from '../Components/ReusableComponent/ConfirmationDialog'
import { LoginContext } from '../Pages/AuthPages/Login'


const ForgetPassword = (props) => {
    const { open, handleClose } = props
    const [email, setEmail] = useState(null)
    const [errors, setError] = useState(null)

    const { setOpenSuccessModal } = useContext(LoginContext)

    const handleChangeMail = (e) => {
        setError(null)
        setEmail(e.target.value)
    }

    const sendMail = (e) => {
        e.preventDefault()
        if (email === null) {
            setError('Email tidak boleh kosong')
        } else {
            axios.post('http://localhost:5000/user/forget-password', { email: email })
                .then(response => {
                    if (response.data === 'Email tidak terdaftar didalam sistem') {
                        setError(response.data)
                    } else if (response.data === 'Email telah terkirim') {
                        setError(null)
                        setOpenSuccessModal(true)
                        handleClose()
                    }
                })
                .catch(error => {
                    setError(error.response.data)
                })
        }
    }

    useEffect(() => {
        setError(null)
    }, [open])


    return (
        <FormDialog
            open={open}
            handleClose={handleClose}
            title="Lupa Password"
            contentText="Masukkan alamat email akun anda untuk proses verifikasi. Kami akan mengirimkan link untuk reset password melalui email."
            buttonText="Request Reset Password"
            inputForm={
                <TextField
                    id='email'
                    margin='normal'
                    fullWidth
                    variant='standard'
                    page='auth'
                    type='email'
                    label="Alamat Email"
                    onChange={handleChangeMail}
                />
            }
            link={
                <Typography style={{ fontFamily: FontFamily.POPPINS_REGULAR, fontSize: 12, color: '#A1A1A1' }} onClick={sendMail}>
                    {"Belum mendapatkan email? Kirim ulang"}
                </Typography>
            }
            handleClick={sendMail}
            message={
                errors != null ?
                    <Typography style={{ textAlign: 'right', fontFamily: FontFamily.POPPINS_ITALIC, fontSize: 12, color: '#E76060' }}>
                        {errors}
                    </Typography> : <></>
            }
        />
    )
}

export default ForgetPassword
