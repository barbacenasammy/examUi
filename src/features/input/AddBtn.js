import { Button } from '@material-ui/core'
import React from 'react'

function AddBtn({ classes, color, addBtnfx }) {
     return (
          <div className={classes.btnSpace}>
               <Button className={classes.btnGray} variant='contained' onClick={() => addBtnfx('ADD')}> Add</Button>
          </div>
     )
}
export default AddBtn
