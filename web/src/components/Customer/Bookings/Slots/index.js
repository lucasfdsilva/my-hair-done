import React, { useState } from 'react';
import {
	Grid,
	List,
	Divider,
	Typography,
	Button,
	Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';

import SlotFormNew from './SlotFormNew';
import SlotCard from './SlotCard';

export default function Slots(props) {
	const [open, setOpen] = useState(false);

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
			marginBottom: 50,
		},
		list: {
			borderRadius: 8,
			border: '2px solid #EF5350',
		},
		title: {
			marginBottom: 30,
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
			<Modal className={classes.modal} open={open} onClose={handleClose}>
				<SlotFormNew userId={props.userId} slots={props.slots} />
			</Modal>

			<Grid item xs={12} className={classes.title}>
				<Typography variant='h4'>Registered Slots</Typography>
			</Grid>

			<Grid item xs={12} className={classes.title}>
				<Button
					startIcon={<Add />}
					variant='outlined'
					color='primary'
					onClick={handleOpen}
				>
					Slot
				</Button>
			</Grid>

			<Grid item xs={12}>
				<List className={classes.list} dense>
					{props.slots.map((slot, i) => (
						<Grid item xs={12}>
							<SlotCard slot={slot} userId={props.userId} />

							{i + 1 < props.slots.length && <Divider />}
						</Grid>
					))}
				</List>
			</Grid>
		</Grid>
	);
}
