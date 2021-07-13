import React from 'react'
import {
     BrowserRouter as Router,
     Switch,
     Redirect,
     Route
} from 'react-router-dom'
import Main from '../layout/Main'
import PrivateRoute from './PrivateRoute'
import Subject from '../view/subject'
import Login from '../admin/Login'
import PublicRoute from './PublicRoute'
import Result from '../view/result'
import Student from '../view/student'
import Exam from '../view/exam'
import Register from '../admin/Register'
import Client from '../client/Client'
import CreateExam from '../view/exam/create/CreateExam'
import ExamMaintenance from '../view/exam/maintenance/ExamMaintenance'

function Routes() {

     return (
          <Router>
               <Switch>
                    <Redirect exact from="/" to="/subject" />
                    <PrivateRoute
                         component={Subject}
                         exact
                         path="/subject"
                         layout={Main}
                    />

                    <PrivateRoute
                         component={ExamMaintenance}
                         exact
                         path="/exam/maintain"
                         layout={Main}
                    />
                    <PrivateRoute
                         component={CreateExam}
                         exact
                         path="/exam/create"
                         layout={Main}
                    />
                    <PrivateRoute
                         component={Result}
                         exact
                         path="/result"
                         layout={Main}
                    />
                    <PrivateRoute
                         component={Student}
                         exact
                         path="/student"
                         layout={Main}
                    />
                    <PrivateRoute
                         component={Client}
                         exact
                         path="/client"
                         layout={Main}
                    />

                    <PublicRoute
                         component={Login}
                         exact
                         path="/login"
                         layout={Main}
                    />
                    <PublicRoute
                         component={Register}
                         exact
                         path="/register"
                         layout={Main}
                    />


               </Switch>
          </Router>
     )
}

export default Routes
