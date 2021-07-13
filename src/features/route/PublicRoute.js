import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import RouteWithLayout from './RouteWithLayout';
import { useSelector } from 'react-redux';
import { selectCount } from '../timer/timerSlice';
const PublicRoute = (props) => {
     const { layout, component, path, restricted, ...rest } = props;

     const data = useSelector(selectCount);
     const isLoggin = data.login;

     return isLoggin ? (
          <Redirect to="/" />
     ) : (
               <RouteWithLayout
                    component={component}
                    layout={layout}
                    path={path}
                    {...rest}
               />
          );
};

PublicRoute.propTypes = {
     component: PropTypes.any.isRequired,
     layout: PropTypes.any.isRequired,
     path: PropTypes.string.isRequired,
};

export default PublicRoute;
