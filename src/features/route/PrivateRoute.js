import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectCount } from '../timer/timerSlice';
import RouteWithLayout from './RouteWithLayout';
import authenticationService from '../../common/axios/authentication'
import { setLogin } from '../timer/timerSlice'

const PrivateRoute = (props) => {
     const { layout, component, path, ...rest } = props;
     const dispatch = useDispatch()

     const data = useSelector(selectCount)
     const isLoggin = data.login
     if (!authenticationService.authenticated()) {
          return <Redirect to="/login" />;
     }
     else {
          dispatch(setLogin())
     }

     return !isLoggin ? (
          <Redirect to="/login" />
     ) : (
               <RouteWithLayout
                    component={component}
                    layout={layout}
                    path={path}
                    {...rest}
               />)
}

PrivateRoute.propTypes = {
     component: PropTypes.any.isRequired,
     layout: PropTypes.any.isRequired,
     path: PropTypes.string.isRequired,
}

export default PrivateRoute
