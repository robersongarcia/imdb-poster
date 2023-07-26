import { Grid, TextField, Button, Avatar, Typography } from '@mui/material'
import { useState, useContext } from 'react'
import { useForm } from './../../hooks/useForm'
import { startSignUpWithEmailAndPass } from '../../context/Async'
import { UserContext } from '../../context/UserContext'

import './auth.css'
import { Link } from 'react-router-dom'
import { Footer } from '../../ui/Footer'
import { useSnackbar } from 'notistack'

const formData = {
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @.'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.']
}

export function SignUpPage () {
  const { dispatch } = useContext(UserContext)
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const { isFormValid, onInputChange, emailValid, passwordValid, email, password } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return

    startSignUpWithEmailAndPass(email, password, dispatch, enqueueSnackbar, closeSnackbar)
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
              src='/imdb-logo2.png'
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
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={formSubmitted && emailValid}
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
                error={!!passwordValid && formSubmitted}
                helperText={formSubmitted && passwordValid}
              />
              <Grid container direction='column' justifyContent='center' mb={1}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
              >
                Sign Up
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
                  If have an account<br/><Link to="/login">Login</Link>
                </Typography>
        </Grid>
        <Footer/>
      </Grid>
    </Grid>
  )
}
