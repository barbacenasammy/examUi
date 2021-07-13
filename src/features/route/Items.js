import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
     root: {
          flexGrow: 1
     }
});

function Items() {
     const classes = useStyles();
     const [value, setValue] = React.useState(0);

     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     return (
          <Tabs
               orientation="vertical"
               value={value}
               onChange={handleChange}
               indicatorColor="primary"
               textColor="primary"
               centered
          >
               <Tab label="Item One" />
               <Tab label="Item Two" />
               <Tab label="Item Three" />
          </Tabs>
     );
}
export default Items
