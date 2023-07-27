// import React from 'react'
import ReactDOM from 'react-dom/client'
import PosterApp from './PosterApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserProvider'

import './main.css'
import { AppTheme } from './theme/AppThemeProvider.jsx'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AppTheme>
    <SnackbarProvider>
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/react-vite-gh-pages/'}>
      <UserProvider>
        <PosterApp />
      </UserProvider>
    </BrowserRouter>
    </SnackbarProvider>
  </AppTheme>
  // </React.StrictMode>
)
