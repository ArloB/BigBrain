import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from './AuthProvider'

const RestrictedRoute = () => {
  const token = React.useContext(AuthContext).token

  return token ? <Outlet /> : <Navigate to="/login"/>
}

export default RestrictedRoute
