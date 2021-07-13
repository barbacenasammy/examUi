import { Button } from '@material-ui/core'
import React from 'react'

function EditBtn({ classes, editBtnfx }) {
     return (
          <div className={classes.btnSpace}>
               <Button className={classes.btnGray} variant='contained' onClick={() => editBtnfx('EDIT')} >Edit</Button>
          </div>
     )
}
export default EditBtn
