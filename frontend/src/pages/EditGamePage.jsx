import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import AuthContext from '../components/AuthProvider'
import { useParams } from 'react-router'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import AdminLayout from '../components/Layout'
import QuestionContainer from '../components/QuestionContainer'

const EditGamePage = () => {
  const [questions, setQuestions] = React.useState([])
  const { gid } = useParams()
  const token = React.useContext(AuthContext).token

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
      .catch(() => {})
  }

  const removeQuestion = id => {
    setQuestions([...questions.filter(question => question.id !== id)])
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
        <QuestionContainer questions={questions} gid={gid} remove={removeQuestion}/>
      </>
    } />
  )
}

EditGamePage.propTypes = {
  match: PropTypes.object
}

export default EditGamePage
