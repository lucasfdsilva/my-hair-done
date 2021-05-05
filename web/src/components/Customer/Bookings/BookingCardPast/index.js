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

import api from '../../../../services/api';
import { useStyles } from './styles.js';

export default function BookingCardPast(props) {
	const classes = useStyles();
	const [id, setID] = useState(localStorage.getItem('id'));
	const [hairdresser, setHairdresser] = useState();
	const [slot, setSlot] = useState();
	const [formattedDate, setFormattedDate] = useState(
		new Date(props.booking.date).toLocaleDateString(),
	);

	const [openReviewForm, setOpenReviewForm] = useState(false);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {}, []);

	const handleOpenReviewForm = () => {
		setOpenReviewForm(true);
	};

	const handleCloseReviewForm = () => {
		setOpenReviewForm(false);
	};

	return (
		<Grid container className={classes.componentGrid}>
			<Grid container className={classes.modalContainer}>
				<Modal
					className={classes.modal}
					open={openReviewForm}
					onClose={handleCloseReviewForm}
				>
					<ReviewFormNew userId={id} hairdresser={hairdresser} />
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
		</Grid>
	);
}
