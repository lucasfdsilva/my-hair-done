import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Grid,
  Hidden,
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  Home,
  ExitToApp,
  MenuIcon,
  HowToReg,
  PeopleAlt,
  Person,
  PhotoLibrary,
  LibraryBooks,
  Apps,
} from '@material-ui/icons';
import theme from '../../../theme';
import headerLogo from '../../../assets/header-logo.png';

import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

export default function NavigationMenu() {
  const [id, setID] = useState(localStorage.getItem('id'));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const [isHairdresser, setIsHairdresser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get(`users/${id}`);

        setIsHairdresser(response.data.user.is_hairdresser);
        setIsAdmin(response.data.user.is_admin);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    }
    if (id && accessToken) {
      loadProfile();
    }
  }, []);

  const useStyles = makeStyles({
    image: {
      height: 200,
      width: 230,
      marginBottom: -55,
      marginTop: -70,
      marginRight: 25,
    },
    button: {
      color: theme.palette.primary.main,
      fontSize: 20,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14.5,
      },
    },
    icon: {
      color: theme.palette.secondary.main,
      fontSize: 'large',
    },
  });

  const classes = useStyles();

  if (id && accessToken) {
    return (
      <ThemeProvider theme={theme}>
        <AppBar position='static' color='white'>
          <Toolbar>
            <Hidden smDown>
              <a href='/'>
                <img src={headerLogo} alt='' className={classes.image} />
              </a>

              <Button
                className={classes.button}
                href='/'
                startIcon={<Home className={classes.icon} />}
              >
                Home
              </Button>

              <Button
                className={classes.button}
                href='/hairdressers'
                startIcon={<PeopleAlt className={classes.icon} />}
              >
                Hairdressers
              </Button>

              <Button
                className={classes.button}
                href='/profile'
                startIcon={<Person className={classes.icon} />}
              >
                Profile
              </Button>

              {isHairdresser && (
                <Button
                  className={classes.button}
                  href={`/hairdressers/${id}`}
                  startIcon={<PhotoLibrary className={classes.icon} />}
                >
                  Portfolio
                </Button>
              )}

              <Button
                className={classes.button}
                href='/bookings'
                startIcon={<LibraryBooks className={classes.icon} />}
              >
                Bookings
              </Button>

              <Button
                className={classes.button}
                startIcon={<ExitToApp className={classes.icon} />}
                onClick={() => {
                  localStorage.setItem('id', '');
                  localStorage.setItem('accessToken', '');
                  localStorage.setItem('isAdmin', 0);
                  history.push('/');
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </Hidden>

            <Hidden mdUp>
              <Grid container justify='center' spacing={3}>
                <Button
                  className={classes.button}
                  href='/'
                  startIcon={<Home className={classes.icon} />}
                ></Button>

                <Button
                  className={classes.button}
                  href='/hairdressers'
                  startIcon={<PeopleAlt className={classes.icon} />}
                ></Button>

                <Button
                  className={classes.button}
                  href='/profile'
                  startIcon={<Person className={classes.icon} />}
                ></Button>

                {isHairdresser && (
                  <Button
                    className={classes.button}
                    href={`/hairdressers/${id}`}
                    startIcon={<PhotoLibrary className={classes.icon} />}
                  ></Button>
                )}

                <Button
                  className={classes.button}
                  href='/bookings'
                  startIcon={<LibraryBooks className={classes.icon} />}
                ></Button>

                <Button
                  className={classes.button}
                  href='/bookings'
                  startIcon={<ExitToApp className={classes.icon} />}
                  onClick={() => {
                    localStorage.setItem('id', '');
                    localStorage.setItem('accessToken', '');
                    localStorage.setItem('isAdmin', 0);
                    window.location.reload();
                  }}
                ></Button>

                {isAdmin == 1 && (
                  <Button
                    className={classes.button}
                    href='/admin'
                    startIcon={<Apps className={classes.icon} />}
                  >
                    Admin Panel
                  </Button>
                )}
              </Grid>
            </Hidden>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <AppBar position='static' color='white'>
          <Toolbar>
            <Grid container>
              <Hidden smDown>
                <a href='/'>
                  <img src={headerLogo} alt='' className={classes.image} />
                </a>
              </Hidden>

              <Button
                className={classes.button}
                href='/'
                startIcon={<Home className={classes.icon} />}
              >
                home
              </Button>

              <Button
                className={classes.button}
                href='/hairdressers'
                startIcon={<PeopleAlt className={classes.icon} />}
              >
                Hairdressers
              </Button>

              <Button
                className={classes.button}
                href='/register'
                startIcon={<HowToReg className={classes.icon} />}
              >
                Register
              </Button>

              <Button
                className={classes.button}
                href='/login'
                startIcon={<ExitToApp className={classes.icon} />}
              >
                Login
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}
