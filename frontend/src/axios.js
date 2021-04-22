import axios from 'axios';
import { toast } from 'react-toastify'

axios.defaults.baseURL = 'http://localhost:5005'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.delete['Content-Type'] = 'application/json'

const errHandler = (err) => {
  let message = 'Something has gone wrong'

  if (err.response.data.error) {
    message = err.response.data.error
  }

  toast.error(message)

  return Promise.reject(err)
}

const resHandler = (res) => {
  return res;
}

axios.interceptors.response.use(resHandler, errHandler)
