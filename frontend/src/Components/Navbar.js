import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
    const classes = useNavbarStyles()
    const history = useHistory()

    const [clickDashboard, setClickDashboard] = useState(false);
    const [clickPengaduan, setClickPengaduan] = useState(false);
    const [clickData, setClickData] = useState(false);
    const [clickDSS, setClickDSS] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState(history.location.pathname)
    const [isAuthPages, setIsAuthPage] = useState(false)
    const [user, setUser] = useState(lodash.cloneDeep(getCurrentUser()))
    const [sekolah, setSekolah] = useState(null)
    const [allSekolah, setAllSekolah] = useState(null)

    const image3 = user?.fotoProfil != null ? require(`../../../backend/public/images/${user.fotoProfil.fileName}`) : '';

    const anchorRef = useRef(null);

    const handleToggle = () => { setOpen((prevOpen) => !prevOpen); };

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

    const onMouseEnter = () => {
        if (user?.roles === 'admin-sekolah') {
            axios.get('http://localhost:5000/sekolah').then(res => { setAllSekolah(res.data) })
        } else if (user?.roles === 'staff-dinas') {
            axios.get('http://localhost:5000/sekolah').then(res => { setSekolah(res.data.filter(item => item.createdBy === user._id)) })
        }

        if (window.innerWidth < 960) { setDropdown(false); }
        else { setDropdown(true); }
    };

    const onMouseLeave = () => {
        if (window.innerWidth < 960) { setDropdown(false); }
        else { setDropdown(false); }
    };

    const handleLogOut = () => {
        localStorage.clear()
        history.push('/')
    }

    useEffect(() => {
        setLocation(history.location.pathname)
    }, [history])

    useEffect(() => {
        if (location === '/' || location === '/sign-up' || location === '/daftar-sekolah' || location === '/daftar-sekolah' || location.includes('reset-password')) {
            setIsAuthPage(true)
        } else {
            setIsAuthPage(false)
        }

        if (location.includes("beranda")) {
            setClickData(false)
            setClickPengaduan(false)
            setClickDashboard(true)
            setClickDSS(false)
        } else if (location.includes("laporan-pengaduan")) {
            setClickData(false)
            setClickPengaduan(true)
            setClickDashboard(false)
            setClickDSS(false)
        } else if (location.includes("pengaduan")) {
            setClickData(false)
            setClickPengaduan(true)
            setClickDashboard(false)
            setClickDSS(false)
        } else if (location.includes("data")) {
            setClickData(true)
            setClickPengaduan(false)
            setClickDashboard(false)
            setClickDSS(false)
        } else if (location.includes("decision-support")) {
            setClickData(false)
            setClickPengaduan(false)
            setClickDashboard(false)
            setClickDSS(true)
        }
    }, [location])

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

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
                            {user?.fotoProfil === null ?
                                <IconButton
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <AccountCircle style={{ fontSize: 24 }} />
                                </IconButton> :
                                <div ref={anchorRef} onClick={handleToggle} style={{ justifyContent: 'center', alignContent: 'center', paddingLeft: 56 }}>
                                    <img src={image3} alt={'foto-profil'} style={{ width: '40%', height: '40%', borderRadius: '50%' }} />
                                </div>
                            }
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
