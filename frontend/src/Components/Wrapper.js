import React, { Children, useEffect, useState } from 'react'
import LoadingScreen from '../Pages/LoadingScreen'

import BottomBar from './ReusableComponent/BottomBar'
import Navbar from './ReusableComponent/Navbar'

const Wrapper = (props) => {
    const { children } = props
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { setTimeout(() => setIsLoading(false), 2000) }, [])
    return (
        <React.Fragment>
            {!isLoading ?
                <React.Fragment>
                    <Navbar />
                    {children}
                    <BottomBar />
                </React.Fragment> :
                <LoadingScreen />}
        </React.Fragment>
    )
}

export default Wrapper
