import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, Divider } from '@material-ui/core';

import { useStyles } from './styles.js';

import BookingCardActive from '../BookingCardActive';

export default function ActiveBookings(props) {
	const classes = useStyles();

	return (
		<Grid container className={classes.componentGrid}>
			<Grid item xs={12} className={classes.title}>
				<Typography variant='h4'>Active Bookings</Typography>
			</Grid>

			<Grid item xs={12}>
				<List className={classes.list} dense>
					{props.bookings.map((booking) => (
						<Grid item xs={12}>
							<BookingCardActive booking={booking} userId={props.userId} />
						</Grid>
					))}
				</List>
			</Grid>
		</Grid>
	);
}
