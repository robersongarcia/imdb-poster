import { UserContext } from './UserContext'
import { useState } from 'react'

const initialState = {
  uid: '',
  email: '',
  movies: '',
  status: '',
  errorMessage: ''
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState)

  return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
  )
}
