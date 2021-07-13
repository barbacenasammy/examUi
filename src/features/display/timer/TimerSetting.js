import { TextField } from '@material-ui/core';
import React from 'react'

function TimerSetting(props) {
     const { value, onChangeHandler, onBlurHandler, id, style, size } = props
     return (
          <div>
               <TextField
                    value={value}
                    id={id}
                    size={size}
                    type='number'
                    inputProps={style ? { style: { textAlign: 'center', fontSize: '30px' } } : { style: { textAlign: 'center' } }}
                    variant="outlined"
                    onChange={event => onChangeHandler(event)}
                    onBlur={() => onBlurHandler(id)}
               />
          </div>
     )
}

export default TimerSetting
