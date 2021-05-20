import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';

import { useStyles } from './styles';
export default function RegistrationConfirmation() {
	const classes = useStyles();

	const history = useHistory();

	return (
		<Grid
			container
			align='center'
			justify='center'
			spacing={3}
			className={classes.componentGrid}
		>
			<Grid item xs={12}>
				<CheckCircleOutline
					style={{ color: '#10B83F', fontSize: 60, marginTop: 45 }}
				/>
				<Typography variant='h5'>
					{' '}
					Registration Successful. You will receive a verification email
					shortly.{' '}
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Button
					variant='contained'
					color='primary'
					href='/login'
					style={{ marginTop: 30, marginBottom: 45 }}
				>
					OK
				</Button>
			</Grid>
		</Grid>
	);
}
