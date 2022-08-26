import React, { useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'

import './QuizCard.css'
import AuthContext from '../AuthProvider'
import Confirmation from '../Confirmation'

const QuizCard = ({ quiz, remove, ws }) => {
  const [QCount, setQCount] = React.useState(0)
  const [Time, setTime] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [session, setSession] = React.useState(0)

  const token = React.useContext(AuthContext).token

  useEffect(() => {
    axios.get(`/admin/quiz/${quiz.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        let time = 0

        r.data.questions.forEach(x => {
          time += parseInt(x.time_limit)
        })

        setQCount(r.data.questions.length)
        setTime(time)
        setSession(r.data.active)
      }).catch(() => {})
  }, [])

  const handleToggle = () => {
    setOpen(!open)
  };

  const navigate = useNavigate()

  const startGame = () => {
    axios.post(`/admin/quiz/${quiz.id}/start`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => ws.send(JSON.stringify({ type: 'started', sid: res.data.sessionid })))
      .then(() => navigate(`/playing/${quiz.id}/`))
      .catch(() => {})
  }

  const handleYes = () => {
    handleToggle()

    axios.delete(`/admin/quiz/${quiz.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        remove(quiz.id)
      })
      .catch(() => {})
  }

  return (
    <>
      <Card className="root">
        <CardMedia
          className="icon"
          image={quiz.thumbnail || '/none.jpg'}
          title={`${quiz.name} icon`}
        />
        <div className="details">
          <CardContent className="content">
            <Typography component="h5" variant="h5">
              <Link to='/'>
                <Button variant="contained" color="error" style={{ float: 'right' }} onClick={handleToggle}>Delete</Button>
              </Link>
              {session
                ? <Button variant="contained" color="primary" style={{ float: 'right', marginRight: '5px' }} onClick={navigate(`/playing/${quiz.id}/`)}>View</Button>
                : <Button variant="contained" color="primary" style={{ float: 'right', marginRight: '5px' }} onClick={startGame}>Start</Button>
              }
              <Confirmation toggle={handleToggle} yes={handleYes} open={open} desc={`Are you sure you want to delete "${quiz.name}"?`}/>
              <Link to={`/edit/${quiz.id}`} style={{ textDecoration: 'none', color: '#00008b' }}>
                <span>{quiz.name}</span>
              </Link>
            </Typography>
            <br />
            <Typography variant="subtitle1" color="textSecondary">
              This quiz has {QCount} question{QCount !== 1 ? 's' : ''} and takes {Time} second{Time !== 1 ? 's' : ''}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </>
  )
}

QuizCard.propTypes = {
  quiz: PropTypes.object,
  remove: PropTypes.func,
  ws: PropTypes.object
}

export default QuizCard
