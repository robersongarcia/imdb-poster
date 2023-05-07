import { Grid, TextField, Button } from '@mui/material'
import { useState, useContext } from 'react'
import { useForm } from './../../hooks/useForm'
import { startSignUpWithEmailAndPass } from '../../context/Async'
import { UserContext } from '../../context/UserContext'

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

  const [formSubmitted, setFormSubmitted] = useState(false)
  const { isFormValid, onInputChange, emailValid, passwordValid, email, password } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)

    if (!isFormValid) return

    startSignUpWithEmailAndPass(email, password, dispatch)
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
        <h1>SignUp Page Temporal</h1>
        <form onSubmit={onSubmit}>
          <Grid container direction='column' alignItems='center' justifyContent='center'>
          <TextField
            name='email'
            label='Email'
            type='email'
            variant='outlined'
            margin='normal'
            fullWidth
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={emailValid}
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
            error={!!passwordValid && formSubmitted}
            helperText={passwordValid}
          />
          <Grid container direction='row' justifyContent='center'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            SignUp!!
          </Button>
          </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}
