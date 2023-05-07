import { Button } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { startLoguot } from '../../context/Async'

export function PosterPage () {
  const { dispatch } = useContext(UserContext)

  const logout = () => {
    startLoguot(dispatch)
  }

  return (
    <div>
        <h1>Poster Page</h1>
        <Button onClick={logout} variant='outlined' color='error'>Logout</Button>
    </div>
  )
}
