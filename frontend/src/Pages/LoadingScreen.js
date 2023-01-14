import { CircularProgress } from '@material-ui/core'
import React from 'react'

const LoadingScreen = () => {
    return (
        <div style={{ height: '100vh', width: "100vw", backgroundColor: '#FFFFFF', textAlign: 'center', zIndex: 9999 }}>
            <CircularProgress size={100} style={{ color: '#0088cc', padding: 300 }} />
        </div>
    )
}

export default LoadingScreen