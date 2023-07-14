import React from 'react'
import ReactDOM from 'react-dom/client'
import PosterApp from './PosterApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserProvider'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PosterApp />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
