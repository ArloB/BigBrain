import { React } from 'react'
import PropTypes from 'prop-types'
import QuestionCard from './QuestionCard'

import './index.css'
import { Card, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const QuestionContainer = ({ questions, gid, remove }) => {
  return (
    <div className="question-container">
      <Link to={`/create/${gid}`} style={{ textDecoration: 'none' }}>
        <Card id="new-question">
          <Typography component='h5' variant='h5'>
            New Question
          </Typography>
        </Card>
      </Link>
      {questions.map(question => <QuestionCard question={question} key={question.id} gid={gid} remove={remove}/>)}
    </div>
  )
}

QuestionContainer.propTypes = {
  questions: PropTypes.array,
  gid: PropTypes.string,
  remove: PropTypes.func
}

export default QuestionContainer
