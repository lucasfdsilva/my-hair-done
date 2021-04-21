import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons'

import githubIcon from '../../../assets/github-icon.png';

const useStyles = makeStyles({
  box: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: 20,
    fontWeight: 500,
    marginRight: 12,
    transition: "opacity 0.2s",
  },
  imgGitHub: {
    marginLeft: 12,
    height: 30,
    width: 30
  },
  imgLinkedIn: {
    height: 38,
    width: 38
  },
  imgTwitter: {
    height: 30,
    width: 30
  },
  text: {

  }
});

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.box}>

        <Typography className={classes.text}>
          Developed by Lucas DaSilva | 
        </Typography>       

          <a className={classes.link} href="https://github.com/lucasfdsilva/my-hair-done" target="_blank">
            <GitHub className={classes.imgGitHub}/>
          </a>

          <a className={classes.link} href="https://www.linkedin.com/in/lucas-fdsv/" target="_blank">
            <LinkedIn className={classes.imgLinkedIn}/>
          </a>

          <a className={classes.link} href="https://twitter.com/lucasfdsv" target="_blank">
            <Twitter className={classes.imgTwitter}/>
          </a>
  
    </Box>
  )
}
