import { React } from 'react'
import PropTypes from 'prop-types'
import QuizCard from './QuizCard'

import './index.css'
import { Card, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const QuizContainer = (props) => {
  const quizzes = props.quizzes.quizzes.map(x => <QuizCard quiz={x} key={x.id}/>)

  return (
    <div className="quiz-container">
      <Link to='/create' style={{ textDecoration: 'none' }}>
        <Card id="new-quiz">
          <Typography component='h5' variant='h5'>
            New Quiz
          </Typography>
        </Card>
      </Link>
      {quizzes}
    </div>
  )
}

QuizContainer.propTypes = {
  quizzes: PropTypes.object
}

export default QuizContainer
