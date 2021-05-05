import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import BookingConfirmation from '../BookingConfirmation';

import CustomButton from '../../../FormsUI/Button/index';

import { useStyles } from './styles.js';
import api from '../../../../services/api';

export default function BookingFormNew(props) {
	const [id, setID] = useState(localStorage.getItem('id'));
	const [dateValue, setDateValue] = useState(new Date());
	const [availableSlots, setAvailableSlots] = useState([]);
	const [selectedSlot, setSelectedSlot] = useState();
	const { hairdresserId } = useParams();
	const [hairdresser, setHairdresser] = useState([]);

	const [bookingConfirmed, setBookingConfirmed] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const history = useHistory();

	useEffect(() => {
		async function loadHairdresser() {
			try {
				const response = await api.get(`/users/${hairdresserId}`);

				setHairdresser(response.data.user);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}

		async function loadSlots() {
			console.log('loading slots');
			try {
				const response = await api.get(
					`/availability?date=${
						dateValue.getFullYear() +
						'-' +
						(dateValue.getMonth() + 1) +
						'-' +
						dateValue.getDate()
					}&hairdresserId=${hairdresserId}`,
				);
				console.log(response.data.availableSlots);

				setAvailableSlots(response.data.availableSlots);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}
		loadHairdresser();
		loadSlots();
	}, [dateValue]);

	async function handleCreateBooking(values) {
		const data = {
			hairdresserId: hairdresser.id,
			userId: id,
			slotId: selectedSlot,
			date: dateValue,
		};

		try {
			const response = await api.post('/bookings', data);

			setBookingConfirmed(true);
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const INITIAL_FORM_STATE = {};

	const FORM_VALIDATION = Yup.object().shape({});

	const classes = useStyles();

	return (
		<Grid container className={classes.componentGrid}>
			{bookingConfirmed === true ? (
				<BookingConfirmation />
			) : (
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
													src={hairdresser.profile_img_url}
												>
													{hairdresser.first_name + hairdresser.last_name}
												</Avatar>
											}
											title={
												hairdresser.first_name + ' ' + hairdresser.last_name
											}
											titleTypographyProps={{
												variant: 'h5',
												className: `${classes.title}`,
											}}
											subheader={
												hairdresser.addressLine2 == ''
													? hairdresser.addressLine1 +
													  ', ' +
													  hairdresser.city +
													  ', ' +
													  hairdresser.county +
													  ', ' +
													  hairdresser.country +
													  '.'
													: hairdresser.addressLine1 +
													  ', ' +
													  hairdresser.addressLine2 +
													  ', ' +
													  hairdresser.city +
													  ', ' +
													  hairdresser.county +
													  ', ' +
													  hairdresser.country +
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
										{availableSlots.map((slot) => (
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

										{availableSlots.length === 0 && (
											<Grid item>
												<Typography variant='h6'>
													No Slots Available at this date.
												</Typography>
											</Grid>
										)}
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Divider />
								</Grid>
							</Grid>

							<Grid container spacing={3} justify='center' align='center'>
								<Grid item xs={6} className={classes.button}>
									<Button
										variant='outlined'
										fullWidth
										href={`/hairdressers/${hairdresserId}`}
									>
										Cancel
									</Button>
								</Grid>
								<Grid item xs={6} className={classes.button}>
									<CustomButton>Confirm Booking</CustomButton>
								</Grid>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			)}
		</Grid>
	);
}
