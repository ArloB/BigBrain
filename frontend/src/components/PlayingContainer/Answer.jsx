import React from 'react'
import PropTypes from 'prop-types'

import './Question.css'

import colours from '../colours'

const Answer = ({ data }) => {
  return (
  <div className='abox' style={{ backgroundColor: colours[data.id], color: 'white' }}>
    <h1 >{data.answer}</h1>
  </div>
  )
}

Answer.propTypes = {
  data: PropTypes.object
}

export default Answer
