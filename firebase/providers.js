import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { FirebaseAuth } from './config'

export const signUpUserWithEmailAndPass = async (email, password) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid } = resp.user

    return {
      ok: true,
      uid
    }
  } catch (error) {
    return {
      ok: false,
      msg: error.message
    }
  }
}

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)

    // const credentials = GoogleAuthProvider.credentialFromResult(result); obtengo tokens de aquí para hacer cosas

    const { email, uid } = result.user

    return {
      ok: true,
      // user info
      email,
      uid
    }
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message

    return {
      ok: false,
      errorCode,
      errorMessage
    }
  }
}

export const loginWithEmailPassword = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid } = resp.user

    return {
      ok: true,
      uid
    }
  } catch (error) {
    return {
      ok: false, errorMessage: error.message
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
