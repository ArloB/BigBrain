import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'

import './Layout.css'

const AdminLayout = ({ header, body }) => {
  return (
    <>
      {header || <Header />}
      <Body>{body}</Body>
    </>
  )
}

AdminLayout.defaultProps = {
  header: null
}

AdminLayout.propTypes = {
  header: PropTypes.object,
  body: PropTypes.object
}

export default AdminLayout
