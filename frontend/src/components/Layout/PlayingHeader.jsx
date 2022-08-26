import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'
import clipboard from 'clipboardy'
import AuthContext from '../AuthProvider'
import { AppBar, Button, ButtonGroup, Toolbar, Typography } from '@mui/material'

import './Layout.css'

const PlayingHeader = ({ sid, stop }) => {
  const token = React.useContext(AuthContext).token
  const [loggedOut, setLoggedOut] = React.useState(false)

  const navigate = useNavigate()

  if (loggedOut) {
    axios.post('/admin/auth/logout', {}, { headers: { Authorization: `Bearer ${token}` } })
      .catch(() => {})

    localStorage.removeItem('token')

    navigate('/login')
  }

  return (
    <AppBar position="sticky" className="header">
      <Toolbar style={{ justifyContent: 'space-between' }}>
          <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
            <Typography variant="h5" noWrap>
              BigBrain
            </Typography>
          </Link>
          <h1 onClick={() => { clipboard.write(`${window.location.origin}/play/${sid}/`) }}>{sid}</h1>
          <ButtonGroup variant="contained">
            <Button color="error" onClick={() => { stop() }}>
              Stop Game
            </Button>
            <Button color="primary" className="logout-button" onClick={() => { setLoggedOut(true); }}>
              Log out
            </Button>
          </ButtonGroup>
      </Toolbar>
    </AppBar>
  )
}

PlayingHeader.propTypes = {
  sid: propTypes.number,
  stop: propTypes.func
}

export default PlayingHeader
