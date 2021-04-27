import React, { useState, useEffect } from 'react';
import { Modal, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions,Typography, IconButton, Avatar, Grid, Button, Divider, TextField,InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SkipPrevious, SkipNext } from '@material-ui/icons';

export default function PortfolioPostCard(props){
  const [images, setImages] = useState(props.post.images);
  const [tags, setTags] = useState([]);
  const [imagesIndex, setImagesIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const noSpacesTags = props.post.tags.replace(/\s/g, '');
    const formattedTags = noSpacesTags.split(",")
    setTags(formattedTags)

  }, [])

  function nextImage(){
    var newIndex = imagesIndex + 1;
    setImagesIndex(newIndex) 
  }

  function previousImage(){
    var newIndex = imagesIndex - 1;
    setImagesIndex(newIndex) 
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const useStyles = makeStyles({
    cardContent: {
      marginTop: -15,
    },
    modal:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalImage:{
      maxHeight: 500,
      maxWidth: 600,
    },
  });
  const classes = useStyles();

  

  return (
    <>
      <Grid container className={classes.modalContainer}>
        <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <img className={classes.modalImage} src={props.post.images[imagesIndex].url} alt={props.post.title}/>
        </Modal>
      </Grid>

      <Card raised="true">
        <CardActionArea>
          <CardMedia
            component="img"
            alt={props.post.title}
            height="275"
            image={props.post.images[imagesIndex].url}
            title={props.post.title}
            onClick={handleOpen}
          />
        </CardActionArea>

        <Grid container justify="center" spacing={3} className={classes.controlButtons}>
            <Grid item>
              <IconButton 
                color="primary"
                aria-label="previous"
                onClick={previousImage}
                disabled={imagesIndex > 0 
                          ? false
                          : true
                        }
              >
                <SkipPrevious />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton 
                color="primary"
                aria-label="next"
                onClick={nextImage}
                disabled={imagesIndex < (images.length - 1) 
                  ? false
                  : true
                }
              >
                <SkipNext />
              </IconButton>
            </Grid>
        </Grid>
          
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2" className={classes.cardContent}>
            {props.post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.description}
          </Typography>
        </CardContent>
        
        <CardActions disableSpacing="true">
          {tags.map(tag => (
              <Button size="small" color="primary">
                #{tag}
              </Button>
          ))}
        </CardActions>
      </Card>
    </>

  )

}