import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'

import './Layout.css'

const AdminLayout = ({ body }) => {
  return (
    <>
      <Header />
      <Body>{body}</Body>
    </>
  )
}

AdminLayout.propTypes = {
  body: PropTypes.object
}

export default AdminLayout
