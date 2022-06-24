import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <HashRouter>
      <App />
   </HashRouter>
)
