import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Body from './Body'

const AdminLayout = ({ body }) => {
  return (
    <>
      <Header />
      <h1>Admin</h1>
      <Body>{body}</Body>
    </>
  )
}

AdminLayout.propTypes = {
  body: PropTypes.object
}

export default AdminLayout
