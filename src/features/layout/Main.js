import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Topnav from './topnav/Topnav'
import SideBar from './sidebar/SideBar'
import { useMediaQuery, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    },
  },
  shiftContent: {
    paddingLeft: 240
  },

  content: {
    flexGrow: 1,
    alignItems: 'left',
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
}))

const Main = props => {
  const { children } = props
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true
  })

  const openSideBar = () => {
    setOpen(true)
  }

  const closeSideBar = () => {
    setOpen(false)
  }

  const status = isDesktop ? true : open


  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >

      <Topnav
        handleOpen={openSideBar}
      />
      <SideBar
        onClose={closeSideBar}
        status={status}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />

      <main className={classes.content}>
        {children}
      </main>
    </div>

  )
}
Main.propTypes = {
  children: PropTypes.node
};

export default Main