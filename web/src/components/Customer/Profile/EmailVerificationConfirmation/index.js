import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import { CheckCircleOutline, ErrorOutline } from '@material-ui/icons';

import { useStyles } from './styles';

import api from '../../../../services/api';
export default function EmailVerificationConfirmation() {
	const classes = useStyles();
	const { verificationToken } = useParams();

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		async function verifyEmail() {
			try {
				const response = await api.put(`/users/verify/${verificationToken}`);

				console.log(response);

				setSuccessMessage(response?.data?.message);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}
		verifyEmail();
	}, []);

	return (
		<Grid
			container
			align='center'
			justify='center'
			spacing={3}
			className={classes.componentGrid}
		>
			{successMessage ? (
				<Grid item xs={12}>
					<CheckCircleOutline
						style={{ color: '#10B83F', fontSize: 60, marginTop: 45 }}
					/>
					<Typography variant='h5'> {successMessage} </Typography>
				</Grid>
			) : (
				<Grid item xs={12}>
					<ErrorOutline
						style={{ color: '#EF5350', fontSize: 60, marginTop: 45 }}
					/>
					<Typography variant='h5'>{errorMessage}</Typography>
				</Grid>
			)}

			<Grid item xs={12}>
				<Button
					variant='contained'
					color='primary'
					href='/'
					style={{ marginTop: 30, marginBottom: 45 }}
				>
					OK
				</Button>
			</Grid>
		</Grid>
	);
}
