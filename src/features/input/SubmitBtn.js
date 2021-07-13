import { Button, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setTimer, stopTimer, selectCount } from '../timer/timerSlice'
import { useSelector } from 'react-redux'

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: 10,
    marginBottom: 10,
  }
}))

function SubmitBtn() {
  const dispatch = useDispatch()
  const classes = useStyle()
  const timer = useSelector(selectCount)
  useEffect(() => {
  }, [timer.runTimer])
  return (
    <div className={classes.root} hidden={!timer.runTimer}>
      <Button
        variant='contained'
        size='large'
        color='primary'
        onClick={() =>
          timer.runTimer ? dispatch(stopTimer()) : dispatch(setTimer())
        }
      >
        Submit
      </Button>
    </div>
  )
}

export default SubmitBtn
