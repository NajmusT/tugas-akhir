import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import { FontFamily } from '../../Constants/FontFamily'
import { Color } from '../../Constants/Colors'

import Breadcrumb from '../../Components/Breadcrumb'
import CustomDataTable from '../../Components/DataTable'
import CustomTextField from '../../Components/TextField'

import CustomIconButton from '../../Components/IconButton'
import SearchIcon from '@material-ui/icons/Search';

const ManajemenUser = () => {
    const columns = [
        { id: 'id', label: 'ID', minWidth: 32 },
        { id: 'nama', label: 'Nama', minWidth: 120 },
        {
            id: 'email',
            label: 'Email',
            minWidth: 120,
        },
        {
            id: 'role',
            label: 'Role',
            minWidth: 120
        },
        {
            id: 'tanggal',
            label: 'Tanggal',
            minWidth: 200
        },
        {
            id: 'aksi',
            label: 'Aksi',
            minWidth: 120
        }
    ]

    const rows = []

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