import { Grid, TextField, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import ModalForm from '../../display/modal/ModalForm'

const useStyle = makeStyles((theme) => ({
     textfield: {
          width: '100%',
     }
}))

function AddStudent(props) {
     const { open, onClose } = props;
     const emailExtension = '@mytest.com';
     const [email, setEmail] = useState(emailExtension)
     const classes = useStyle();
     const onSubmit = (event) => {
          event.preventDefault();
     }
     return (
          <div>
               <ModalForm
                    open={open}
                    onClose={onClose}
                    onSubmit={onSubmit}
                    btnName="Submit"
               >
                    <Grid container spacing={2}>
                         <Grid item xs={12} sm={6}>
                              <TextField label='Full Name' className={classes.textfield} onChange={(event) => {
                                   let fullname = event.target.value;
                                   let splitName = fullname.split(" ")
                                   let name = fullname.replace(".", "").split(" ");
                                   let lastname = name[name.length - 1].charAt(0).toUpperCase() + name[name.length - 1].slice(1)

                                   if (splitName.length === 1) {
                                        setEmail(emailExtension)
                                   } else {
                                        setEmail(lastname + splitName[0].toLowerCase() + emailExtension)
                                   }

                              }} />

                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField label='Student Email' className={classes.textfield} disabled={true} value={email} />

                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField label='Password' className={classes.textfield} />
                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField
                                   label='Password Confirmation'
                                   className={classes.textfield}
                                   helperText="Invalid password"
                              />

                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField label='Yr/Lvl' className={classes.textfield} />

                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <TextField label='Status' className={classes.textfield} />

                         </Grid>
                    </Grid>

               </ModalForm>

          </div>
     )
}

export default AddStudent
