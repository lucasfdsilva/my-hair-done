import React, { useState, useEffect } from 'react';
import {
	Modal,
	Card,
	CardActionArea,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
	Avatar,
	Grid,
	Button,
	Divider,
	TextField,
	InputAdornment,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import theme from '../../../theme';
import { Search, SkipPrevious, SkipNext, Add } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import PortfolioPost from '../PortfolioPost';
import PortfolioPostCard from '../PortfolioPostCard';

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

	const [open, setOpen] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const history = useHistory();

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

		if (id == hairdresserId) {
			setIsOwner(true);
		}

		loadHairdresser();
		loadPosts();
		loadFeaturedPosts();
	}, []);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const useStyles = makeStyles({
		componentGrid: {
			backgroundColor: '#fff',
			borderRadius: 8,
			alignItems: 'center',
			justifyItems: 'center',
			padding: 25,
			margin: 35,
		},
		hairdresserInfo: {
			marginBottom: 40,
		},
		header: {
			fontSize: 30,
		},
		button: {
			marginTop: 20,
			marginBottom: 15,
		},
		errorText: {
			color: '#fff',
		},
		errorBox: {
			backgroundColor: '#ff867c',
			borderRadius: 8,
			marginTop: 20,
			marginBottom: 20,
			marginLeft: 10,
			marginRight: 10,
		},
		ratingsTotal: {
			color: '#3793FF',
		},
		ratingsContainer: {
			marginTop: -95,
			marginLeft: 200,
			[theme.breakpoints.down('xs')]: {
				justifyContent: 'center',
				marginTop: -5,
				marginBottom: 5,
				marginLeft: 0,
			},
		},
		bookButtonContainer: {
			marginTop: -120,
			marginLeft: 530,
			marginBottom: 200,
			[theme.breakpoints.down('xs')]: {
				justifyContent: 'center',
				marginTop: 0,
				marginLeft: 0,
				marginBottom: 60,
			},
			[theme.breakpoints.only('sm')]: {
				marginLeft: 200,
				marginTop: 0,
				marginBottom: 50,
			},
		},
		profileImgPicture: {
			border: '2px solid #555',
			height: 175,
			width: 175,
			fontSize: 30,
		},
		buttonsContainer: {
			marginTop: 15,
		},
		divider: {
			marginBottom: 20,
			marginLeft: 0,
			height: 2,
			width: '100%',
			border: '1px solid #FF6257',
		},
		dividerResults: {
			marginBottom: 20,
			marginLeft: 0,
			height: 2,
			width: '100%',
			border: '1px solid #5c5a5a',
		},
		formContainer: {
			marginBottom: 50,
		},
		searchResults: {
			marginBottom: 40,
		},
		title: {
			marginTop: -50,
		},
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 30,
		},
	});
	const classes = useStyles();

	return (
		<Grid container className={classes.componentGrid}>
			<Grid container className={classes.modalContainer}>
				<Modal className={classes.modal} open={open} onClose={handleClose}>
					<PortfolioPost />
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
								<Rating name='read-only' value={3.5} precision={0.5} readOnly />
							</Grid>

							<Grid item>
								<Typography className={classes.ratingsTotal}>(96)</Typography>
							</Grid>
						</Grid>

						<Grid container spacing={2} className={classes.bookButtonContainer}>
							{id && accessToken && !isOwner && (
								<Grid item>
									<Button
										variant='contained'
										color='primary'
										fullWidth
										size='large'
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
										onClick={handleOpen}
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
		</Grid>
	);
}
