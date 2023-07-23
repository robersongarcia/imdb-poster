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
      direction: 'column',
      backgroundColor: '#F1F3F4'
    }}>
      <Grid container>
          <Grid item sx={
            {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              mt: 3
            }
          }>
            <Typography
              sx={{
                fontSize: '2.5rem',
                fontWeight: '250',
                textAlign: 'center',
                lineHeight: '1.2'
              }}
            >TOP 100 MOVIES BUCKET LIST</Typography>
            <Typography>THE HIGUEST RATED <span style={{
              fontWeight: 'bold'
            }}>IMDb</span> CROWD FAVORITES</Typography>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            direction: 'row',
            flexWrap: 'wrap',
            mt: 3,
            mb: 3,
            gap: 1,
            ml: 2,
            mr: 2
          }}>
            {
              dataMovies.map((movie, index) => (
                <MovieCard key={movie.imdbID} movie={movie} index={index}/>
              ))
            }
          </Grid>
      </Grid>
    </Paper>
  )
}
