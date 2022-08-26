import React from 'react'
import axios from 'axios'
import { Navigate, Link } from 'react-router-dom'
import AuthContext from '../AuthProvider'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

import './Layout.css'

const Header = () => {
  const token = React.useContext(AuthContext).token
  const [loggedOut, setLoggedOut] = React.useState(false)

  if (loggedOut) {
    axios.post('/admin/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
      .catch(() => {})

    localStorage.removeItem('token')
    return <Navigate to="/login"/>
  }

  return (
    <AppBar position="sticky" className="header">
      <Toolbar style={{ justifyContent: 'space-between' }}>
          <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h5" noWrap>
              BigBrain
            </Typography>
          </Link>
          <Button color="inherit" className="logout-button" onClick={() => { setLoggedOut(true); }}>
            Log out
          </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
