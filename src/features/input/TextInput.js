import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      width: '100%',
      marginTop: theme.spacing(2)
    }
  }
}))

function TextInput({ setAnswerFx, id }) {
  const classes = useStyles()
  const [input, setInput] = useState("")
  const [QID, setQID] = useState(id)
  useEffect(() => {
    if (QID !== id) {
      setInput("")
      setQID(id)
    }
  }, [id])
  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <div>
        <TextField
          id='outlined-multiline-static'
          label='Your Answer...'
          multiline
          rows={5}
          onChange={(event) => {
            setAnswerFx(event.target.value)
            setInput(event.target.value)
          }
          }
          variant='outlined'
          value={input}
        />
      </div>
    </form>
  )
}
TextInput.propTypes = {
  setAnswerFx: PropTypes.func
}

export default TextInput