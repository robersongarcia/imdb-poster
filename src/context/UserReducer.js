// const initialState = {
//   uid: null,
//   email: null,
//   movies: null,
//   status: null, // checking, authenticated, not-authenticated
//   errorMessage: null
// }

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'checkingCredentials':
      return {
        ...state,
        status: 'checking'
      }

    case 'logout':
      return {
        status: 'not-authenticated',
        errorMessage: action.payload || null,
        uid: null,
        email: null,
        movies: null
      }

    case 'login':
      return {
        status: 'authenticated',
        errorMessage: null,
        uid: action.payload.uid,
        email: action.payload.email,
        movies: action.payload.movies
      }

    case 'setUser':
      return state

    case 'loadMovies':
      return {
        ...state,
        movies: action.payload.movies
      }

    default:
      return state
  }
}
