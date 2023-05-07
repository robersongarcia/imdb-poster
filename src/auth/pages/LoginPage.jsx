import { Grid, TextField, Button } from '@mui/material'
import { Google } from '@mui/icons-material'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { startSignInWithEmailAndPass, startSignInWithGoogle } from './../../context/Async'
import { useForm } from '../../hooks/useForm'

const formData = {
  email: '',
  password: ''
}

export function LoginPage () {
  const { dispatch } = useContext(UserContext)

  const { email, password, onInputChange } = useForm(formData)

  const onSubmit = (event) => {
    event.preventDefault()

    startSignInWithEmailAndPass(email, password, dispatch)
  }

  return (
    <Grid container>
      <Grid item xs={12} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <h1>Login Page Temporal</h1>
        <form onSubmit={onSubmit}>
          <Grid container direction='column' alignItems='center' justifyContent='center'>
          <TextField
            name='email'
            label='Email'
            type='email'
            variant='outlined'
            margin='normal'
            fullWidth
            autoFocus
            value={email}
            onChange={onInputChange}
          />
          <TextField
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            margin='normal'
            fullWidth
            value={password}
            onChange={onInputChange}
          />
          <Grid container direction='row' gap>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Login
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => startSignInWithGoogle(dispatch)}
          >
           <Google /> Google
          </Button>
          </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}
