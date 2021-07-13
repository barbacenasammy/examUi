import { makeStyles, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import DataTable from '../../display/DataTable';
import PopModal from '../../display/PopModal';
import AddBtn from '../../input/AddBtn';
import DeleteBtn from '../../input/DeleteBtn';
import EditBtn from '../../input/EditBtn';

const useStyle = makeStyles((theme) => ({
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
          backgroundColor: "#595959",
          color: '#fff',
          '&:hover': {
               background: "#333333",
          },
     },
     selectType: {
          width: '25ch',
          marginTop: theme.spacing(2)
          // minWidth: 80
     },
}))

function Result() {
     const classes = useStyle()
     const [open, setOpen] = useState(false)
     const [header, setHeader] = useState('')


     const showModal = (value) => {
          open ? setHeader('') : setHeader(value + ' EXAM')
          setOpen(!open)
     }

     const headCells = [
          { id: 'id', label: 'ID' },
          { id: 'desc', label: 'DESCRIPTION' },
          { id: 'subject', label: 'SUBJECT' },
          { id: 'numQ', label: 'No. Question' },
          { id: 'type', label: 'Type' },
          { id: 'status', label: 'STATUS' },
     ];

     function createData(id, subject, desc, numQ, type, status) {
          return { id, subject, desc, numQ, type, status };
     }

     const rows = [
          createData(1, 'Hospitaly', 'First Test for hospitality', 30, 'Test', 'Finished'),
          createData(2, 'Management', 'Short quiz', 10, 'Quiz', 'Finished'),
          createData(3, 'Accounting', 'Short quiz', 20, 'Quiz', 'Finished'),
          createData(4, 'Tourism', 'Midterm Exam', 50, 'Exam', 'On Going'),
          createData(5, 'Culinary', '', 10, 'Quiz', 'Finished'),
          createData(6, 'Kitchen Essentials', 'Simple Test', 30, 'Test', 'On Going'),
     ];
     return (
          <Paper className={classes.paper}>
               <div className={classes.buttons}>
                    <AddBtn classes={classes} addBtnfx={showModal} />
                    <EditBtn classes={classes} editBtnfx={showModal} />
                    <DeleteBtn classes={classes} deleteBtnfx={showModal} />
               </div>
               {/* <Selector classes={classes} /> */}
               <DataTable headCells={headCells} rows={rows} />
               <PopModal status={open} showModalfx={showModal} header={header} />
          </Paper>
     )
}

export default Result
