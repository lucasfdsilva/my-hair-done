import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { DateRange, Schedule, Timer } from '@material-ui/icons';

import ActiveBookings from './ActiveBookings';
import PastBookings from './PastBookings';
import Slots from './Slots';

import api from '../../../services/api';

export default function Bookings() {
	const [id, setID] = useState(localStorage.getItem('id'));
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('accessToken'),
	);
	const [isHairdresser, setIsHairdresser] = useState(false);
	const [bookings, setBookings] = useState([]);
	const [slots, setSlots] = useState([]);

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const history = useHistory();

	const [selectedTab, setSelectedTab] = useState(0);
	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	useEffect(() => {
		if (!id || !accessToken) return history.push('/login');

		async function loadProfile() {
			if (!id || !accessToken) return history.push('/login');

			try {
				const response = await api.get(`users/${id}`);

				setIsHairdresser(response.data.user.is_hairdresser);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}

		async function loadBookings() {}

		async function loadSlots() {
			try {
				const response = await api.get(`/slots/hairdressers/${id}`);
				setSlots(response.data.slots);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}
		loadProfile();
		loadBookings();
		loadSlots();
	}, []);

	const useStyles = makeStyles({
		componentGrid: {
			backgroundColor: '#fff',
			borderRadius: 8,
			alignItems: 'center',
			justifyItems: 'center',
			margin: 35,
			padding: 15,
		},
		appbar: {
			marginBottom: 30,
		},
	});
	const classes = useStyles();

	return (
		<Grid container className={classes.componentGrid}>
			<Grid item xs={12}>
				<AppBar position='static' className={classes.appbar}>
					<Tabs value={selectedTab} onChange={handleChange} centered>
						<Tab icon={<DateRange />} label='Active Bookings' />
						<Tab icon={<Schedule />} label='Past Bookings' />
						{isHairdresser && <Tab icon={<Timer />} label='Slots' />}
					</Tabs>
				</AppBar>
			</Grid>

			{selectedTab === 0 && (
				<Grid item>
					<ActiveBookings bookings={bookings} />
				</Grid>
			)}

			{selectedTab === 1 && (
				<Grid item>
					<PastBookings bookings={bookings} />
				</Grid>
			)}

			{selectedTab === 2 && (
				<Grid item xs={12}>
					<Slots slots={slots} userId={id} />
				</Grid>
			)}
		</Grid>
	);
}
