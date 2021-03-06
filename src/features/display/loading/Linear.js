import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
     root: {
          width: '100%',
     },
}));

function Linear({ loading }) {
     const classes = useStyles();

     return (
          <div className={classes.root}>
               <LinearProgress hidden={!loading} />
          </div>
     );
}
export default Linear