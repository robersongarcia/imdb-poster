import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../../firebase/config'
import { getMovies } from '../../firebase/providers'

export const useCheckAuth = () => {
  const { status, dispatch } = useContext(UserContext)

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch({ type: 'logout' })

      const { uid, email } = user
      const { ok, movies } = await getMovies(uid)

      if (!ok) return dispatch({ type: 'logout' })
      dispatch({ type: 'login', payload: { uid, email, movies } })
    })
  }, [])

  return {
    status
  }
}
