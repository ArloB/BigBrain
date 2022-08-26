import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'
import AdminLayout from '../components/Layout'
import QuestionForm from '../components/QuestionForm'

import './CreateQuestionPage.css'
import axios from 'axios'
import AuthContext from '../components/AuthProvider'
import { useNavigate, useParams } from 'react-router'

const CreateQuestionPage = () => {
  const [checked, setChecked] = React.useState(false)
  const [answers, setAnswers] = React.useState([])
  const [keyId, setKeyId] = React.useState(0)

  const { gid } = useParams()
  const token = useContext(AuthContext).token

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const newQuestion = {
      graphic: event.target[6].value,
      question: event.target[0].value,
      time_limit: event.target[2].value,
      worth: event.target[4].value,
      multiple_choice: event.target[8].checked,
      answers: []
    }

    let answerid = 0

    for (let i = 9; i < 28; i += 4) {
      if (event.target[i] && (event.target[i].value || event.target[i].checked)) {
        newQuestion.answers.push({
          id: answerid,
          answer: event.target[i].value,
          correct: event.target[i + 2].checked
        })

        answerid++
      }
    }

    axios.get(`/admin/quiz/${gid}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        const questions = r.data.questions
        let max = -1

        if (questions.length >= 1) {
          max = questions.reduce((prev, curr) => {
            return (parseInt(prev.id) > parseInt(curr.id)) ? prev : curr
          })
        }

        newQuestion.id = max === -1 ? 1 : parseInt(max.id) + 1
        questions.push(newQuestion)
        axios.put(`/admin/quiz/${gid}`, { questions }, { headers: { Authorization: `Bearer ${token}` } })
          .then(_ => navigate(`/edit/${gid}/`))
      }).catch(() => {})
  }

  const handleChange = () => {
    setChecked(!checked)
  };

  const handleNewAnswer = () => {
    let tmp = answers
    tmp = [...tmp, keyId + 1]
    setAnswers(tmp)
    setKeyId(keyId + 1)
  }

  const handleDelete = id => {
    setAnswers(answers.filter(a => a !== id))
  }

  return (
    <AdminLayout body={
      <Container>
        <Box className="card">
          <Typography component="h1" variant="h5">
            New question
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <TextField variant="outlined" margin="normal" required fullWidth
                type="text" id="question" label="Question" name="question" autoFocus style={{ gridColumn: 'auto / span 6' }}/>
            <TextField variant="outlined" margin="normal" required
                type="number" id="time" label="Time" name="time" defaultValue={60} style={{ gridColumn: 'auto / span 3' }}/>
            <TextField variant="outlined" margin="normal" required
                type="number" id="points" label="Points" name="points" defaultValue={1000} style={{ gridColumn: 'auto / span 3' }}/>
            <TextField variant="outlined" margin="normal" fullWidth type="graphic"
                id="graphic" label="Graphic" name="graphiv" style={{ gridColumn: 'auto / span 6' }}/>
            <FormControlLabel control={
                <Checkbox checked={checked} onChange={handleChange} color="primary"/>
            } label="Multiple choice" style={{ gridColumn: 'auto / span 6' }} />
            {answers.map(a => {
              return <QuestionForm key={a} delete={() => handleDelete(a)} id={a} />
            })}
            {answers.length < 6 ? <Button onClick={handleNewAnswer} fullWidth variant="contained" color="error" style={{ gridColumn: 'auto / span 6' }}>Add another answer</Button> : null}
            <br />
            <Button type="submit" fullWidth variant="contained" color="primary" style={{ gridColumn: 'auto / span 6', height: 56 }} disabled={answers.length < 2}>
              Create new question
            </Button>
          </form>
        </Box>
      </Container>
    } />
  )
}

CreateQuestionPage.propTypes = {
  match: PropTypes.any
}

export default CreateQuestionPage
