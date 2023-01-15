import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { MenuItems } from '../../Constants/MenuItems';

import { useDropdownStyles } from '../../Styles/DropdownStyles';
import '../../Styles/Dropdown.css';
import { WrapperContext } from '../Wrapper';

const Dropdown = (props) => {
    const { sekolah, userRole } = props
    const {
        setOpenDialogPilihSekolah
    } = useContext(WrapperContext)

    const history = useHistory()
    const classes = useDropdownStyles()

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <div
            onClick={handleClick}
            className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
            {MenuItems.map((item, index) => {
                return (
                    <div key={index}>
                        <div
                            className={classes.dropdownLink}
                            onClick={() => {
                                if (userRole === 'admin-sekolah') { history.push(`/data/list-prasarana/${item.path}/${sekolah}`) }
                                else if (userRole === 'staff-dinas') { setOpenDialogPilihSekolah(true) }

                                setClick(false)
                            }}
                        >
                            {item.title}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Dropdown;
