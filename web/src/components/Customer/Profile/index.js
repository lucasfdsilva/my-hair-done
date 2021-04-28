import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Typography, Button, Grid, Tab, Tabs, AppBar, Hidden, FormControlLabel, Avatar, Input, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExitToApp, MonetizationOn, Person, Image, Error } from '@material-ui/icons'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Formik, Form } from 'formik'
import axios from 'axios'

import * as Yup from 'yup'

import TextField from '../../FormsUI/TextField/index'
import SelectField from '../../FormsUI/SelectField/index'
import CustomButton from '../../FormsUI/Button/index'
import Checkbox from '../../FormsUI/Checkbox/index'
import countries from '../../../data/countries.json'

import api from '../../../services/api';

export default function Profile(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const [file, setFile] = useState('');
  const [isHairdresser, setIsHairdresser] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState('');

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [country, setCountry] = useState('');
  const [homeService, setHomeService] = useState('');

  const [verified, setVerified] = useState(0);
  const [memberSince, setMemberSince] = useState('')

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [clickedToDelete, setClickedToDelete] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function loadProfile(){
      try {
        if(!id || !accessToken) return history.push('/login');
        
        const response = await api.get(`users/${id}`);

        setIsHairdresser(response.data.user.is_hairdresser);
        setFirstName(response.data.user.first_name);
        setLastName(response.data.user.last_name);
        setMobile(response.data.user.mobile);
        setEmail(response.data.user.email);
        setProfileImgUrl(response.data.user.profile_img_url)
        setVerified(response.data.user.verified);

        setAddressLine1(response.data.user.addressLine1);
        setAddressLine2(response.data.user.addressLine2);
        setCity(response.data.user.city);
        setCounty(response.data.user.county);
        setCountry(response.data.user.country);
        setHomeService(response.data.user.home_service);

        setVerified(response.data.user.verified);
        setMemberSince(response.data.user.created_at);

      } catch (error) {
          setErrorMessage(error.response.data.message)
      }
    }

  loadProfile();
  }, [])

  async function handleFileSelected(event){
    setFile(event.target.files[0])
  }

  async function handleProfilePictureUpload(){
    try{
      var formData = new FormData();
      formData.append("file", file)

      const response = await api.post('users/upload', formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      });

      return setProfileImgUrl(response.data.url)
    }
    catch(error){
      setErrorMessage(error.response.data.message)
    }
  }

  async function handleVerificationEmail(event){
    event.preventDefault();

    try{
      const data = {
        firstName,
        email
      }

      const response = await api.post('/users/verify/send', data)

      setSuccessMessage(response.data.message);

    } catch(error){
      setErrorMessage(error.response.data.message)
    }
  }

  async function handleClickedToDelete(){
    setClickedToDelete(true)
  }

  async function handleDeleteUser(){
    try {

      const response = await api.delete('users', { data: { id: id }});

      localStorage.setItem('id', '');
      localStorage.setItem('accessToken', '');

      alert(`User Deleted Successfully ${response.data}`);

      history.push('/');
      
    } catch (error) {
      alert(`Could not delete user. Error: ${error}`)
    }

  }

  async function handleUpdateProfile(values){
    const data = {
      id: id,
      firstName: values.firstName,
      lastName: values.lastName,
      mobile: values.mobile,
      profile_img_url: profileImgUrl,
      
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      county: values.county,
      country: values.country,
      homeService: values.homeService,
    }

    try {
      const response = await api.put('users', data);
      window.location.reload();

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
      marginBottom: 20
    },
    appbar:{
      marginBottom: 25,
      borderRadius: 8,
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
    successText: {
      color: "#fff",
    },
    successBox: {
      backgroundColor: "#1cbd77",
      borderRadius: 8,
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    checkbox: {
      marginLeft: -15,
    },
    picture: {
      height: 150,
      width: 150,
      marginBottom: 20,
      fontSize: 50,
      border: '2px solid #555',
    },
    uploadButton: {
      marginTop: 10,
      marginBottom: 45,
    },
    verificationText: {
      marginTop: -15,
      marginBottom: 10,
    },
    verificationButton: {
      marginBottom: 20,
    }
  });
  const classes = useStyles();

  const INITIAL_FORM_STATE = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobile: mobile,

    addressLine1: addressLine1,
    addressLine2: addressLine2,
    city: city,
    county: county,
    country: country,
    homeService: homeService,
  };

  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("First Name is a mandatory field"),
    lastName: Yup.string().required("Last Name is a mandatory field"),
    mobile: Yup.string().required("Mobile is a mandatory field"),
  });


  return (
    <Grid container className={classes.componentGrid} xs={12} md={8} lg={6}>

      <Grid item xs={12}>
        <Typography variant="h4" className={classes.header}>
          Profile
        </Typography>
      </Grid>

      <Formik 
        enableReinitialize
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(true);
          handleUpdateProfile(values)
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

            <Grid container justify="center">
              <Grid item xs={5} sm={3} md={3} lg={3}>
                <Avatar className={classes.picture} src={profileImgUrl}> 
                  {firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()}
                </Avatar> 
              </Grid> 

              <Grid container justify="center">
                <Grid item xs={4}>
                  <Input 
                    endAdornment={<Image/>} 
                    fullWidth 
                    className={classes.fileInput} 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileSelected}
                    disableUnderline={true}
                  />
                </Grid>
              </Grid>

              <Grid item xs={4}>
                <Button 
                  fullWidth
                  className={classes.uploadButton}
                  variant="outlined" 
                  color="primary" 
                  onClick={handleProfilePictureUpload}>
                    Upload
                </Button>
              </Grid>

            </Grid> 

            <Grid item xs={6}>
              <TextField name="firstName" label="First Name"/>
            </Grid>

            <Grid item xs={6}>
              <TextField name="lastName" label="Last Name"/>
            </Grid>

            <Grid item xs={6}>
              <TextField disabled name="email" label="Email"/>
            </Grid>

            <Grid item xs={6}>
              <TextField name="mobile" label="Mobile"/>
            </Grid>

            {verified === 0 && (
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.verificationText}>
                  Your email address hasn't been verified yet
                </Typography>
                <Button 
                  className={classes.verificationButton} 
                  variant="outlined" 
                  color="primary"
                  onClick={handleVerificationEmail}>
                  Send Verification Email
                </Button>
              </Grid>
            )}

            {isHairdresser === 1 && (
              <>

                <Grid item xs={12}>
                  <Typography variant="h6">
                    Business Address
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField name="addressLine1" label="Address Line 1"/>
                </Grid>

                <Grid item xs={12}>
                  <TextField name="addressLine2" label="Address Line 2"/>
                </Grid>

                <Grid item xs={6}>
                  <TextField name="city" label="City"/>
                </Grid>

                <Grid item xs={6}>
                  <TextField name="county" label="County"/>
                </Grid>

                <Grid item xs={12}>
                  <SelectField
                    name="country"
                    label="Country"
                    options={countries}
                  />
                </Grid>

                <Grid item xs={4} className={classes.checkbox}>
                  <FormControlLabel control={<Checkbox name="homeService" color="primary" checked={homeService}/>} labelPlacement="start" label="Home Service?" />
                </Grid>
              </>
              )
            }

            <Grid container spacing={3} justify="center" className={classes.button}>
              <Grid item xs={6}>
                <CustomButton >
                  Update Profile
                </CustomButton>
              </Grid>
            </Grid>


            <Grid item xs={8}>
              {clickedToDelete == 1
                ? <Button startIcon={<Error color="primary"/>} onClick={handleDeleteUser}>
                  Are you Sure?
                  </Button> 
                : <Button startIcon={<FiTrash2 color="red"/>} onClick={handleClickedToDelete}>
                    Delete Account
                  </Button>
              }
            </Grid>

          </Grid>
      
          </Form>
        
      </Formik>
    </Grid>   
  )
}