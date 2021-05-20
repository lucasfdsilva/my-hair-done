import React, { useEffect, useState } from 'react';
import { Typography, Grid, Divider, Button } from '@material-ui/core';
import Image from 'material-ui-image';

import HairdresserCard from '../Hairdressers/HairdresserCard';

import { useStyles } from './styles';

import api from '../../../services/api';

export default function HomePageBody() {
	const classes = useStyles();

	const [featuredHairdressers, setFeaturedHairdressers] = useState([]);

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

	return (
		<Grid>
			<Grid
				container
				justify='center'
				align='center'
				className={classes.epicContainer}
			>
				<Grid item xs={12}>
					<Typography variant='h3' className={classes.header}>
						My Hair Done
					</Typography>
					<br></br>
					<Typography variant='h5' className={classes.header}>
						Style or Get Styled with Us
					</Typography>
				</Grid>
			</Grid>

			<Grid className={classes.faceRecognitionOuterContainer}>
				<Grid container className={classes.faceRecognitionInnerContainer}>
					<Grid item xs={12} sm={7} md={7} lg={7}>
						<Typography
							variant='h4'
							className={classes.faceRecognitionTextContainer}
						>
							Discover our AR Hairstyler
							<br></br>
							<Typography variant='body1'>
								Our Augmented Reality Hairstyler uses Machine Learning to read
								your face landmarks and expressions to help you quickly try out
								different hair styles.
								<br></br>
								<br></br>
								<Typography variant='caption'>
									Use it from a Desktop browser for optimal experience.
									<br></br>
									Please note that this feature is still under development.
								</Typography>
							</Typography>
						</Typography>

						<Button
							variant='contained'
							color='primary'
							onClick={() => window.open('https://hairstyler.myhairdone.co.uk')}
							className={classes.button}
						>
							Try it now!
						</Button>
					</Grid>

					<Grid item xs={5} className={classes.faceRecognitionImageContainer}>
						<img
							src='/facerecognition-circle.png'
							className={classes.faceRecognitionImage}
						/>
					</Grid>
				</Grid>
			</Grid>

			<Grid container className={classes.featuredHairdressersContainer}>
				<Typography variant='h5'>Featured Hairdressers</Typography>

				<Divider variant='middle' fullWidth className={classes.divider} />

				<Grid container justify='center' spacing={6}>
					{featuredHairdressers.map((hairdresser) => (
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<HairdresserCard hairdresser={hairdresser} />
						</Grid>
					))}
				</Grid>
			</Grid>

			<Grid container className={classes.forUsersOuterContainer}>
				<Grid
					container
					align='center'
					justify='center'
					spacing={2}
					className={classes.forUsersContainer}
				>
					<Grid
						item
						xs={12}
						sm={12}
						md={5}
						lg={5}
						className={classes.textContainer}
					>
						<Typography variant='h4' className={classes.title}>
							For Hairdressers
							<br></br>
							<br></br>
							<Typography variant='body1'>
								More than just an appointment booking app, it's your life made
								easier and your portfolio visible!
								<br></br>
								<br></br>
								Features
								<br></br>
								<br></br>- Free Web App available in any device
								<br></br>- Manage your appointments
								<br></br>- Publish your portfolio
								<br></br>- Create customized time slots
								<br></br>- Notifications and Reminders
								<br></br>- Reduce no shows
							</Typography>
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={5} lg={5}>
						<img
							src='/hairdresser.jpg'
							alt='for hairdressers'
							className={classes.forUsersImage}
						/>
					</Grid>
				</Grid>

				<Grid
					container
					align='center'
					justify='center'
					spacing={2}
					className={classes.forUsersContainer}
				>
					<Grid
						item
						xs={12}
						sm={12}
						md={5}
						lg={5}
						className={classes.textContainer}
					>
						<Typography variant='h4' className={classes.title}>
							For Clients
							<br></br>
							<br></br>
							<Typography variant='body1'>
								More than just an appointment booking app, it's your life made
								easier!
								<br></br>
								<br></br>
								Features
								<br></br>
								<br></br>- Free Web App available in any device
								<br></br>- Manage your appointments
								<br></br>- Publish your portfolio
								<br></br>- Create customized time slots
								<br></br>- Notifications and Reminders
								<br></br>- Reduce no shows
							</Typography>
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={5} lg={5}>
						<img
							src='/user.jpg'
							alt='for users'
							className={classes.forUsersImage}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
