import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { MenuItems } from '../Constants/MenuItems';

import '../Styles/Dropdown.css';
import { useDropdownStyles } from '../Styles/DropdownStyles';

const Dropdown = (props) => {
    const history = useHistory()
    const classes = useDropdownStyles()

    const { sekolah } = props

    useEffect(() => { console.log(sekolah) }, [sekolah])

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
                                history.push(`/data/list-prasarana/${item.path}/${sekolah !== null && sekolah._id}`)
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
