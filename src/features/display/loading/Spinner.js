import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
     modal: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: 'transparent',
     },
     paper: {
          backgroundColor: 'transparent',
          padding: theme.spacing(1),
          borderRadius: '50%'
     }
}));

export default function Spinner({ open }) {
     const classes = useStyles();
     return (
          <div>
               <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                         timeout: 500
                    }}
               >
                    <Fade in={open}>
                         <div className={classes.paper}>
                              <CircularProgress />
                         </div>
                    </Fade>
               </Modal>
          </div>
     );
}
