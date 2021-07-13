import {
     Button,
     Card,
     CardContent,
     Grid,
     makeStyles,
     Paper,
     TextField,
     Typography
} from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import Selector from '../../../input/Selector';
import NumSelector from '../../../input/NumSelector';
import axios from '../../../../common/axios/axios';
import Csrf from '../../../../common/axios/Csrf';
import Linear from '../../../display/loading/Linear';
// import DateTimePicker from '../../display/datetimePicker/DateTimePicker';
import TimePickers from '../../../display/timePicker/TimePickers';
import DatePickers from '../../../display/datetimePicker/datePicker/DatePickers';
import { nanoid } from 'nanoid'
import ModalForm from '../../../display/modal/ModalForm';
import AddChoices from './AddChoices';
const useStyle = makeStyles((theme) => ({
     root: {
          '& > *': {
               marginLeft: theme.spacing(1),
               width: '25ch',
          },
          fontSize: 16,
          textAlign: 'left',
     },
     paper: {
          backgroundColor: '#999999',
          padding: theme.spacing(1),
          color: '#003300',
     },
     buttons: {
          width: '100%',
          '& > *': {
               margin: theme.spacing(1),
          }
     },
     btnSpace: {
          marginRight: theme.spacing(1),
     },
     selectType: {
          width: '100%',
          // minWidth: 80
     },
     inputProps: {
          padding: 0,
          fontSize: '30px',
          height: 40,
          width: '100%',
          marginBottom: theme.spacing(2)
     },

     timerProps: {
          padding: 0,
          fontSize: '30px',
          height: 40,
          width: '33%',
          marginBottom: theme.spacing(2),
          textAlign: 'center'
     },
     validity: {
          width: '100%',
          backgroundColor: '#e6e6e6',
          padding: theme.spacing(1, 1, 2, 1),
          textAlign: 'center',
          marginBottom: theme.spacing(2)
     },
     mainCard: {
          width: '100%',
          backgroundColor: '#e6e6e6',
          marginBottom: theme.spacing(1)
     },

     cardHeader: {
          width: '100%',
          backgroundColor: '#f2f2f2',
          padding: theme.spacing(1),
          height: 430
     },
     cardContent: {
          width: '100%',
          backgroundColor: '#f2f2f2',
          marginBottom: theme.spacing(1),
     },
     inputQ: {
          width: '100%',
     },
     actContainer: {
          textAlign: 'center',
          marginTop: theme.spacing(5)
     },
     actionBtn: {
          backgroundColor: '#FFFFFF',
          marginLeft: theme.spacing(1),
     },
     content: {
          maxHeight: 430,
          overflowX: 'overlay',
          backgroundColor: 'transparent',
     },
     botAction: {
          marginTop: theme.spacing(1),
          textAlign: 'center'
     },
     btnGray: {
          backgroundColor: "#595959",
          color: '#fff',
          '&:hover': {
               background: "#333333",
          },

     },
     marginBotton: {
          padding: 200
     },

     margin: {
          marginTop: theme.spacing(0),
          marginBottom: theme.spacing(1),
          borderRadius: 50,
          border: "1px solid ",
          width: 40,
          height: 40,
          textAlign: 'center',
          paddingTop: theme.spacing(1),
     }

}))

