import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import PlayPage from './pages/Play/PlayPage'
import AdminPage from './pages/Admin/AdminPage'

import AuthContext from './components/AuthProvider'
import RestrictedRoute from './components/RestrictedRoute'

import './axios'

function App () {
  const [authDetails, setAuthDetails] = React.useState(
    localStorage.getItem('token')
  )

  const setAuth = (token) => {
    localStorage.setItem('token', token)
    setAuthDetails(token)
  }

  return (
    <AuthContext.Provider value={authDetails}>
      <Router>
        <Switch>
          <Route exact path="/login" render= {(props) => <LoginPage {...props} setAuth={setAuth} /> } />
          <Route exact path="/register" render= {(props) => <RegisterPage {...props} setAuth={setAuth} /> } />
          <Route exact path="/play/:id" component={PlayPage} />
          <RestrictedRoute exact path="/" component={AdminPage} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
