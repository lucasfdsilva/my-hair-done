import React, { useState, useEffect } from 'react';
import {
	Grid,
	Typography,
	Card,
	CardHeader,
	Avatar,
	Divider,
	Button,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import TextField from '../../../FormsUI/TextField/index';
import CustomButton from '../../../FormsUI/Button/index';

import { useStyles } from './styles.js';
import api from '../../../../services/api';

export default function BookingFormNew(props) {
	const [id, setID] = useState(localStorage.getItem('id'));
	const [dateValue, setDateValue] = useState(new Date());
	const [slots, setSlots] = useState([]);
	const [selectedSlot, setSelectedSlot] = useState();

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		async function loadSlots() {
			try {
				const response = await api.get(
					`/slots/hairdressers/${props.hairdresser.id}`,
				);

				setSlots(response.data.slots);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}
		loadSlots();
	}, []);

	async function handleCreateBooking(values) {
		const data = {
			hairdresserId: props.hairdresser.id,
			userId: id,
			slotId: selectedSlot,
			date: dateValue,
		};

		console.log(data);

		try {
			const response = await api.post('/bookings', data);

			window.location.reload();
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const INITIAL_FORM_STATE = {};

	const FORM_VALIDATION = Yup.object().shape({});

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
								<Card>
									<CardHeader
										className={classes.header}
										avatar={
											<Avatar
												className={classes.profileImgPicture}
												src={props.hairdresser.profile_img_url}
											>
												{props.hairdresser.first_name +
													props.hairdresser.last_name}
											</Avatar>
										}
										title={
											props.hairdresser.first_name +
											' ' +
											props.hairdresser.last_name
										}
										titleTypographyProps={{
											variant: 'h4',
											className: `${classes.title}`,
										}}
										subheader={
											props.hairdresser.addressLine2 == ''
												? props.hairdresser.addressLine1 +
												  ', ' +
												  props.hairdresser.city +
												  ', ' +
												  props.hairdresser.county +
												  ', ' +
												  props.hairdresser.country +
												  '.'
												: props.hairdresser.addressLine1 +
												  ', ' +
												  props.hairdresser.addressLine2 +
												  ', ' +
												  props.hairdresser.city +
												  ', ' +
												  props.hairdresser.county +
												  ', ' +
												  props.hairdresser.country +
												  '.'
										}
									/>
								</Card>
							</Grid>

							<Grid item xs={12} sm={12} md={6} lg={6}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										className={classes.calendar}
										disablePast
										variant='static'
										openTo='date'
										format='dd/MM/yyyy'
										label='Booking Date'
										views={['year', 'month', 'date']}
										value={dateValue}
										onChange={(value) => setDateValue(value)}
									/>
								</MuiPickersUtilsProvider>
							</Grid>

							<Grid item xs={12} sm={12} md={6} lg={6}>
								<Typography variant='h4' color='primary'>
									Available Slots
								</Typography>
								<Divider />

								<Grid
									container
									spacing={3}
									className={classes.buttonsContainer}
								>
									{slots.map((slot) => (
										<Grid item>
											<Button
												key={slot.id}
												className={classes.slotButton}
												variant='outlined'
												color='primary'
												onClick={() => setSelectedSlot(slot.id)}
											>
												{slot.start_time.slice(0, -3)} -{' '}
												{slot.end_time.slice(0, -3)}
											</Button>
										</Grid>
									))}
								</Grid>
							</Grid>

							<Grid item xs={12}>
								<Divider />
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
