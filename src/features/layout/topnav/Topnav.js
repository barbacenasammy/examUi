import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Timer } from '../../timer/Timer'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../timer/timerSlice'
import { selectCount } from '../../timer/timerSlice'
import authenticateUser from '../../../common/axios/authentication'
import history from '../../../common/utils/history'


const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#595959',
  }
}))

function Topnav({ handleOpen }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const data = useSelector(selectCount);
  const login = data.login;
  const [isLoggin, setisLoggin] = useState(login)

  useEffect(() => {
    setisLoggin(login);
  }, [login])


  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appbar}>
        <Toolbar>
          <div hidden={!isLoggin}>

            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Typography variant='h6' className={classes.title}>
            <Timer />
          </Typography>

          <div hidden={isLoggin} >
            <Button
              color='inherit'
              onClick={() => {
                history.push('/register');
              }}>
              Register
            </Button>

            <Button color='inherit'
              onClick={() => {
                history.push('/login');
              }}>Login</Button>
          </div>
          <div hidden={!isLoggin} >
            <Button
              color='inherit'
              onClick={() => {
                authenticateUser.logout(data)
                dispatch(setLogout())
              }}
            >Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div >
  )
}
Topnav.propTypes = {
  handleOpen: PropTypes.func
}

export default Topnav
