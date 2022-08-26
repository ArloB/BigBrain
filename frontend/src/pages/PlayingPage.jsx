import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import AdminLayout from '../components/Layout'
import AuthContext from '../components/AuthProvider'
import PlayingHeader from '../components/Layout/PlayingHeader'

import Question from '../components/PlayingContainer/Question'
import Lobby from '../components/PlayingContainer/Lobby'

// import { Button } from '@mui/material'

const PlayingPage = () => {
  const [sid, setSid] = React.useState(-1)
  const [status, setStatus] = React.useState(false)
  const [session, setSession] = React.useState({ position: -2, questions: [] })
  const [players, setPlayers] = React.useState([])
  const [answers, setAnswers] = React.useState(0)

  const { gid } = useParams()

  const token = React.useContext(AuthContext).token
  const ws = React.useContext(AuthContext).ws

  const navigate = useNavigate()

  const h = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    ws.onmessage = msg => {
      const data = JSON.parse(msg.data)

      switch (data.type) {
        case 'joined':
          setPlayers(old => [...old, data.name])
          break
        case 'answered':
          setAnswers(answers + 1)
      }
    }

    axios.get(`/admin/quiz/${gid}`, h)
      .then(res => {
        setSid(res.data.active)

        if (!res.data.active) {
          navigate('/')
          throw Error()
        } else if (session.position !== -2) {
          throw Error()
        }

        return res.data.active
      }).then(id => {
        axios.get(`/admin/session/${id}/status`, h)
          .then(res => {
            setSession(res.data.results)
          })
      }).catch(() => {})
  }, [])

  const progress = () => {
    axios.post(`admin/quiz/${sid}/advance`, {}, h)
      .then(res => {
        if (res.data.stage === session.questions.length) {
          navigate(`/podium/${sid}`)
        } else {
          session.position = res.data.stage
          setSession({ ...session })
          setAnswers(0)
        }
      }).catch(() => {})
  }

  const stopGame = () => {
    axios.post(`/admin/quiz/${sid}/end`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => { setStatus(true) })
      .catch(() => {})
  }

  return (
    <AdminLayout header={<PlayingHeader sid={sid} stop={stopGame} />} body={
      <>
        {status
          ? <Navigate to={`/podium/${sid}`} />
          : session.position >= 0 ? <Question questions={session.questions} pos={session.position} prog={progress} answers={answers} time={Date.now() + session.questions[session.position].time_limit * 1000}/> : <Lobby prog={progress} players={players}/>
        }
      </>
    } />
  )
}

export default PlayingPage
