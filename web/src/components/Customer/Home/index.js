import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  header:{
    color: "#fff"
  }
})

export default function HomePageBody() {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h3" className={classes.header}>
        My Hair Done
      </Typography>

      <Typography variant="h5" className={classes.header}>
        Style or Get Styled with Us
      </Typography>
    </Box>
  )
}
