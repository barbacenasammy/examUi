import React from 'react';
import Button from '@material-ui/core/Button';
import data from '../../common/axios/data';
import { selectCount, nextQ, prevQ, stopTimer } from '../timer/timerSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

function Progress({ disabler }) {
     const steps = data;
     const status = useSelector(selectCount)
     const dispatch = useDispatch()

     return (
          <div>
               {<div>
                    <Grid container>
                         <Grid item xs={6}>

                              <Button
                                   disabled={status.Q_id === 1}
                                   variant="outlined"
                                   color="secondary"
                                   onClick={() => dispatch(prevQ())}
                              >
                                   Back
                         </Button>
                         </Grid>
                         <Grid item xs={6}>
                              {status.Q_id === steps.length ? (
                                   <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => dispatch(stopTimer())}
                                        disabled={disabler}
                                   >
                                        Submit
                                   </Button>
                              ) : (
                                        <Button
                                             variant="outlined"
                                             color="primary"
                                             onClick={() => dispatch(nextQ())}
                                             disabled={disabler}
                                        >
                                             Next
                                        </Button>
                                   )
                              }

                         </Grid>


                    </Grid>
               </div>
               }
          </div>
     );
}

export default Progress