function CreateExam() {

     var date = new Date(); // M-D-YYYY

     var d = date.getDate();
     var m = date.getMonth() + 1;
     var y = date.getFullYear();

     const curDate = `${y}-${(m <= 9 ? '0' + m : m)}-${(d <= 9 ? '0' + d : d)}`;
     const classes = useStyle()
     const [subject, setSubject] = useState([])
     const examTypeArr = ([
          {
               id: '1',
               option: 'Quiz'
          }, {
               id: '2',
               option: 'Prelim Exam'
          }, {
               id: '3',
               option: 'Midterm Exam'
          }, {
               id: '4',
               option: 'Pre-Final Exam'
          }, {
               id: '5',
               option: 'Final Exam'
          },
     ])
     const [loading, setLoading] = useState(false)
     const [content, setContent] = useState([])
     const [showError, setShowError] = useState(false)
     const [displayDuration, setDisplayDuration] = useState('1')
     const [showDialog, setShowDialog] = useState(false)
     const [choicesID, setChoicesID] = useState('')
     const [answerID, setAnswerID] = useState('')
     const [modalData, setModalData] = useState('')
     const [form, setForm] = useState({
          examID: nanoid(),
          description: '',
          subjectID: '',
          examDuration: '00:00',
          numQuestion: 0,
          fromDate: curDate,
          toDate: curDate,
          fromTime: '00:00:00',
          toTime: '00:00:00'
     })


     useEffect(() => {
          fetchData()
     }, [loading])

     const fetchData = () => {
          if (subject.length === 0) {
               Csrf.getCookie()
               axios.get('subject')
                    .then(response => {
                         setSubject(response.data)
                         setLoading(false)
                    })
                    .catch(error => console.log(error))
          }
     }


     const changeNumQuestion = event => {
          const num = event.target.value
          if (num >= 0 && num <= 100) {
               var arrQuestion = []
               var arrForm = {}
               for (let index = 1; index <= num; index++) {
                    arrQuestion.push({
                         id: index,
                         ["QuestionType" + index]: 'werwe',
                         ["Question" + index]: 'werwer',
                         ["Qtimer" + index]: '00:00:00',
                         ["option" + index]: [],
                         ["answer" + index]: 'were',
                    })
                    arrForm = {
                         ["QuestionType" + index]: 'ereee',
                         ["Question" + index]: 'rreee',
                         ["Qtimer" + index]: '00:00:00',
                         ["option" + index]: [],
                         ["answer" + index]: 'rrree',
                    }
               }
               setForm({ ...form, arrForm })
               onChangeHandler(event)
               setContent(arrQuestion)
          }
     }


     const QtypeArr = [
          { id: 1, option: 'Essay' },
          { id: 2, option: 'True/False' },
          { id: 3, option: 'Multiple Choice' },
     ];
     const onSubmit = event => {
          event.preventDefault();
          console.log(form)
     }
     const onChangeHandler = event => {
          // console.log(event.target.id + ' ' + event.target.value)
          const id = event.target.id ? event.target.id : event.target.name
          setForm({
               ...form,
               [id]: event.target.value
          })
     }
     const objEntry = (element, id) => {
          const data = Object.entries(element)
          return data[id][0];
     }

     const onBlurHandler = (event) => {
          const id = event.target.id;
          const value = event.target.value
          const fromDate = form.fromDate;
          const fromTime = form.fromTime;
          const toDate = form.toDate;
          const toTime = form.toTime;
          var duration = null;
          switch (id) {
               case 'fromDate':
                    duration = calculateDuration(value, fromTime, toDate, toTime)
                    break;
               case 'fromTime':
                    duration = calculateDuration(fromDate, value, toDate, toTime)
                    break;
               case 'toDate':
                    duration = calculateDuration(fromDate, fromTime, value, toTime)
                    break;
               case 'toTime':
                    duration = calculateDuration(fromDate, fromTime, toDate, value)
                    break;
               default:
                    duration = '00:00'
                    break;
          }
          setForm({
               ...form,
               examDuration: duration
          })
          duration === '00:00' ? setShowError(true) : setShowError(false)
          setDisplayDurationfx(duration)
     }
     const calculateDuration = (fromDate, fromTime, toDate, toTime) => {
          const s_fromDate = fromDate.split('-');
          const s_toDate = form.toDate.split('-')
          const s_fromTime = fromTime.split(':');
          const s_toTime = toTime.split(":");
          var startDate = new Date(s_fromDate[0], s_fromDate[1], s_fromDate[2], s_fromTime[0], s_fromTime[1], 0)
          var endDate = new Date(s_toDate[0], s_toDate[1], s_toDate[2], s_toTime[0], s_toTime[1], 0)

          if (endDate > startDate) {
               var diff = endDate.getTime() - startDate.getTime();
               var hours = Math.floor(diff / 1000 / 60 / 60);
               diff -= hours * 1000 * 60 * 60;
               var minutes = Math.floor(diff / 1000 / 60);

               // If using time pickers with 24 hours format, add the below line get exact hours
               if (hours < 0)
                    hours = hours + 24;

               return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
          }
          return '00:00';
     }

     const setDisplayDurationfx = (duration) => {
          const time = duration.split(':');
          const hour = parseInt(time[0])
          const mins = parseInt(time[1])
          let Durationdisplay = ''
          if ((hour > 24) || (hour === 24 && mins > 0)) {
               setForm({
                    ...form,
                    examDuration: '00:00'
               })
               setShowError(true)
               Durationdisplay = 'Invalid'
          }
          else {
               if (hour > 1) {
                    Durationdisplay += hour + ' hrs'
               }
               else if (hour === 1) {
                    Durationdisplay += hour + ' hr'
               }
               if (mins > 1) {
                    Durationdisplay += ' ' + mins + ' mins'
               }
               else if (mins === 1) {
                    Durationdisplay += ' ' + mins + ' min'
               }
               if (hour === 0 && mins === 0) {
                    Durationdisplay = 'Invalid'
               }
          }

          setDisplayDuration(Durationdisplay)
     }


     const question = (content) => {
          return (content.map(element => {
               return (
                    <Card className={classes.cardContent} key={element.id}>

                         <CardContent>
                              <Grid container spacing={1}>
                                   <Grid item xs={12} sm={9}>
                                        <TextField
                                             className={classes.inputQ}
                                             id={objEntry(element, 2)}
                                             label='Question...'
                                             multiline
                                             rows={5}
                                             variant='outlined'
                                             size="small"
                                             defaultValue={element[objEntry(element, 2)]}
                                             onChange={event => onChangeHandler(event)}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sm={3}     >

                                        <Grid container>
                                             <Grid item xs={12}>
                                                  <Selector
                                                       classes={classes}
                                                       name="Answer"
                                                       data={QtypeArr}
                                                       value='id'
                                                       label='option'
                                                       id={objEntry(element, 1)}
                                                       onChange={(event) => {
                                                            onChangeHandler(event)
                                                            const id = event.target.value

                                                            switch (id) {
                                                                 case '2':
                                                                      // console.log((objEntry(element, 4)))
                                                                      setForm({
                                                                           ...form,
                                                                           [objEntry(element, 5)]: ''
                                                                      })

                                                                      var setData = []
                                                                      setData.push(
                                                                           { id: '2' },
                                                                           { choiceID: objEntry(element, 4) },
                                                                           { answerID: objEntry(element, 5) },
                                                                           {
                                                                                data: ['TRUE', 'FALSE']
                                                                           },
                                                                           {
                                                                                selected: form[objEntry(element, 5)] ? form[objEntry(element, 5)] : ''
                                                                           }
                                                                      )
                                                                      setModalData(setData)
                                                                      setShowDialog(true)

                                                                      // setChoicesID(objEntry(element, 4))
                                                                      // setAnswerID(objEntry(element, 5))
                                                                      break;
                                                                 case '3': setForm({
                                                                      ...form,
                                                                      [objEntry(element, 5)]: ''
                                                                 })

                                                                      var setData = []
                                                                      setData.push(
                                                                           { id: '3' },
                                                                           { choiceID: objEntry(element, 4) },
                                                                           { answerID: objEntry(element, 5) },
                                                                           {
                                                                                data: []
                                                                           },
                                                                           {
                                                                                selected: form[objEntry(element, 5)] ? form[objEntry(element, 5)] : ''
                                                                           }
                                                                      )
                                                                      setModalData(setData)
                                                                      setShowDialog(true)
                                                                      break;
                                                                 default:
                                                                      setShowDialog(false)
                                                                      setForm({
                                                                           ...form,
                                                                           [objEntry(element, 4)]: []
                                                                      })
                                                                      break;
                                                            }


                                                            // if (answer === '3') {
                                                            //      setShowDialog(true)
                                                            //      setForm({
                                                            //           ...form,
                                                            //           [objEntry(element, 4)]: 'something'
                                                            //      })
                                                            //      console.log(objEntry(element, 4))
                                                            //      setChoicesID(objEntry(element, 4))
                                                            // }
                                                            // else {
                                                            //      setShowDialog(false)
                                                            // }
                                                       }
                                                       }
                                                  />
                                             </Grid>
                                             <Grid item xs={12}>
                                                  <TimePickers
                                                       id={objEntry(element, 3)}
                                                       step='300'
                                                       label='Timer'
                                                       variant='outlined'
                                                       value={form[objEntry(element, 3)] ? form[objEntry(element, 3)] : '00:00'}
                                                       onChangeDuration={onChangeHandler}
                                                  />
                                             </Grid>

                                        </Grid>

                                   </Grid>
                              </Grid>
                         </CardContent >
                    </Card >
               )
          }))
     }

     const addChoicesModal = () => {
          // console.log(choicesID)
          if (!showDialog) {
               return null
          }
          return <AddChoices
               choiceID={choicesID}
               choiceData={modalData[3] ? (modalData[3]).data : []}
               answerID={answerID}
               showDialog={showDialog}
               data={modalData}
               onClose={() => setShowDialog(false)}
               handleOnChange={onChangeHandler}

          />
     }

     return (
          <Paper className={classes.paper}>

               <Linear loading={loading} />
               <Card className={classes.mainCard} variant="outlined">

                    <CardContent>

                         <Grid container spacing={1}>

                              <Grid item xs={12} sm={4} >
                                   <Card className={classes.cardHeader} variant='outlined'>
                                        <Grid item xs={12}>
                                             {/* <TextField
                                                  className={classes.inputProps}
                                                  id="description"
                                                  label="Topic / Description"
                                                  variant="outlined"
                                                  size="small"
                                                  onChange={onChangeHandler}
                                                  required={true}
                                             /> */}
                                             <Selector
                                                  classes={classes}
                                                  name="Choose Exam"
                                                  data={examTypeArr}
                                                  value='id'
                                                  label='option'
                                                  id='ExamType'
                                                  onChange={(event) => { }}
                                             />
                                        </Grid>
                                        <Grid item xs={12}>
                                             <Selector
                                                  classes={classes}
                                                  name="Subject"
                                                  data={subject}
                                                  value='id'
                                                  label='subject'
                                                  id='subjectID'
                                                  onChange={onChangeHandler}
                                             />
                                        </Grid>
                                        <Grid item xs={12}>

                                             <Card className={classes.validity} variant="outlined" >
                                                  <Typography color='primary' variant='h5'>SCHEDULE</Typography>

                                                  <Grid container spacing={1}>
                                                       <Grid item xs={6}>
                                                            <DatePickers
                                                                 id='fromDate'
                                                                 label='FROM DATE'
                                                                 value={form.fromDate}
                                                                 onChange={onChangeHandler}
                                                                 onBlur={onBlurHandler}
                                                                 error={showError}
                                                            />
                                                       </Grid>
                                                       <Grid item xs={6}>
                                                            <TimePickers
                                                                 label="TIME"
                                                                 id="fromTime"
                                                                 value={form.fromTime}
                                                                 onChangeDuration={onChangeHandler}
                                                                 step='300'
                                                                 variant='standard'
                                                                 onBlur={onBlurHandler}
                                                                 error={showError}
                                                            />
                                                       </Grid>
                                                       <Grid item xs={6}>
                                                            <DatePickers
                                                                 id='toDate'
                                                                 label='TO DATE'
                                                                 value={form.toDate}
                                                                 onChange={onChangeHandler}
                                                                 onBlur={onBlurHandler}
                                                                 error={showError}
                                                            />
                                                       </Grid>
                                                       <Grid item xs={6}>
                                                            <TimePickers
                                                                 label="TIME"
                                                                 id="toTime"
                                                                 value={form.toTime}
                                                                 onChangeDuration={onChangeHandler}
                                                                 step='300'
                                                                 variant='standard'
                                                                 onBlur={onBlurHandler}
                                                                 error={showError}
                                                            />
                                                       </Grid>
                                                  </Grid>


                                             </Card>
                                        </Grid>
                                        <Grid item xs>
                                             <Grid container spacing={1}>

                                                  <Grid item xs={6}>
                                                       {/* <TimePickers
                                                            label="EXAM DURATION"
                                                            id="examDuration"
                                                            value={form.examDuration > 23 ? '00:00' : form.examDuration}
                                                            onChangeDuration={onChangeHandler}
                                                            step='300'
                                                            variant='outlined'
                                                            disabled={true}
                                                       /> */}
                                                       <TextField
                                                            value={displayDuration}
                                                            label='Duration'
                                                            disabled={false}
                                                            variant='outlined'
                                                            inputProps={{
                                                                 style: { textAlign: 'center' }
                                                            }}
                                                            onKeyDown={() => { }}
                                                       />
                                                  </Grid>
                                                  <Grid item xs={6} >
                                                       <NumSelector
                                                            label='NO. OF QUESTION'
                                                            id="numQuestion"
                                                            value={form.numQuestion ? form.numQuestion : 0}
                                                            onChange={changeNumQuestion}
                                                            disable={displayDuration === ' ' || displayDuration === 'Invalid' ? true : false}
                                                       />
                                                  </Grid>
                                             </Grid>
                                        </Grid>
                                   </Card>
                              </Grid>

                              <Grid item xs={12} sm={8}>

                                   <div className={classes.content}>
                                        <form id="QuestionForm" onSubmit={event => onSubmit(event)}>

                                             {question(content)}
                                        </form>
                                   </div>
                              </Grid>

                         </Grid>
                    </CardContent>
               </Card>

               <Grid container>
                    <Grid item xs={12} className={classes.botAction}>

                         <Button
                              form="QuestionForm"
                              type="submit"
                              className={classes.btnGray}
                              disabled={form.numQuestion === 0 || form.numQuestion === '' ? true : false}
                         >
                              Submit
                         </Button>
                    </Grid>
               </Grid>
               <Fragment>
                    {addChoicesModal()}
               </Fragment>
          </Paper >
     )
}

export default CreateExam
