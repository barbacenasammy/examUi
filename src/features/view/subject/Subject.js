import { Paper, makeStyles, Button } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import DataTable from '../../display/DataTable';
import PopModal from '../../display/PopModal';
import axios from '../../../common/axios/axios'
import AddSubject from './AddSubject';
import DeleteSubject from './DeleteSubject';
import EditSubject from './EditSubject';

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
          backgroundColor: "#595959",
          color: '#fff',
          '&:hover': {
               background: "#333333",
          },
     }

}))

function Subject() {
     const classes = useStyles();
     const [open, setOpen] = useState(false)
     const [header, setHeader] = useState('')
     const [data, setData] = useState([])
     const [selected, setSelected] = useState([])
     const [loading, setLoading] = useState(false)
     const [dialog, setDialog] = useState({
          showAdd: false,
          disabledDelBtn: true,
          showDelete: false,
          disabledEditBtn: true,
          showEdit: false,
          editData: {},
     })
     const [reload, setReload] = useState(false)


     const showModal = (value) => {
          open ? setHeader('') : setHeader(value + ' SUBJECT')
          setOpen(!open)
     }

     const headCells = [
          { id: 'id', label: 'ID' },
          { id: 'subject', label: 'SUBJECT' },
          { id: 'exam', label: 'Exam' },
          // { id: 'exam', label: 'EXAM' },
          // { id: 'quiz', label: 'QUIZ' },
          // { id: 'total', label: 'TOTAL' },
          // { id: 'remarks', label: 'REMARKS' },
     ];

     useEffect(() => {
          setLoading(true)
          axios.get('subject')
               .then(response => {
                    setLoading(false)
                    setData(response.data)
               })
               .catch(error => setLoading(false))
     }, [reload])

     return (
          <div>
               <Paper className={classes.paper}>
                    <div className={classes.buttons}>
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
                         <Button
                              color='primary'
                              variant='contained'
                              className={classes.btnSpace}
                              disabled={dialog.disabledEditBtn}
                              onClick={() => {
                                   setDialog({
                                        ...dialog,
                                        showEdit: true,
                                        editData: data.filter((e) => { return e.id === selected[0] })[0]
                                   })
                              }}
                         >
                              Edit
                         </Button>
                         <Button
                              color='primary'
                              variant='contained'
                              className={classes.btnSpace}
                              disabled={dialog.disabledDelBtn}
                              onClick={() => {
                                   setDialog({
                                        ...dialog,
                                        showDelete: true,
                                   })
                              }}
                         >
                              Delete
                         </Button>
                         {/* <AddBtn classes={classes} addBtnfx={showModal} /> */}
                         {/* <EditBtn classes={classes} editBtnfx={showModal} />
                         <DeleteBtn classes={classes} deleteBtnfx={showModal} /> */}
                    </div>
                    <DataTable
                         headCells={headCells}
                         rows={data}
                         loading={loading}
                         rowSelected={data => {
                              data.length > 0 ? data.length > 1 ?
                                   setDialog({
                                        ...dialog,
                                        disabledEditBtn: true,
                                        disabledDelBtn: false,
                                   }) :
                                   setDialog({
                                        ...dialog,
                                        disabledEditBtn: false,
                                        disabledDelBtn: false,
                                   }) : setDialog({
                                        ...dialog,
                                        disabledEditBtn: true,
                                        disabledDelBtn: true
                                   })
                              setSelected(data)
                         }}
                    />
                    <PopModal status={open} showModalfx={showModal} header={header} />
               </Paper>
               <Fragment>
                    <AddSubject
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
                              setReload(!reload);
                         }}
                    />

                    <EditSubject
                         open={dialog.showEdit}
                         data={dialog.editData}
                         onClose={() => {
                              setDialog({
                                   ...dialog,
                                   showEdit: false
                              })
                         }}
                         callback={() => {
                              setDialog({
                                   ...dialog,
                                   showEdit: false
                              })
                              setReload(!reload);
                         }}
                    />
                    <DeleteSubject
                         open={dialog.showDelete}
                         onClose={() => setDialog({
                              ...dialog,
                              showDelete: false,
                         })}
                         callback={() => {
                              setDialog({
                                   ...dialog,
                                   showDelete: false
                              })
                              setReload(!reload);
                         }}
                         items={selected}
                    />

               </Fragment>
          </div>
     )
}

export default Subject
