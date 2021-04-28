import React, { useState, useEffect } from 'react';
import { Modal, Card, CardActionArea, CardMedia, Box, Typography, Button, Grid, Tab, Tabs, AppBar, Hidden, FormControlLabel, Avatar, Input, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Error, BurstMode, NavigateBefore, NavigateNext } from '@material-ui/icons'
import { FiTrash2 } from 'react-icons/fi';
import { Formik, Form } from 'formik'
import axios from 'axios'

import * as Yup from 'yup'

import TextField from '../../FormsUI/TextField/index'
import TextArea from '../../FormsUI/TextArea/index'
import CustomButton from '../../FormsUI/Button/index'
import Checkbox from '../../FormsUI/Checkbox/index'

import api from '../../../services/api';

export default function PortfolioPost(props){
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [postId, setPostId] = useState(props.postId);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [tags, setTags] = useState(props.tags);
  const [featured, setFeatured] = useState(props.featured);
  const [images, setImages] = useState(props.images);
  const [imagesIndex, setImagesIndex] = useState(0);
  const [imageOpen, setImageOpen] = useState(false);

  const [files, setFiles] = useState([]);
  const [uploadLabelValue, setUploadLabelValue] = useState('Upload your pictures...');

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [clickedToDelete, setClickedToDelete] = useState(false);

  useEffect(() => {
   
  }, [])

  function nextImage(){
    var newIndex = imagesIndex + 1;
    setImagesIndex(newIndex) 
  }

  function previousImage(){
    var newIndex = imagesIndex - 1;
    setImagesIndex(newIndex) 
  }

  async function handleImageDelete(){

  }

  const handleImageOpen = () => {
    setImageOpen(true);
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };

  async function handleFileSelected(event){
    setFiles(event.target.files)
    setUploadLabelValue(event.target.files.length + ' Files Selected...')
  }


  async function handleClickedToDelete(){
    setClickedToDelete(true)
  }

  async function handleDeletePost(){
    try {

      const response = await api.delete('portfolioposts', { data: { id: postId }});

      alert(`Post Deleted Successfully ${response.data}`);
      
    } catch (error) {
      alert(`Could not delete user. Error: ${error}`)
    }

  }

  async function handlePostUpdate(values){
    const data = {
      id: postId,
      userId: userId,
      title: title,
      description: description,
      tags: tags,
      featured: featured,
    }

    try {
      const response = await api.put('portfolioposts', data);
      window.location.reload();

    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  async function handlePostCreation(values){
    const data = {
      userId: userId,
      title: values.title,
      description: values.description,
      tags: values.tags,
      featured: values.featured,
    }

    try {
      //Saving Post 
      const response = await api.post('portfolioposts', data);
      
      //Uploading images
      var formData = new FormData();
      for (let i = 0; i < files.length; i++){
        formData.append(`files`, files[i])
      }
      formData.append('postId', response.data.portfolioPost[0])

      const imagesResponse = await api.post('portfolioimages', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

      window.location.reload();

    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  async function handlePicturesUpload(newPostId){
    try{
      var formData = new FormData();
      formData.append("file", files)

      const response = await api.post('users/upload', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

    }
    catch(error){
      setErrorMessage(error.response.data.message)
    }
  }

  const useStyles = makeStyles({
    componentGrid: {
      backgroundColor: "#fff",
      borderRadius: 8,
      alignItems: "center",
      justifyItems: "center",
      padding: 25,
    },
    header:{
      marginBottom: 30,
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 17,
      '&:hover': {
        cursor: 'pointer',
        opacity: 0.5,
      }
    },
    icon: {
      marginRight: 10,
    },
    fileInput: {
      display: 'none',
    },
    button: {
      marginTop: 30,
      marginBottom: 15,
    },
    imagesIndex: {
      marginTop: 14
    }
    
  });
  const classes = useStyles();

  const INITIAL_FORM_STATE = {
    title: title,
    description: description,
    tags: tags,
    featured: featured,
  };

  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required("Title is a mandatory field"),
    description: Yup.string().required("Description is a mandatory field"),
  });


  return (
    <Grid container className={classes.componentGrid} >

      <Grid item xs={12}>
        <Typography variant="h4" className={classes.header}>
          Portfolio Post
        </Typography>
      </Grid>

      {postId && (
        <>
          <Grid container className={classes.modalContainer}>
            <Modal
              className={classes.modal}
              open={imageOpen}
              onClose={handleImageClose}
            >
              <img className={classes.modalImage} src={images[imagesIndex].url} alt={title}/>
            </Modal>
          </Grid>

            <CardActionArea>
              <CardMedia
                component="img"
                alt={title}
                height="275"
                image={images[imagesIndex].url}
                title={title}
                onClick={handleImageOpen}
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
                    <NavigateBefore />
                  </IconButton>
                </Grid>

                <Grid item className={classes.imagesIndex}>
                  <Typography variant="body2"> 
                    {imagesIndex + 1}/{images.length}
                  </Typography>
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
                    <NavigateNext />
                  </IconButton>
                </Grid>

                <Grid item>
                  <IconButton 
                    color="primary"
                    aria-label="next"
                    onClick={handleImageDelete}
                  >
                    <FiTrash2 />
                  </IconButton>
                </Grid>
            </Grid>
        </>
      )}

      <Formik 
        enableReinitialize
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(true);
          handlePostCreation(values)
          setSubmitting(false);
        }}
      > 
        <Form>  
          <Grid container spacing={2}>

            {successMessage && (
              <>
                <Grid item xs={12} className={classes.successBox}>
                  <Typography variant="h6" fullLength="true" className={classes.successText}>
                    {successMessage}
                  </Typography>
                </Grid>
              </>  
              )
            }

            {errorMessage && (
              <>
                <Grid item xs={12} className={classes.errorBox}>
                  <Typography variant="h6" fullLength="true" className={classes.errorText}>
                    Error: {errorMessage}
                  </Typography>
                </Grid>
              </>  
              )
            }          

            <Grid item xs={12}>
              <TextField name="title" label="Title"/>
            </Grid>

            <Grid item xs={12}>
              <TextArea name="description" label="Description" className={classes.textArea}/>
            </Grid>

            <Grid item xs={12}>
              <TextField name="tags" label="Tags"/>
            </Grid>

            <Grid item xs={4} className={classes.checkbox}>
              <FormControlLabel control={<Checkbox name="featured" color="primary" checked={featured}/>} labelPlacement="start" label="Featured?" />
            </Grid>

            <Grid item xs={12}>
              <label for="upload-images" className={classes.label}>
                  <BurstMode color="primary" size="large" className={classes.icon}/> {uploadLabelValue}
              </label>

              <input 
                className={classes.fileInput}
                id="upload-images" 
                type="file"
                accept="image/*" 
                onChange={handleFileSelected}
                multiple
              />
            </Grid>

            <Grid container spacing={3} justify="center" className={classes.button}>
              <Grid item xs={6}>
                <CustomButton >
                  Create Post
                </CustomButton>
              </Grid>
            </Grid>

            {postId && (
              <Grid item xs={8}>
                {clickedToDelete == 1
                  ? <Button startIcon={<Error color="primary"/>} onClick={handleDeletePost}>
                    Are you Sure?
                    </Button> 
                  : <Button startIcon={<FiTrash2 color="red"/>} onClick={handleClickedToDelete}>
                      Delete Post
                    </Button>
                }
              </Grid>
            )}

          </Grid>
      
        </Form>
        
      </Formik>
    </Grid> 
  )
}