import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
	const [lastReviewDate, setLastReviewDate] = useState('');

	const [openBookingForm, setOpenBookingForm] = useState(false);

	const history = useHistory();

	useEffect(() => {
		async function getReviews() {
			try {
				var ratings = [];
				for (const review of props.hairdresser.reviews) {
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
				setLastReviewDate(
					new Date(
						props.hairdresser?.reviews[0].created_at.slice(0, -9),
					).toDateString(),
				);
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

			<Card raised='true' className={classes.card}>
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

				<label
					className={classes.portfolioImg}
					onClick={() => history.push(`/hairdressers/${props.hairdresser.id}`)}
				>
					<CardMedia
						component='img'
						image={props.hairdresser?.lastPortfolioImageUrl}
						height='160'
						title={
							props.hairdresser.first_name + ' ' + props.hairdresser.last_name
						}
					/>
				</label>

				<CardContent>
					{props.hairdresser?.reviews?.length > 0 && (
						<>
							<Grid container spacing={1}>
								<Grid item>
									<Typography variant='subtitle2'>
										{props.hairdresser?.reviews[0]?.headline}
									</Typography>
								</Grid>

								<Grid item>
									<Rating
										name='read-only'
										value={props.hairdresser?.reviews[0]?.rating}
										precision={0.5}
										readOnly
										size='small'
									/>
								</Grid>
							</Grid>

							<Typography variant='body2' className={classes.reviewDescription}>
								{props.hairdresser?.reviews[0]?.description.substring(0, 100)}
								...<br></br>
								<Typography variant='caption' style={{ color: '#BDBDBD' }}>
									{lastReviewDate}
								</Typography>
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
