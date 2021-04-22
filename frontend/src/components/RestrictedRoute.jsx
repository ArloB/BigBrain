import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthContext from './AuthProvider'

const RestrictedRoute = (props) => {
  const token = React.useContext(AuthContext)
  if (!token) {
    return <Redirect to="/login"/>
  } else {
    return <Route {...props} />
  }
}

export default RestrictedRoute
