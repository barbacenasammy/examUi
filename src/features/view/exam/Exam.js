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
import React, { useEffect, useState } from 'react'
import Selector from '../../input/Selector';
import NumSelector from '../../input/NumSelector';
import axios from '../../../common/axios/axios';
import Csrf from '../../../common/axios/Csrf';
import Linear from '../../display/loading/Linear';
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
     },
     cardHeader: {
          width: '100%',
          backgroundColor: '#e6e6e6',
          marginBottom: theme.spacing(1)
     },
     cardContent: {
          width: '100%',
          backgroundColor: '#e6e6e6',
     },
     inputQ: {
          width: '100%',
     },
     actContainer: {
          textAlign: 'center'
     },
     actionBtn: {
          backgroundColor: '#FFFFFF',
          marginLeft: theme.spacing(1),
     },
     content: {
          maxHeight: 380,
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
          marginLeft: theme.spacing(2),
          marginTop: theme.spacing(0),
          marginBottom: theme.spacing(-1),
          borderRadius: 50,
          border: "1px solid ",
          width: 40,
          height: 40,
          textAlign: 'center',
          paddingTop: theme.spacing(1),
     }

}))

function Exam() {
     const classes = useStyle()
     const [value, setValue] = useState(0)
     const [subject, setSubject] = useState([])
     const [loading, setLoading] = useState(false)
     const [content, setContent] = useState([])
     const [form, setForm] = useState({})
     const [subjectID, setSubjectID] = useState()
     const [description, setDescription] = useState('')


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


     const handleValue = event => {
          if (event < 1) {
               setValue('')
          } else {
               setValue(event)
               var arrQuestion = []
               var arrForm = {}
               for (let index = 1; index <= event; index++) {
                    arrQuestion.push({
                         id: index,
                         ["selectType" + index]: '',
                         ["inputType" + index]: ''
                    })
                    arrForm = {
                         ["selectType" + index]: '',
                         ["inputType" + index]: ''
                    }
               }
               setForm(arrForm)
               setContent(arrQuestion)
          }
     }


     const QtypeArr = [
          { id: 1, option: 'True/False' },
          { id: 2, option: 'Essay' },
          { id: 3, option: 'Multiple Choice' },
     ];
     const onSubmit = event => {
          event.preventDefault();
          console.log(value)
          console.log(description)
          console.log(subjectID)
          console.log(form)
     }
     const onChangeHandler = event => {
          setForm({
               ...form,
               [event.target.id]: event.target.value
          })
     }
     const objEntry = (element, id) => {
          const data = Object.entries(element)
          return data[id][0];
     }

     const question = (content) => {
          return (content.map(element => {
               return (
                    <Card className={classes.cardContent} variant="outlined" key={element.id}>

                         <CardContent>

                              <Grid container spacing={1} >
                                   <Grid item xs={2} sm={1} alignContent='stretch'>
                                        <Typography className={classes.margin}>
                                             {element.id}
                                        </Typography>
                                   </Grid>

                                   <Grid item xs={10} sm={2} >
                                        <Selector
                                             classes={classes}
                                             name="Type of Question"
                                             data={QtypeArr}
                                             value='id'
                                             label='option'
                                             id={objEntry(element, 1)}
                                             onChange={onChangeHandler}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sm={9}>
                                        <TextField
                                             className={classes.inputQ}
                                             id={objEntry(element, 2)}
                                             label='Question...'
                                             multiline
                                             rows={3}
                                             variant='outlined'
                                             size="small"
                                             defaultValue={element[objEntry(element, 2)]}
                                             onChange={event => onChangeHandler(event)}
                                        />
                                   </Grid>

                                   {/*                                    
                                   <Grid item xs={6} sm={2}>
                                   <Selector classes={classes} name="Answer" data={ansArr} />
                              </Grid> */}

                              </Grid>
                         </CardContent>
                    </Card >
               )
          }))
     }
     return (
          <Paper className={classes.paper}>

               <Linear loading={loading} />
               <Card className={classes.cardHeader} variant="outlined">
                    <CardContent>
                         <Grid container spacing={1}>
                              <Grid item xs={12} sm={7}>
                                   <TextField
                                        className={classes.inputProps}
                                        id="outlined-basic"
                                        label="Topic / Description"
                                        variant="outlined"
                                        size="small"
                                        onChange={event => setDescription(event.target.value)}
                                   />
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                   <Selector
                                        classes={classes}
                                        name="Subject"
                                        data={subject}
                                        value='id'
                                        label='subject'
                                        onChange={event => setSubjectID(event.target.value)}
                                   />
                              </Grid>
                              <Grid item xs={6} sm={2} className={classes.actContainer}>
                                   <NumSelector value={value} handleValue={handleValue} />
                              </Grid>

                         </Grid>
                    </CardContent>
               </Card>
               <Paper className={classes.content}>
                    <form id="QuestionForm" onSubmit={event => onSubmit(event)}>

                         {question(content)}
                    </form>
               </Paper>
               <Grid container>
                    <Grid item xs={12} className={classes.botAction}>
                         <div hidden={value === 0 || value === '' ? true : false}>

                              <Button
                                   form="QuestionForm"
                                   type="submit"
                                   className={classes.btnGray}
                              >
                                   Submit
                         </Button>
                         </div>
                    </Grid>
               </Grid>
          </Paper >
     )
}

export default Exam
