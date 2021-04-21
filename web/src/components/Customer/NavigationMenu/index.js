import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Container  } from "@material-ui/core"
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { ExitToApp, MenuIcon, HowToReg, PeopleAlt, Person, LibraryBooks, Apps } from "@material-ui/icons";
import theme from '../../../theme'
import headerLogo from "../../../assets/header-logo.png";

import { Link, useHistory } from "react-router-dom";
import {
  FiHome,
  FiMenu,
  FiLogIn,
  FiEdit,
  FiUser,
  FiBookOpen,
  FiBook,
  FiLogOut,
} from "react-icons/fi";

import "./styles.css";

const useStyles = makeStyles({
  image: {
    height: 200,
    width: 230,
    marginBottom: -55,
    marginTop: -70,
    marginRight: 25,
  },
  link: {
    color: theme.palette.primary.main,
    fontSize: 20,
    '&:hover': {
      color: theme.palette.primary.main,
    }
  },
  icon: {
    color: theme.palette.secondary.main,
    fontSize: "large"
  }
});



export default function NavigationMenu() {
  const [id, setID] = useState(localStorage.getItem("id"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  const history = useHistory();

  const classes = useStyles();

  if (id && accessToken) {
    return (
      <ThemeProvider theme={theme}>
        <AppBar color="white">
          <Toolbar>
            <a href="/">
              <img src={headerLogo} alt="" className={classes.image}/>
            </a>

            <Button
              className={classes.link}
              href="hairdressers"
              startIcon={<PeopleAlt className={classes.icon} />}
            >
              Hairdressers
            </Button>

            <Button
              className={classes.link}
              href="profile"
              startIcon={<Person className={classes.icon} />}
            >
              Profile
            </Button>

            <Button
              className={classes.link}
              href="bookings"
              startIcon={<LibraryBooks className={classes.icon} />}
            >
              Bookings
            </Button>

            <Button
              className={classes.link}
              href="bookings"
              startIcon={<ExitToApp className={classes.icon} />}
              onClick={() => {
                localStorage.setItem("id", "");
                localStorage.setItem("accessToken", "");
                localStorage.setItem("isAdmin", 0);
                window.location.reload();
              }}
            >
              Logout
            </Button>
            
            {isAdmin == 1 && (
              <Button
              className={classes.link}
              href="admin"
              startIcon={<Apps className={classes.icon} />}
              >
                Admin Panel
              </Button>
            )}

          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
    
  } else {
    return (
      <ThemeProvider theme={theme}>
        <AppBar color="white">
          <Toolbar>
            <a href="/">
              <img src={headerLogo} alt="" className={classes.image}/>
            </a>
            <Button
              xs={20}
              className={classes.link}
              href="hairdressers"
              startIcon={<PeopleAlt className={classes.icon} />}
            >
              Hairdressers
            </Button>

            <Button
              className={classes.link}
              href="register"
              startIcon={<HowToReg className={classes.icon} />}
            >
              Register
            </Button>

            <Button
              className={classes.link}
              href="login"
              startIcon={<ExitToApp className={classes.icon} />}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}
