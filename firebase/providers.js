import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { FirebaseAuth, FirebaseDB } from './config'
import { doc, getDoc, setDoc } from 'firebase/firestore/lite'

export const signUpUserWithEmailAndPass = async (email, password) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid } = resp.user

    const { ok, msg } = await createUserInDb(uid, email)

    if (!ok) {
      return {
        ok: false,
        msg
      }
    }

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

export const createUserInDb = async (uid, email) => {
  try {
    await setDoc(doc(FirebaseDB, 'users', uid), {
      email,
      movies: []
    })

    return {
      ok: true,
      msg: 'User created in DB'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      msg: error.message
    }
  }
}

export const getMovies = async (uid, google = false, email = '') => {
  try {
    const docSnap = await getDoc(doc(FirebaseDB, 'users', uid))

    if (docSnap.exists()) {
      return {
        ok: true,
        movies: docSnap.data().movies
      }
    } else {
      // docSnap.data() will be undefined in this case
      if (google) {
        const { ok, msg } = await createUserInDb(uid, email)
        if (!ok) {
          return {
            ok: false,
            msg
          }
        }
        return {
          ok: true,
          movies: []
        }
      }
      console.error('No such document!')
      return {
        ok: false,
        movies: []
      }
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      msg: error.message
    }
  }
}

export const addMovie = async (uid, movieId) => {
  try {
    const { ok, movies } = await getMovies(uid)

    if (!ok) {
      return {
        ok: false,
        msg: 'Error getting movies'
      }
    }

    if (movies.includes(movieId)) {
      return {
        ok: false,
        msg: 'Movie already added'
      }
    }

    movies.push({
      movieId,
      watchedAt: new Date()
    })

    await setDoc(doc(FirebaseDB, 'users', uid), {
      movies
    }, { merge: true })

    return {
      ok: true,
      msg: 'Movie added',
      movies
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      msg: error.message
    }
  }
}
