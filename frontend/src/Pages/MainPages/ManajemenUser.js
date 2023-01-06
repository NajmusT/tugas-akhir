import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../../Components/Breadcrumb'
import CustomDataTable from '../../Components/DataTable'
import CustomTextField from '../../Components/TextField'

import CustomIconButton from '../../Components/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import { getCurrentUser } from '../../Utils'
import Button from '../../Components/Button'
import moment from 'moment'

const ManajemenUser = () => {
    const [allUser, setAllUser] = useState(null)
    const [rows, setRows] = useState(null)

    const columns = [
        { id: 'id', label: 'ID', minWidth: 32, align: 'center' },
        { id: 'nama', label: 'Nama', minWidth: 120, align: 'center' },
        {
            id: 'email',
            label: 'Email',
            minWidth: 120,
            align: 'center'
        },
        {
            id: 'role',
            label: 'Role',
            minWidth: 120,
            align: 'center'
        },
        {
            id: 'tanggal',
            label: 'Tanggal',
            minWidth: 200,
            align: 'center'
        },
        {
            id: 'aksi',
            label: 'Aksi',
            minWidth: 120,
            align: 'center'
        }
    ]

    const createData = (id, nama, email, role, tanggal, aksi) => {
        return { id, nama, email, role, tanggal, aksi }
    }

    useEffect(() => {
        axios.get('http://localhost:5000/user').then(res => {
            setAllUser(res.data)
        })
    }, [])

    const handleDelete = () => {
        console.log("User ditolak")
    }

    const handleAccept = () => {
        console.log("User diterima")
    }

    useEffect(() => {
        if (allUser != null) {
            setRows([allUser?.filter(user => user._id != getCurrentUser._id).map(usr =>
                createData(usr._id, usr.name, usr.email, usr.roles, moment(usr.createdAt).format("ddd, d MMMM YYYY, h:mm a"), (<>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div >
                            <Button
                                variant="contained"
                                buttonText={"Terima"}
                                page='main'
                                buttonType='primary'
                                onClick={handleAccept}
                            />
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                            <Button
                                variant="contained"
                                buttonText={"Tolak"}
                                page='main'
                                buttonType='danger'
                                onClick={handleDelete}
                            />
                        </div>
                    </div>
                </>))
            )
            ])
        }
    }, [allUser])

    return (
        <React.Fragment>
            <Breadcrumb
                subsubtitle={'Manajemen User'}
            />
            <Grid container style={{ backgroundColor: '#F9F9F9', paddingBottom: 36 }}>
                <Grid item container xs={12} style={{ padding: '2vw 2vw 0vw 2vw' }}>
                    <Typography style={{
                        fontFamily: FontFamily.POPPINS_SEMI_BOLD, fontSize: 24, color: Color.neutral[400]
                    }}>
                        {'Kabupaten Karawang'}
                    </Typography>
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw', justifyContent: 'flex-end' }}>
                    <div style={{ paddingRight: 8 }}>
                        <CustomTextField
                            id="search"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                            label="Search"
                            type="text"
                            page="main"
                        />
                    </div>
                    <div style={{ paddingRight: 8 }}>
                        <CustomIconButton
                            icon={<SearchIcon />}
                        />
                    </div>
                </Grid>
                <Grid item container xs={12} style={{ paddingTop: 32, paddingLeft: '2vw', paddingRight: '2vw' }}>
                    <CustomDataTable columns={columns} rows={rows} />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default ManajemenUser
