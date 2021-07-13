import React, { forwardRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setLogin } from '../timer/timerSlice'
import { NavLink } from 'react-router-dom';
import authenticateUser from '../../common/axios/authentication'
import data from '../../common/axios/data';

const useStyles = makeStyles((theme) => ({
     root: {
          backgroundColor: '#BBBBBB',
          [theme.breakpoints.up('md')]: {
               marginTop: '5%',
               minWidth: 350,
               maxWidth: 400,
               height: 350,
               maxHeight: 350,
               alignItems: 'center',
               textAlign: 'center',
               marginLeft: 200,
          },
          [theme.breakpoints.down('xs')]: {
               marginTop: '5%',
               minWidth: 350,
               maxWidth: 400,
               height: 350,
               maxHeight: 350,
               alignItems: 'center',
               textAlign: 'center',
               marginRight: 'auto',
               marginLeft: 'auto',
          },
     },
     bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
     },
     pos: {
          marginTop: 10,
     },
     action: {
          minWidth: 220,
     },
     main: {
          backgroundColor: 'transparent',
     }
}));

const CustomRouterLink = forwardRef((props, ref) => (
     <div ref={ref} style={{ flexGrow: 1 }}>
          <NavLink {...props} />
     </div>
));
function Login() {
     const classes = useStyles();
     const dispatch = useDispatch();

     return (
          <Grid container>
               <Grid item xs={12} className={classes.main}>
                    <Card className={classes.root} variant="outlined">
                         <CardContent>
                              <Typography
                                   variant="h4"
                                   color="primary"
                                   gutterBottom>
                                   ADMIN LOGIN
                    </Typography>

                              <Typography
                                   className={classes.pos}
                                   color="textSecondary">
                                   User
                    </Typography>

                              <TextField
                                   variant="outlined" />

                              <Typography
                                   className={classes.pos}
                                   color="textSecondary">
                                   Password
                    </Typography>
                              <TextField
                                   variant="outlined"
                                   type="password" />
                         </CardContent>

                         <Button
                              className={classes.action}
                              size="large"
                              color='primary'
                              variant='outlined'
                              onClick={() => {
                                   authenticateUser.login(data)
                                   dispatch(setLogin())
                              }
                              }
                         >Submit</Button>

                    </Card>
               </Grid >
          </Grid >

     );
}

export default Login