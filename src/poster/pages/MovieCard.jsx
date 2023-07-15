import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import { Check, More } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CardDialog from './CardDialog'
import { useState } from 'react'

export default function MovieCard ({ movie, index }) {
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
        title="Viewed"
        subheader="Date of view"
        // sx={{
        //   backgroundColor: 'green'
        // }}
      />
      <CardMedia
        component="img"
        image={movie.Poster}
        alt={movie.Title}
        height={300}
      />
      <CardContent sx={{
        height: '20%'
      }}>
        <Typography color="black" sx={{
          fontSize: '1rem',
          fontWeight: 'bold'
        }}>
            {index + 1}{'. '}{movie.Title}
        </Typography>
      </CardContent>
    </Card>
    <CardDialog movie={movie} handleClose={handleClose} open={open}/>
    </>
  )
}
