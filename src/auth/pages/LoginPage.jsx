import { Grid, TextField, Button, Typography, Avatar } from '@mui/material'
import { Google } from '@mui/icons-material'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { startSignInWithEmailAndPass, startSignInWithGoogle } from './../../context/Async'
import { useForm } from '../../hooks/useForm'

import './auth.css'
import { Link } from 'react-router-dom'
import { Footer } from '../../ui/Footer'
import { useSnackbar } from 'notistack'

const formData = {
  email: '',
  password: ''
}

export function LoginPage () {
  const { dispatch } = useContext(UserContext)
  const { email, password, onInputChange } = useForm(formData)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const onSubmit = async (event) => {
    event.preventDefault()
    await startSignInWithEmailAndPass(email, password, dispatch, enqueueSnackbar, closeSnackbar)
    // enqueueSnackbar('message', {
    //   variant: 'success',
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'center'
    //   },
    //   autoHideDuration: 3000
    // })
    // enqueueSnackbar('message', {
    //   variant: 'error',
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'center'
    //   },
    //   autoHideDuration: 3000,
    //   action: (key) => (
    //     <Button sx={{ color: 'white' }} onClick={() => closeSnackbar(key)}>Dismiss</Button>
    //   )
    // })
  }

  return (
    <Grid container flex justifyContent={'center'} bgcolor={'#F1F3F4'} className='backgroundPattern'>
      <Grid item xs={11} sm={6} md={4} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <Grid item sx={
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '1rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            border: '1px solid #ccc',
            width: '100%'

          }
        }>
            <Avatar
              alt='IMDb Logo'
              src='https://raw.githubusercontent.com/robersongarcia/imdb-poster/327bd8de2d4ba923f6cadf5c9fcb7af5d4c300c7/public/imdb-logo2.png'
              sx={{
                width: '6rem',
                height: '6rem',
                border: '1px solid #ccc',
                borderRadius: '10%'
              }}
            />
            <Typography sx={{
              fontSize: '2rem',
              fontWeight: '300',
              color: '#333',
              marginTop: '1rem'
            }} gutterBottom>
              Poster
            </Typography>
            <form onSubmit={onSubmit} style={{
              width: '90%'
            }}>
              <Grid container direction='column' alignItems='center' justifyContent='center' marginTop={3} gap={2}>
              <TextField
                name='email'
                label='Email'
                type='email'
                variant='outlined'
                margin='none'
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
                margin='none'
                fullWidth
                value={password}
                onChange={onInputChange}
              />
              <Grid container direction='column' gap={1} mb={1}>
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
                  onClick={() => startSignInWithGoogle(dispatch, enqueueSnackbar, closeSnackbar)}
                >
                <Google /> Google
                </Button>
              </Grid>
              </Grid>
            </form>
        </Grid>
        <Grid item sx={
                  {
                    width: '100%'
                  }
                }>
                <Typography sx={{
                  fontSize: '1rem',
                  fontFamily: 'Helvetica',
                  fontWeight: 'bold',
                  color: '#333',
                  textAlign: 'center',
                  mt: 3
                }} gutterBottom>
                  Don&apos;t have an account<br/><Link to="/signup">Sign Up</Link>
                </Typography>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  )
}
