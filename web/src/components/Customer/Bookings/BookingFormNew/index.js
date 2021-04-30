import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import TextField from '../../../FormsUI/TextField/index';
import CustomButton from '../../../FormsUI/Button/index';

import api from '../../../../services/api';

export default function BookingFormNew(props) {
	const [dateValue, setDateValue] = useState(new Date());

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	async function handleCreateBooking(values) {
		const data = {};

		try {
			const response = await api.post('/slots', data);

			window.location.reload();
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const INITIAL_FORM_STATE = {};

	const FORM_VALIDATION = Yup.object().shape({});

	const useStyles = makeStyles({
		componentGrid: {
			backgroundColor: '#fff',
			borderRadius: 8,
			alignItems: 'center',
			justifyItems: 'center',
			padding: 25,
			margin: 35,
		},
		button: {
			marginTop: 45,
			marginBottom: 15,
		},
		title: {
			marginBottom: 30,
		},
		errorText: {
			color: '#fff',
		},
		errorBox: {
			backgroundColor: '#ff867c',
			borderRadius: 8,
			marginTop: 20,
			marginBottom: 20,
			marginLeft: 10,
			marginRight: 10,
		},
	});
	const classes = useStyles();

	return (
		<Grid container className={classes.componentGrid}>
			<Formik
				initialValues={{ ...INITIAL_FORM_STATE }}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					handleCreateBooking(values);
					setSubmitting(false);
				}}
			>
				<Form>
					<Grid container spacing={2}>
						<Grid container spacing={3} justify='center'>
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

							{successMessage && (
								<>
									<Grid item xs={12} className={classes.successBox}>
										<Typography
											variant='h6'
											fullLength='true'
											className={classes.successMessage}
										>
											{successMessage}
										</Typography>
									</Grid>
								</>
							)}

							<Grid item xs={12}>
								<Typography className={classes.title} variant='h4'>
									New Booking
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<DatePicker
									disableFuture
									label='Responsive'
									openTo='day'
									views={['year', 'month', 'day']}
									value={dateValue}
									onChange={(newValue) => {
										setDateValue(newValue);
									}}
									renderInput={(params) => (
										<TextField {...params} margin='normal' />
									)}
								/>
							</Grid>
						</Grid>

						<Grid container spacing={3} justify='center'>
							<Grid item xs={6} className={classes.button}>
								<CustomButton>Create Slot</CustomButton>
							</Grid>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</Grid>
	);
}
