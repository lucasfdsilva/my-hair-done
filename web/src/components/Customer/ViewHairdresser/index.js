import React, { useState, useEffect } from 'react';
import {
	Modal,
	Card,
	CardHeader,
	Typography,
	Avatar,
	Grid,
	Button,
	Divider,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Add } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

import BookingFormNew from '../Bookings/BookingFormNew';
import PortfolioPostForm from '../PortfolioPostForm';
import PortfolioPostCard from '../PortfolioPostCard';
import ReviewCard from '../Reviews/ReviewCard';

import { useStyles } from './styles';

import api from '../../../services/api';

export default function ViewHairdresser(props) {
	const [id, setID] = useState(localStorage.getItem('id'));
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('accessToken'),
	);
	const [isOwner, setIsOwner] = useState(false);
	const { hairdresserId } = useParams();
	const [hairdresser, setHairdresser] = useState([]);
	const [featuredPosts, setFeaturedPosts] = useState([]);
	const [posts, setPosts] = useState([]);

	const [reviews, setReviews] = useState([]);
	const [totalReviews, setTotalReviews] = useState(0);
	const [averageRating, setAverageRating] = useState(0);

	const [openBookingForm, setOpenBookingForm] = useState(false);
	const [openPortfolioPostForm, setOpenPortfolioPostForm] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		async function loadHairdresser() {
			try {
				const response = await api.get(`/users/${hairdresserId}`);

				setHairdresser(response.data.user);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}

		async function loadPosts() {
			try {
				const response = await api.get(
					`/portfolioposts/hairdressers/${hairdresserId}`,
				);

				setPosts(response.data.posts);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}

		async function loadFeaturedPosts() {
			try {
				const response = await api.get(
					`/portfolioposts/hairdressers/${hairdresserId}/featured`,
				);

				setFeaturedPosts(response.data.posts);
			} catch (error) {}
		}

		async function getReviews() {
			try {
				const response = await api.get(
					`/reviews/hairdressers/${hairdresserId}`,
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
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}

		if (id == hairdresserId) {
			setIsOwner(true);
		}

		loadHairdresser();
		getReviews();
		loadPosts();
		loadFeaturedPosts();
	}, []);

	const handleOpenPortfolioPostForm = () => {
		setOpenPortfolioPostForm(true);
	};

	const handleClosePortfolioPostForm = () => {
		setOpenPortfolioPostForm(false);
	};

	const handleOpenBookingForm = () => {
		setOpenBookingForm(true);
	};

	const handleCloseBookingForm = () => {
		setOpenBookingForm(false);
	};

	const classes = useStyles();

	return (
		<Grid container className={classes.componentGrid}>
			<Grid container className={classes.modalContainer}>
				<Modal
					className={classes.modal}
					open={openPortfolioPostForm}
					onClose={handleClosePortfolioPostForm}
				>
					<PortfolioPostForm userId={id} />
				</Modal>
			</Grid>

			<Grid item>
				<Modal
					className={classes.modalBookingForm}
					open={openBookingForm}
					onClose={handleCloseBookingForm}
				>
					<BookingFormNew hairdresser={hairdresser} />
				</Modal>
			</Grid>

			<Grid container spacing={3} className={classes.hairdresserInfo}>
				<Grid item xs={12}>
					<Card>
						<CardHeader
							className={classes.header}
							avatar={
								<Avatar
									className={classes.profileImgPicture}
									src={hairdresser.profile_img_url}
								>
									{hairdresser.first_name + hairdresser.last_name}
								</Avatar>
							}
							title={hairdresser.first_name + ' ' + hairdresser.last_name}
							titleTypographyProps={{
								variant: 'h4',
								className: `${classes.title}`,
							}}
							subheader={
								hairdresser.addressLine2 == ''
									? hairdresser.addressLine1 +
									  ', ' +
									  hairdresser.city +
									  ', ' +
									  hairdresser.county +
									  ', ' +
									  hairdresser.country +
									  '.'
									: hairdresser.addressLine1 +
									  ', ' +
									  hairdresser.addressLine2 +
									  ', ' +
									  hairdresser.city +
									  ', ' +
									  hairdresser.county +
									  ', ' +
									  hairdresser.country +
									  '.'
							}
						/>

						<Grid container spacing={1} className={classes.ratingsContainer}>
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

						<Grid container spacing={2} className={classes.bookButtonContainer}>
							{!isOwner && (
								<Grid item>
									<Button
										variant='contained'
										color='primary'
										fullWidth
										size='large'
										//onClick={handleOpenBookingForm}
										href={'/bookings/new/hairdressers/' + hairdresserId}
									>
										Book Now
									</Button>
								</Grid>
							)}

							{id && accessToken && isOwner && (
								<Grid item>
									<Button
										variant='outlined'
										color='primary'
										fullWidth
										size='large'
										startIcon={<Add />}
										onClick={handleOpenPortfolioPostForm}
									>
										Portfolio Post
									</Button>
								</Grid>
							)}
						</Grid>
					</Card>
				</Grid>
			</Grid>

			<Typography variant='h5'>Featured Jobs</Typography>
			<Divider variant='middle' fullWidth className={classes.divider} />

			<Grid container spacing={3}>
				{featuredPosts.map((post) => (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<PortfolioPostCard
							key={post.id}
							post={post}
							isOwner={isOwner}
							userId={id}
						/>
					</Grid>
				))}
			</Grid>

			<Typography variant='h5' className={classes.reviewTitle}>
				Reviews
			</Typography>
			<Divider variant='middle' fullWidth className={classes.divider} />

			<Grid container>
				{reviews.map((review, i) => (
					<Grid item xs={12}>
						<ReviewCard key={review.id} review={review} />

						{i + 1 < reviews.length && <Divider />}
					</Grid>
				))}
			</Grid>
		</Grid>
	);
}
