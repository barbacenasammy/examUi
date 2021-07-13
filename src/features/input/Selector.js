import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
     root: {
          "label + &": {
               marginTop: theme.spacing(1),
          },

     },
     input: {
          borderRadius: 4,
          position: "relative",
          backgroundColor: 'transparent',
          border: "1px solid #8B8B8B",
          fontSize: 16,
          padding: "10px 5px 10px 10px",
          transition: theme.transitions.create(["border-color", "box-shadow"]),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
               "-apple-system",
               "BlinkMacSystemFont",
               '"Segoe UI"',
               "Roboto",
               '"Helvetica Neue"',
               "Arial",
               "sans-serif",
               '"Apple Color Emoji"',
               '"Segoe UI Emoji"',
               '"Segoe UI Symbol"'
          ].join(","),
          "&:focus": {
               borderRadius: 4,
               borderColor: "#80bdff",
               boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
          }
     }
}))(InputBase);

const useStyles = makeStyles((theme) => ({
     margin: {
          width: '100%',
          marginBottom: theme.spacing(2)
     }
}));

function Selector({ name, data, parameter, id, onChange, label, value }) {
     const classes = useStyles();
     const [select, setSelect] = React.useState(0);

     const handleChange = (event) => {
          onChange(event)
          setSelect(event.target.value);
     };
     // const result = data.map(value => value).filter((value, id) => id === 0)
     // const param = Object.keys(Object.entries(result)[0][1])[1]
     //const param = 'subject'
     // if (data.length > 0) {
     //      const result = data.map(value => value).filter((value, id) => id === 0)
     //      setParam(Object.keys(Object.entries(result)[0][1])[1])
     // }
     return data.length === 0 ? null : (
          <div>
               <FormControl className={classes.margin}>
                    <NativeSelect
                         id={id}
                         value={select}
                         onChange={handleChange}
                         input={<BootstrapInput />}
                    >
                         <option value={0} hidden={true} > {name} </option>
                         {data.map(element => {
                              return (
                                   <option key={element.id} value={element[value]}>{element[label]}</option>
                              )
                         })}
                    </NativeSelect>
               </FormControl>
          </div >
     );
}
export default Selector