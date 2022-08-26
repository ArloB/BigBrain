import React from 'react'
import PropTypes from 'prop-types'

const QResult = ({ correct }) => {
  return (
    <h1>{`${correct ? 'Correct!' : 'Wrong!'}`}</h1>
  )
}

QResult.propTypes = {
  correct: PropTypes.number
}

export default QResult
