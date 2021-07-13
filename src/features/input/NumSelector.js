import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
     root: {
          "& .MuiTextField-root": {
               margin: theme.spacing(0),
               textAlign: 'center'
          },
          textAlign: 'center'
     },
     numInput: {
          textAlign: 'center'
     }
}));

function NumSelector(props) {
     const { id, value, onChange, label, disable } = props
     const classes = useStyles();
     return (
          <form className={classes.root} noValidate autoComplete="off">
               <TextField
                    id={id}
                    label={label}
                    type="number"
                    InputLabelProps={{
                         shrink: true
                    }}
                    variant="outlined"
                    size="medium"
                    value={value}
                    onChange={onChange}
                    inputProps={{ style: { textAlign: 'center' } }}
                    disabled={disable ? disable : false}
               />
          </form>
     );
}
export default NumSelector