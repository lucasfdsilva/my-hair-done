import React, { useState, useEffect } from 'react';
import { Grid, CardHeader, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import { useStyles } from './styles.js';

export default function ReviewCard(props) {
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {}, []);

	const classes = useStyles();

	return (
		<Grid container>
			<Grid item xs={12}>
				<CardHeader
					className={classes.header}
					avatar={
						<Avatar
							className={classes.profileImgPicture}
							src={props.review?.profile_img_url}
						>
							{props.review?.first_name + props.review?.last_name}
						</Avatar>
					}
					title={props.review?.first_name + ' ' + props.review?.last_name}
					titleTypographyProps={{
						variant: 'subtitle2',
						className: `${classes.name}`,
					}}
					subheader={new Date(props.review?.created_at).toDateString()}
				/>
			</Grid>

			<Grid item xs={12}>
				<Rating
					name='read-only'
					value={props.review?.rating}
					precision={0.5}
					readOnly
					className={classes.rating}
				/>
			</Grid>

			<Grid item>
				<CardHeader
					className={classes.reviewBody}
					title={props.review?.headline}
					titleTypographyProps={{
						variant: 'h6',
						className: `${classes.title}`,
					}}
					subheader={props.review?.description}
				/>
			</Grid>
		</Grid>
	);
}
