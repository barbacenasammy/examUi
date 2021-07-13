import { Paper, makeStyles, Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react';
import DataTable from '../../display/DataTable';
import AddStudent from './AddStudent';

const useStyles = makeStyles((theme) => ({
     paper: {
          backgroundColor: '#999999',
          padding: theme.spacing(2),
     },
     buttons: {
          display: 'flex',
          width: '100%',
     },
     btnSpace: {
          marginRight: theme.spacing(1),
     },
     btnGray: {
          backgroundColor: "#6e6e6e",
          color: '#fff'
     }

}))

function Student() {
     const classes = useStyles();
     // const [selected, setSelected] = useState([])
     const [dialog, setDialog] = useState({
          showAdd: false,
          disabledDelBtn: true,
          showDelete: false,
     })

     const headCells = [
          { id: 'fullname', label: 'Full Name' },
          { id: 'yearlevel', label: 'Year Level' },
          { id: 'status', label: 'Status' },
     ];

     function createData(fullname, yearlevel, status) {
          return { fullname, yearlevel, status };
     }

     const rows = [
          createData('May Ann Bonaobra', '1st', 'Regular'),
          createData('Christine Joy Rosales', '2nd', 'Regular'),
          createData('Jayson Bagulbol', '3rd', 'Regular'),
          createData('Norks JAmes', '4th', 'Regular'),
          createData('Lipo Satanas', '2nd', 'Regular'),
          createData('Jared Cabilles', '3rd', 'Regular'),
     ];

     return (
          <Paper className={classes.paper}>
               <Button
                    color='primary'
                    variant='contained'
                    className={classes.btnSpace}
                    onClick={() => {
                         setDialog({
                              ...dialog,
                              showAdd: true,
                         })
                    }}
               >
                    Add
                         </Button>
               <DataTable
                    headCells={headCells}
                    rows={rows}
                    rowSelected={data => {
                         data.length > 0 ?
                              setDialog({
                                   ...dialog,
                                   disabledDelBtn: false
                              }) : setDialog({
                                   ...dialog,
                                   disabledDelBtn: true
                              })
                         // setSelected(data)
                    }}
               />
               <AddStudent
                    open={dialog.showAdd}
                    onClose={() => {
                         setDialog({
                              ...dialog,
                              showAdd: false
                         })
                    }}
                    callback={() => {
                         setDialog({
                              ...dialog,
                              showAdd: false
                         })
                         // setReload(!reload);
                    }}
               />
          </Paper>


     )
}

export default Student
