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

	useEffect(() => {
		async function loadProfile() {
			try {
				const response = await api.get(
					`/users/${props.booking.hairdresser_id}`,
				);

				setHairdresser(response?.data?.user);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}

		async function loadSlot() {
			try {
				const response = await api.get(`/slots/${props.booking.slot_id}`);

				setSlot(response?.data?.slot);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}

		loadProfile();
		loadSlot();
	}, []);

	const handleOpenReviewForm = () => {
		setOpenReviewForm(true);
	};

	const handleCloseReviewForm = () => {
		setOpenReviewForm(false);
	};

	return (
		<Grid container>
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
							src={hairdresser?.profile_img_url}
						>
							{hairdresser?.first_name + hairdresser?.last_name}
						</Avatar>
					}
					title={hairdresser?.first_name + ' ' + hairdresser?.last_name}
					titleTypographyProps={{
						variant: 'h5',
						className: `${classes.title}`,
					}}
					subheader={hairdresser?.county + ', ' + hairdresser?.country + '.'}
				/>
			</Grid>

			<Grid item>
				<Typography variant='h6' color='primary' className={classes.date}>
					{formattedDate} | {slot?.start_time.slice(0, -3)} -{' '}
					{slot?.end_time.slice(0, -3)}
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
