import { getMovies, loginWithEmailPassword, logoutFirebase, signInWithGoogle, signUpUserWithEmailAndPass } from '../../firebase/providers'

export const startSignUpWithEmailAndPass = async (email, password, dispatch, enqueueSnackbar, closeSnackbar) => {
  dispatch({ type: 'checkingCredentials' })

  const { ok, uid, msg } = await signUpUserWithEmailAndPass(email, password)

  if (!ok) {
    enqueueSnackbar('Error on signup attempt', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000
    })
    return dispatch({ type: 'logout', payload: msg })
  }

  enqueueSnackbar('Login succesful!', {
    variant: 'success',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 2000
  })

  dispatch({ type: 'login', payload: { uid, email, movies: [] } })
}

export const startSignInWithGoogle = async (dispatch, enqueueSnackbar, closeSnackbar) => {
  dispatch({ type: 'checkingCredentials' })

  const result = await signInWithGoogle()

  if (!result.ok) {
    enqueueSnackbar('Error on login attempt', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000
    })
    dispatch({ type: 'logout', payload: result.errorMessage })
    return
  }

  const { ok, movies } = await getMovies(result.uid, true, result.email)
  if (!ok) {
    enqueueSnackbar('Error on login attempt', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000
    })
    return dispatch({ type: 'logout', payload: 'no movies doc' })
  }

  enqueueSnackbar('Login succesful!', {
    variant: 'success',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 2000
  })

  dispatch({ type: 'login', payload: { uid: result.uid, email: result.email, movies } })
}

export const startSignInWithEmailAndPass = async (email, password, dispatch, enqueueSnackbar, closeSnackbar) => {
  dispatch({ type: 'checkingCredentials' })

  const { ok: ok1, uid, msg } = await loginWithEmailPassword(email, password)

  if (!ok1) {
    enqueueSnackbar('Error on login attempt', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000
    })
    return dispatch({ type: 'logout', payload: msg })
  }

  const { ok, movies } = await getMovies(uid)
  if (!ok) {
    enqueueSnackbar('Error on login attempt', {
      variant: 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000

    })
    return dispatch({ type: 'logout', payload: 'no movies doc' })
  }

  enqueueSnackbar('Login succesful!', {
    variant: 'success',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 2000
  })

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
