import React, { useState, useEffect } from 'react';
import { Grid, Typography, FormControlLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete, Error } from '@material-ui/icons';
import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import TextField from '../../../../FormsUI/TextField/index';
import CustomButton from '../../../../FormsUI/Button/index';
import Checkbox from '../../../../FormsUI/Checkbox/index';

import api from '../../../../../services/api';

export default function SlotForm(props) {
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [clickedToDelete, setClickedToDelete] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const [monday, setMonday] = useState(props.slot.monday);
	const [tuesday, setTuesday] = useState(props.slot.tuesday);
	const [wednesday, setWednesday] = useState(props.slot.wednesday);
	const [thursday, setThursday] = useState(props.slot.thursday);
	const [friday, setFriday] = useState(props.slot.friday);
	const [saturday, setSaturday] = useState(props.slot.saturday);
	const [sunday, setSunday] = useState(props.slot.sunday);

	async function handleUpdateSlot(values) {
		const data = {
			id: props.slot.id,
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

		console.log(data);

		try {
			const response = await api.put('/slots', data);

			window.location.reload();
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	async function handleClickedToDelete() {
		setClickedToDelete(true);
	}

	async function handleDeleteSlot() {
		try {
			setDeleting(true);

			const response = await api.delete('/slots', {
				data: { id: props.post.id },
			});

			window.location.reload();
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const INITIAL_FORM_STATE = {
		startTime: props.slot.start_time,
		endTime: props.slot.end_time,
		monday: monday,
		tuesday: tuesday,
		wednesday: wednesday,
		thursday: thursday,
		friday: friday,
		saturday: saturday,
		sunday: sunday,
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
					handleUpdateSlot(values);
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
								<CustomButton>Update Slot</CustomButton>
							</Grid>
						</Grid>

						<Grid container justify='center' className={classes.button}>
							<Grid item xs={4}>
								{clickedToDelete == 1 ? (
									<Button
										fullWidth
										startIcon={<Error color='primary' />}
										onClick={handleDeleteSlot}
										disabled={deleting}
									>
										Are you Sure?
									</Button>
								) : (
									<Button
										fullWidth
										startIcon={<Delete color='primary' />}
										onClick={handleClickedToDelete}
									>
										Delete Post
									</Button>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</Grid>
	);
}
