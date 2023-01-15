import React from 'react'

//Material UI
import { Grid } from '@material-ui/core'

import image from '../../asset/images/dashboard.png'
import LoadingScreen from '../LoadingScreen'
import Wrapper from '../../Components/Wrapper'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'))?.payload
    const isAllowed = user.roles === 'staff-dinas' || user.roles === 'admin-sekolah'

    return (
        <React.Fragment>
            {isAllowed ?
                <Wrapper children={
                    <Grid container>
                        <Grid item container>
                            <div style={{
                                width: '100vw',
                                height: '48vw',
                                overflow: 'hidden'
                            }}>
                                <img style={{ width: '100vw', height: '48vw' }} src={image} alt={'slider'} />
                            </div>
                        </Grid>
                    </Grid>
                } /> : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default Dashboard