import { GitHub } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

export function Footer () {
  return (
    <Grid item
    sx={{
      width: '100%',
      position: 'absolute',
      bottom: '0'
    }}
  >
    <Typography sx={{
      fontSize: '1rem',
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      mt: 3,
      mb: 2
    }} gutterBottom>
      <a href='https://github.com/robersongarcia' target='_blank' style={
        {
          textDecoration: 'none',
          color: '#333',
          fontSize: '1rem',
          textAlign: 'center'
        }
      } rel="noreferrer">made by @robersongarcia <GitHub sx={{
        fontSize: '1rem'
      }}/></a>
    </Typography>
  </Grid>
  )
}
