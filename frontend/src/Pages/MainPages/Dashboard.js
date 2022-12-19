import React, { useEffect } from 'react'
import axios from 'axios'

//Material UI
import { Grid } from '@material-ui/core'

import image from '../../asset/images/dashboard.png'

const Dashboard = () => {
    useEffect(() => {
        let data = axios.get('http://localhost:5000/user/current')
        console.log(data)
    }, [])

    return (
        <React.Fragment>
            <div>
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
            </div>
        </React.Fragment>
    )
}

export default Dashboard