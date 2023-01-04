import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

//Material UI
import { Grid, Typography } from '@material-ui/core'
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import image1 from '../asset/images/footer1.png'
import image2 from '../asset/images/social.png'
import whatsapp from '../asset/images/whatsapp.png'
import email from '../asset/images/email.png'

import { useBottomBarStyles } from '../Styles/BottomBarStyles'

const BottomBar = () => {
  const classes = useBottomBarStyles()
  const history = useHistory()

  let isAuthPages;

  useEffect(() => {
    isAuthPages = history.location.pathname === '/' || history.location.pathname === '/sign-up' || history.location.pathname === '/daftar-sekolah'
  }, [history.location.pathname])

  return (
    <React.Fragment>
      {!isAuthPages ?
        <Grid container>
          <Grid item container xs={12}>
            <div style={{
              width: '100vw',
              height: '12vw',
              overflow: 'hidden'
            }}>
              <img style={{ width: '100vw', height: '12vw' }} src={image1} alt={'info-tambahan'} />
            </div>
            <div style={{
              width: '100vw',
              height: '20vw',
              backgroundImage: `url(${image2})`,
              overflow: 'hidden'
            }}>
              <Grid container style={{ padding: '8vw' }}>
                <Grid item container xs={4} style={{ justifyItems: 'flex-end' }}>
                  <Grid item xs={12}>
                    <Typography className={classes.title}                  >
                      WEBSITE RESMI
                    </Typography>
                    <Grid item xs={12} style={{ paddingTop: 8 }}>
                      <Typography className={classes.bodyWebResmi}>
                        Dinas Pendidikan, Pemuda, dan Olahraga
                      </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: 8 }}>
                      <Typography className={classes.bodyWebResmi}>
                        Jl. Surotokunto No. 72, Adiarsa Timur, Kec. Karawang Timur, Karawang, Jawa Barat, 41311
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={1} />
                <Grid item container xs={3} style={{ justifyItems: 'center' }}>
                  <Grid item xs={12}>
                    <Typography className={classes.title} >
                      KONTAK KAMI
                    </Typography>
                    <Grid item xs={12} style={{ paddingTop: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={whatsapp} alt={'whatsapp'} style={{ width: '24px', height: '24px' }} />
                        <Typography className={classes.bodyKontakKami}>
                          (0267) 405215
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} style={{ paddingTop: 8 }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{ width: '24px', height: '24px' }}>
                          <img src={email} alt={'email'} style={{ width: '20px', height: '16px', padding: 2 }} />
                        </div>
                        <Typography className={classes.bodyKontakKami}>
                          disdikpora@karawangkab.go.id
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={1} />
                <Grid item container xs={3} style={{ justifyItems: 'flex-start' }}>
                  <Grid item xs={12}>
                    <Typography className={classes.title}  >
                      SOCIAL MEDIA
                    </Typography>
                    <Grid item xs={12} style={{ paddingTop: 8 }}>
                      <div style={{ display: 'flex' }}>
                        <Tooltip title='disdikporakarawang' placement='bottom'>
                          <div style={{ width: '24px', height: '24px' }}>
                            <div className={classes.sosMedContainer}>
                              <FacebookIcon style={{ alignSelf: 'center', display: 'flex', padding: 2, fontSize: 20 }} />
                            </div>
                            {/* <img src={facebook} alt={'facebook'} style={{ width: '1.5vw', height: '1.5vw', padding: 2 }} /> */}
                          </div>
                        </Tooltip>
                        <Tooltip title='dikporakrwkab' placement='bottom'>
                          <div style={{ width: '24px', height: '24px', paddingLeft: 8 }}>
                            <div className={classes.sosMedContainer}>
                              <TwitterIcon style={{ alignSelf: 'center', display: 'flex', padding: 2, fontSize: 20 }} />
                            </div>
                            {/* <img src={twitter} alt={'twitter'} style={{ width: '1.5vw', height: '1.5vw', padding: 2 }} /> */}
                          </div>
                        </Tooltip>
                        <Tooltip title='disdikporakrwkab' placement='bottom'>
                          <div style={{ width: '24px', height: '24px', paddingLeft: 8 }}>
                            <div className={classes.sosMedContainer}>
                              <InstagramIcon style={{ alignSelf: 'center', display: 'flex', padding: 2, fontSize: 20 }} />
                            </div>
                            {/* <img src={instagram} alt={'instagram'} style={{ width: '1.5vw', height: '1.5vw', padding: 2 }} /> */}
                          </div>
                        </Tooltip>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <div style={{
              width: '100vw',
              height: '8vw',
              backgroundColor: '#000000',
              overflow: 'hidden'
            }}>
              <Grid container style={{ padding: '2.5vw 8vw 2.5vw 8vw' }}>
                <Grid item container xs={3}>
                  <Typography className={classes.disdikpora}  >
                    DISDIKPORA
                  </Typography>
                </Grid>
                <Grid item container xs={2} />
                <Grid item container xs={3} style={{ alignItems: 'center', justifyItems: 'center' }}>
                  <Typography className={classes.copyright}  >
                    Copyright 2022. All Rights Reserved
                  </Typography>
                </Grid>
                <Grid item container xs={1} />
                <Grid item container xs={3} style={{ alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '20x', height: '20px' }}>
                      <ArrowIcon className={classes.icon} />
                    </div>
                    <Typography className={classes.contactUs}>
                      Contact Us
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid> : <></>
      }
    </React.Fragment>
  )
}

export default BottomBar;
