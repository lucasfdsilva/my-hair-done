import React, { useState, useEffect } from 'react';
import { SiProbot } from 'react-icons/si';
import { BsCalendar, BsImages } from 'react-icons/bs';
import { GrConfigure } from 'react-icons/gr';

import {
	AppBar,
	Toolbar,
	Button,
	Grid,
	Hidden,
	Tooltip,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { Scissors, UserPlus, Power, Home, LogIn, User } from 'react-feather';
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
					<Toolbar className={classes.toolbar}>
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
								startIcon={<Scissors className={classes.icon} />}
							>
								Hairdressers
							</Button>

							<Button
								className={classes.button}
								startIcon={<SiProbot className={classes.icon} />}
								onClick={() =>
									window.open('https://hairstyler.myhairdone.co.uk')
								}
							>
								AR Hairstyler (Dev)
							</Button>

							<Button
								className={classes.button}
								href='/profile'
								startIcon={<User className={classes.icon} />}
							>
								Profile
							</Button>

							{isHairdresser === 1 && (
								<Button
									className={classes.button}
									href={`/hairdressers/${id}`}
									startIcon={<BsImages className={classes.icon} />}
								>
									Portfolio
								</Button>
							)}

							<Button
								className={classes.button}
								href='/bookings'
								startIcon={<BsCalendar className={classes.icon} />}
							>
								Bookings
							</Button>

							<Button
								className={classes.button}
								startIcon={<Power className={classes.icon} />}
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
								<Tooltip title='Home'>
									<Button
										className={classes.button}
										href='/'
										startIcon={<Home className={classes.icon} />}
									></Button>
								</Tooltip>

								<Tooltip title='Hairdressers'>
									<Button
										className={classes.button}
										href='/hairdressers'
										startIcon={<Scissors className={classes.icon} />}
									></Button>
								</Tooltip>

								<Tooltip title='AR Hairstyler'>
									<Button
										className={classes.button}
										startIcon={<SiProbot className={classes.icon} />}
										onClick={() =>
											window.open('https://hairstyler.myhairdone.co.uk')
										}
									></Button>
								</Tooltip>

								<Tooltip title='My Profile'>
									<Button
										className={classes.button}
										href='/profile'
										startIcon={<User className={classes.icon} />}
									></Button>
								</Tooltip>

								{isHairdresser === 1 && (
									<Tooltip title='My Portfolio'>
										<Button
											className={classes.button}
											href={`/hairdressers/${id}`}
											startIcon={<BsImages className={classes.icon} />}
										></Button>
									</Tooltip>
								)}

								<Tooltip title='Bookings'>
									<Button
										className={classes.button}
										href='/bookings'
										startIcon={<BsCalendar className={classes.icon} />}
									></Button>
								</Tooltip>

								<Tooltip title='Logout'>
									<Button
										className={classes.button}
										href='/'
										startIcon={<Power className={classes.icon} />}
										onClick={() => {
											localStorage.setItem('id', '');
											localStorage.setItem('accessToken', '');
											localStorage.setItem('isAdmin', 0);
											window.location.reload();
										}}
									></Button>
								</Tooltip>

								{isAdmin == 1 && (
									<Tooltip title='Admin Panel'>
										<Button
											className={classes.button}
											href='/admin'
											startIcon={<GrConfigure className={classes.icon} />}
										>
											Admin Panel
										</Button>
									</Tooltip>
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
					<Toolbar className={classes.toolbar}>
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
								startIcon={<Scissors className={classes.icon} />}
							>
								Hairdressers
							</Button>

							<Button
								className={classes.button}
								startIcon={<SiProbot className={classes.icon} />}
								onClick={() =>
									window.open('https://hairstyler.myhairdone.co.uk')
								}
							>
								AR Hairstyler (Dev)
							</Button>

							<Button
								className={classes.button}
								href='/register'
								startIcon={<UserPlus className={classes.icon} />}
							>
								Register
							</Button>

							<Button
								className={classes.button}
								href='/login'
								startIcon={<LogIn className={classes.icon} />}
							>
								Login
							</Button>
						</Hidden>

						<Hidden mdUp>
							<Grid container justify='center' spacing={3}>
								<Tooltip title='Home'>
									<Button
										className={classes.button}
										href='/'
										startIcon={<Home className={classes.icon} />}
									></Button>
								</Tooltip>

								<Tooltip title='Hairdressers'>
									<Button
										className={classes.button}
										href='/hairdressers'
										startIcon={<Scissors className={classes.icon} />}
									></Button>
								</Tooltip>

								<Tooltip title='AR Hairstyler'>
									<Button
										className={classes.button}
										startIcon={<SiProbot className={classes.icon} />}
										onClick={() =>
											window.open('https://hairstyler.myhairdone.co.uk')
										}
									></Button>
								</Tooltip>

								<Tooltip title='Register'>
									<Button
										className={classes.button}
										href='/register'
										startIcon={<UserPlus className={classes.icon} />}
									></Button>
								</Tooltip>

								<Tooltip title='Login'>
									<Button
										className={classes.button}
										href='/login'
										startIcon={<LogIn className={classes.icon} />}
									></Button>
								</Tooltip>
							</Grid>
						</Hidden>
					</Toolbar>
				</AppBar>
			</ThemeProvider>
		);
	}
}
