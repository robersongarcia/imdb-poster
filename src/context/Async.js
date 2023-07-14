import { loginWithEmailPassword, logoutFirebase, signInWithGoogle, signUpUserWithEmailAndPass } from '../../firebase/providers'

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

  //! TODO - check user movies in DB

  dispatch({ type: 'login', payload: { uid: result.uid, email: result.email, movies: [] } })
}

export const startSignInWithEmailAndPass = async (email, password, dispatch) => {
  dispatch({ type: 'checkingCredentials' })

  const { ok, uid, msg } = await loginWithEmailPassword(email, password)

  if (!ok) return dispatch({ type: 'logout', payload: msg })

  //! TODO - check user movies in DB
  return dispatch({ type: 'login', payload: { uid, email, movies: [] } })
}

export const startLoguot = async (dispatch) => {
  await logoutFirebase()

  dispatch({ type: 'logout' })
}