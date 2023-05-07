import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../../firebase/config'

export const useCheckAuth = () => {
  const { status, dispatch } = useContext(UserContext)

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch({ type: 'logout' })

      const { uid, email } = user
      //! TODO check movies in db

      dispatch({ type: 'login', payload: { uid, email, movies: [] } })
    })
  }, [])

  return {
    status
  }
}
