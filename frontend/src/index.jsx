import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CssBaseline/>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
    />
  </React.StrictMode>
)
