import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

import { getCurrentUser } from '../../Utils'

import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../../Components/Breadcrumb'
import CustomDataTable from '../../Components/DataTable'
import Button from '../../Components/Button'

import ConfirmationDialog from '../../Components/ConfirmationDialog'
import SuccessIcon from '@material-ui/icons/CheckCircleOutline';
import WarningIcon from '@material-ui/icons/ErrorOutline';
import TerimaAkun from '../../PopUpDialog/TerimaAkun'
import Select from '../../Components/Select'
import { useHistory } from 'react-router-dom'
import Search from '../../Components/Search'

const ManajemenUser = () => {
    const [allUser, setAllUser] = useState(null)
    const [rows, setRows] = useState(null)
    const [openTerimaModalNotif, setopenTerimaModalNotif] = useState(false)
    const [openTolakModalNotif, setopenTolakModalNotif] = useState(false)
    const [openTolakModal, setopenTolakModal] = useState(false)
    const [openTerimaModal, setopenTerimaModal] = useState(false)
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)

    const history = useHistory()

    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    const columns = [
        { id: 'id', label: 'ID', minWidth: 32, align: 'center' },
        { id: 'nama', label: 'Nama', minWidth: 120, align: 'center' },
        { id: 'email', label: 'Email', minWidth: 120, align: 'center' },
        { id: 'role', label: 'Role', minWidth: 120, align: 'center' },
        { id: 'tanggal', label: 'Tanggal', minWidth: 200, align: 'center' },
        { id: 'aksi', label: 'Aksi', minWidth: 120, align: 'center' }
    ]

    const createData = (id, nama, email, role, tanggal, aksi) => {
        return { id, nama, email, role, tanggal, aksi }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/user').then(res => { setAllUser(res.data) })
    }, [])

    const handleDelete = (e) => {
        e.preventDefault()

        const data = {
            email: user.email,
            message: `Dear ${user.name}.\n\n Data pendaftaran akun anda ditolak karena tidak memenuhi ketentuan sistem.\n\nApabila anda merasa anda layak untuk terdaftar di dalam sistem, silahkan daftar ulang kembali. Terima kasih`
        }

        axios.delete(`http://localhost:5000/user/delete/${user._id}`).then(res => console.log(res.data))
        axios.post(`http://localhost:5000/user/sendKonfirmasi`, data).then(res => console.log(res.data))

        setopenTolakModal(false)
        setopenTolakModalNotif(true)
    }

    const handleAccept = (e) => {
        e.preventDefault()

        const data = {
            isActive: true,
            roles: role
        }

        const dataEmail = {
            email: user.email,
            message: `Dear ${user.name}.\n\nData pendaftaran akun anda telah diterima.\n\nSilahkan login ke dalam sistem. Terima kasih`
        }

        axios.put(`http://localhost:5000/user/update/${user._id}`, data).then(res => console.log(res.data))
        axios.post(`http://localhost:5000/user/sendKonfirmasi`, dataEmail).then(res => console.log(res.data))

        setopenTerimaModal(false)
        setopenTerimaModalNotif(true)
    }

    const TerimaModalNotif = () => {
        return (
            <ConfirmationDialog
                title={'Terima Permintaan Daftar Akun Berhasil'}
                subtitle={'Sistem telah memperbaharui data user dalam database'}
                open={openTerimaModalNotif}
                handleClose={() => {
                    setopenTerimaModalNotif(false)
                    window.location.reload(false)
                }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const TolakModalNotif = () => {
        return (
            <ConfirmationDialog
                title={'Tolak Permintaan Daftar Akun Berhasil'}
                subtitle={'Sistem telah memperbaharui data user dalam database'}
                open={openTolakModalNotif}
                handleClose={() => {
                    setopenTolakModalNotif(false)
                    window.location.reload(false)
                }}
                icon={<SuccessIcon style={{ color: '#45DE0F', fontSize: '8rem' }} />}
            />
        )
    }

    const TerimaModal = () => {
        return (
            <TerimaAkun
                title={'Terima Permintaan Daftar Akun'}
                subtitle={'Atur role dari akun dibawah ini, kemudian click simpan'}
                open={openTerimaModal}
                handleClose={() => { setopenTerimaModal(false) }}
                dialogAction={
                    <Button
                        variant="contained"
                        buttonText={"Simpan"}
                        page='main'
                        buttonType='primary'
                        onClick={handleAccept}
                    />
                }
                user={user}
                inputControl={
                    <Select
                        id={"jenis"}
                        margin={"dense"}
                        fullWidth
                        label={"Jenis"}
                        variant={"standard"}
                        page={"main"}
                        value={role}
                        onChange={handleChangeRole}
                        option={['admin-sekolah', 'staff-dinas']}
                    />
                }
            />
        )
    }

    const TolakModal = () => {
        return (
            <ConfirmationDialog
                title={'Dialog Konfirmasi Tolak'}
                subtitle={'Apakah anda yakin ingin menolak pendaftaran akun ini?'}
                open={openTolakModal}
                handleClose={() => { setopenTolakModal(false) }}
                icon={<WarningIcon style={{ color: '#EE3F3F', fontSize: '8rem' }} />}
                dialogAction={
                    <div style={{ display: 'flex' }}>
                        <div >
                            <Button
                                variant="contained"
                                buttonText={"Ya"}
                                page='main'
                                buttonType='primary'
                                onClick={handleDelete}
                            />
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                            <Button
                                variant="contained"
                                buttonText={"Tidak"}
                                page='main'
                                buttonType='danger'
                                onClick={() => { setopenTolakModal(false) }}
                            />
                        </div>
                    </div>
                }
            />
        )
    }

    useEffect(() => {
        if (allUser != null) {
            setRows(allUser?.filter(user => user._id != getCurrentUser()?._id && user.isActive === false).map(usr =>
                createData(usr._id, usr.name, usr.email, usr.roles, moment(usr.createdAt).format("ddd, d MMMM YYYY"), (<>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div >
                            <Button
                                variant="contained"
                                buttonText={"Terima"}
                                page='main'
                                buttonType='primary'
                                onClick={() => {
                                    setUser(usr)
                                    setopenTerimaModal(true)
                                }}
                            />
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                            <Button
                                variant="contained"
                                buttonText={"Tolak"}
                                page='main'
                                buttonType='danger'
                                onClick={() => {
                                    setUser(usr)
                                    setopenTolakModal(true)
                                }}
                            />
                        </div>
                    </div>
                </>))
            ))
        }
    }, [allUser, setAllUser])

    return (
        <React.Fragment>
            {openTerimaModalNotif && TerimaModalNotif()}
            {openTolakModalNotif && TolakModalNotif()}
            {openTolakModal && TolakModal()}
            {openTerimaModal && TerimaModal()}

            <Breadcrumb subsubtitle={'Manajemen User'} />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{ fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400] }}>
                        {'Pengajuan Daftar Akun'}
                    </Typography>
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Search />
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <CustomDataTable columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default ManajemenUser
