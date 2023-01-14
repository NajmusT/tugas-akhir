import React, { useEffect } from 'react'
import { useLocation, withRouter } from 'react-router-dom'
import ViewListPrasarana from '../../../../Components/CustomComponents/ViewListPrasarana'

const ViewListGudang = () => {
    return (
        <ViewListPrasarana jenis={'Gudang'} />
    )
}

export default ViewListGudang