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
	const [formattedDate, setFormattedDate] = useState(
		new Date(props.booking.date).toLocaleDateString(),
	);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {}, []);

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
							src={props.booking?.profile_img_url}
						>
							{props.booking?.first_name + props.booking?.last_name}
						</Avatar>
					}
					title={props.booking?.first_name + ' ' + props.booking?.last_name}
					titleTypographyProps={{
						variant: 'h5',
						className: `${classes.title}`,
					}}
					subheader={
						props.booking?.county + ', ' + props.booking?.country + '.'
					}
				/>
			</Grid>

			<Grid item>
				<Typography variant='h6' color='primary' className={classes.date}>
					{formattedDate} | {props.booking?.start_time?.slice(0, -3)} -{' '}
					{props.booking?.end_time?.slice(0, -3)}
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
