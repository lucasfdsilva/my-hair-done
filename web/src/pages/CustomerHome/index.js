import React from 'react';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavigationMenu from '../../components/Customer/NavigationMenu';
import Footer from '../../components/Customer/Footer';
import Bookings from '../../components/Customer/Bookings';
import Home from '../../components/Customer/Home';
import Login from '../../components/Customer/Login';
import Hairdressers from '../../components/Customer/Hairdressers';
import ViewHairdresser from '../../components/Customer/ViewHairdresser';
import BookingFormNew from '../../components/Customer/Bookings/BookingFormNew';
import Profile from '../../components/Customer/Profile';
import Register from '../../components/Customer/Register';
import VerifyEmail from '../../components/Customer/VerifyEmail';

export default function Layout(props) {
	const components = {
		NavigationMenu,
		Footer,
		Bookings,
		Home,
		Login,
		Hairdressers,
		ViewHairdresser,
		BookingFormNew,
		Profile,
		Register,
		VerifyEmail,
	};

	const ComponentToRender = components[props.component];

	const useStyles = makeStyles({
		layout: {
			height: -10,
		},
		center: {
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1521250164448-79d809c7cb0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
			minHeight: 800,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		footer: {},
	});

	const classes = useStyles();

	return (
		<Box className={classes.layout}>
			<Box>
				<NavigationMenu />
			</Box>

			<Box className={classes.center}>
				<ComponentToRender />
			</Box>

			<Box className={classes.footer}>
				<Footer />
			</Box>
		</Box>
	);
}
