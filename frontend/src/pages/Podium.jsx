import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../components/AuthProvider'
import AdminLayout from '../components/Layout'

const Podium = () => {
  const { sid } = useParams()
  const [data, setData] = useState()

  const token = React.useContext(AuthContext).token

  useEffect(() => {
    axios.get(`/admin/session/${sid}/results`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data))
      .catch(() => {})
  }, [])

  console.log(data)

  return (<AdminLayout body={<><h1>{sid}</h1><p>{JSON.stringify(data)}</p></>}/>)
}

export default Podium
