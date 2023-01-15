import React, { createContext, useEffect, useState } from 'react'

import LoadingScreen from '../Pages/LoadingScreen'
import PilihSekolah from '../PopUpDialog/PilihSekolah'
import BottomBar from './ReusableComponent/BottomBar'
import Navbar from './ReusableComponent/Navbar'

export const WrapperContext = createContext()

const Wrapper = (props) => {
    const { children } = props

    const [isLoading, setIsLoading] = useState(true)
    const [openDialogPilihSekolah, setOpenDialogPilihSekolah] = useState(false)
    const [location, setLocation] = useState(null)

    useEffect(() => { setTimeout(() => setIsLoading(false), 2000) }, [])

    const WrapperValue = {
        openDialogPilihSekolah,
        setOpenDialogPilihSekolah,
        location,
        setLocation
    }

    return (
        <WrapperContext.Provider value={WrapperValue} >
            <React.Fragment>
                {!isLoading ?
                    <React.Fragment>
                        <React.Fragment>
                            {openDialogPilihSekolah && <PilihSekolah open={openDialogPilihSekolah} handleClose={() => setOpenDialogPilihSekolah(false)} location={location} />}
                            <Navbar />
                            {children}
                            <BottomBar />
                        </React.Fragment>
                    </React.Fragment> :
                    <LoadingScreen />
                }
            </React.Fragment>
        </WrapperContext.Provider>
    )
}

export default Wrapper
