import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CardDialog from './CardDialog'
import { useState } from 'react'

export default function MovieCard ({ movie, index, userMovies }) {
  const [open, setOpen] = useState(false)

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
          <IconButton aria-label="settings" onClick={handleClickOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={`${index + 1}. Viewed    ✔️`}
        // title={`${index + 1}. Not Viewed    ❌`}
        // sx={{
        //   backgroundColor: 'green'
        // }}
        titleTypographyProps={{
          fontSize: '1.2rem',
          fontWeight: '300'
        }}
      />
      <CardMedia
        component="img"
        image={movie.Poster}
        alt={movie.Title}
        height={300}
      />
    </Card>
    <CardDialog movie={movie} handleClose={handleClose} open={open}/>
    </>
  )
}
