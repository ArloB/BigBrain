import React, { useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'

import './QuestionCard.css'
import AuthContext from '../AuthProvider'
import Confirmation from '../Confirmation'

const QuestionCard = ({ gid, question, remove }) => {
  const q = question

  const [open, setOpen] = React.useState(false)

  const token = useContext(AuthContext).token

  const handleToggle = () => {
    setOpen(!open)
  };

  const handleYes = () => {
    handleToggle()

    axios.get(`/admin/quiz/${gid}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        const questions = r.data.questions.filter(x => x.id !== q.id)
        axios.put(`/admin/quiz/${gid}`, { questions }, { headers: { Authorization: `Bearer ${token}` } })
          .then(
            remove(question.id)
          )
      })
      .catch(() => {})
  }

  return (
    <>
      <Card className="root">
        <CardMedia
          className="icon"
          image={q.graphic ? q.graphic : '/none.jpg'}
          title={`${q.question} icon`}
        />
        <div className="details">
          <CardContent className="content">
            <Typography component="h5" variant="h5">
              <Button variant="contained" color="error" style={{ float: 'right' }} onClick={handleToggle}>Delete</Button>
              <Confirmation toggle={handleToggle} yes={handleYes} open={open} desc={`Are you sure you want to delete "${q.question}"?`}/>
              <Link to={`/edit/${gid}/${q.id}`} style={{ textDecoration: 'none', color: '#00008b' }}>
                <span>{q.question}</span>
              </Link>
            </Typography>
            <br />
            <br />
            <Typography variant="subtitle1" color="textSecondary">
                This question takes {q.time_limit} seconds and is worth {q.worth} points
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  )
}

QuestionCard.propTypes = {
  question: PropTypes.object,
  gid: PropTypes.string,
  remove: PropTypes.func
}

export default QuestionCard
