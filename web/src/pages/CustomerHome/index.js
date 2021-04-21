import React from "react";

import { AppBar, Toolbar, IconButton, Button, Grid, Box  } from "@material-ui/core"
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { ExitToApp, MenuIcon, HowToReg, PeopleAlt } from "@material-ui/icons";
import theme from '../../theme'
import headerLogo from "../../assets/header-logo.png";

import NavigationMenu from "../../components/Customer/NavigationMenu";
import Footer from "../../components/Customer/Footer";
import Bookings from "../../components/Customer/Bookings";
import EditProfile from "../../components/Customer/EditProfile";
import Home from "../../components/Customer/Home";
import Login from "../../components/Customer/Login";
import Hairdressers from "../../components/Customer/Hairdressers";
import NewBooking from "../../components/Customer/NewBooking";
import Profile from "../../components/Customer/Profile";
import Register from "../../components/Customer/Register";
import VerifyEmail from "../../components/Customer/VerifyEmail";

export default function Layout(props) {
  const components = {
    NavigationMenu,
    Footer,
    Bookings,
    EditProfile,
    Home,
    Login,
    Hairdressers,
    NewBooking,
    Profile,
    Register,
    VerifyEmail,
  };

  const ComponentToRender = components[props.component];

  const useStyles = makeStyles({
    center: {
      marginTop: 80,
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1521250164448-79d809c7cb0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
      minHeight: 830,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

  });

  const classes = useStyles();

  return (
    <Box>

      <Box>
        <NavigationMenu />
      </Box>

      <Box className={classes.center}>
        <ComponentToRender />
      </Box>


      <Box>
        <Footer />
      </Box>

    </Box>
  );
}
