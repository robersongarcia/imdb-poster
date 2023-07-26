import { ThemeProvider } from '@mui/material/styles'
import { theme } from './AppTheme'
import { CssBaseline } from '@mui/material'

export function AppTheme ({ children }) {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider >
  )
}
