import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

	const history = useHistory();

	async function handleCancelBooking() {
		try {
			const response = await api.delete(`/bookings`, {
				data: { id: props.booking.id },
			});

			history.push('/bookings/cancelled');
		} catch (error) {
			setErrorMessage(error?.response?.data?.message);
		}
	}

	const classes = useStyles();

	return (
		<Grid container>
			<Grid item>
				<CardHeader
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
					}}
					subheaderTypographyProps={{
						variant: 'h6',
						color: 'primary',
					}}
					subheader={
						formattedDate +
						' | ' +
						props.booking?.start_time?.slice(0, -3) +
						' - ' +
						props.booking?.end_time?.slice(0, -3)
					}
				/>
			</Grid>

			<Grid container justify='flex-end' align='flex-end'>
				{props.isHairdresser == false && (
					<Grid item>
						<Button
							className={classes.buttonContainer}
							color='primary'
							variant='outlined'
							href={`/hairdressers/${props.booking?.hairdresser_id}`}
						>
							View Profile
						</Button>
					</Grid>
				)}

				<Grid item>
					<Button
						className={classes.buttonContainer}
						color='primary'
						variant='outlined'
						onClick={() => handleCancelBooking()}
					>
						Cancel Booking
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
