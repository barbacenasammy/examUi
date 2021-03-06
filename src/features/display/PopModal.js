import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

const styles = (theme) => ({
     root: {
          margin: 0,
          padding: theme.spacing(2),
     },
     closeButton: {
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
     },
});

const DialogTitle = withStyles(styles)((props) => {
     const { children, classes, onClose, ...other } = props;
     return (
          <MuiDialogTitle disableTypography className={classes.root} {...other}>
               <Typography variant="h6">{children}</Typography>
               {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                         <CloseIcon />
                    </IconButton>
               ) : null}
          </MuiDialogTitle>
     );
});

const DialogContent = withStyles((theme) => ({
     root: {
          padding: theme.spacing(2),
     },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
     root: {
          margin: 0,
          padding: theme.spacing(1),
     },
}))(MuiDialogActions);

function PopModal({ showModalfx, status, header }) {

     useEffect(() => {
     }, [status])

     return (
          <div>

               <Dialog onClose={showModalfx} aria-labelledby="customized-dialog-title" open={status}>
                    <DialogTitle id="customized-dialog-title" onClose={showModalfx}>
                         {header}
                    </DialogTitle>
                    <DialogContent dividers>

                         <TextField id="outlined-basic" label="Subject" variant="outlined" />

                    </DialogContent>
                    <DialogActions>
                         <Button autoFocus onClick={showModalfx} color="primary" variant='outlined'>
                              Submit
          </Button>
                    </DialogActions>
               </Dialog>
          </div>
     );
}

export default PopModal