import { Box, Button, Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { startLoguot } from '../../context/Async'

// import data from '../../data/movies_id.json'
import movies from '../../data/movies_data.json'

export function PosterPage () {
  const { dispatch } = useContext(UserContext)
  // const [moviesInfo, setmoviesInfo] = useState([])

  const logout = () => {
    startLoguot(dispatch)
  }

  // const getMoviesInfo = async () => {
  //   data.forEach(async (movie) => {
  //     const requestOptions = {
  //       method: 'GET',
  //       redirect: 'follow'
  //     }

  //     fetch(`http://www.omdbapi.com/?apikey=48a16471&i=${movie}`, requestOptions)
  //       .then(response => response.json())
  //       .then(result => setmoviesInfo(prev => [...prev, result]))
  //       .catch(error => console.log('error', error))
  //   })
  //   console.log({ moviesInfo })
  // }

  useEffect(() => {
    // getMoviesInfo()
  }, [])

  return (
    <Grid container >
        <Button onClick={logout} variant='outlined' color='error'>Logout</Button>
        <Box>
          {movies.map((movie, index) => (
            <Box key={movie.imdbID}>
              <p>{index + 1 }</p>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Title}</p>
            </Box>))
          }
        </Box>
    </Grid>
  )
}
