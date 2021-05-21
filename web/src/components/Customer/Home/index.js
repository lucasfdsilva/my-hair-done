import React, { useEffect, useState } from 'react';
import { Typography, Grid, Divider, Button } from '@material-ui/core';
import Image from 'material-ui-image';

import HairdresserCard from '../Hairdressers/HairdresserCard';
import ReviewCard from '../Reviews/ReviewCard';

import { useStyles } from './styles';

import api from '../../../services/api';

export default function HomePageBody() {
	const classes = useStyles();

	const testimonials = [
		{
			id: 0,
			rating: 5,
			headline: 'Life Changing',
			description:
				'Managing my appointments and meeting new clients has never been this easy!',
			created_at: '2021-05-20 07:56:31',
			profile_img_url: '/user1.jpg',
			first_name: 'Ciaran',
			last_name: 'Murphy',
		},
		{
			id: 0,
			rating: 5,
			headline: 'Perfect for finding new clients',
			description:
				'The possibility of storing my entire portfolio and manage my bookings all in the same place is priceless to me.',
			created_at: '2021-02-16 07:56:31',
			profile_img_url: 'user2.jpg',
			first_name: 'Enda',
			last_name: 'Walsh',
		},
		{
			id: 0,
			rating: 5,
			headline: 'Well Architected and incredibly useful',
			description:
				'After moving to Ireland I had issues finding hairdressers...not anymore thanks to My Hair Done!',
			created_at: '2021-04-02 07:56:31',
			profile_img_url: 'user3.jpg',
			first_name: 'Andrew',
			last_name: 'Mccarthy',
		},
	];

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
		<Grid container>
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

			<Grid item xs={12} className={classes.faceRecognitionOuterContainer}>
				<Grid container className={classes.faceRecognitionInnerContainer}>
					<Grid item xs={12} sm={7} md={7} lg={7}>
						<Typography
							variant='h4'
							className={classes.faceRecognitionTextContainer}
						>
							Discover the new AR Hairstyler
							<br></br>
							<Typography variant='body1'>
								Our Augmented Reality Hairstyler uses Machine Learning to read
								your face landmarks and expressions to help you quickly try out
								different hair styles.
								<br></br>
								<br></br>
								<Typography variant='caption'>
									Use it from a Desktop browser for better experience.
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

			<Grid container className={classes.reviewsContainer}>
				<Typography variant='h5'>Testimonials</Typography>
				<Divider variant='middle' fullWidth className={classes.divider} />

				<Grid container>
					{testimonials.map((testimonial, i) => (
						<Grid item xs={12}>
							<ReviewCard key={testimonial.id} review={testimonial} />

							{i + 1 < testimonials.length && <Divider />}
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}
