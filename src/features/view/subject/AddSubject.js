import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ModalForm from '../../display/modal/ModalForm'
import axios from '../../../common/axios/axios'
import Spinner from '../../display/loading/Spinner'
import Csrf from '../../../common/axios/Csrf'

function AddSubject(props) {
     const { open, onClose, callback } = props
     const [loading, setLoading] = useState(false);

     useEffect(() => {
     }, [loading])
     const onSubmit = (event) => {
          event.preventDefault();
          setLoading(true);
          const data = new FormData(event.target);
          Csrf.getCookie()
          axios.post('/subject/create', data)
               .then(response => {
                    setLoading(false);
                    callback()
                    console.log(response.data)
               })
               .catch(error => setLoading(false));

     }
     return (
          <div>

               <ModalForm
                    open={!loading ? open : false}
                    onClose={onClose}
                    title="Add Subject"
                    onSubmit={onSubmit}
                    btnName="Submit"
               >
                    <TextField
                         fullWidth
                         label="Subject"
                         margin="dense"
                         name="subject"
                         variant="outlined"
                    />

               </ModalForm>
               <Spinner open={loading} />
          </div>
     )
}

export default AddSubject
