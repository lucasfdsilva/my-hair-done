import React, { useState, useEffect } from 'react';
import {
	Grid,
	CardHeader,
	Avatar,
	Typography,
	Button,
	Modal,
} from '@material-ui/core';
import { RateReview } from '@material-ui/icons';

import ReviewFormNew from '../../Reviews/ReviewFormNew';
import EditReviewForm from '../../Reviews/EditReviewForm';

import api from '../../../../services/api';
import { useStyles } from './styles.js';

export default function BookingCardPast(props) {
	const classes = useStyles();
	const [id, setID] = useState(localStorage.getItem('id'));
	const [formattedDate, setFormattedDate] = useState(
		new Date(props.booking.date).toLocaleDateString(),
	);

	const [openReviewForm, setOpenReviewForm] = useState(false);
	const [openEditReviewForm, setOpenEditReviewForm] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		console.log(props.isHairdresser);
	}, []);

	const handleOpenReviewForm = () => {
		setOpenReviewForm(true);
	};

	const handleCloseReviewForm = () => {
		setOpenReviewForm(false);
	};

	const handleOpenEditReviewForm = () => {
		setOpenEditReviewForm(true);
	};

	const handleCloseEditReviewForm = () => {
		setOpenEditReviewForm(false);
	};

	return (
		<Grid container className={classes.componentGrid}>
			<Grid container className={classes.modalContainer}>
				<Modal
					className={classes.modal}
					open={openReviewForm}
					onClose={handleCloseReviewForm}
				>
					<ReviewFormNew
						userId={id}
						hairdresser={props.booking.id}
						booking={props.booking}
					/>
				</Modal>
			</Grid>

			<Grid container className={classes.modalContainer}>
				<Modal
					className={classes.modal}
					open={openEditReviewForm}
					onClose={handleCloseEditReviewForm}
				>
					<EditReviewForm
						userId={id}
						hairdresser={props.booking.id}
						booking={props.booking}
					/>
				</Modal>
			</Grid>

			<Grid item>
				<CardHeader
					className={classes.header}
					avatar={
						<Avatar
							className={classes.profileImgPicture}
							src={props.booking?.profile_img_url}
						>
							{props.booking?.first_name + props.booking?.last_name}
						</Avatar>
					}
					title={props.booking?.first_name + ' ' + props.booking?.last_name}
					titleTypographyProps={{
						variant: 'h5',
						className: `${classes.title}`,
					}}
					subheader={
						props.isHairdresser === true &&
						props.booking?.county + ', ' + props.booking?.country + '.'
					}
				/>
			</Grid>

			<Grid item>
				<Typography variant='h6' color='primary' className={classes.date}>
					{formattedDate} | {props.booking?.start_time.slice(0, -3)} -{' '}
					{props.booking?.end_time.slice(0, -3)}
				</Typography>
			</Grid>

			{props.isHairdresser !== 1 ? (
				props.booking?.review_id === 0 ? (
					<Grid item>
						<Button
							color='primary'
							variant='outlined'
							className={classes.buttons}
							startIcon={<RateReview />}
							onClick={() => setOpenReviewForm(true)}
						>
							Review
						</Button>
					</Grid>
				) : (
					<Grid item>
						<Button
							color='primary'
							variant='outlined'
							className={classes.buttons}
							startIcon={<RateReview />}
							onClick={() => setOpenEditReviewForm(true)}
						>
							Edit Review
						</Button>
					</Grid>
				)
			) : (
				<Grid item></Grid>
			)}
		</Grid>
	);
}
