import React, { useEffect, useState } from 'react'
import ModalForm from '../../display/modal/ModalForm'
import axios from '../../../common/axios/axios'
import Csrf from '../../../common/axios/Csrf'
import { Typography } from '@material-ui/core'
import Spinner from '../../display/loading/Spinner'

function DeleteSubject(props) {
     const { open, onClose, items, callback } = props
     const [loading, setLoading] = useState(false);

     useEffect(() => {
     }, [loading])

     const onSubmit = (event) => {
          event.preventDefault();
          setLoading(true)
          Csrf.getCookie()
          items.forEach(element => {
               axios.delete('/subject/delete/' + element)
                    .then(response => {
                         setLoading(false)
                         callback()
                    })
                    .catch(error => {
                         setLoading(false)
                         callback()
                    }
                    )

          })
     }

     return (
          <div>

               <ModalForm
                    open={!loading ? open : false}
                    onClose={onClose}
                    title="Delete Subject"
                    onSubmit={onSubmit}
                    btnName="Confirm"
               >
                    {
                         items.length > 1 ? (
                              <Typography>
                                   Delete selected subjects?
                              </Typography>) : (
                                   <Typography>
                                        Delete selected subject?
                                   </Typography>)
                    }

               </ModalForm>

               <Spinner open={loading} />
          </div>
     )
}

export default DeleteSubject
