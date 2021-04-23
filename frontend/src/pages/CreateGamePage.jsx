import React from 'react'

import axios from 'axios'
import AuthContext from '../components/AuthProvider'
import { useHistory } from 'react-router'
import { Box, Button, Container, TextField, Typography } from '@material-ui/core'
import AdminLayout from '../components/Layout'

const CreateGamePage = (props) => {
  const token = React.useContext(AuthContext)
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = event.target[0].value

    axios.post('/admin/quiz/new', { name }, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        history.push(`/edit/${r.data.quizId}`)
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
