import { Button, Card, Container, Grid, Paper, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { startLoguot } from '../../context/Async'

// import data from '../../data/movies_id.json'
import dataMovies from '../../data/movies_data.json'
import '../../main.css'
import MovieCard from './MovieCard'

// { /* <Button onClick={logout} variant='outlined' color='error'>Logout</Button> */ }
// { /* <Box>
//           {moviesInfo.map((movie, index) => (
//             <Box key={movie.imdbID}>
//               <p>{index + 1 }</p>
//               <img src={movie.Poster} alt={movie.Title} />
//               <p>{movie.Title}</p>
//             </Box>))
//           }
//         </Box> */ }

export function PosterPage () {
  const { dispatch, movies } = useContext(UserContext)

  const logout = () => {
    startLoguot(dispatch)
  }

  console.log({ movies })

  return (
    <Paper sx={{
      height: '100%',
      display: 'flex',
      direction: 'column'
    }} className='posterMain-background'>
      <Container>
          <Grid item xs={12} mt={3} sx={{
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            <Typography
              sx={
                {
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  textShadow: '-0.7px 0.7px 0 #000,0.7px 0.7px 0 #000,0.7px -0.7px 0 #000,-0.7px -0.7px 0 #000',
                  display: 'inline-block'
                }
              }
            >TOP 100 Movies List</Typography>
            <Button onClick={logout} sx={{
              color: '#04151F'
            }}>Logout</Button>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent: 'space-around',
            direction: 'row',
            flexWrap: 'wrap',
            mt: 3
          }}>
            {
              dataMovies.map((movie, index) => (
                <MovieCard key={movie.imdbID} movie={movie} index={index}/>
              ))
            }
          </Grid>
      </Container>
    </Paper>
  )
}
