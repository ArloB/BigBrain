import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import AuthContext from '../components/AuthProvider'
import { useHistory } from 'react-router'
import { Box, Button, Container, TextField, Typography } from '@material-ui/core'
import AdminLayout from '../components/Layout'
import QuestionContainer from '../components/QuestionContainer'

const EditGamePage = ({ match }) => {
  const [questions, setQuestions] = React.useState([])
  const gid = match.params.gid
  const token = React.useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    axios.get(`admin/quiz/${gid}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        document.getElementById('name').value = r.data.name
        document.getElementById('thumbnail').value = r.data.thumbnail
        setQuestions(r.data.questions)
      }).catch(() => {})
  }, [])

  const handleSubmit = (event) => {
    const name = event.target[0].value
    const thumbnail = event.target[2].value

    if (!name && !thumbnail) {
      return
    }

    axios.put(`/admin/quiz/${gid}`, { name, thumbnail }, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        history.push('/')
      }).catch(() => {})
  }

  return (
    <AdminLayout body={
      <>
        <Container>
          <Box className="card">
            <Typography component="h1" variant="h5">
              Edit game
            </Typography>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
              <TextField variant="outlined" margin="normal" fullWidth
                  type="text" id="name" name="name" autoFocus />
              <label htmlFor='thumbnail'>Thumbnail</label>
              <TextField variant="outlined" margin="normal" fullWidth
                  type="text" id="thumbnail" name="thumbnail" />
              <Button type="submit" fullWidth variant="contained" color="primary">
                Edit game
              </Button>
            </form>
          </Box>
        </Container>
        <QuestionContainer questions={questions} gid={gid} />
      </>
    } />
  )
}

EditGamePage.propTypes = {
  match: PropTypes.object
}

export default EditGamePage
