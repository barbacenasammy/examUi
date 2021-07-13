import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
     textField: {
          width: '100%'
     },
}));

export default function TimePickers(props) {
     const { id,
          value,
          onChangeDuration,
          step,
          label,
          variant,
          onBlur,
          disabled,
          error } = props
     const classes = useStyles();
     return (
          <TextField
               id={id}
               size="medium"
               type="time"
               label={label}
               value={value}
               className={classes.textField}
               variant={variant}
               inputProps={{
                    step: step, // 5 min
                    style: {
                         textAlign: 'center'
                    }
               }}
               onChange={onChangeDuration}
               onBlur={onBlur ? onBlur : null}
               disabled={disabled ? disabled : false}
               error={error ? error : false}
          />
     );
}
