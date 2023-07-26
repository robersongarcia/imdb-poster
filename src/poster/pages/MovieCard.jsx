import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CardDialog from './CardDialog'
import { useEffect, useState } from 'react'

export default function MovieCard ({ movie, index, userMovies, setTrigger }) {
  const [open, setOpen] = useState(false)
  const [viewed, setViewed] = useState(false)

  useEffect(() => {
    if (userMovies) {
      for (let i = 0; i < userMovies.length; i++) {
        if (userMovies[i].movieId === movie.imdbID) { setViewed(true) }
      }
    }
  }, [userMovies, movie.imdbID])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
    <Card sx={{ maxWidth: 200, mb: 3 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClickOpen} >
            <MoreVertIcon sx={{
              color: 'black'
            }}/>
          </IconButton>
        }
        title={`${index + 1}. ${viewed ? 'Viewed ✔️' : 'Not Viewed ❌'}`}
        // title={`${index + 1}. Viewed    ✔️`}
        // title={`${index + 1}. Not Viewed    ❌`}
        // sx={{
        //   backgroundColor: 'green'
        // }}
        titleTypographyProps={{
          fontSize: '1rem',
          fontWeight: '300'
        }}
        sx={{
          backgroundColor: viewed ? '#fee076' : '#FFF'
        }}
      />
      <CardMedia
        component="img"
        image={movie.Poster}
        alt={movie.Title}
        height={300}
      />
    </Card>
    <CardDialog movie={movie} handleClose={handleClose} open={open} setTrigger={setTrigger}/>
    </>
  )
}
