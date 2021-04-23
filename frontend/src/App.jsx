import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PlayPage from './pages/PlayPage'
import AdminPage from './pages/AdminPage'
import CreateGamePage from './pages/CreateGamePage'
import CreateQuestionPage from './pages/CreateQuestionPage'
import EditGamePage from './pages/EditGamePage'
import EditQuestionPage from './pages/EditQuestionPage'

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
          <Route exact path="/play" component={PlayPage} />
          <Route path="/play/:id" component={PlayPage} />
          <RestrictedRoute exact path="/" component={AdminPage} />
          <RestrictedRoute exact path="/create" component={CreateGamePage} />
          <RestrictedRoute path="/create/:gid" component={CreateQuestionPage} />
          <RestrictedRoute exact path="/edit/:gid" component={EditGamePage} />
          <RestrictedRoute exact path="/edit/:gid/:qid" component={EditQuestionPage} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
