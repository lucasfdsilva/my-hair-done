import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
	Avatar,
	Grid,
	Button,
	Modal,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import BookingFormNew from '../../Bookings/BookingFormNew';

import { useStyles } from './styles';
import api from '../../../../services/api';

export default function HairdresserCard(props) {
	const classes = useStyles();
	const [id, setID] = useState(localStorage.getItem('id'));
	const [isOwner, setIsOwner] = useState(false);
	const [reviews, setReviews] = useState([]);
	const [totalReviews, setTotalReviews] = useState(0);
	const [averageRating, setAverageRating] = useState(0);

	const [openBookingForm, setOpenBookingForm] = useState(false);

	useEffect(() => {
		async function getReviews() {
			try {
				const response = await api.get(
					`/reviews/hairdressers/${props.hairdresser.id}`,
				);

				var ratings = [];
				for (const review of response.data.reviews) {
					ratings.push(review.rating);
				}

				function roundHalf(value) {
					return Math.round(value * 2) / 2;
				}

				const totalRating = ratings.reduce((a, b) => a + b, 0);
				const rawAverageRating = totalRating / ratings.length;
				const finalRating = roundHalf(rawAverageRating);

				setAverageRating(finalRating);
				setTotalReviews(ratings.length);
				setReviews(response.data.reviews);
			} catch (error) {}
		}

		if (id == props.hairdresser.id) {
			setIsOwner(true);
		}

		getReviews();
	}, []);

	const handleOpenBookingForm = () => {
		setOpenBookingForm(true);
	};

	const handleCloseBookingForm = () => {
		setOpenBookingForm(false);
	};

	return (
		<>
			<Grid container className={classes.modalContainer}>
				<Modal
					className={classes.modal}
					open={openBookingForm}
					onClose={handleCloseBookingForm}
				>
					<BookingFormNew hairdresser={props.hairdresser} />
				</Modal>
			</Grid>

			<Card raised='true'>
				<CardHeader
					avatar={
						<Avatar
							className={classes.profileImgPicture}
							src={props.hairdresser.profile_img_url}
						>
							{props.hairdresser.first_name.charAt(0).toUpperCase() +
								props.hairdresser.last_name.charAt(0).toUpperCase()}
						</Avatar>
					}
					title={
						props.hairdresser.first_name + ' ' + props.hairdresser.last_name
					}
					subheader={
						props.hairdresser.county + ', ' + props.hairdresser.country + '.'
					}
				></CardHeader>
				<Grid
					container
					justify='center'
					spacing={1}
					className={classes.ratingsContainer}
				>
					<Grid item>
						<Rating
							name='read-only'
							value={averageRating}
							precision={0.5}
							readOnly
						/>
					</Grid>

					<Grid item>
						<Typography className={classes.ratingsTotal}>
							({totalReviews})
						</Typography>
					</Grid>
				</Grid>

				<CardMedia
					component='img'
					image={props.hairdresser.profile_img_url}
					height='160'
					title={
						props.hairdresser.first_name + ' ' + props.hairdresser.last_name
					}
				/>

				<CardContent>
					{reviews.length > 0 && (
						<>
							<Grid container spacing={1}>
								<Grid item>
									<Typography variant='subtitle2'>
										{reviews[0].headline}
									</Typography>
								</Grid>

								<Grid item>
									<Rating
										name='read-only'
										value={reviews[0].rating}
										precision={0.5}
										readOnly
										size='small'
									/>
								</Grid>
							</Grid>

							<Typography variant='body2'>{reviews[0].description}</Typography>
							<Typography variant='caption'>
								{new Date(reviews[0].created_at).toDateString()} |{' '}
								{reviews[0].first_name} {reviews[0].last_name}
							</Typography>
						</>
					)}

					<Grid container spacing={1} className={classes.buttonsContainer}>
						<Grid item xs={6}>
							<Button
								variant='outlined'
								color='primary'
								fullWidth
								href={`hairdressers/${props.hairdresser.id}`}
							>
								View Profile
							</Button>
						</Grid>

						{!isOwner && (
							<Grid item xs={6}>
								<Button
									variant='contained'
									color='primary'
									fullWidth
									href={`/bookings/new/hairdressers/${props.hairdresser.id}`}
								>
									Book Now
								</Button>
							</Grid>
						)}
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}
