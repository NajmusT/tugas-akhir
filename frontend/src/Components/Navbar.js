import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

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
import { useNavbarStyles } from '../Styles/NavBarStyles';
import { getCurrentUser } from '../Utils';
import lodash from 'lodash'

function Navbar() {
    const user = lodash.cloneDeep(getCurrentUser())
    const classes = useNavbarStyles()
    const history = useHistory()

    let isAuthPages;

    const [clickDashboard, setClickDashboard] = useState(false);
    const [clickPengaduan, setClickPengaduan] = useState(false);
    const [clickData, setClickData] = useState(false);
    const [clickDSS, setClickDSS] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [open, setOpen] = useState(false);

    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        if (history.location.pathname.includes("beranda")) {
            setClickData(false)
            setClickPengaduan(false)
            setClickDashboard(true)
            setClickDSS(false)
        } else if (history.location.pathname.includes("laporan-pengaduan")) {
            setClickData(false)
            setClickPengaduan(true)
            setClickDashboard(false)
            setClickDSS(false)
        } else if (history.location.pathname.includes("pengaduan")) {
            setClickData(false)
            setClickPengaduan(true)
            setClickDashboard(false)
            setClickDSS(false)
        } else if (history.location.pathname.includes("data")) {
            setClickData(true)
            setClickPengaduan(false)
            setClickDashboard(false)
            setClickDSS(false)
        } else if (history.location.pathname.includes("decision-support")) {
            setClickData(false)
            setClickPengaduan(false)
            setClickDashboard(false)
            setClickDSS(true)
        }

        isAuthPages = history.location.pathname === '/' || history.location.pathname === '/sign-up' || history.location.pathname === '/daftar-sekolah' || history.location.pathname === '/daftar-sekolah' || history.location.pathname.includes('reset-password')
    }, [history.location.pathname])

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

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    const handleLogOut = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <React.Fragment>
            {!isAuthPages ?
                <Grid container xs={12}>
                    <div className={classes.navbarContainer}>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <div className={classes.navbarLogo} onClick={() => { history.push('/beranda') }} >
                                <img src={image} alt={'logo'} />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.navbarMenu}>
                                {
                                    user?.roles != 'operator' ?
                                        <>
                                            <div className={classes.navbarItem} style={{ paddingLeft: 24 }}>
                                                <div className={clickDashboard ? classes.navbarLinksActive : classes.navbarLinks} onClick={() => { history.push('/beranda') }}>
                                                    {('Beranda').toUpperCase()}
                                                </div>
                                            </div>
                                            <div
                                                className={classes.navbarItem}
                                                onMouseEnter={onMouseEnter}
                                                onMouseLeave={onMouseLeave}
                                            >
                                                <div
                                                    className={clickData ? classes.navbarLinksActive : classes.navbarLinks}
                                                >
                                                    {('Data').toUpperCase()}
                                                    <div style={{ paddingLeft: 4, paddingTop: 8, alignItems: 'center' }} >
                                                        <ExpandMoreIcon />
                                                    </div>
                                                </div>
                                                {dropdown && <Dropdown />}
                                            </div>
                                            <div className={classes.navbarItem}>
                                                {user?.roles === 'admin-sekolah' &&
                                                    <div
                                                        onClick={() => { history.push('/pengaduan') }}
                                                        className={clickPengaduan ? classes.navbarLinksActive : classes.navbarLinks}
                                                    >
                                                        {('Pengaduan').toUpperCase()}
                                                    </div>
                                                }
                                                {user?.roles === 'staff-dinas' &&
                                                    <>
                                                        <div
                                                            onClick={() => { history.push('/decision-support') }}
                                                            className={clickDSS ? classes.navbarLinksActive : classes.navbarLinks}
                                                        >
                                                            {('Decision Support').toUpperCase()}
                                                        </div>
                                                        <div
                                                            onClick={() => { history.push('/laporan-pengaduan') }}
                                                            className={clickPengaduan ? classes.navbarLinksActive : classes.navbarLinks}
                                                        >
                                                            {('Laporan Pengaduan').toUpperCase()}
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </> : <></>
                                }
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
                                                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </div>
                </Grid> : <></>}
        </React.Fragment>
    );
}

export default Navbar;
