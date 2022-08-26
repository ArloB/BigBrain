import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { Container, Box, Button, Typography, TextField, Grid, Link } from '@mui/material'

import './SharedForm.css'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ setAuth, ...props }) => {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target[0].value
    const password = event.target[2].value

    axios.post('/admin/auth/login', { email, password })
      .then((res) => {
        setAuth(res.data.token)
        navigate('/')
      }).catch(() => {})
  }

  return (
    <Container>
      <Box className="card">
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth
              type="email" id="email" label="Email" name="email" autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth
              type="password" id="password" label="Password" name="password"/>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid>
            <Grid item>
              <br />
              <Link href="/register" variant="body1">Sign Up</Link>
              <Link id="play" href="/play" variant="body1">Play Game</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object,
  setAuth: PropTypes.func
}

export default LoginPage
