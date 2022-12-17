import React from 'react'
import { Link } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core'
import ArrowIcon from '@material-ui/icons/ArrowForwardIos';

import image from '../asset/images/breadcrumb.png'

import { FontFamily } from '../Constants/FontFamily';
import { Color } from '../Constants/Colors';

const Breadcrumb = (props) => {
    const { title, title2, subtitle, subsubtitle } = props;

    return (
        <React.Fragment>
            <Grid container>
                <Grid item container xs={12}>
                    <div style={{
                        width: '100vw',
                        height: '17vw',
                        backgroundImage: `url(${image})`,
                        overflow: 'hidden'
                    }}>
                        <Grid container style={{ padding: '6vw' }}>
                            <Grid item container xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {title &&
                                    <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 12, color: Color.neutral[0] }}>
                                        {title.toUpperCase()}
                                    </Typography>
                                }
                                {title2 && <>
                                    <div style={{ width: '20x', height: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                        <ArrowIcon style={{ color: '#797979', fontSize: 10, paddingLeft: 8, alignSelf: 'center', justifySelf: 'center' }} />
                                    </div>
                                    <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 12, color: Color.neutral[0], paddingLeft: 8 }}>
                                        {title2.toUpperCase()}
                                    </Typography>
                                </>}
                                {subtitle && <>
                                    <div style={{ width: '20x', height: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                        <ArrowIcon style={{ color: '#797979', fontSize: 10, paddingLeft: 8, alignSelf: 'center', justifySelf: 'center' }} />
                                    </div>
                                    <Link to=''>
                                        <Typography style={{ fontFamily: FontFamily.POPPINS_MEDIUM, fontSize: 12, color: Color.primary[300], paddingLeft: 8 }}>
                                            {subtitle.toUpperCase()}
                                        </Typography>
                                    </Link>
                                </>}
                            </Grid>
                            <Grid item container xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
                                <Typography style={{ fontFamily: FontFamily.POPPINS_BOLD, fontSize: 32, color: Color.neutral[0] }}>
                                    {subsubtitle.toUpperCase()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Breadcrumb
