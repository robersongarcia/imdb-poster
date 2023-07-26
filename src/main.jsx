// import React from 'react'
import ReactDOM from 'react-dom/client'
import PosterApp from './PosterApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserProvider'

import './main.css'
import { AppTheme } from './theme/AppThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AppTheme>
    <BrowserRouter>
      <UserProvider>
        <PosterApp />
      </UserProvider>
    </BrowserRouter>
  </AppTheme>
  // </React.StrictMode>
)
