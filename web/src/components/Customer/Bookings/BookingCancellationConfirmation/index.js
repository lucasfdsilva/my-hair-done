import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { CancelOutlined } from '@material-ui/icons';

import { useStyles } from './styles';
export default function BookingCancellationConfirmation() {
	const classes = useStyles();

	return (
		<Grid
			container
			align='center'
			justify='center'
			spacing={3}
			className={classes.componentGrid}
			xs={12}
			md={8}
			lg={6}
		>
			<Grid item xs={12}>
				<CancelOutlined
					style={{ color: '#EF5350', fontSize: 60, marginTop: 45 }}
				/>
				<Typography variant='h5'> Your Booking has been cancelled.</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography variant='body1'>
					A notification email has been sent confirming the cancellation.
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
