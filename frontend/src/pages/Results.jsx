import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

const Results = () => {
  const { pid } = useParams()
  const [data, setData] = React.useState()

  // const token = React.useContext(AuthContext).token

  React.useEffect(() => {
    axios.get(`/play/${pid}/results`)
      .then(res => setData(res.data))
      .catch(() => {})
  }, [])

  console.log(data)

  return (<><h1>{pid}</h1><p>{JSON.stringify(data)}</p></>)
}

export default Results
