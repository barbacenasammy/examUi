import React, { useEffect, useState } from 'react'
import DataTable from '../../../display/DataTable'
import axios from '../../../../common/axios/axios'

function Dashboard() {
     const [data, setData] = useState([])
     const [selected, setSelected] = useState([])
     const [loading, setLoading] = useState(false)
     const [reload, setReload] = useState(false)



     const headCells = [
          { id: 'id', label: 'ID', attribute: 'hidden' },
          { id: 'exam', label: 'DESCRIPTION' },
          { id: 'type', label: 'TYPE' },
          { id: 'subject', label: 'SUBJECT' },
          { id: 'questions', label: 'QUESTIONS' },
          { id: 'fromDate', label: 'FROM' },
          { id: 'toDate', label: 'TO' },
     ];
     useEffect(() => {
          setLoading(true)
          axios.get('exam')
               .then(response => {
                    setLoading(false)
                    setData(response.data)
               })
               .catch(error => setLoading(false))
     }, [reload])

     return (
          <div>
               <DataTable
                    headCells={headCells}
                    rows={data}
                    loading={loading}
                    rowSelected={data => {
                         setSelected(data)
                    }}
               />
          </div>
     )
}

export default Dashboard
