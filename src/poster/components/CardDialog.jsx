import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { addMovie, removeMovie } from '../../../firebase/providers'
import { Loading } from '../../ui/Loading'
import { useSnackbar } from 'notistack'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

function BootstrapDialogTitle (props) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose
        ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'black'
          }}
        >
          <CloseIcon />
        </IconButton>
          )
        : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
}

export default function CardDialog ({ open, handleClose, movie, setTrigger, viewed }) {
  const { uid, dispatch } = useContext(UserContext)
  const [disable, setDisable] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleViewed = async () => {
    setDisable(true)
    if (!viewed) {
      const { ok, msg, movies: result } = await addMovie(uid, movie.imdbID)
      if (!ok) {
        console.log('Error')
        console.log(msg)
        setDisable(false)
        handleClose()
        enqueueSnackbar('Error on marking movie', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center'
          },
          autoHideDuration: 2000
        })
        return
      }
      dispatch({ type: 'loadMovies', payload: { result } })
      setDisable(false)
      setTrigger(true)
      enqueueSnackbar('Movie marked as viewed', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        autoHideDuration: 2000
      })
      handleClose()
      return
    }

    const { ok, msg, movies } = await removeMovie(uid, movie.imdbID)
    if (!ok) {
      console.log('Error')
      console.log(msg)
      setDisable(false)
      handleClose()
      enqueueSnackbar('Error on removing movie', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        autoHideDuration: 2000
      })
      return
    }
    dispatch({ type: 'loadMovies', payload: { movies } })
    setDisable(false)
    setTrigger(true)
    enqueueSnackbar('Movie marked as not viewed', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      autoHideDuration: 2000
    })
    handleClose()
  }

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={
          {
            backgroundColor: '#F1F3F4'
          }
        }>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img src={movie.Poster} alt={movie.Title} style={{
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
              borderRadius: '7px'
            }}/>
            <Typography gutterBottom variant="h5" component="div" sx={{
              mt: 2,
              fontWeight: '400'
            }}>
              {movie.Title}
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{
          backgroundColor: '#F1F3F4'
        }}>
          <Typography sx={{
            mb: 2
          }}
            variant='body1'
          >
            <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Synopsis: </span>{movie.Plot}
          </Typography>
          <Typography>
            <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Cast: </span>{movie.Actors}
            <br />
            <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Director: </span>{movie.Director}
            <br />
            <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Duration: </span>{movie.Runtime}<br/><span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Year: </span>{movie.Year} <br/><span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Rating: </span> <span style={{
              fontWeight: '400', fontSize: '1rem'
            }}>{movie.imdbRating}</span>
          </Typography>
        </DialogContent>
        <DialogActions >
          <Button onClick={() => handleViewed(movie.imdbID)} sx={{
            color: `${viewed ? 'rgb(143, 20, 20)' : '#caa20f'}`
          }} disabled={disable}>
            {viewed ? 'Mark as not viewed' : 'Mark as viewed'}
          </Button>
          <Button autoFocus onClick={handleClose} sx={{
            color: 'black'
          }}
          >
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {disable && <Loading />}
    </>
  )
}
