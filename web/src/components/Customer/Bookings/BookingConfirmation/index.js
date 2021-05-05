import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';

import { useStyles } from './styles';
export default function BookingConfirmation() {
	const classes = useStyles();

	return (
		<Grid container align='center' justify='center' spacing={3}>
			<Grid item xs={12}>
				<CheckCircleOutline
					style={{ color: '#10B83F', fontSize: 60, marginTop: 45 }}
				/>
				<Typography variant='h5'> Booking completed successfully!</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography variant='body1'>
					You will receive an email confirmation shortly
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Button
					variant='contained'
					color='primary'
					href='/bookings'
					style={{ marginTop: 30, marginBottom: 45 }}
				>
					OK
				</Button>
			</Grid>
		</Grid>
	);
}
