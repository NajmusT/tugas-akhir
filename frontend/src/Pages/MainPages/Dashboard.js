import React from 'react'

//Material UI
import { Grid } from '@material-ui/core'

import image from '../../asset/images/6c4079f6b41b5775f5de6087c05be068.jpg'
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
                                height: '36vw',
                                overflow: 'hidden'
                            }}>
                                <img style={{ width: '100vw', height: '36vw' }} src={image} alt={'slider'} />
                            </div>
                        </Grid>
                    </Grid>
                } /> : <LoadingScreen />
            }
        </React.Fragment>
    )
}

export default Dashboard