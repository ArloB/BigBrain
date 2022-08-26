import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../components/AuthProvider'

import { Container, Box, Button, Typography, TextField, Grid, Link } from '@mui/material'

import './SharedForm.css'

const RegisterPage = ({ setAuth }) => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target[0].value
    const email = event.target[2].value
    const password = event.target[4].value

    axios.post('/admin/auth/register', { name, email, password })
      .then((res) => {
        setAuth(res.data.token)
        navigate('/')
      }).catch(() => {})
  }

  const token = React.useContext(AuthContext).token

  if (token) {
    return <Navigate to="/"/>
  } else {
    return (
      <Container>
        <Box className="card">
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth
                type="text" id="name" label="Name" name="name" autoFocus/>
            <TextField variant="outlined" margin="normal" required fullWidth
                type="email" id="email" label="Email" name="email" />
            <TextField variant="outlined" margin="normal" required fullWidth
                type="password" id="password" label="Password" name="password"/>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
            <Grid>
              <Grid item>
                <br />
                <Link href="/login" variant="body1">Sign In</Link>
                <Link id="play" href="/play" variant="body1">Play Game</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    )
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object,
  setAuth: PropTypes.func
}

export default RegisterPage
