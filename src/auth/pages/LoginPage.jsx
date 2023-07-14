import { Grid, TextField, Button, Typography, Avatar } from '@mui/material'
import { Google } from '@mui/icons-material'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { startSignInWithEmailAndPass, startSignInWithGoogle } from './../../context/Async'
import { useForm } from '../../hooks/useForm'

import './auth.css'
import { Link } from 'react-router-dom'

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
    <Grid container flex justifyContent={'center'}>
      <div className='background-form'></div>
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
              src='/imdb-logo.png'
              variant='rounded'
              sx={{
                width: '6rem',
                height: '6rem',
                border: '1px solid #ccc'
              }}
            />
            <Typography sx={{
              fontSize: '1.5rem',
              fontFamily: 'Helvetica',
              fontWeight: 'bold',
              color: '#333',
              marginTop: '1rem'
            }} gutterBottom>
              IMDb Posters
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
              <Grid container direction='column' gap={1}>
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
            <Grid item sx={
                {
                  width: '90%'
                }
              }>
              <Typography sx={{
                fontSize: '0.6rem',
                fontFamily: 'Helvetica',
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'right',
                mt: 3
              }} gutterBottom>
                if you don&apos;t have an account, please <Link to="/signup">sign up</Link>
              </Typography>
              </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
