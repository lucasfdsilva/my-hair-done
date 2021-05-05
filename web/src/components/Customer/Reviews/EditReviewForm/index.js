import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { Formik, Form } from 'formik';

import * as Yup from 'yup';

import TextField from '../../../FormsUI/TextField/index';
import TextArea from '../../../FormsUI/TextArea/index';
import CustomButton from '../../../FormsUI/Button/index';

import api from '../../../../services/api';
import { useStyles } from './styles';

export default function EditReviewForm(props) {
	const classes = useStyles();
	const [review, setReview] = useState([]);
	const [rating, setRating] = useState();
	const [hover, setHover] = useState(-1);

	const labels = {
		0.5: 'Useless',
		1: 'Useless+',
		1.5: 'Poor',
		2: 'Poor+',
		2.5: 'Ok',
		3: 'Ok+',
		3.5: 'Good',
		4: 'Good+',
		4.5: 'Excellent',
		5: 'Excellent+',
	};

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const [clickedToDelete, setClickedToDelete] = useState(false);

	useEffect(() => {
		async function getReview() {
			try {
				const response = await api.get(`/reviews/bookings/${props.booking.id}`);

				setReview(response.data.review);
				setRating(response.data.review.rating);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}

		getReview();
	}, []);

	async function handleReviewCreation(values) {
		const data = {
			headline: values.headline,
			description: values.description,
			rating: rating,
			userId: props.userId,
			hairdresserId: props.booking.hairdresser_id,
			bookingId: props.booking.id,
		};

		try {
			const response = await api.post('/reviews', data);

			window.location.reload();
		} catch (error) {
			setErrorMessage(error.response.data.message);
		}
	}

	const INITIAL_FORM_STATE = {
		headline: review.headline,
		description: review.description,
	};

	const FORM_VALIDATION = Yup.object().shape({
		headline: Yup.string().required('Title is a mandatory field'),
		description: Yup.string().required('Description is a mandatory field'),
	});

	return (
		<Grid container className={classes.componentGridNewPost}>
			<Grid item xs={12}>
				<Typography variant='h4' className={classes.header}>
					Edit Review
				</Typography>
			</Grid>

			<Formik
				enableReinitialize
				initialValues={{ ...INITIAL_FORM_STATE }}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					handleReviewCreation(values);
				}}
			>
				<Form>
					<Grid container spacing={2}>
						{successMessage && (
							<>
								<Grid item xs={12} className={classes.successBox}>
									<Typography
										variant='h6'
										fullLength='true'
										className={classes.successText}
									>
										{successMessage}
									</Typography>
								</Grid>
							</>
						)}

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

						<Grid item xs={12}>
							<TextField
								InputLabelProps={{ shrink: true }}
								name='headline'
								label='Headline'
							/>
						</Grid>

						<Grid item xs={12}>
							<TextArea
								InputLabelProps={{ shrink: true }}
								name='description'
								label='Description'
								className={classes.textArea}
							/>
						</Grid>

						<Grid item xs={4}>
							<Rating
								name='half-rating'
								precision={0.5}
								value={rating}
								size='large'
								onChange={(event, newValue) => {
									setRating(newValue);
								}}
								onChangeActive={(event, newHover) => {
									setHover(newHover);
								}}
							/>
						</Grid>

						{rating !== null && (
							<Grid item xs={8}>
								<Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>
							</Grid>
						)}

						<Grid
							container
							spacing={3}
							justify='center'
							className={classes.button}
						>
							<Grid item xs={6}>
								<CustomButton>Create Review</CustomButton>
							</Grid>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</Grid>
	);
}
