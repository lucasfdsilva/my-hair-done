import React, { useState } from 'react';
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
	const [openBookingForm, setOpenBookingForm] = useState(false);

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
						<Rating name='read-only' value={3.5} precision={0.5} readOnly />
					</Grid>

					<Grid item>
						<Typography className={classes.ratingsTotal}>(96)</Typography>
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
					<Grid container spacing={1}>
						<Grid item>
							<Typography variant='subtitle2'>Latest Review Title</Typography>
						</Grid>

						<Grid item>
							<Rating
								name='read-only'
								value={2}
								precision={0.5}
								readOnly
								size='small'
							/>
						</Grid>
					</Grid>

					<Typography variant='body2'>
						Review body Review body Review body Review body Review body Review
						body Review body Review body
					</Typography>

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

						<Grid item xs={6}>
							<Button
								variant='contained'
								color='primary'
								fullWidth
								onClick={() => setOpenBookingForm(true)}
							>
								Book Now
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	);
}
