import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions,Typography, IconButton, Avatar, Grid, Button, Divider, TextField,InputAdornment } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import theme from '../../../theme'
import api from '../../../services/api';

export default function Hairdressers(){
  const [hairdressers, setHairdressers] = useState([]);
  const [featuredHairdressers, setFeaturedHairdressers] = useState([]);

  const [searchParameter, setSearchParameter] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    async function loadHairdressers(){
      try {
        
        const response = await api.get(`/users/hairdressers`);
        
        const sliceHairdressers = response.data.hairdressers.reverse().slice(0, 8)

        setFeaturedHairdressers(sliceHairdressers)

      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
  }
  loadHairdressers();
  }, [])

  useEffect(() => {
    async function searchHairdressers(){
      try {
        setHairdressers(null)

        const response = null;

        if(!searchParameter == ""){
          const response = await api.get(`users/hairdressers/${searchParameter}`);
          setHairdressers(response.data.hairdressers)
        }
        
      } catch (error) {
        setErrorMessage(error.response.data.message)
      }
  }
  searchHairdressers();
  }, [searchParameter])

  async function handleSearch(event){
    event.preventDefault();
    
    try {
      const response = await api.get(`/users/hairdressers/${searchParameter}`);

      setHairdressers(response.data.hairdressers)

    } catch (error) {
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
      margin: 35
    },
    header: {
      marginBottom: 30,
    },
    button: {
      marginTop: 20,
      marginBottom: 15
    },
    errorText: {
      color: "#fff",
    },
    errorBox: {
      backgroundColor: "#ff867c",
      borderRadius: 8,
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    ratingsTotal: {
      color: '#3793FF'
    },
    ratingsContainer: {
      marginLeft: 0,
      marginBottom: 10,
      [theme.breakpoints.down('md')]: {
        justifyItems: 'center',
        marginTop: -20,
      },
      [theme.breakpoints.only('lg')]: {
        marginTop: -20,
        marginLeft: -20,
      },
      [theme.breakpoints.only('xl')]: {
        marginTop: -35,
      }
    },
    profileImgPicture: {
      border: '2px solid #555',
      height: 75,
      width: 75,
      fontSize: 30,
    },
    buttonsContainer: {
      marginTop: 15,
    },
    divider: {
      marginBottom: 20,
      marginLeft: 0,
      height: 2,
      width: "100%",
      border: "1px solid #FF6257",
    },
    dividerResults: {
      marginBottom: 20,
      marginLeft: 0,
      height: 2,
      width: "100%",
      border: "1px solid #5c5a5a",
    },
    formContainer: {
      marginBottom: 50,
    },
    searchResults: {
      marginBottom: 40,
    },

  });
  const classes = useStyles();

  return (
    <Grid container className={classes.componentGrid}>

      <Grid container justify="center" spacing={2} className={classes.formContainer}>
          <Grid container spacing={2}>
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

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField 
                  fullWidth
                  variant="outlined" 
                  name="name" 
                  label="Search Name, email..."
                  placeholder="Search using name, email..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary"/>
                      </InputAdornment>
                    )
                  }}
                  onChange={event => setSearchParameter(event.target.value)} 
                />
              </Grid>

            </Grid>
      </Grid>

      {hairdressers &&(
        <>
          <Typography variant="h5">
            Results
          </Typography>

          <Divider variant="middle" fullWidth className={classes.dividerResults}/>
        </>
      )}

      <Grid container justify="center" spacing={6} className={classes.searchResults}>
        {hairdressers && hairdressers.map(hairdresser => (
          <Grid item xs={12} sm={6} md={4} lg={3}key={hairdresser.id}>
            <Card raised="true">
              <CardHeader
                avatar={
                  <Avatar className={classes.profileImgPicture} src={hairdresser.profile_img_url}> 
                    {hairdresser.first_name.charAt(0).toUpperCase() + hairdresser.last_name.charAt(0).toUpperCase()}
                  </Avatar> 
                }
                title={hairdresser.first_name + " " + hairdresser.last_name}
                subheader={
                  hairdresser.county + ", " +
                  hairdresser.country + "." 
                }
              >
              </CardHeader>
              <Grid container spacing={1} className={classes.ratingsContainer}>
                <Grid item >
                  <Rating
                    name="read-only" 
                    value={3.5} 
                    precision={0.5}
                    readOnly
                  />
                </Grid>

                <Grid item>
                  <Typography className={classes.ratingsTotal}>
                    (96)
                  </Typography>
                </Grid>
              </Grid>

              <CardMedia
                component="img"
                image={hairdresser.profile_img_url}
                height="160"
                title={hairdresser.first_name + " " + hairdresser.last_name}
              />

              <CardContent>
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      Latest Review Title
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Rating
                      name="read-only" 
                      value={2} 
                      precision={0.5}
                      readOnly
                      size='small'
                    />
                  </Grid>
                </Grid>

                <Typography variant="body2">
                  Review body Review body Review body Review body Review body Review body Review body Review body
                </Typography>
              
              <Grid container spacing={1} className={classes.buttonsContainer}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    href={`hairdressers/${hairdresser.id}`}
                  >
                    View Profile
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Book Now
                  </Button>
                </Grid>
              </Grid>

              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>


      <Typography variant="h5">
        Featured Professionals
      </Typography>

      <Divider variant="middle" fullWidth className={classes.divider}/>


      <Grid container justify="center" spacing={6}>
        {featuredHairdressers.map(hairdresser => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card raised="true">
              <CardHeader
                avatar={
                  <Avatar className={classes.profileImgPicture} src={hairdresser.profile_img_url}> 
                    {hairdresser.first_name.charAt(0).toUpperCase() + hairdresser.last_name.charAt(0).toUpperCase()}
                  </Avatar> 
                }
                title={hairdresser.first_name + " " + hairdresser.last_name}
                subheader={
                  hairdresser.county + ", " +
                  hairdresser.country + "." 
                }
              >
              </CardHeader>
              <Grid container justify="center" spacing={1} className={classes.ratingsContainer}>
                <Grid item >
                  <Rating
                    name="read-only" 
                    value={3.5} 
                    precision={0.5}
                    readOnly
                  />
                </Grid>

                <Grid item>
                  <Typography className={classes.ratingsTotal}>
                    (96)
                  </Typography>
                </Grid>
              </Grid>

              <CardMedia
                component="img"
                image={hairdresser.profile_img_url}
                height="160"
                title={hairdresser.first_name + " " + hairdresser.last_name}
              />

              <CardContent>
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography variant="subtitle2">
                      Latest Review Title
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Rating
                      name="read-only" 
                      value={2} 
                      precision={0.5}
                      readOnly
                      size='small'
                    />
                  </Grid>
                </Grid>

                <Typography variant="body2">
                  Review body Review body Review body Review body Review body Review body Review body Review body
                </Typography>
              
              <Grid container spacing={1} className={classes.buttonsContainer}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    href={`hairdressers/${hairdresser.id}`}
                  >
                    View Profile
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Book Now
                  </Button>
                </Grid>
              </Grid>

              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
    
  )

}