import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
     container: {
          display: 'flex',
          flexWrap: 'wrap',
     },
     textField: {
          width: '100%',
     },
}));

export default function DatePickers(props) {
     const { id,
          label,
          value,
          onChange,
          onBlur,
          error } = props
     const classes = useStyles();

     return (
          <TextField
               id={id}
               label={label}
               type="date"
               value={value}
               format="yyyy/MM/dd"
               onChange={onChange}
               className={classes.textField}
               onBlur={onBlur ? onBlur : null}
               error={error ? error : false}
          />
     );
}
