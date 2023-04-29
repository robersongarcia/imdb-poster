import { Navigate, Route, Routes } from 'react-router-dom'
import { PosterPage } from './../poster/pages/PosterPage'
import { LoginPage } from './../auth/pages/LoginPage'
import { SignUpPage } from './../auth/pages/SignUpPage'

export function AppRouter () {
  return (
    <Routes>

      <Route path='/' element={<PosterPage/>}/>

      <Route path='/login' element={<LoginPage/>}/>

      <Route path='/signup' element={<SignUpPage/>}/>

      <Route path='/*' element={<Navigate to='/'/>}/>

    </Routes>
  )
}
