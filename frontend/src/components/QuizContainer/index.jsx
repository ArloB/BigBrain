import { React } from 'react'
import PropTypes from 'prop-types'
import QuizCard from './QuizCard'

import './index.css'
import { Card, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const QuizContainer = ({ quizzes, setQuizzes, ws }) => {
  const removeQuiz = id => {
    setQuizzes([...quizzes.filter(v => v.id !== id)])
  }

  const qs = quizzes.map(quiz => <QuizCard quiz={quiz} key={quiz.id} remove={removeQuiz} ws={ws}/>)

  return (
    <div className="quiz-container">
      <Link to='/create' style={{ textDecoration: 'none' }}>
        <Card id="new-quiz">
          <Typography component='h5' variant='h5'>
            New Quiz
          </Typography>
        </Card>
      </Link>
      {qs}
    </div>
  )
}

QuizContainer.propTypes = {
  quizzes: PropTypes.arrayOf(PropTypes.object),
  setQuizzes: PropTypes.func,
  ws: PropTypes.object
}

export default QuizContainer
