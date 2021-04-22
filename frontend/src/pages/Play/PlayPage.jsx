import React from 'react'
import PropTypes from 'prop-types'

const PlayPage = ({ match }) => {
  const id = match.params.id
  return (
    <h1>Play {id}</h1>
  )
}

PlayPage.propTypes = {
  match: PropTypes.object
}

export default PlayPage
