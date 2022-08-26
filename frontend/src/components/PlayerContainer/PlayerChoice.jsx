import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// eslint-disable-next-line no-unused-vars
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

import colours from '../colours'
import './Choice.css'

const PlayerChoice = ({ question, pid, answer, setAnswer }) => {
  const handleSelection = (_, newSelection) => {
    const ans = question.multiple_choice ? newSelection : [newSelection]

    setAnswer(ans)

    axios.put(`/play/${pid}/answer`, { answerIds: ans })
      .catch(() => {})
  }

  return (
    <div className='choiceroot'>
      {
        question.answers
          ? (
            <div className='btn2'><div className='btn3'>
              <ToggleButtonGroup value={answer} onChange={handleSelection} {...(!question.multiple_choice ? { exclusive: true } : {})} className='btns'>
                {question.answers.map(q => <ToggleButton key={q} value={q} style={{ backgroundColor: colours[q] }} />) }
              </ToggleButtonGroup>
            </div></div>
            )
          : ''
      }
    </div>
  )
}

PlayerChoice.propTypes = {
  question: PropTypes.object,
  pid: PropTypes.string,
  score: PropTypes.number,
  answer: PropTypes.array,
  setAnswer: PropTypes.func
}

export default PlayerChoice
