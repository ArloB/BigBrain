import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PlayPage from './pages/PlayPage'
import AdminPage from './pages/AdminPage'
import CreateGamePage from './pages/CreateGamePage'
import CreateQuestionPage from './pages/CreateQuestionPage'
import EditGamePage from './pages/EditGamePage'
import EditQuestionPage from './pages/EditQuestionPage'
import PlayingPage from './pages/PlayingPage'
import Podium from './pages/Podium'
import Results from './pages/Results'

import AuthContext from './components/AuthProvider'
import RestrictedRoute from './components/RestrictedRoute'

import './axios'

const wsURL = 'ws://localhost:5005'

function App () {
  const [question, setQuestion] = React.useState({})
  const [correct, setCorrect] = React.useState(-1)
  const [answer, setAnswer] = React.useState([])
  const [authDetails, setAuthDetails] = React.useState(
    {
      token: localStorage.getItem('token'),
      pid: localStorage.getItem('player_id'),
      ws: new WebSocket(wsURL)
    }
  )

  const setToken = (token) => {
    localStorage.setItem('token', token)

    const cur = authDetails
    cur.token = token

    setAuthDetails({ ...cur })
  }

  const setPlayerID = (pid) => {
    localStorage.setItem('player_id', pid)

    const cur = authDetails
    cur.pid = pid

    setAuthDetails({ ...cur })
  }

  useEffect(() => {
    authDetails.ws.onopen = () => {
      console.log('connected')
      if (authDetails.pid) {
        authDetails.ws.send(JSON.stringify({ type: 'preconn', pid: authDetails.pid }))
      }
    }

    authDetails.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data)

      console.log(data)

      switch (data.type) {
        case 'pjoinr':
          setPlayerID(data.pid)
          break
        case 'advance':
          setQuestion(data.question)
          setCorrect(-1)
          setAnswer([])
          break
        case 'timeup':
          setCorrect(String(data.correct) === 'true' ? 1 : 0)
          break
        case 'finished':
          window.location.replace(`/results/${authDetails.pid}`)
          localStorage.removeItem('player_id')
          setAuthDetails({ ...authDetails.pid = null })
          authDetails.ws.close()
      }
    }

    return () => {
      authDetails.ws.onclose = () => {
        authDetails.ws = new WebSocket(wsURL)
        if (authDetails.pid) {
          authDetails.ws.send(JSON.stringify({ type: 'preconn', pid: authDetails.pid }))
        }
        setAuthDetails({ ...authDetails })
      }
    }
  }, [authDetails.ws.onopen, authDetails.ws.onclose])

  return (
    <AuthContext.Provider value={authDetails}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setAuth={setToken} />} />
          <Route path="/register" element={<RegisterPage setAuth={setToken} />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/play/:id" element={<PlayPage question={question} answer={answer} setAnswer={setAnswer} correct={correct} setCorr={setCorrect} />} />
          <Route path="/results/:pid" element={<Results />} />
          <Route path="/" element={<RestrictedRoute/>}>
            <Route path="/" element={<AdminPage/>} />
          </Route>
          <Route path="/create" element={<RestrictedRoute/>}>
            <Route path="/create" element={<CreateGamePage />} />
          </Route>
          <Route path="/create/:gid" element={<RestrictedRoute/>}>
            <Route path="/create/:gid" element={<CreateQuestionPage />} />
          </Route>
          <Route path="/edit/:gid" element={<RestrictedRoute/>}>
            <Route path="/edit/:gid" element={<EditGamePage />} />
          </Route>
          <Route path="/edit/:gid/:qid" element={<RestrictedRoute/>}>
            <Route path="/edit/:gid/:qid" element={<EditQuestionPage/>} />
          </Route>
          <Route path="/playing/:gid" element={<RestrictedRoute/>}>
            <Route path="/playing/:gid" element={<PlayingPage />} />
          </Route>
          <Route path="/podium/:sid" element={<RestrictedRoute/>}>
            <Route path="/podium/:sid" element={<Podium />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
