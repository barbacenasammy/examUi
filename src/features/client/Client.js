import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
     Card,
     CardContent,
     Button,
     TextField
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setTimer } from '../timer/timerSlice'

const useStyles = makeStyles({
     root: {
          minWidth: 300,
          height: 250,
          width: 300,
          maxHeight: 250,
          marginRight: 'auto',
          marginLeft: 'auto',
          textAlign: 'center',
     },
     bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
     },
     pos: {
          marginTop: 10,
          marginBottom: 10,
     },
     action: {
          marginRight: 8,
     }
});

function Client() {
     const classes = useStyles();
     const dispatch = useDispatch()

     return (
          <Card className={classes.root} variant="outlined">
               <CardContent>
                    <TextField
                         className={classes.pos}
                         label="Full Name"
                         variant="outlined" />

                    {/* <Selector /> */}

               </CardContent>

               <Button size="large"
                    color='primary'
                    variant='outlined'
                    onClick={() => dispatch(setTimer())}
               >Submit</Button>

          </Card>
     );
}

export default Client