import { Navigate, Route, Routes } from 'react-router-dom'
import { PosterPage } from './../poster/pages/PosterPage'
import { LoginPage } from './../auth/pages/LoginPage'
import { SignUpPage } from './../auth/pages/SignUpPage'
import { useCheckAuth } from '../hooks/useCheckAuth'

export function AppRouter () {
  const { status } = useCheckAuth()

  if (status === 'checking') return <h1>Loading...</h1>

  return (
    <Routes>

      {(status === 'authenticated')
        ? <>
          <Route path='/' element={<PosterPage/>}/>
          <Route path='/*' element={<Navigate to='/'/>}/>
          </>
        : <>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/*' element={<Navigate to='/login'/>}/>
        </>
    }

      <Route path='/*' element={<Navigate to='/'/>}/>

    </Routes>
  )
}
