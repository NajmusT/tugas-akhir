import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

//Other components
import Dropdown from './Dropdown';
import image from '../asset/images/dinas.png'

//Material UI
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useNavbarStyles } from '../Styles/NavbarStyles';

function Navbar() {
    const classes = useNavbarStyles()

    const [clickDashboard, setClickDashboard] = useState(false);
    const [clickPengaduan, setClickPengaduan] = useState(false);
    const [clickData, setClickData] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [isAuthPages, setIsAuthPages] = useState(false)
    const [open, setOpen] = useState(false);

    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    const handleClickDashboard = () => {
        setClickData(false)
        setClickPengaduan(false)
        setClickDashboard(true)
    }

    const handleClickPengaduan = () => {
        setClickData(false)
        setClickPengaduan(true)
        setClickDashboard(false)
    }

    const onMouseEnter = () => {
        setClickData(true)
        setClickPengaduan(false)
        setClickDashboard(false)
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        setClickData(false)
        setClickPengaduan(false)
        setClickDashboard(false)
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    return (
        <React.Fragment>
            {!isAuthPages ?
                <Grid container xs={12}>
                    <div className={classes.navbarContainer}>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <Link to='/beranda' className={classes.navbarLogo} >
                                <img src={image} alt={'logo'} />
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.navbarMenu}>
                                <div className={classes.navbarItem} style={{ paddingLeft: 24 }}>
                                    <Link to='/beranda' className={clickDashboard ? classes.navbarLinksActive : classes.navbarLinks} onClick={handleClickDashboard}>
                                        {('Beranda').toUpperCase()}
                                    </Link>
                                </div>
                                <div
                                    className={classes.navbarItem}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                >
                                    <Link
                                        className={clickData ? classes.navbarLinksActive : classes.navbarLinks}
                                    >
                                        {('Data').toUpperCase()}
                                        <div style={{ paddingLeft: 4, paddingTop: 8, alignItems: 'center' }} >
                                            <ExpandMoreIcon />
                                        </div>
                                    </Link>
                                    {dropdown && <Dropdown />}
                                </div>
                                <div className={classes.navbarItem}>
                                    {/* <Link
                                        to='/pengaduan'
                                        className={clickPengaduan ? classes.navbarLinksActive : classes.navbarLinks}
                                        onClick={handleClickPengaduan}
                                    >
                                        {('Pengaduan').toUpperCase()}
                                    </Link> */}
                                    <Link
                                        to='/decision-support'
                                        className={clickPengaduan ? classes.navbarLinksActive : classes.navbarLinks}
                                        onClick={handleClickPengaduan}
                                    >
                                        {('Decision Support').toUpperCase()}
                                    </Link>
                                    <Link
                                        to='/laporan-pengaduan'
                                        className={clickPengaduan ? classes.navbarLinksActive : classes.navbarLinks}
                                        onClick={handleClickPengaduan}
                                    >
                                        {('Laporan Pengaduan').toUpperCase()}
                                    </Link>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={1} >
                            <IconButton
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <AccountCircle style={{
                                    fontSize: 24
                                }} />
                            </IconButton>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </div>
                    {/* {renderMenu} */}
                </Grid> : null}
        </React.Fragment>
    );
}

export default Navbar;
