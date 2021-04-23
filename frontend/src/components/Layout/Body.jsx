import React from 'react'
import PropTypes from 'prop-types'

import './Layout.css'

const Body = ({ children }) => {
  return (
    <div className="body">
      {children}
    </div>
  )
}

Body.propTypes = {
  children: PropTypes.object
}

export default Body
