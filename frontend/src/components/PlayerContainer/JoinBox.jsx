import React from 'react'
import PropTypes from 'prop-types'

import { Container, Box, Button, Typography, TextField, Grid, Link } from '@mui/material'

import '../../pages/SharedForm.css'

const JoinBox = ({ sid, ws }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target[0].value
    const session = event.target[2].value

    ws.send(JSON.stringify({ type: 'pjoin', name: name, session: session }))
  }

  return (
    <Container>
      <Box className="card">
        <Typography component="h1" variant="h5">
          Join session
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField variant="outlined" margin="normal" required fullWidth
              id="name" label="Name" name="name"/>
          <TextField variant="outlined" margin="normal" required fullWidth defaultValue={sid || ''}
              id="session" label="Session" name="session"/>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Join
          </Button>
          <Grid>
            <Grid item>
              <br />
              <Link href="/login" variant="body1">Admin menu</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

JoinBox.propTypes = {
  sid: PropTypes.string,
  ws: PropTypes.object
}

export default JoinBox
