import React, { useState } from 'react';
import { Grid, Typography, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import TextField from '../../../../FormsUI/TextField/index';
import CustomButton from '../../../../FormsUI/Button/index';
import Checkbox from '../../../../FormsUI/Checkbox/index';

import api from '../../../../../services/api';

export default function SlotForm(props) {
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	async function handleCreateSlot(values) {
		const data = {
			hairdresserId: props.userId,
			startTime: values.startTime,
			endTime: values.endTime,
			monday: values.monday,
			tuesday: values.tuesday,
			wednesday: values.wednesday,
			thursday: values.thursday,
			friday: values.friday,
			saturday: values.saturday,
			sunday: values.sunday,
		};

		try {
			const response = await api.post('/slots', data);

			window.location.reload();
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const INITIAL_FORM_STATE = {
		startTime: '09:00',
		endTime: '10:00',
	};

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
		checkboxes: {
			marginLeft: 10,
		},
		title: {
			marginBottom: 30,
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
					handleCreateSlot(values);
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
									New Booking Slot
								</Typography>
							</Grid>

							<Grid item xs={6}>
								<TextField
									name='startTime'
									id='time'
									label='Start Time'
									type='time'
									className={classes.textField}
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										step: 300, // 5 min
									}}
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									name='endTime'
									id='time'
									label='End Time'
									type='time'
									className={classes.textField}
									InputLabelProps={{
										shrink: true,
									}}
									inputProps={{
										step: 300, // 5 min
									}}
								/>
							</Grid>

							<Grid container spacing={2} className={classes.checkboxes}>
								<Grid item xs={6} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='monday' color='primary' />}
										labelPlacement='end'
										label='Monday'
									/>
								</Grid>
								<Grid item xs={4} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='tuesday' color='primary' />}
										labelPlacement='end'
										label='Tuesday'
									/>
								</Grid>
								<Grid item xs={6} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='wednesday' color='primary' />}
										labelPlacement='end'
										label='Wednesday'
									/>
								</Grid>
								<Grid item xs={6} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='thursday' color='primary' />}
										labelPlacement='end'
										label='Thursday'
									/>
								</Grid>
								<Grid item xs={6} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='friday' color='primary' />}
										labelPlacement='end'
										label='Friday'
									/>
								</Grid>
								<Grid item xs={6} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='saturday' color='primary' />}
										labelPlacement='end'
										label='Saturday'
									/>
								</Grid>
								<Grid item xs={6} className={classes.checkbox}>
									<FormControlLabel
										control={<Checkbox name='sunday' color='primary' />}
										labelPlacement='end'
										label='Sunday'
									/>
								</Grid>
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
