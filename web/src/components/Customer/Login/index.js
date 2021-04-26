import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Typography, Button, Grid, Tab, Tabs, AppBar, Hidden, FormControlLabel  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { HowToReg, MonetizationOn, Person } from '@material-ui/icons'
import { Formik, Form } from 'formik'

import * as Yup from 'yup'

import TextField from '../../FormsUI/TextField/index'
import SelectField from '../../FormsUI/SelectField/index'
import CustomButton from '../../FormsUI/Button/index'
import Checkbox from '../../FormsUI/Checkbox/index'
import countries from '../../../data/countries.json'

import api from '../../../services/api';

export default function Login(){
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

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

  async function handleLogin(values){

    const data = {
      email: values.email,
      password: values.password,
    }

    try {
      const response = await api.post('sessions', data);

      localStorage.setItem('id', response.data.id);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('isHairdresser', response.data.isHairdresser);
      localStorage.setItem('isAdmin', response.data.isAdmin);
        
      history.push('/profile');
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
  });
  const classes = useStyles();

  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("Email is a mandatory field"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });
  
  return (
    <Grid container className={classes.componentGrid} xs={12} md={8} lg={6}>

      <Formik 
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, {setSubmitting}) => {
          setSubmitting(true);
          handleLogin(values)
          setSubmitting(false);
        }}
      > 
        <Form>  
          <Grid container spacing={2}>

            <Grid container spacing={3} justify="center">

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

              <Grid item xs={8}>
                <Typography variant="h4" >
                  Login
                </Typography>
              </Grid>          

              <Grid item xs={8}>
                <TextField name="email" label="Email"/>
              </Grid>

              <Grid item xs={8}>
                <TextField name="password" label="Password" type="password"/>
              </Grid>
            </Grid>

            <Grid container spacing={3} justify="center" >
              <Grid item xs={6} className={classes.button}>
                <CustomButton >
                  Login
                </CustomButton>
              </Grid>

              <Grid item xs={8}>
                <Button 
                  startIcon={<HowToReg color="primary"/>}
                  href="register"
                >
                  Don't have an account yet?
                </Button>
              </Grid>
            </Grid>

          </Grid>
      
          </Form>
        
      </Formik>
    </Grid>   
  )
}