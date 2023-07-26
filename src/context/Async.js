import { getMovies, loginWithEmailPassword, logoutFirebase, signInWithGoogle, signUpUserWithEmailAndPass } from '../../firebase/providers'

export const startSignUpWithEmailAndPass = async (email, password, dispatch) => {
  dispatch({ type: 'checkingCredentials' })

  const { ok, uid, msg } = await signUpUserWithEmailAndPass(email, password)

  if (!ok) return dispatch({ type: 'logout', payload: msg })

  dispatch({ type: 'login', payload: { uid, email, movies: [] } })
}

export const startSignInWithGoogle = async (dispatch) => {
  dispatch({ type: 'checkingCredentials' })

  const result = await signInWithGoogle()

  if (!result.ok) {
    dispatch({ type: 'logout', payload: result.errorMessage })
    return
  }

  const { ok, movies } = await getMovies(result.uid, true, result.email)
  if (!ok) return dispatch({ type: 'logout', payload: 'no movies doc' })

  dispatch({ type: 'login', payload: { uid: result.uid, email: result.email, movies } })
}

export const startSignInWithEmailAndPass = async (email, password, dispatch) => {
  dispatch({ type: 'checkingCredentials' })

  const { ok: ok1, uid, msg } = await loginWithEmailPassword(email, password)

  if (!ok1) return dispatch({ type: 'logout', payload: msg })

  const { ok, movies } = await getMovies(uid)
  if (!ok) return dispatch({ type: 'logout', payload: 'no movies doc' })

  return dispatch({ type: 'login', payload: { uid, email, movies } })
}

export const startLoguot = async (dispatch) => {
  await logoutFirebase()

  dispatch({ type: 'logout' })
}

export const startLoadingMovies = async (uid, dispatch) => {
  const { ok, movies } = await getMovies(uid)
  if (!ok) return dispatch({ type: 'logout', payload: 'no movies doc' })
  return dispatch({ type: 'loadMovies', payload: { movies } })
}
