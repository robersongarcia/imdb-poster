import React from 'react'
import ReactDOM from 'react-dom/client'
import PosterApp from './PosterApp.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PosterApp />
    </BrowserRouter>
  </React.StrictMode>
)
