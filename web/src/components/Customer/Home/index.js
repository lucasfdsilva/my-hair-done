import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';

import { useStyles } from './styles';

export default function HomePageBody() {
	const classes = useStyles();

	return (
		<Grid
			container
			justify='center'
			align='center'
			className={classes.componentGrid}
		>
			<Grid item xs={12}>
				<Typography variant='h3' className={classes.header}>
					My Hair Done
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography variant='h5' className={classes.header}>
					Style or Get Styled with Us
				</Typography>
			</Grid>
		</Grid>
	);
}
