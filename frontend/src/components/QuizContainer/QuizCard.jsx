import React, { useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'

import { Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core'

import './QuizCard.css'
import AuthContext from '../AuthProvider'
import Confirmation from '../Confirmation'

const QuizCard = (props) => {
  const q = props.quiz
  const [QCount, setQCount] = React.useState(0)
  const [Time, setTime] = React.useState(0)
  const [open, setOpen] = React.useState(false)

  const token = React.useContext(AuthContext)

  useEffect(() => {
    axios.get(`/admin/quiz/${q.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        let time = 0

        r.data.questions.forEach(x => {
          time += parseInt(x.time_limit)
        })

        setQCount(r.data.questions.length)
        setTime(time)
      }).catch(() => {})
  }, [])

  const handleToggle = () => {
    setOpen(!open)
  };

  const history = useHistory()

  const handleYes = () => {
    handleToggle()

    axios.delete(`/admin/quiz/${q.id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(_ => {
        history.push('/')
      })
      .catch(() => {})
  }

  return (
    <>
      <Card className="root">
        <CardMedia
          className="icon"
          image={q.thumbnail ? q.thumbnail : '/none.jpg'}
          title={`${q.name} icon`}
        />
        <div className="details">
          <CardContent className="content">
            <Typography component="h5" variant="h5">
              <Link to='/'>
                <Button variant="contained" color="secondary" style={{ float: 'right' }} onClick={handleToggle}>Delete</Button>
              </Link>
              <Confirmation toggle={handleToggle} yes={handleYes} open={open} desc={`Are you sure you want to delete "${q.name}"?`}/>
              <Link to={`/edit/${q.id}`} style={{ textDecoration: 'none', color: '#00008b' }}>
                <span>{q.name}</span>
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
  quiz: PropTypes.object
}

export default QuizCard
