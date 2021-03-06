import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Items from './Items';

const useStyles = makeStyles((theme) => ({
     root: {
          width: '100%',
     },
     heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
     },
}));

function MenuDrawer() {
     const classes = useStyles();

     return (
          <div className={classes.root}>

               <Accordion>
                    <AccordionSummary
                         expandIcon={<ExpandMoreIcon />}
                         aria-controls="panel2a-content"
                         id="panel2a-header"
                    >
                         <Typography className={classes.heading}>Exam</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                         <Items />
                    </AccordionDetails>
               </Accordion>

          </div >
     );
}
export default MenuDrawer