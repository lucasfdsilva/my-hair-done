import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Grid, Hidden } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {
	Home,
	ExitToApp,
	HowToReg,
	PeopleAlt,
	Person,
	PhotoLibrary,
	LibraryBooks,
	Apps,
	Visibility,
} from '@material-ui/icons';
import theme from '../../../theme';
import headerLogo from '../../../assets/header-logo.png';

import { useHistory } from 'react-router-dom';

import { useStyles } from './styles';

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

							{isHairdresser === 1 && (
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
									localStorage.setItem('isHairdresser', 0);
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

								{isHairdresser === 1 && (
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
						<Grid container justify='center' spacing={3}>
							<Hidden smDown>
								<a href='/'>
									<img src={headerLogo} alt='' className={classes.image} />
								</a>

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
							</Hidden>

							<Hidden mdUp>
								<Button
									className={classes.button}
									href='/'
									startIcon={<Home className={classes.icon} />}
								></Button>

								<Button
									className={classes.button}
									href='/hairstyler'
									startIcon={<Visibility className={classes.icon} />}
								></Button>

								<Button
									className={classes.button}
									href='/hairdressers'
									startIcon={<PeopleAlt className={classes.icon} />}
								></Button>

								<Button
									className={classes.button}
									href='/register'
									startIcon={<HowToReg className={classes.icon} />}
								></Button>

								<Button
									className={classes.button}
									href='/login'
									startIcon={<ExitToApp className={classes.icon} />}
								></Button>
							</Hidden>
						</Grid>
					</Toolbar>
				</AppBar>
			</ThemeProvider>
		);
	}
}
