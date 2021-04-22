import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import AuthContext from '../AuthProvider'
import { AppBar, Button, Toolbar } from '@material-ui/core'

const Header = (props) => {
  const token = React.useContext(AuthContext)
  const [loggedOut, setLoggedOut] = React.useState(false)

  if (loggedOut) {
    axios.post('/admin/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
      .catch(() => {})

    localStorage.removeItem('token')
    return <Redirect to="/" />
  }

  return (
    <AppBar position="fixed" className="header">
      <Toolbar>
        <div style={{ display: 'flex' }}>
          <Button color="inherit" className="logout-button" onClick={() => { setLoggedOut(true); }}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
