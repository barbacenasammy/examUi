import React, { useEffect, useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  }
}))

function RadioBtn({ setAnswerFx, id }) {
  const classes = useStyle()
  const [value, setValue] = useState('')
  const [Qid, setQid] = useState(id)

  const handleChange = event => {
    setValue(event.target.value)
    setAnswerFx(event.target.value);
  }
  useEffect(() => {
    if (Qid !== id) {
      setValue('')
      setQid(id)
    }

  }, [id])

  return (
    <div className={classes.root}>
      <FormControl component='fieldset'>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel
            value='true'
            control={<Radio color='primary' />}
            label='True'
          />
          <FormControlLabel
            value='false'
            control={<Radio color='primary' />}
            label='False'
          />

          {/* <FormControlLabel
            value='other'
            control={<Radio color='primary' />}
            label='Other'
          />
          <FormControlLabel
          value='disabled'
          disabled
          control={<Radio />}
          label='(Disabled option)'
        /> */}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

RadioBtn.propTypes = {
  setAnswerFx: PropTypes.func
}

export default RadioBtn
