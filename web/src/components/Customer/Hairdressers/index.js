import React, { useState, useEffect } from 'react';
import {
	Typography,
	Grid,
	Divider,
	TextField,
	InputAdornment,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import HairdresserCard from './HairdresserCard';

import { useStyles } from './styles';

import api from '../../../services/api';

export default function Hairdressers() {
	const classes = useStyles();
	const [hairdressers, setHairdressers] = useState([]);
	const [featuredHairdressers, setFeaturedHairdressers] = useState([]);

	const [searchParameter, setSearchParameter] = useState(null);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		async function loadHairdressers() {
			try {
				const response = await api.get(`/users/hairdressers`);

				const sliceHairdressers = response.data.hairdressers
					.reverse()
					.slice(0, 4);

				setFeaturedHairdressers(sliceHairdressers);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}
		loadHairdressers();
	}, []);

	useEffect(() => {
		async function searchHairdressers() {
			try {
				setHairdressers(null);

				const response = null;

				if (!searchParameter == '') {
					const response = await api.get(
						`users/hairdressers/${searchParameter}`,
					);
					setHairdressers(response.data.hairdressers);
				}
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}
		searchHairdressers();
	}, [searchParameter]);

	return (
		<Grid container className={classes.componentGrid}>
			<Grid
				container
				justify='center'
				spacing={2}
				className={classes.formContainer}
			>
				<Grid container spacing={2}>
					{errorMessage && (
						<>
							<Grid item xs={12} className={classes.errorBox}>
								<Typography
									variant='h6'
									fullLength='true'
									className={classes.errorText}
								>
									Error: {errorMessage}
								</Typography>
							</Grid>
						</>
					)}

					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Typography variant='h5' className={classes.searchTitle}>
							Search for Hairdressers
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={12} lg={12}>
						<TextField
							fullWidth
							variant='outlined'
							name='name'
							label='Search Name, email...'
							placeholder='Search using name, email...'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Search color='primary' />
									</InputAdornment>
								),
							}}
							onChange={(event) => setSearchParameter(event.target.value)}
						/>
					</Grid>
				</Grid>
			</Grid>

			{hairdressers && (
				<>
					<Typography variant='h5'>Results</Typography>

					<Divider
						variant='middle'
						fullWidth
						className={classes.dividerResults}
					/>
				</>
			)}

			<Grid
				container
				justify='center'
				spacing={6}
				className={classes.searchResults}
			>
				{hairdressers?.length == 0 && (
					<Typography variant='h6'>No Hairdressers Found</Typography>
				)}
				{hairdressers &&
					hairdressers.map((hairdresser) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={hairdresser.id}>
							<HairdresserCard hairdresser={hairdresser} />
						</Grid>
					))}
			</Grid>

			<Typography variant='h5'>Featured Professionals</Typography>

			<Divider variant='middle' fullWidth className={classes.divider} />

			<Grid container justify='center' spacing={6}>
				{featuredHairdressers.map((hairdresser) => (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<HairdresserCard hairdresser={hairdresser} />
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}
