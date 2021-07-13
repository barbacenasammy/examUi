import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ModalForm from '../../display/modal/ModalForm'
import axios from '../../../common/axios/axios'
import Spinner from '../../display/loading/Spinner'
import Csrf from '../../../common/axios/Csrf'


function EditSubject(props) {
     const { open, onClose, callback, data } = props
     const [loading, setLoading] = useState(false);
     const [form, setForm] = useState({
          subject: '',
     })

     const onChangehandler = (e) => {

          setForm({
               ...form,
               [e.target.id]: e.target.value
          })
     }

     useEffect(() => {
     }, [loading])
     const onSubmit = (event) => {
          event.preventDefault();
          setLoading(true);
          Csrf.getCookie()
          axios.put(`/subject/update/${data.id}`, form)
               .then(response => {
                    setLoading(false);
                    callback()
                    console.log(response.data)
               })
               .catch(error => console.log(error));
     }
     return (
          <div>

               <ModalForm
                    open={!loading ? open : false}
                    onClose={onClose}
                    title="Edit Subject"
                    onSubmit={onSubmit}
                    btnName="Submit"
               >
                    <TextField
                         fullWidth
                         defaultValue={data.subject}
                         label="Subject"
                         margin="dense"
                         name="subject"
                         variant="outlined"
                         onChange={e => onChangehandler(e)}
                         id="subject"
                    />

               </ModalForm>
               <Spinner open={loading} />
          </div>
     )
}

export default EditSubject
