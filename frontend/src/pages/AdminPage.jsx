import React, { useState, useEffect } from 'react'

import AdminLayout from '../components/Layout'
import QuizContainer from '../components/QuizContainer'

import axios from 'axios'
import AuthContext from '../components/AuthProvider'

const AdminPage = () => {
  const [quizzes, setQuizzes] = useState([])
  const token = React.useContext(AuthContext).token
  const ws = React.useContext(AuthContext).ws

  useEffect(() => {
    axios.get('/admin/quiz', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        setQuizzes(r.data.quizzes)
      }).catch(() => {})
  }, [])

  return (
    <AdminLayout body={<QuizContainer quizzes={quizzes} setQuizzes={setQuizzes} ws={ws}/>}/>
  )
}

export default AdminPage
