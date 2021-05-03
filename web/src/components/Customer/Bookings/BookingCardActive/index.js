import React, { useState, useEffect } from 'react';
import {
	Grid,
	CardHeader,
	Avatar,
	Typography,
	Button,
} from '@material-ui/core';

import { useStyles } from './styles.js';

import api from '../../../../services/api';

export default function BookingCardActive(props) {
	const [hairdresser, setHairdresser] = useState();
	const [slot, setSlot] = useState();
	const [formattedDate, setFormattedDate] = useState(
		new Date(props.booking.date).toLocaleDateString(),
	);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		async function loadProfile() {
			try {
				const response = await api.get(
					`/users/${props.booking.hairdresser_id}`,
				);

				setHairdresser(response?.data?.user);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}

		async function loadSlot() {
			try {
				const response = await api.get(`/slots/${props.booking.slot_id}`);

				setSlot(response?.data?.slot);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}

		loadProfile();
		loadSlot();
	}, []);

	async function handleCancelBooking() {
		try {
			const response = await api.delete(`/bookings`, {
				data: { id: props.booking.id },
			});

			window.location.reload();
		} catch (error) {
			setErrorMessage(error?.response?.data?.message);
		}
	}

	const classes = useStyles();

	return (
		<Grid container>
			<Grid item>
				<CardHeader
					className={classes.header}
					avatar={
						<Avatar
							className={classes.profileImgPicture}
							src={hairdresser?.profile_img_url}
						>
							{hairdresser?.first_name + hairdresser?.last_name}
						</Avatar>
					}
					title={hairdresser?.first_name + ' ' + hairdresser?.last_name}
					titleTypographyProps={{
						variant: 'h5',
						className: `${classes.title}`,
					}}
					subheader={hairdresser?.county + ', ' + hairdresser?.country + '.'}
				/>
			</Grid>

			<Grid item>
				<Typography variant='h6' color='primary' className={classes.date}>
					{formattedDate} | {slot?.start_time.slice(0, -3)} -{' '}
					{slot?.end_time.slice(0, -3)}
				</Typography>
			</Grid>

			<Grid item>
				<Button
					color='primary'
					variant='outlined'
					className={classes.buttons}
					onClick={() => handleCancelBooking()}
				>
					Cancel Booking
				</Button>
			</Grid>
		</Grid>
	);
}
