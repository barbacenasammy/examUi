import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { selectCount } from '../../timer/timerSlice';
import { useSelector } from 'react-redux';
import {
     Drawer,
     CssBaseline,
     Typography,
     Divider,
     MenuList,
     MenuItem,
     Accordion,
     AccordionSummary,
} from "@material-ui/core";


import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withRouter } from "react-router";

import RouteSource from '../../route/RouteSource'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
     root: {
          display: "flex"
     },
     appBar: {
          transition: theme.transitions.create(["margin", "width"], {
               easing: theme.transitions.easing.sharp,
               duration: theme.transitions.duration.leavingScreen
          })
     },
     appBarShift: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
          transition: theme.transitions.create(["margin", "width"], {
               easing: theme.transitions.easing.easeOut,
               duration: theme.transitions.duration.enteringScreen
          })
     },
     menuButton: {
          marginRight: theme.spacing(2)
     },
     hide: {
          display: "none"
     },
     drawer: {
          width: drawerWidth,
          flexShrink: 0,
          textAlign: 'center'
     },
     drawerPaper: {
          backgroundColor: '#595959',
          width: drawerWidth
     },
     drawerHeader: {
          display: "flex",
          alignItems: 'center',
          textAlign: 'center',
          padding: theme.spacing(0, 1),
          // necessary for content to be below app bar
          ...theme.mixins.toolbar,
          justifyContent: "flex-end"
     },
     content: {
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create("margin", {
               easing: theme.transitions.easing.sharp,
               duration: theme.transitions.duration.leavingScreen
          }),
          marginLeft: -drawerWidth
     },
     contentShift: {
          transition: theme.transitions.create("margin", {
               easing: theme.transitions.easing.easeOut,
               duration: theme.transitions.duration.enteringScreen
          }),
          marginLeft: 0
     },
     header: {
          textAlign: 'left',
          margin: theme.spacing(1, 1),
          color: '#ffffff',
          // color: '#a5a5a5',
          fontSize: 16,
          fontFamily: 'Open Sans Condensed'
     },
     MainHeader: {
          color: '#ffffff',
          padding: theme.spacing(2, 0),
          ...theme.mixins.toolbar,
          fontSize: 18,
          fontFamily: 'Tahoma',
          alignItems: 'center',
     },
     active: {
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightMedium,
          '& $icon': {
               color: theme.palette.primary.main
          }
     },
     button: {
          // color: colors.blueGrey[800],
          color: '#ffffff',
          paddingLeft: '5px',
          justifyContent: 'flex-start',
          textTransform: 'none',
          letterSpacing: 2,
          width: '100%',
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: 16,
          fontFamily: '"Segoe UI"',
     },

     subMenu: {
          color: '#ffffff',
          // color: colors.blueGrey[800],
          justifyContent: 'flex-start',
          textTransform: 'none',
          letterSpacing: 2,
          width: '100%',
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: 16,
          fontFamily: '"Segoe UI"',
     },
     icon: {
          color: theme.palette.icon,
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          marginRight: theme.spacing(1),
          marginLeft: theme.spacing(2)
     },
     item: {
          display: 'flex',
          paddingTop: 0,
          paddingBottom: 0
     },
     accord: {
          backgroundColor: '#595959',
     }

}));



function SideBar({ onClose, status, variant, ...props }) {
     const { location } = props;
     const classes = useStyles();
     const menus = RouteSource.RouteSource;
     const timer = useSelector(selectCount);
     const login = timer.login;
     const [show, setShow] = useState(login);


     useEffect(() => {
          setShow(login);
     }, [login])

     return (

          <div className={classes.root}>
               <CssBaseline />

               <Drawer
                    onClose={() => onClose()}
                    className={classes.drawer}
                    variant={variant}
                    anchor="left"
                    open={status}
                    classes={{
                         paper: classes.drawerPaper
                    }}
                    hidden={!show}
               >
                    <Typography className={classes.MainHeader}>
                         Mei Mei Exam
                    </Typography>
                    <Divider />
                    <MenuList>
                         {menus.map(menu => {
                              if (menu.divider)
                                   return <Divider className={classes.divider} key={menu.id} />;
                              if (menu.header)
                                   return (
                                        <Typography
                                             gutterBottom
                                             key={menu.id}
                                             className={classes.header}
                                        >
                                             {menu.header}
                                        </Typography>
                                   );
                              if (menu.dropdown)
                                   return (
                                        <Accordion key={menu.id} className={classes.accord}>
                                             <AccordionSummary
                                                  expandIcon={<ExpandMoreIcon />}
                                                  id="panel2a-header"
                                                  className={classes.button}
                                             >
                                                  <div className={classes.icon}>
                                                       {menu.icon}
                                                  </div>
                                                  {menu.name}
                                             </AccordionSummary>
                                             <MenuList>
                                                  {menu.subMenus.map(submenu => {
                                                       return (

                                                            <MenuItem
                                                                 selected={submenu.path === location.pathname}
                                                                 className={classes.subMenu}
                                                                 component={Link}
                                                                 to={submenu.path}
                                                                 key={submenu.id}
                                                            >

                                                                 <div className={classes.icon}>
                                                                      {submenu.icon}
                                                                 </div>
                                                                 {submenu.name}
                                                            </MenuItem>
                                                       )
                                                  })}
                                             </MenuList>
                                        </Accordion>)
                              if (!menu.icon)
                                   return null
                              return (
                                   <MenuItem
                                        selected={menu.path === location.pathname}
                                        className={classes.button}
                                        key={menu.id}
                                        component={Link}
                                        to={menu.path}>

                                        <div className={classes.icon}>
                                             {menu.icon}
                                        </div>
                                        {menu.name}

                                   </MenuItem>
                              )
                         })}

                    </MenuList>

               </Drawer>
               {/* <main
                    className={clsx(classes.content, {
                         [classes.contentShift]: status
                    })}
               >
                    <PaperForm />
                    <div className={classes.drawerHeader} />
               </main> */}
          </div >
     );
}

SideBar.propTypes = {
     onClose: PropTypes.func,
     status: PropTypes.bool,
     variant: PropTypes.string

}

export default SideBar = withRouter(SideBar)