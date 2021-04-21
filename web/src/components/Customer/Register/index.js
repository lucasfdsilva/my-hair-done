import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExitToApp } from '@material-ui/icons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import "yup-phone"
import TextField from '../../FormsUI/TextField/index'
import SelectField from '../../FormsUI/SelectField/index'
import CustomButton from '../../FormsUI/Button/index'
import countries from '../../../data/countries.json'

import api from '../../../services/api';

export default function Register(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function checkIfUserIsLoggedIn(){
      try {
        if(id && accessToken) return history.push('/profile');

      } catch (error) {
        alert(`Couldn't Check if user is Logged in. Please try again. Error: ${error}.`);
      }
  }
  checkIfUserIsLoggedIn();
  }, [])

  async function handleRegister(event){
    event.preventDefault();

    if(password !== passwordConfirmation) return alert("Passwords don't match. Please try again.");

    const data = {
      firstName,
      lastName,
      email,
      password,
      isAdmin: false
    }

    try {
      const response = await api.post('users', data);

      if(response.status == 201){
        alert(`User Registered Successfully. User ID: ${response.data.newUserID[0]}`);

        history.push('/login');
      } else{
        console.log("error")
      }
      
    } catch (error) {
        
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
      marginBottom: 20
    },
    button: {
      marginTop: 50
    }
  });

  const classes = useStyles();

  const INITIAL_FORM_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    country: '',
  };


  const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("First Name is a mandatory field"),
    lastName: Yup.string().required("Last Name is a mandatory field"),
    email: Yup.string().email('Invalid email address').required("Email is a mandatory field"),
    mobile: Yup.string().phone("IRE", true).required("Mobile is a mandatory field"),
    addressLine1: Yup.string().required("Address Line 1 is a mandatory field"),
    addressLine2: Yup.string(),
    city: Yup.string().required("City is a mandatory field"),
    county: Yup.string().required("County is a mandatory field"),
    country: Yup.string().required("Country is a mandatory field"),
  });


  return (
    <Grid container className={classes.componentGrid} xs={12} md={8} lg={6}>

      <Formik 
        initialValues={{ 
          ...INITIAL_FORM_STATE
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(data, {setSubmitting}) => {
          setSubmitting(true);
          // make async call
          console.log(data)
          setSubmitting(false);
        }}
      > 
        <Form>  
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.header}>
                Register
              </Typography>
            </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              Your Details
            </Typography>
          </Grid>

            <Grid item xs={6}>
              <TextField name="firstName" label="First Name"/>
            </Grid>

            <Grid item xs={6}>
              <TextField name="lastName" label="Last Name"/>
            </Grid>

            <Grid item xs={12}>
              <TextField name="email" label="Email"/>
            </Grid>

            <Grid item xs={12}>
              <TextField name="mobile" label="Mobile"/>
            </Grid>


            <Grid item xs={12}>
              <Typography variant="h6">
                Address
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


            <Grid item xs={12}>
              <CustomButton >
                Register
              </CustomButton>
            </Grid>

            <Grid item xs={4}>
              <Button 
                startIcon={<ExitToApp color="primary"/>}
                href="login"
              >
                Already Registered?
              </Button>
            </Grid>

          </Grid>
      
          </Form>
        
      </Formik>
    </Grid>   
  )
}