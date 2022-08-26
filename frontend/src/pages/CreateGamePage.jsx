import React from 'react'

import axios from 'axios'
import AuthContext from '../components/AuthProvider'
import { useNavigate } from 'react-router'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import AdminLayout from '../components/Layout'

const CreateGamePage = () => {
  const token = React.useContext(AuthContext).token
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = event.target[0].value

    axios.post('/admin/quiz/new', { name }, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        navigate(`/edit/${r.data.quizId}`)
      }).catch(() => {})
  }

  return (
    <AdminLayout body={
      <Container>
        <Box className="card">
          <Typography component="h1" variant="h5">
            New game
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField variant="outlined" margin="normal" required fullWidth
                type="text" id="name" label="Name" name="name" autoFocus />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create new game
            </Button>
          </form>
        </Box>
      </Container>
    } />
  )
}

export default CreateGamePage
