import React, { useState, useEffect } from 'react';
import {
	Grid,
	ListItem,
	Typography,
	IconButton,
	ListItemSecondaryAction,
	ListItemAvatar,
	Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Delete, Create } from '@material-ui/icons';

import SlotFormEdit from '../SlotFormEdit';

export default function SlotCard(props) {
	const [weekDays, setWeekDays] = useState([]);
	const [editedTimes, setEditedTimes] = useState('');

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		async function formatWeekDays() {
			const daysArray = [];

			if (props.slot.monday) daysArray.push('Mon');
			if (props.slot.tuesday) daysArray.push(' Tue');
			if (props.slot.wednesday) daysArray.push(' Wed');
			if (props.slot.thursday) daysArray.push(' Thur');
			if (props.slot.friday) daysArray.push(' Fri');
			if (props.slot.saturday) daysArray.push(' Sat');
			if (props.slot.sunday) daysArray.push(' Sun.');

			setWeekDays(daysArray.toString());
		}

		const editedText =
			props.slot.start_time.slice(0, -3) +
			' - ' +
			props.slot.end_time.slice(0, -3);
		setEditedTimes(editedText);

		formatWeekDays();
	}, []);

	const useStyles = makeStyles({
		listItem: { padding: 20 },
		weekDays: {
			marginLeft: 30,
		},
		time: {
			marginTop: 8,
		},
	});
	const classes = useStyles();

	return (
		<>
			<Modal className={classes.modal} open={open} onClose={handleClose}>
				<SlotFormEdit userId={props.userId} slot={props.slot} />
			</Modal>

			<ListItem className={classes.listItem}>
				<Grid container spacing={3}>
					<ListItemAvatar className={classes.time}>
						<Typography variant='h6' color='primary'>
							{editedTimes}
						</Typography>
					</ListItemAvatar>

					<Grid item xs={6}>
						<Typography variant='body1' className={classes.weekDays}>
							{weekDays}
						</Typography>
					</Grid>

					<ListItemSecondaryAction>
						<IconButton edge='end' aria-label='edit' onClick={handleOpen}>
							<Create color='primary' />
						</IconButton>
					</ListItemSecondaryAction>
				</Grid>
			</ListItem>
		</>
	);
}
