import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Typography,
	Button,
	Grid,
	Tab,
	Tabs,
	AppBar,
	FormControlLabel,
} from '@material-ui/core';
import { ExitToApp, MonetizationOn, Person } from '@material-ui/icons';
import { Formik, Form } from 'formik';

import * as Yup from 'yup';
import 'yup-phone';
import moment from 'moment';

import TextField from '../../FormsUI/TextField/index';
import SelectField from '../../FormsUI/SelectField/index';
import CustomButton from '../../FormsUI/Button/index';
import Checkbox from '../../FormsUI/Checkbox/index';
import countries from '../../../data/countries.json';

import { useStyles } from './styles';

import api from '../../../services/api';

export default function Register() {
	const [id, setID] = useState(localStorage.getItem('id'));
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('accessToken'),
	);

	const [errorMessage, setErrorMessage] = useState('');

	const [selectedTab, setSelectedTab] = useState(0);

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	const history = useHistory();

	useEffect(() => {
		async function checkIfUserIsLoggedIn() {
			try {
				if (id && accessToken) return history.push('/profile');
			} catch (error) {
				alert(
					`Couldn't Check if user is Logged in. Please try again. Error: ${error}.`,
				);
			}
		}
		checkIfUserIsLoggedIn();
	}, []);

	async function handleRegister(values) {
		var isHairdresser = false;
		if (selectedTab === 1) isHairdresser = true;

		const data = {
			firstName: values.firstName,
			lastName: values.lastName,
			mobile: values.mobile,
			dob: values.dob,
			email: values.email,
			password: values.password,
			isHairdresser: isHairdresser,
			isAdmin: false,
			homeService: values.homeService,
			hairdresserSince: values.hairdresserSince,
			addressLine1: values.addressLine1,
			addressLine2: values.addressLine2,
			city: values.city,
			county: values.county,
			country: values.country,
		};

		try {
			const response = await api.post('users', data);

			history.push('/login');
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const classes = useStyles();

	const INITIAL_FORM_STATE = {
		firstName: '',
		lastName: '',
		dob: '',
		mobile: '',
		email: '',
		password: '',
		confirmPassword: '',

		homeService: false,
		hairdresserSince: '',

		addressLine1: '',
		addressLine2: '',
		city: '',
		county: '',
		country: '',
	};

	const FORM_VALIDATION = Yup.object().shape({
		firstName: Yup.string().required('First Name is a mandatory field'),
		lastName: Yup.string().required('Last Name is a mandatory field'),
		dob: Yup.string()
			.nullable()
			.test('Date of Birth', 'Minimum age is 18', function (value) {
				return moment().diff(moment(value), 'years') >= 18;
			}),
		mobile: Yup.string().required('Mobile is a mandatory field'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is a mandatory field'),
		password: Yup.string()
			.required('Please enter your password')
			.matches(
				/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
				'Password must contain at least 8 characters, one uppercase, one number and one special case character',
			),
		confirmPassword: Yup.string()
			.required('Please confirm your password')
			.when('password', {
				is: (password) => (password && password.length > 0 ? true : false),
				then: Yup.string().oneOf(
					[Yup.ref('password')],
					"Password doesn't match",
				),
			}),

		addressLine1: Yup.string(),
		addressLine2: Yup.string(),
		city: Yup.string(),
		county: Yup.string(),
		country: Yup.string(),
	});

	return (
		<Grid container className={classes.componentGrid} xs={12} md={8} lg={6}>
			<Grid item xs={12}>
				<Typography variant='h4' className={classes.header}>
					Register
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<AppBar position='static' className={classes.appbar}>
					<Tabs value={selectedTab} onChange={handleChange} centered>
						<Tab icon={<Person />} label='Client' />
						<Tab icon={<MonetizationOn />} label='Professional' />
					</Tabs>
				</AppBar>
			</Grid>

			<Formik
				initialValues={{ ...INITIAL_FORM_STATE }}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					handleRegister(values);
					setSubmitting(false);
				}}
			>
				<Form>
					<Grid container spacing={2}>
						{errorMessage && (
							<>
								<Grid item xs={12} className={classes.errorBox}>
									<Typography
										variant='h6'
										fullLength='true'
										className={classes.errorText}
									>
										Error: {errorMessage}
									</Typography>
								</Grid>
							</>
						)}

						<Grid item xs={12}>
							<Typography variant='h6'>Your Details</Typography>
						</Grid>

						<Grid item xs={6}>
							<TextField name='firstName' label='First Name' />
						</Grid>

						<Grid item xs={6}>
							<TextField name='lastName' label='Last Name' />
						</Grid>

						<Grid item xs={6}>
							<TextField name='mobile' label='Mobile' />
						</Grid>

						<Grid item xs={6}>
							<TextField
								name='dob'
								label='Date of Birth'
								type='date'
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField name='email' label='Email' />
						</Grid>

						<Grid item xs={6}>
							<TextField name='password' label='Password' type='password' />
						</Grid>

						<Grid item xs={6}>
							<TextField
								name='confirmPassword'
								label='Confirm Password'
								type='password'
							/>
						</Grid>

						{selectedTab === 1 && (
							<>
								<Grid item xs={12}>
									<Typography variant='h6'>Experience</Typography>
								</Grid>

								<Grid item xs={6}>
									<TextField
										name='hairdresserSince'
										label='Hairdresser Since'
										type='date'
										InputLabelProps={{ shrink: true }}
									/>
								</Grid>

								<Grid item xs={12}>
									<Typography variant='h6'>Business Address</Typography>
								</Grid>

								<Grid item xs={12}>
									<TextField name='addressLine1' label='Address Line 1' />
								</Grid>

								<Grid item xs={12}>
									<TextField name='addressLine2' label='Address Line 2' />
								</Grid>

								<Grid item xs={6}>
									<TextField name='city' label='City' />
								</Grid>

								<Grid item xs={6}>
									<TextField name='county' label='County' />
								</Grid>

								<Grid item xs={12}>
									<SelectField
										name='country'
										label='Country'
										options={countries}
									/>
								</Grid>

								<Grid item xs={4} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='homeService' color='primary' />}
										labelPlacement='start'
										label='Home Service?'
									/>
								</Grid>
							</>
						)}

						<Grid
							container
							spacing={3}
							justify='center'
							className={classes.button}
						>
							<Grid item xs={6}>
								<CustomButton>Register</CustomButton>
							</Grid>
						</Grid>

						<Grid item xs={8}>
							<Button startIcon={<ExitToApp color='primary' />} href='login'>
								Already Registered?
							</Button>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</Grid>
	);
}
