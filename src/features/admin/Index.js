import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import Login from './Login'
import { selectCount, setLogin } from '../timer/timerSlice'
import { useSelector } from 'react-redux'

function Index() {
     const state = useSelector(selectCount)
     const login = state.login;
     const [isLoggin] = useState(login)
     useEffect(() => {
          setLogin(login)
     }, [login])
     return (
          <div>
               {isLoggin ? <Admin /> : <Login />}
               {/* <Admin /> */}
          </div>
     )
}

export default Index
