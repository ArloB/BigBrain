import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/Layout'
import QuizContainer from '../components/QuizContainer'

import axios from 'axios'
import AuthContext from '../components/AuthProvider'

const AdminPage = (props) => {
  const [list, setList] = useState({ quizzes: [] })
  const token = React.useContext(AuthContext)

  useEffect(() => {
    axios.get('/admin/quiz', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        setList(r.data)
      }).catch(() => {})
  }, [])

  return (
    <AdminLayout body={<QuizContainer quizzes={list}/>}/>
  )
}

export default AdminPage
