import { useReducer } from 'react'
import { UserContext } from './UserContext'
import { UserReducer } from './UserReducer'

const initialState = {
  uid: null,
  email: null,
  movies: null,
  status: 'checking', // checking, authenticated, not-authenticated
  errorMessage: null
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  return (
    <UserContext.Provider value={{ ...state, state, dispatch }}>
        {children}
    </UserContext.Provider>
  )
}
