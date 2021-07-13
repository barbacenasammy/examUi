import { Button } from '@material-ui/core'
import React from 'react'

function DeleteBtn({ classes, deleteBtnfx }) {
     return (
          <div className={classes.btnSpace}>
               <Button
                    className={classes.btnGray}
                    variant='contained'
                    onClick={() => deleteBtnfx('DELETE')}
               >Delete</Button>
          </div>
     )
}
export default DeleteBtn
