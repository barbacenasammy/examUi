import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function ModalForm(props) {
     const { open, onClose, onSubmit, children, title, btnName, addOnBtn } = props

     return (
          <div>
               <Dialog
                    open={open}
                    onClose={onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
               >
                    <DialogTitle id="alert-dialog-title">
                         {title ? title : ''}
                    </DialogTitle>
                    <DialogContent>
                         <form id="modal-form" onSubmit={onSubmit}>
                              {children}
                         </form>


                    </DialogContent>
                    <DialogActions>
                         {addOnBtn ? addOnBtn() : null}
                         <Button onClick={onClose} color="primary">
                              Close
                         </Button>
                         <Button form="modal-form" type="submit" color="primary">
                              {btnName}
                         </Button>
                    </DialogActions>
               </Dialog>
          </div>
     );
}
export default ModalForm