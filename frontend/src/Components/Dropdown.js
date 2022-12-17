import React, { useState } from 'react';
import { MenuItems } from '../Constants/MenuItems';
import '../Styles/Dropdown.css';
import { Link } from 'react-router-dom';
import { useDropdownStyles } from '../Styles/DropdownStyles';

function Dropdown() {
    const classes = useDropdownStyles()

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <div
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {MenuItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <Link
                                className={classes.dropdownLink}
                                to={'/data/list-prasarana'}
                                onClick={() => setClick(false)}
                            >
                                {item.title}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Dropdown;
