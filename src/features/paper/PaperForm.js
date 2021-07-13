import React, { useEffect, useState } from 'react'
import { Card, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { selectCount } from '../timer/timerSlice'
import { useSelector } from 'react-redux'
import RadioBtn from '../input/RadioBtn'
import TextInput from '../input/TextInput'
import NextBtn from '../input/NextBtn'
import data from '../../common/axios/data'
import Client from '../client/Client'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: '#d9dbdb',
    fontSize: 20,
    marginBottom: 30,
    [theme.breakpoints.up('md')]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 5,
      marginRight: 5
    },
  },
  topspace: {
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(10),
  }
}))

function PaperForm() {
  const classes = useStyles()
  const timer = useSelector(selectCount)
  const filtered = data.filter((e) => { return e.id === timer.Q_id })[0]
  const [answer, setAnswer] = useState(timer.answer)
  const [id, setId] = useState(timer.Q_id)

  useEffect(() => {
    if (id !== timer.Q_id) {
      setAnswer("")
      setId(timer.Q_id)
    }
    console.log(answer)
  }, [answer, timer.Q_id])
  return (
    <div className={classes.root}>
      {timer.runTimer ? (
        <div>
          <Grid item xs={12} >
            <Card className={classes.paper} >
              {filtered.question}
              {filtered.type === 'essay' ?
                <TextInput
                  setAnswerFx={(asnArr) => setAnswer(asnArr)}
                  id={timer.Q_id}
                /> :
                <RadioBtn
                  setAnswerFx={(asnArr) => setAnswer(asnArr)}
                  id={timer.Q_id}
                />}
            </Card>
          </Grid >
          <div>
            <NextBtn disabler={answer === "" ? true : false} />
          </div>
        </div>) : (<Client />)}

    </div>
  )
}

export default PaperForm
