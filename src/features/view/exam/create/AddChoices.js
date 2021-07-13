import { Button, FormControl, FormControlLabel, FormLabel, IconButton, makeStyles, Paper, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import ModalForm from '../../../display/modal/ModalForm'


const useStyle = makeStyles((theme) => ({
     inputDiv: {
          wordSpacing: theme.spacing(1)
     },
     optionDiv: {
          width: '100%',
     },
     headOpt: {
          width: '100%',
          fontSize: '23px',
          fontFamily: 'serif',
          textAlign: 'center',

     },
     bodyOpt: {
          width: '100%',
          fontSize: '20px',
          fontFamily: 'serif',
          border: '3px groove #BBBBBB',
          borderRadius: '10px',
          margin: theme.spacing(1, 0, 1, 0),
          padding: theme.spacing(1),
          minWidth: '300px'
     },
     bodyOptError: {
          width: '100%',
          fontSize: '20px',
          fontFamily: 'serif',
          border: '3px groove #FF0000',
          borderRadius: '10px',
          margin: theme.spacing(1, 0, 1, 0),
          padding: theme.spacing(1),
          minWidth: '300px'
     }
}))

function AddChoices(props) {
     const { data, handleOnChange } = props
     const classes = useStyle()
     const id = data[0] ? (data[0]).id : ''
     const loadData = data[3] ? (data[3]).data : []
     const { showDialog, onClose } = props
     const [value, setValue] = useState('')
     const [choices, setChoices] = useState(loadData)
     const [error, setError] = useState(false)
     const [loading, setLoading] = useState(false)
     const [answer, setAnswer] = React.useState(data[4].selected);
     console.log(data)
     const handleChange = (event) => {
          setError(false)
          setAnswer(event.target.value);
          handleOnChange(event)
     };

     useEffect(() => {

     }, [choices, loading, id, data])

     const addItem = (event) => {
          if (event.key === 'Enter' || event.type === 'click') {
               event.preventDefault()
               setLoading(true)
               if (choices.filter(e => e === value).length > 0 || !value.replace(/\s/g, '').length) {
                    setError(true)
                    setLoading(false)
               }
               else {
                    choices.push(value)
                    setValue('')
                    setError(false)
               }
               setTimeout(() => {
                    setLoading(false)
               }, 500);
               return null;
          }
     }
     return (
          <ModalForm
               open={showDialog}//{showDialog}
               onClose={onClose}
               onSubmit={(event) => {
                    event.preventDefault()
                    console.log(id)
                    if (id === '2' && answer !== '') {
                         setError(false)
                         onClose()
                    }
                    else {
                         setError(true)
                    }
               }}
               btnName="Submit"
          // addOnBtn={}
          >
               <div className={classes.inputDiv} hidden={id ? id === '2' ? true : false : false}>
                    <TextField
                         style={{ display: 'absolute' }}
                         id='inputField'
                         fullWidth
                         margin="dense"
                         name="subject"
                         variant="outlined"
                         value={value}
                         error={error}
                         onChange={event => setValue(event.target.value)}
                         onKeyPress={event => addItem(event)}
                    />
                    <Fragment>
                         <Button
                              color="primary"
                              variant='contained'
                              onClick={event => addItem(event)}
                              style={{ marginRight: '10px' }}
                         >
                              Add
                              </Button>
                         <Button
                              color="primary"
                              variant='contained'
                              disabled={answer ? false : true}
                              onClick={value => {
                                   setLoading(true)
                                   const index = choices.findIndex(e => e === answer)
                                   choices.splice(index, 1)
                                   setAnswer('')
                                   setTimeout(() => {
                                        setLoading(false)
                                   }, 500);
                              }}>
                              Delete
                              </Button>
                    </Fragment>
               </div>

               <div className={classes.optionDiv} hidden={choices.length > 0 ? false : true}>

                    {/* <FormControl component="fieldset"> */}
                    <div className={classes.headOpt}>
                         {/* {choices.length === 0 ? '' : 'OPTIONS'} */}
                    </div>

                    <div className={error ? classes.bodyOptError : classes.bodyOpt}>
                         <RadioGroup
                              aria-label="option"
                              name={data[2].answerID}
                              value={answer}
                              onChange={handleChange}
                              error={true}
                         >

                              {choices.map(e => {
                                   return (
                                        <FormControlLabel
                                             key={e}
                                             value={e}
                                             control={<Radio />}
                                             label={e} />
                                   )
                              }
                              )}
                         </RadioGroup>
                    </div>
               </div>
          </ModalForm >
     )
}

export default AddChoices
