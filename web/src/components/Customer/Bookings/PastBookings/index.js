import React from 'react';
import { Grid, Typography, List, Divider } from '@material-ui/core';

import { useStyles } from './styles.js';

import BookingCardPast from '../BookingCardPast';

export default function PastBookings(props) {
	const classes = useStyles();

	return (
		<Grid container className={classes.componentGrid}>
			<Grid item xs={12} className={classes.title}>
				<Typography variant='h4'>Past Bookings</Typography>
			</Grid>

			{props.bookings.length > 0 ? (
				<Grid item xs={12}>
					<List className={classes.list} dense>
						{props.bookings.map((booking, i) => (
							<Grid item xs={12}>
								<BookingCardPast booking={booking} userId={props.userId} />

								{i + 1 < props.bookings.length && <Divider />}
							</Grid>
						))}
					</List>
				</Grid>
			) : (
				<Grid item>
					<Typography>You don't have any past bookings.</Typography>
				</Grid>
			)}
		</Grid>
	);
}
