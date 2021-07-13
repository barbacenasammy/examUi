import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
     MuiPickersUtilsProvider,
     KeyboardTimePicker,
     KeyboardDatePicker,
} from '@material-ui/pickers';

function DateTimePicker() {
     // The first commit of Material-UI
     const [PickDate, setPickDate] = useState({
          fromDate: new Date(),
          toDate: new Date(),
          fromTime: new Date(),
          toTime: new Date(),
     })

     const fromDateChange = (date) => {
          console.log(date)
          setPickDate({
               ...PickDate,
               fromDate: date,
          });
     };

     const toDateChange = (date) => {
          setPickDate({
               ...PickDate,
               toDate: date,
          });
     };
     const fromTimeChange = (date) => {
          setPickDate({
               ...PickDate,
               fromTime: date,
          });
     };
     const toTimeChange = (date) => {
          setPickDate({
               ...PickDate,
               toTime: date,
          });
     };

     return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <Grid container justify="space-around" spacing={1}>
                    <Grid item xs={6}>

                         <KeyboardDatePicker
                              disableToolbar
                              variant="normal"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="fromDatePicker"
                              label="FROM DATE"
                              value={PickDate.fromDate}
                              onChange={fromDateChange}
                              KeyboardButtonProps={{
                                   'aria-label': 'change date',
                              }}
                              autoOk={true}
                         />
                    </Grid>
                    <Grid item xs={6}>
                         <KeyboardTimePicker
                              margin="normal"
                              id="fromTimePicker"
                              label="TIME"
                              value={PickDate.fromTime}
                              onChange={fromTimeChange}
                              KeyboardButtonProps={{
                                   'aria-label': 'change time',
                              }}
                         />
                    </Grid>
                    <Grid item xs={6}>
                         <KeyboardDatePicker
                              disableToolbar
                              margin="normal"
                              id="toDatePicker"
                              label="TO DATE"
                              format="MM/dd/yyyy"
                              value={PickDate.toDate}
                              onChange={toDateChange}
                              KeyboardButtonProps={{
                                   'aria-label': 'change date',
                              }}
                              autoOk={true}
                         />
                    </Grid>
                    <Grid item xs={6}>
                         <KeyboardTimePicker
                              margin="normal"
                              id="toTimePicker"
                              label="TIME"
                              value={PickDate.toTime}
                              onChange={toTimeChange}
                              KeyboardButtonProps={{
                                   'aria-label': 'change time',
                              }}
                         />
                    </Grid>
               </Grid>
          </MuiPickersUtilsProvider>
     );
}

export default DateTimePicker