import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import { DateRange, Schedule, Timer } from '@material-ui/icons';
import moment from 'moment';

import ActiveBookings from './ActiveBookings';
import PastBookings from './PastBookings';
import Slots from './Slots';

import { useStyles } from './styles';

import api from '../../../services/api';

export default function Bookings() {
	const [id, setID] = useState(localStorage.getItem('id'));
	const [isHairdresser, setIsHairdresser] = useState(
		localStorage.getItem('isHairdresser'),
	);
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('accessToken'),
	);
	const [activeBookings, setActiveBookings] = useState([]);
	const [pastBookings, setPastBookings] = useState([]);
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

				return setIsHairdresser(response.data.user.is_hairdresser);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}

		async function loadBookings() {
			try {
				//If the logged user is a hairdresser
				if (isHairdresser == true) {
					const response = await api.get(`/bookings/hairdressers/${id}`);

					setActiveBookings(
						await response?.data?.bookings?.filter((booking) =>
							moment(booking.date).isSameOrAfter(moment(), 'day'),
						),
					);

					return setPastBookings(
						response?.data?.bookings?.filter((booking) =>
							moment(booking.date).isBefore(moment(), 'day'),
						),
					);
				}

				//If the logged user is a normal user
				const response = await api.get(`/bookings/users/${id}`);

				setActiveBookings(
					await response?.data?.bookings?.filter((booking) =>
						moment(booking.date).isSameOrAfter(moment(), 'day'),
					),
				);

				return setPastBookings(
					response?.data?.bookings?.filter((booking) =>
						moment(booking.date).isBefore(moment(), 'day'),
					),
				);
			} catch (error) {
				setErrorMessage(error?.response?.data?.message);
			}
		}

		async function loadSlots() {
			try {
				const response = await api.get(`/slots/hairdressers/${id}`);

				const sortedSlots = await response.data.slots.sort((a, b) => {
					var x = a.start_time;
					var y = b.start_time;
					if (x < y) {
						return -1;
					}
					if (x > y) {
						return 1;
					}
					return 0;
				});

				setSlots(sortedSlots);
			} catch (error) {
				setErrorMessage(error.response.data.message);
			}
		}
		loadProfile();
		loadBookings();
		loadSlots();
	}, []);

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

			<Grid container className={classes.content}>
				{selectedTab === 0 && (
					<Grid item>
						<ActiveBookings
							bookings={activeBookings}
							isHairdresser={isHairdresser}
							userId={id}
						/>
					</Grid>
				)}

				{selectedTab === 1 && (
					<Grid item>
						<PastBookings
							bookings={pastBookings}
							isHairdresser={isHairdresser}
							userId={id}
						/>
					</Grid>
				)}

				{selectedTab === 2 && (
					<Grid item xs={12}>
						<Slots slots={slots} userId={id} />
					</Grid>
				)}
			</Grid>
		</Grid>
	);
}
