import React from 'react'
import propTypes from 'prop-types'
import Countdown from 'react-countdown'
import Answer from './Answer'

import './Question.css'

import { Button } from '@mui/material'

const Question = ({ questions, pos, prog, answers, time }) => {
  const q = questions[pos]

  console.log(q)

  return (
    <div id='qdiv'>
      <div id='qborder'>
        <h1 id='qtitle'>{q.question}</h1>
      </div>
      <div id='qbody'>
        <div id='qtime'>
          <div id='qcircle'><Countdown date={time} renderer={({ seconds }) => { return <h3>{ seconds }</h3> }}/></div>
        </div>
        <div id='qimg'><div id='qimg2'><img src={`${q.graphic || '/none.jpg'}`} /></div></div>
        <div id='qworth'>
          <h2>{answers}</h2>
          <Button variant='contained' onClick={prog}>Progress</Button>
        </div>
      </div>
      <div id='qanswers'>
        {q.answers.map(e => <Answer key={e.id} data={e} />)}
      </div>
    </div>)
}

Question.propTypes = {
  questions: propTypes.arrayOf(propTypes.object),
  pos: propTypes.number,
  prog: propTypes.func,
  answers: propTypes.number,
  time: propTypes.number
}

export default Question
