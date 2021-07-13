import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import Dashboard from './Dashboard';

function TabPanel(props) {
     const { children, value, index, ...other } = props;

     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
               {...other}
          >
               {value === index && (
                    <Box>
                         {children}
                    </Box>
               )}
          </div>
     );
}

TabPanel.propTypes = {
     children: PropTypes.node,
     index: PropTypes.any.isRequired,
     value: PropTypes.any.isRequired,
};

function a11yProps(index) {
     return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
     };
}

const useStyles = makeStyles((theme) => ({
     root: {
          flexGrow: 1,
          backgroundColor: '#e6e6e6',
     },
     paper: {
          backgroundColor: '#999999',
          padding: theme.spacing(1),
          color: '#003300',
          maxHeight: '500px'
     },
}));

export default function ExamMaintenance() {
     const classes = useStyles();
     const [value, setValue] = React.useState(0);

     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     return (

          <Paper className={classes.paper}>

               <div className={classes.root}>
                    <AppBar position="static">
                         <Tabs
                              value={value}
                              onChange={handleChange}
                              aria-label="simple tabs example">
                              <Tab label="DASHBOARD" {...a11yProps(0)} />
                              <Tab label="SETUP" {...a11yProps(1)} />
                         </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                         <Dashboard />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    </TabPanel>

               </div>
          </Paper>
     );
}
