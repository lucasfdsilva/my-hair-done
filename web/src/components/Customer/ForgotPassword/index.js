import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';
import { HowToReg, VpnKey } from '@material-ui/icons';
import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import TextField from '../../FormsUI/TextField/index';
import CustomButton from '../../FormsUI/Button/index';

import { useStyles } from './styles';

import api from '../../../services/api';

export default function ForgotPassword() {
	const [id, setID] = useState(localStorage.getItem('id'));
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('accessToken'),
	);

	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const history = useHistory();

	useEffect(() => {
		async function checkIfUserIsLoggedIn() {
			try {
				if (id && accessToken) return history.push('/profile');
			} catch (error) {
				setErrorMessage(
					`Couldn't Check if user is Logged in. Please try again. Error: ${error}.`,
				);
			}
		}
		checkIfUserIsLoggedIn();
	}, []);

	async function handleResetPassword(values) {
		const data = {
			email: values.email,
		};

		try {
			const response = await api.post('/forgotpassword/send', data);

			setSuccessMessage(response.data.message);
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const classes = useStyles();

	const INITIAL_FORM_STATE = {
		email: '',
	};

	const FORM_VALIDATION = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is a mandatory field'),
	});

	return (
		<Grid
			container
			className={classes.componentGrid}
			xs={12}
			md={8}
			lg={6}
			justify='center'
			align='center'
		>
			<Formik
				initialValues={{ ...INITIAL_FORM_STATE }}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					handleResetPassword(values);
					setSubmitting(false);
				}}
			>
				<Form>
					<Grid container spacing={2}>
						<Grid container spacing={3} justify='center'>
							{errorMessage && (
								<>
									<Grid item xs={10} className={classes.errorBox}>
										<Typography
											variant='subtitle1'
											fullLength='true'
											className={classes.errorText}
										>
											Error: {errorMessage}
										</Typography>
									</Grid>
								</>
							)}

							{successMessage && (
								<>
									<Grid item xs={10} className={classes.successBox}>
										<Typography
											variant='subtitle1'
											fullLength='true'
											className={classes.successText}
										>
											{successMessage}
										</Typography>
									</Grid>
								</>
							)}

							<Grid item xs={8}>
								<Typography variant='h4' className={classes.header}>
									Reset Password
								</Typography>
							</Grid>

							<Grid item xs={8}>
								<TextField name='email' label='Email' />
							</Grid>
						</Grid>

						<Grid container spacing={3} justify='center' align='center'>
							<Grid item xs={6} className={classes.button}>
								<CustomButton>Reset Password</CustomButton>
							</Grid>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</Grid>
	);
}
