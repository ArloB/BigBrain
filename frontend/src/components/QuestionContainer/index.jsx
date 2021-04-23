import { React } from 'react'
import PropTypes from 'prop-types'
import QuestionCard from './QuestionCard'

import './index.css'
import { Card, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const QuestionContainer = (props) => {
  const questions = props.questions.map(x => <QuestionCard question={x} key={x.id} gid={props.gid}/>)

  return (
    <div className="question-container">
      <Link to={`/create/${props.gid}`} style={{ textDecoration: 'none' }}>
        <Card id="new-question">
          <Typography component='h5' variant='h5'>
            New Question
          </Typography>
        </Card>
      </Link>
      {questions}
    </div>
  )
}

QuestionContainer.propTypes = {
  questions: PropTypes.array,
  gid: PropTypes.string
}

export default QuestionContainer
